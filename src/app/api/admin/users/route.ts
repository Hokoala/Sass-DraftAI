import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { supabase } from "@/lib/supabase";

const ADMIN_EMAIL = process.env.ADMIN_EMAIL!;

async function getAdminSession(req: NextRequest) {
  try {
    const session = await auth.api.getSession({ headers: req.headers });
    if (!session?.user) return null;
    if (session.user.email !== ADMIN_EMAIL) return null;
    return session;
  } catch {
    return null;
  }
}

export async function GET(req: NextRequest) {
  const session = await getAdminSession(req);
  if (!session) return NextResponse.json({ error: "Accès refusé" }, { status: 403 });

  const { data: users } = await supabase
    .from("user")
    .select("id, name, email, plan, createdAt")
    .order("createdAt", { ascending: false });

  // Générations par user
  const { data: genCounts } = await supabase
    .from("generations")
    .select("user_id");

  const countMap: Record<string, number> = {};
  for (const g of genCounts ?? []) {
    countMap[g.user_id] = (countMap[g.user_id] ?? 0) + 1;
  }

  // Générations ce mois
  const start = new Date();
  start.setDate(1); start.setHours(0, 0, 0, 0);
  const { data: monthlyGen } = await supabase
    .from("generations")
    .select("user_id")
    .gte("created_at", start.toISOString());

  const monthlyMap: Record<string, number> = {};
  for (const g of monthlyGen ?? []) {
    monthlyMap[g.user_id] = (monthlyMap[g.user_id] ?? 0) + 1;
  }

  const enriched = (users ?? []).map((u) => ({
    ...u,
    totalGenerations: countMap[u.id] ?? 0,
    monthlyGenerations: monthlyMap[u.id] ?? 0,
  }));

  return NextResponse.json({ users: enriched });
}

export async function DELETE(req: NextRequest) {
  const session = await getAdminSession(req);
  if (!session) return NextResponse.json({ error: "Accès refusé" }, { status: 403 });

  const { userId } = await req.json();
  if (!userId) return NextResponse.json({ error: "userId manquant" }, { status: 400 });

  // Empêcher l'admin de se supprimer lui-même
  if (session.user.id === userId) {
    return NextResponse.json({ error: "Tu ne peux pas supprimer ton propre compte" }, { status: 400 });
  }

  // Supprimer les générations d'abord (cascade)
  await supabase.from("generations").delete().eq("user_id", userId);

  // Supprimer les sessions
  await supabase.from("session").delete().eq("userId", userId);

  // Supprimer le compte
  const { error } = await supabase.from("user").delete().eq("id", userId);
  if (error) return NextResponse.json({ error: "Erreur suppression" }, { status: 500 });

  return NextResponse.json({ success: true });
}

export async function PATCH(req: NextRequest) {
  const session = await getAdminSession(req);
  if (!session) return NextResponse.json({ error: "Accès refusé" }, { status: 403 });

  const { userId, plan } = await req.json();
  const validPlans = ["starter", "pro", "studio"];
  if (!userId || !validPlans.includes(plan)) {
    return NextResponse.json({ error: "Données invalides" }, { status: 400 });
  }

  const { error } = await supabase.from("user").update({ plan }).eq("id", userId);
  if (error) return NextResponse.json({ error: "Erreur mise à jour" }, { status: 500 });

  return NextResponse.json({ success: true });
}
