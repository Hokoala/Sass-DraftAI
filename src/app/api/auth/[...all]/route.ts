import { auth } from "@/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";
import { NextRequest } from "next/server";

const handler = toNextJsHandler(auth);

export async function POST(req: NextRequest) {
  try {
    return await handler.POST(req);
  } catch (err) {
    console.error("[AUTH POST ERROR]", err);
    throw err;
  }
}

export async function GET(req: NextRequest) {
  try {
    return await handler.GET(req);
  } catch (err) {
    console.error("[AUTH GET ERROR]", err);
    throw err;
  }
}
