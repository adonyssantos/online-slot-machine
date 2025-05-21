"use client";
import { useGame } from "@/context/GameContext";

export const ResultMessage = () => {
  const { isWin, reward, result } = useGame();

  if (!result) return null;

  return (
    <div className="text-center mt-4 text-lg font-semibold">
      {isWin ? (
        <span className="text-green-600">You won {reward} credits! 🎉</span>
      ) : (
        <span className="text-red-500">No win this time 😞</span>
      )}
    </div>
  );
};
