"use client";
import { useGame } from "@/context/GameContext";

export const ResultMessage = () => {
  const { resultMessage } = useGame();

  return (
    <div className="text-center mt-4 text-lg font-semibold min-h-7">
      <span>{resultMessage}</span>
    </div>
  );
};
