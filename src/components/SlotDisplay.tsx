"use client";
import { useEffect, useState } from "react";
import { useGame } from "@/context/GameContext";
import { getRandomSymbol } from "@/lib/getRandomSymbol";
import { emojiMap } from "@/lib/emojiMap";

export const SlotDisplay = () => {
  const { symbols, isLoading } = useGame();
  const [displayedSymbols, setDisplayedSymbols] = useState<string[]>(["", "", ""]);

  useEffect(() => {
    if (!symbols.length) return;

    symbols.forEach((finalSymbol, index) => {
      let count = 0;

      const interval = setInterval(() => {
        const random = getRandomSymbol();
        setDisplayedSymbols((prev) => {
          const copy = [...prev];
          copy[index] = emojiMap[random];
          return copy;
        });

        count++;
        if (count === 3) {
          clearInterval(interval);
          setDisplayedSymbols((prev) => {
            const copy = [...prev];
            copy[index] = emojiMap[finalSymbol];
            return copy;
          });
        }
      }, 150 * (index + 1));
    });
  }, [symbols]);

  return (
    <div className="flex justify-center gap-4 mt-4">
      {displayedSymbols.map((symbol, index) => (
        <div
          key={index}
          className="w-20 h-20 text-5xl bg-white border-4 border-orange-300 rounded-xl flex items-center justify-center shadow-md transition-all duration-300 select-none"
        >
          {!symbol ? "❓" : symbol}
        </div>
      ))}
    </div>
  );
};
