import { NextResponse } from "next/server";
import { createSession } from "@/lib/sessionStore";
import { randomUUID } from "crypto";

export async function POST() {
  const sessionId = randomUUID();
  const session = createSession(sessionId);

  return NextResponse.json({ sessionId, credits: session?.credits }, { status: 200 });
}
