"use client";
import { useRef, useState } from "react";
import { useGame } from "@/context/GameContext";

export const CashOutButton = () => {
  const { cashOut, rolls } = useGame();
  const [disabled, setDisabled] = useState(false);
  const [style, setStyle] = useState({});
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleHover = () => {
    if (Math.random() < 0.5) {
      const offsetX = Math.floor(Math.random() * 300 - 150); // -150 a +150
      const offsetY = Math.floor(Math.random() * 300 - 150);

      setStyle({
        transform: `translate(${offsetX}px, ${offsetY}px)`,
        maxWidth: "100vw",
        maxHeight: "100vh",
        overflow: "hidden",
        position: "relative",
      });
    }

    if (Math.random() < 0.4) {
      setDisabled(true);
      setTimeout(() => setDisabled(false), 2000);
    }
  };

  const handleClick = async () => {
    const payout = await cashOut();
    if (payout !== null) {
      alert(`Cashed out with ${payout} credits 💸`);
    }
  };

  return (
    <button
      ref={buttonRef}
      onClick={handleClick}
      onMouseEnter={handleHover}
      disabled={disabled || rolls < 2}
      title={rolls < 2 ? "You need to roll at least twice!" : "Cash out!"}
      className="mt-6 px-6 py-3 rounded-xl bg-green-600 text-white font-semibold shadow-md hover:bg-green-700 disabled:opacity-50 transition-all duration-300"
      style={style}
    >
      Cash Out 💵
    </button>
  );
};
