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
    if (!sessionId) return;
    setIsLoading(true);
    const res = await fetch("/api/roll", {
      method: "POST",
      body: JSON.stringify({ sessionId }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    setCredits(data.credits);
    setRolls((prev) => prev + 1);
    setResult(data.result);
    setReward(data.reward);
    setIsWin(data.isWin);
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
