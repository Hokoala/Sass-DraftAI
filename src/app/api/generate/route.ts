import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";

const EDGE_URL = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/generate`;
const INTERNAL_SECRET = process.env.INTERNAL_SECRET!;

async function getUserId(req: NextRequest) {
  try {
    const session = await auth.api.getSession({ headers: req.headers });
    return session?.user?.id ?? null;
  } catch {
    return null;
  }
}

function edgeHeaders(userId: string | null) {
  return {
    "Content-Type": "application/json",
    "x-internal-secret": INTERNAL_SECRET,
    ...(userId ? { "x-user-id": userId } : {}),
  };
}

export async function POST(req: NextRequest) {
  try {
    const userId = await getUserId(req);
    const body = await req.json();

    const res = await fetch(EDGE_URL, {
      method: "POST",
      headers: edgeHeaders(userId),
      body: JSON.stringify(body),
    });

    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Erreur inconnue";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const userId = await getUserId(req);

    const res = await fetch(EDGE_URL, {
      method: "GET",
      headers: edgeHeaders(userId),
    });

    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Erreur inconnue";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
