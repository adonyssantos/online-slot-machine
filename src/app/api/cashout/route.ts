import { NextResponse } from "next/server";
import { getSession, deleteSession } from "@/lib/sessionStore";

export async function POST(req: Request) {
  const { sessionId } = await req.json();
  const session = getSession(sessionId);

  if (!session) {
    return NextResponse.json({ error: "Invalid session" }, { status: 400 });
  }

  if (session.rolls < 2) {
    return NextResponse.json({ error: "You must roll at least 2 times" }, { status: 400 });
  }

  const payout = session.credits;
  deleteSession(sessionId);

  return NextResponse.json({ cashedOut: payout });
}
