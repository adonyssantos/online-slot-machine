"use client";
import { useGame } from "@/context/GameContext";

export const ResultMessage = () => {
  const { resultMessage } = useGame();

  if (!resultMessage) return null;

  return (
    <div className="text-center mt-4 text-lg font-semibold">
      <span>{resultMessage}</span>
    </div>
  );
};
