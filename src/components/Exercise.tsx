"use client";
import { useEffect, useState } from "react";

export type ExerciseModel = {
  id: string;
  type: "reflect" | "thought" | "mini";
  prompt: string;
  details?: string;
};

export default function Exercise({
  conceptId,
  exercise,
}: {
  conceptId: string;
  exercise: ExerciseModel;
}) {
  const key = `vc-ex-${conceptId}-${exercise.id}`;
  const [value, setValue] = useState("");

  useEffect(() => {
    const raw = localStorage.getItem(key);
    if (raw) setValue(raw);
  }, [key]);

  useEffect(() => {
    localStorage.setItem(key, value);
  }, [key, value]);

  if (exercise.type === "reflect") {
    return (
      <div className="rounded-lg border border-slate-700 p-4">
        <p className="mb-2 text-slate-200"><strong>Reflection:</strong> {exercise.prompt}</p>
        <textarea
          className="w-full rounded border border-slate-700 bg-transparent p-2"
          rows={4}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Write a few sentences..."
        />
        {exercise.details && <p className="mt-2 text-xs text-slate-400">{exercise.details}</p>}
      </div>
    );
  }

  if (exercise.type === "thought") {
    return (
      <div className="rounded-lg border border-slate-700 p-4">
        <p className="text-slate-200"><strong>Thought experiment:</strong> {exercise.prompt}</p>
        {exercise.details && <p className="mt-2 text-xs text-slate-400">{exercise.details}</p>}
      </div>
    );
  }

  // mini (checkbox checklist)
  return (
    <div className="rounded-lg border border-slate-700 p-4">
      <p className="text-slate-200"><strong>Try it:</strong> {exercise.prompt}</p>
      <label className="mt-2 flex items-center gap-2 text-sm text-slate-300">
        <input type="checkbox" checked={value === "done"} onChange={(e) => setValue(e.target.checked ? "done" : "")} />
        I did this
      </label>
      {exercise.details && <p className="mt-2 text-xs text-slate-400">{exercise.details}</p>}
    </div>
  );
}