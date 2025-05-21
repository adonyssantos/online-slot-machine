"use client";

import { createContext, useContext, useState, ReactNode } from "react";

export type GameContextType = {
  sessionId: string | null;
  credits: number;
  rolls: number;
  isLoading: boolean;
  result: string[] | null;
  reward: number;
  isWin: boolean;
  symbols: string[];
  isRolling: boolean;
  resultMessage: string;

  startGame: () => Promise<void>;
  roll: () => Promise<void>;
  cashOut: () => Promise<number | null>;
};

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [credits, setCredits] = useState(0);
  const [rolls, setRolls] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<string[] | null>(null);
  const [reward, setReward] = useState(0);
  const [isWin, setIsWin] = useState(false);
  const [isRolling, setIsRolling] = useState(false);
  const [resultMessage, setResultMessage] = useState("");
  const [symbols, setSymbols] = useState<string[]>([]);

  const startGame = async () => {
    const res = await fetch("/api/start", { method: "POST" });
    const data = await res.json();
    setSessionId(data.sessionId);
    setCredits(data.credits);
    setRolls(0);
    setResult(null);
    setReward(0);
    setIsWin(false);
  };

  const roll = async () => {
    if (!sessionId || isRolling) return;

    setIsLoading(true);
    setIsRolling(true);
    setResultMessage("");

    const res = await fetch("/api/roll", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sessionId }),
    });

    const data = await res.json();

    setCredits(data.credits);
    setSymbols(data.result);
    setRolls((prev) => prev + 1);

    setTimeout(() => {
      const [a, b, c] = data.result;
      if (a === b && b === c) {
        setResultMessage(`🎉 You won ${data.reward} credits!`);
      } else {
        setResultMessage("😞 Try again!");
      }
    }, 3000);

    setIsRolling(false);
    setIsLoading(false);
  };

  const cashOut = async (): Promise<number | null> => {
    if (!sessionId) return null;
    const res = await fetch("/api/cashout", {
      method: "POST",
      body: JSON.stringify({ sessionId }),
      headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();

    if (res.ok) {
      setSessionId(null);
      setCredits(0);
      setRolls(0);
      return data.cashedOut;
    } else {
      console.warn(data.error);
      return null;
    }
  };

  return (
    <GameContext.Provider
      value={{
        sessionId,
        credits,
        rolls,
        isLoading,
        result,
        reward,
        isWin,
        symbols,
        isRolling,
        resultMessage,
        startGame,
        roll,
        cashOut,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error("useGame must be used within a GameProvider");
  }
  return context;
};
