import { NextResponse } from "next/server";
import { getSession, updateSession } from "@/lib/sessionStore";

const SYMBOLS = ["C", "L", "O", "W"] as const;
const REWARDS = {
  C: 10,
  L: 20,
  O: 30,
  W: 40,
};

function getRandomSymbol() {
  const index = Math.floor(Math.random() * SYMBOLS.length);
  return SYMBOLS[index];
}

function shouldForceLoss(credits: number): boolean {
  const roll = Math.random();
  if (credits >= 40 && credits <= 60) return roll < 0.3;
  if (credits > 60) return roll < 0.6;
  return false;
}

function generateRoll(forceLoss: boolean): [string, string, string] {
  if (forceLoss) {
    let a = getRandomSymbol();
    let b = getRandomSymbol();
    let c = getRandomSymbol();
    while (a === b && b === c) {
      b = getRandomSymbol();
      c = getRandomSymbol();
    }
    return [a, b, c];
  }

  const a = getRandomSymbol();
  const b = getRandomSymbol();
  const c = getRandomSymbol();
  return [a, b, c];
}

export async function POST(req: Request) {
  const { sessionId } = await req.json();
  const session = getSession(sessionId);

  if (!session) {
    return NextResponse.json({ error: "Invalid session" }, { status: 400 });
  }

  if (session.credits < 1) {
    return NextResponse.json({ error: "Out of credits" }, { status: 400 });
  }

  const newCredits = session.credits - 1;
  const forceLoss = shouldForceLoss(newCredits);
  const result = generateRoll(forceLoss);

  const [a, b, c] = result;
  const isWin = a === b && b === c;
  const reward = isWin ? REWARDS[a as keyof typeof REWARDS] : 0;

  updateSession(sessionId, {
    credits: newCredits + reward,
    rolls: session.rolls + 1,
  });

  return NextResponse.json({
    result,
    isWin,
    reward,
    credits: newCredits + reward,
  });
}
