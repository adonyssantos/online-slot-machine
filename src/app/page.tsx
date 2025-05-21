"use client";

import { useEffect } from "react";
import { useGame } from "@/context/GameContext";
import { SlotDisplay } from "@/components/SlotDisplay";
import { RollButton } from "@/components/RollButton";
import { CreditsDisplay } from "@/components/CreditsDisplay";
import { ResultMessage } from "@/components/ResultMessage";
import { CashOutButton } from "@/components/CashOutButton";

export default function Home() {
  const { sessionId, startGame } = useGame();

  useEffect(() => {
    if (!sessionId) startGame();
  }, [sessionId]);

  if (!sessionId) {
    return <div className="text-center mt-20 text-xl">Loading session...</div>;
  }

  return (
    <main className="flex flex-col items-center text-center space-y-6 max-w-xl mx-auto">
      <h1 className="text-4xl font-bold text-orange-700 drop-shadow-md">🎰 Slot Machine</h1>

      <CreditsDisplay />

      <SlotDisplay />

      <RollButton />

      <ResultMessage />

      <CashOutButton />
    </main>
  );
}
