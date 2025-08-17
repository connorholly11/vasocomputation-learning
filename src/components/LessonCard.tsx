"use client";
import { useProgress } from "./ProgressProvider";
import { LessonMeta } from "@/lib/concepts";
import clsx from "clsx";

export default function LessonCard({ lesson }: { lesson: LessonMeta }) {
  const { completed } = useProgress();
  const done = completed.has(lesson.id);

  return (
    <div className={clsx("card group h-full p-5 transition", done && "outline outline-1 outline-sky-700/40")}>
      <div className="mb-2 flex items-center justify-between">
        <h3 className="font-semibold">{lesson.title}</h3>
        <span className="badge">{lesson.minutes} min</span>
      </div>
      <p className="line-clamp-3 text-slate-300">{lesson.summary}</p>
      <div className="mt-4 flex items-center justify-between text-sm">
        <span className={clsx("rounded px-2 py-0.5", done ? "bg-emerald-600/20 text-emerald-300" : "bg-slate-700/30 text-slate-300")}>
          {done ? "Completed ✓" : "Not started"}
        </span>
        <span className="text-slate-400 group-hover:text-slate-200">Open →</span>
      </div>
    </div>
  );
}