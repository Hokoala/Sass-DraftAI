import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { auth } from "@/lib/auth";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

const PLAN_LIMITS: Record<string, { monthlyLimit: number | null; formats: string[] }> = {
  starter: { monthlyLimit: 5, formats: ["blog"] },
  pro:     { monthlyLimit: null, formats: ["blog", "newsletter", "linkedin", "libre"] },
  studio:  { monthlyLimit: null, formats: ["blog", "newsletter", "linkedin", "libre"] },
};

async function getUserId(req: NextRequest) {
  try {
    const session = await auth.api.getSession({ headers: req.headers });
    return session?.user?.id ?? null;
  } catch {
    return null;
  }
}

async function getUserPlan(userId: string): Promise<string> {
  const { data } = await supabase
    .from("user")
    .select("plan")
    .eq("id", userId)
    .single();
  return data?.plan ?? "starter";
}

async function getMonthlyCount(userId: string): Promise<number> {
  const start = new Date();
  start.setDate(1);
  start.setHours(0, 0, 0, 0);

  const { count } = await supabase
    .from("generations")
    .select("id", { count: "exact", head: true })
    .eq("user_id", userId)
    .gte("created_at", start.toISOString());

  return count ?? 0;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { prompt, format } = body;

    if (!prompt) {
      return NextResponse.json({ error: "Prompt manquant" }, { status: 400 });
    }

    const userId = await getUserId(req);
    if (!userId) {
      return NextResponse.json({ error: "Non connecté" }, { status: 401 });
    }

    const plan = await getUserPlan(userId);
    const limits = PLAN_LIMITS[plan] ?? PLAN_LIMITS.starter;

    // Vérifier le format autorisé
    if (!limits.formats.includes(format)) {
      return NextResponse.json({
        error: `Le format "${format}" n'est pas disponible avec le plan ${plan}. Passe au plan Pro pour accéder à tous les formats.`,
      }, { status: 403 });
    }

    // Vérifier la limite mensuelle
    if (limits.monthlyLimit !== null) {
      const count = await getMonthlyCount(userId);
      if (count >= limits.monthlyLimit) {
        return NextResponse.json({
          error: `Tu as atteint la limite de ${limits.monthlyLimit} générations ce mois-ci. Passe au plan Pro pour des générations illimitées.`,
        }, { status: 403 });
      }
    }

    const systemPrompts: Record<string, string> = {
      blog: `Tu es un expert en rédaction. À partir des notes brutes ci-dessous, génère un article de blog structuré (600-800 mots), optimisé SEO, avec un titre accrocheur, une introduction, des sous-titres et une conclusion. Réponds en français.`,
      newsletter: `Tu es un expert en email marketing. À partir des notes brutes ci-dessous, génère une newsletter engageante avec une accroche forte, un contenu clair et une signature personnelle. Réponds en français.`,
      linkedin: `Tu es un expert en personal branding LinkedIn. À partir des notes brutes ci-dessous, génère un thread LinkedIn de 5 posts numérotés avec un hook viral et un call-to-action final. Réponds en français.`,
      libre: `Réponds à la demande suivante en français de façon claire et structurée.`,
    };

    const system = systemPrompts[format] ?? systemPrompts.libre;
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const result = await model.generateContent(`${system}\n\n${prompt}`);
    const text = result.response.text();

    const { error: insertError } = await supabase
      .from("generations")
      .insert({ prompt, format, result: text, user_id: userId });

    if (insertError) console.error("[insert error]", insertError.message);

    return NextResponse.json({ result: text });
  } catch (err) {
    console.error("[/api/generate POST]", err);
    const message = err instanceof Error ? err.message : "Erreur inconnue";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const userId = await getUserId(req);

    if (!userId) {
      return NextResponse.json({ history: [], plan: "starter", monthlyCount: 0, monthlyLimit: 5 });
    }

    const plan = await getUserPlan(userId);
    const limits = PLAN_LIMITS[plan] ?? PLAN_LIMITS.starter;
    const monthlyCount = await getMonthlyCount(userId);

    const { data, error } = await supabase
      .from("generations")
      .select("id, created_at, prompt, format, result")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .limit(10);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      history: data,
      plan,
      monthlyCount,
      monthlyLimit: limits.monthlyLimit,
      allowedFormats: limits.formats,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Erreur inconnue";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
