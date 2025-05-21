"use client";
import { useGame } from "@/context/GameContext";

export const CreditsDisplay = () => {
  const { credits } = useGame();

  return (
    <div className="text-xl font-medium text-gray-800">
      Credits: <span className="font-bold">{credits}</span>
    </div>
  );
};
