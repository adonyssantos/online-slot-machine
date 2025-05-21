"use client";
import { useEffect, useState } from "react";
import { useGame } from "@/context/GameContext";

const emojiMap: Record<string, string> = {
  C: "🍒",
  L: "🍋",
  O: "🍊",
  W: "🍉",
};

export const SlotDisplay = () => {
  const { result, isLoading } = useGame();
  const [visible, setVisible] = useState(["", "", ""]);

  useEffect(() => {
    if (!result) return;

    setVisible(["", "", ""]);
    const timers = result.map((symbol, i) =>
      setTimeout(() => {
        setVisible((prev) => {
          const copy = [...prev];
          copy[i] = symbol;
          return copy;
        });
      }, (i + 1) * 1000)
    );

    return () => timers.forEach(clearTimeout);
  }, [result]);

  return (
    <div className="flex justify-center gap-4 text-6xl font-bold my-6">
      {visible.map((val, i) => (
        <div
          key={i}
          className="w-20 h-20 border-4 border-black rounded-xl flex items-center justify-center bg-white shadow-lg"
        >
          {isLoading && !val ? "🎰" : emojiMap[val] || "❓"}
        </div>
      ))}
    </div>
  );
};
