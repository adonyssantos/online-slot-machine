"use client";
import { useGame } from "@/context/GameContext";

export const RollButton = () => {
  const { roll, isLoading, credits } = useGame();

  return (
    <button
      onClick={roll}
      disabled={isLoading || credits < 1}
      className="bg-blue-600 text-white px-6 py-3 rounded-xl shadow-md hover:bg-blue-700 disabled:opacity-50"
    >
      {isLoading ? "Rolling..." : "Roll 🎲"}
    </button>
  );
};
