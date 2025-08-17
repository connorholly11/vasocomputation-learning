"use client";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

type Ctx = {
  completed: Set<string>;
  markComplete: (id: string) => void;
  xp: number;
};

const ProgressContext = createContext<Ctx | null>(null);
const KEY = "vc-progress-v1";

export function ProgressProvider({ children }: { children: React.ReactNode }) {
  const [completed, setCompleted] = useState<Set<string>>(new Set());
  const [quizWins, setQuizWins] = useState<number>(0);

  useEffect(() => {
    const raw = localStorage.getItem(KEY);
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        setCompleted(new Set<string>(parsed.completed ?? []));
        setQuizWins(parsed.quizWins ?? 0);
      } catch {}
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      KEY,
      JSON.stringify({ completed: Array.from(completed), quizWins })
    );
  }, [completed, quizWins]);

  const markComplete = (id: string) =>
    setCompleted((prev) => new Set<string>(prev).add(id));

  const xp = useMemo(
    () => completed.size * 10 + quizWins * 5,
    [completed.size, quizWins]
  );

  const value = useMemo(
    () => ({ completed, markComplete, xp }),
    [completed, xp]
  );

  // expose quiz win increment to children via global window (keeps API simple):
  useEffect(() => {
    (window as any).__vcQuizWin = () => setQuizWins((n) => n + 1);
  }, []);

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>;
}

export function useProgress() {
  const ctx = useContext(ProgressContext);
  if (!ctx) throw new Error("useProgress must be used within ProgressProvider");
  return ctx;
}