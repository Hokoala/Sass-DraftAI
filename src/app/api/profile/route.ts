import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { supabase } from "@/lib/supabase";

async function getUserId(req: NextRequest) {
  try {
    const session = await auth.api.getSession({ headers: req.headers });
    return session?.user?.id ?? null;
  } catch {
    return null;
  }
}

export async function GET(req: NextRequest) {
  const userId = await getUserId(req);
  if (!userId) return NextResponse.json({ error: "Non connecté" }, { status: 401 });

  const { data: user } = await supabase
    .from("user")
    .select("id, name, email, plan, createdAt")
    .eq("id", userId)
    .single();

  // Nombre total de générations
  const { count: totalCount } = await supabase
    .from("generations")
    .select("id", { count: "exact", head: true })
    .eq("user_id", userId);

  // Générations ce mois
  const start = new Date();
  start.setDate(1);
  start.setHours(0, 0, 0, 0);
  const { count: monthlyCount } = await supabase
    .from("generations")
    .select("id", { count: "exact", head: true })
    .eq("user_id", userId)
    .gte("created_at", start.toISOString());

  // Dernières générations
  const { data: recentGenerations } = await supabase
    .from("generations")
    .select("id, created_at, format, prompt")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(5);

  return NextResponse.json({
    user,
    stats: {
      totalCount: totalCount ?? 0,
      monthlyCount: monthlyCount ?? 0,
    },
    recentGenerations: recentGenerations ?? [],
  });
}

export async function PATCH(req: NextRequest) {
  const userId = await getUserId(req);
  if (!userId) return NextResponse.json({ error: "Non connecté" }, { status: 401 });

  const body = await req.json();

  // Mise à jour du nom
  if (body.name !== undefined) {
    if (!body.name?.trim()) return NextResponse.json({ error: "Nom invalide" }, { status: 400 });
    if (body.name.trim().length > 100) return NextResponse.json({ error: "Nom trop long" }, { status: 400 });
    const { error } = await supabase.from("user").update({ name: body.name.trim() }).eq("id", userId);
    if (error) { console.error(error); return NextResponse.json({ error: "Erreur lors de la mise à jour" }, { status: 500 }); }
  }

  // Mise à jour du plan
  if (body.plan !== undefined) {
    const validPlans = ["starter", "pro", "studio"];
    if (!validPlans.includes(body.plan)) return NextResponse.json({ error: "Plan invalide" }, { status: 400 });
    const { error } = await supabase.from("user").update({ plan: body.plan }).eq("id", userId);
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
