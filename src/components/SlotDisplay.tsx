"use client";
import { useEffect, useState } from "react";
import { useGame } from "@/context/GameContext";
import { getRandomSymbol } from "@/lib/getRandomSymbol";
import { emojiMap } from "@/lib/emojiMap";

export const SlotDisplay = () => {
  const { symbols } = useGame();
  const [displayedSymbols, setDisplayedSymbols] = useState<string[]>(["❓", "❓", "❓"]);

  useEffect(() => {
    if (!symbols.length) return;

    const totalSpins = 6;
    const intervalTime = 350;

    symbols.forEach((finalSymbol, index) => {
      let spinCount = 0;
      const delay = index * 600;

      setTimeout(() => {
        const interval = setInterval(() => {
          const random = getRandomSymbol();
          setDisplayedSymbols((prev) => {
            const copy = [...prev];
            copy[index] = emojiMap[random];
            return copy;
          });

          spinCount++;
          if (spinCount >= totalSpins) {
            clearInterval(interval);
            setDisplayedSymbols((prev) => {
              const copy = [...prev];
              copy[index] = emojiMap[finalSymbol];
              return copy;
            });
          }
        }, intervalTime);
      }, delay);
    });
  }, [symbols]);

  return (
    <div className="flex justify-center gap-4 mt-4">
      {displayedSymbols.map((symbol, index) => (
        <div
          key={index}
          className="w-24 h-24 text-5xl bg-white border-4 border-orange-300 rounded-xl flex items-center justify-center shadow-lg transition-all duration-300 select-none"
        >
          {symbol}
        </div>
      ))}
    </div>
  );
};
