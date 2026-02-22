import { createClient } from "jsr:@supabase/supabase-js@2";

const GEMINI_API_KEY = Deno.env.get("GEMINI_API_KEY")!;
const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const INTERNAL_SECRET = Deno.env.get("INTERNAL_SECRET")!;

const systemPrompts: Record<string, string> = {
  blog: `Tu es un expert en rédaction. À partir des notes brutes ci-dessous, génère un article de blog structuré (600-800 mots), optimisé SEO, avec un titre accrocheur, une introduction, des sous-titres et une conclusion. Réponds en français.`,
  newsletter: `Tu es un expert en email marketing. À partir des notes brutes ci-dessous, génère une newsletter engageante avec une accroche forte, un contenu clair et une signature personnelle. Réponds en français.`,
  linkedin: `Tu es un expert en personal branding LinkedIn. À partir des notes brutes ci-dessous, génère un thread LinkedIn de 5 posts numérotés avec un hook viral et un call-to-action final. Réponds en français.`,
  libre: `Réponds à la demande suivante en français de façon claire et structurée.`,
};

const PLAN_LIMITS: Record<string, { monthlyLimit: number | null; formats: string[] }> = {
  starter: { monthlyLimit: 5, formats: ["blog"] },
  pro:     { monthlyLimit: null, formats: ["blog", "newsletter", "linkedin", "libre"] },
  studio:  { monthlyLimit: null, formats: ["blog", "newsletter", "linkedin", "libre"] },
};

const cors = { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Headers": "authorization, content-type, x-user-id, x-internal-secret" };

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: cors });

  // Vérification du secret interne
  const secret = req.headers.get("x-internal-secret");
  if (secret !== INTERNAL_SECRET) {
    return Response.json({ error: "Non autorisé" }, { status: 401, headers: cors });
  }

  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
  const userId = req.headers.get("x-user-id");

  // Récupérer le plan
  let userPlan = "starter";
  if (userId) {
    const { data } = await supabase.from("user").select("plan").eq("id", userId).single();
    userPlan = data?.plan ?? "starter";
  }

  const limits = PLAN_LIMITS[userPlan] ?? PLAN_LIMITS.starter;

  // ── GET : historique ──
  if (req.method === "GET") {
    if (!userId) return Response.json({ history: [], plan: "starter", monthlyCount: 0, monthlyLimit: 5, allowedFormats: ["blog"] }, { headers: cors });

    const { data: history } = await supabase
      .from("generations")
      .select("id, created_at, prompt, format, result")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .limit(10);

    const start = new Date(); start.setDate(1); start.setHours(0, 0, 0, 0);
    const { count: monthlyCount } = await supabase
      .from("generations").select("id", { count: "exact", head: true })
      .eq("user_id", userId).gte("created_at", start.toISOString());

    return Response.json({
      history: history ?? [],
      plan: userPlan,
      monthlyCount: monthlyCount ?? 0,
      monthlyLimit: limits.monthlyLimit,
      allowedFormats: limits.formats,
    }, { headers: cors });
  }

  // ── POST : générer ──
  if (req.method === "POST") {
    const { prompt, format } = await req.json();
    if (!prompt) return Response.json({ error: "Prompt manquant" }, { status: 400, headers: cors });

    if (!limits.formats.includes(format)) {
      return Response.json({ error: `Format non disponible avec le plan ${userPlan}.` }, { status: 403, headers: cors });
    }

    if (limits.monthlyLimit !== null && userId) {
      const start = new Date(); start.setDate(1); start.setHours(0, 0, 0, 0);
      const { count } = await supabase.from("generations").select("id", { count: "exact", head: true })
        .eq("user_id", userId).gte("created_at", start.toISOString());
      if ((count ?? 0) >= limits.monthlyLimit) {
        return Response.json({ error: `Limite de ${limits.monthlyLimit} générations atteinte.` }, { status: 403, headers: cors });
      }
    }

    // Appel Gemini
    const geminiRes = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contents: [{ parts: [{ text: `${systemPrompts[format] ?? systemPrompts.libre}\n\n${prompt}` }] }] }),
      }
    );
    const geminiData = await geminiRes.json();
    const text = geminiData?.candidates?.[0]?.content?.parts?.[0]?.text ?? "";

    if (userId) await supabase.from("generations").insert({ prompt, format, result: text, user_id: userId });

    return Response.json({ result: text }, { headers: cors });
  }

  return Response.json({ error: "Méthode non supportée" }, { status: 405, headers: cors });
});
