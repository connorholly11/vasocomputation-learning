"use client";
import { useState } from "react";

type Props = {
  question: string;
  options: string[];
  answerIndex: number;
  explain: string;
};

export default function Quiz({ question, options, answerIndex, explain }: Props) {
  const [picked, setPicked] = useState<number | null>(null);
  const [done, setDone] = useState(false);

  const onSubmit = () => {
    setDone(true);
    if (picked === answerIndex) (window as any).__vcQuizWin?.();
  };

  return (
    <div>
      <p className="mb-3 text-slate-200">{question}</p>
      <div className="space-y-2">
        {options.map((opt, i) => (
          <label key={i} className="flex cursor-pointer items-center gap-2 rounded border border-slate-700 p-2 hover:bg-slate-800">
            <input
              type="radio"
              name="quiz"
              checked={picked === i}
              onChange={() => setPicked(i)}
            />
            <span>{opt}</span>
          </label>
        ))}
      </div>
      <button className="btn mt-3" onClick={onSubmit} disabled={picked === null || done}>
        {done ? "Submitted ✓" : "Submit"}
      </button>
      {done && (
        <p className="mt-3 text-sm text-slate-300">
          {picked === answerIndex ? "Correct! " : "Not quite. "}
          {explain}
        </p>
      )}
    </div>
  );
}