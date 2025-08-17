"use client";
import { concepts, getLessonOrder } from "@/lib/concepts";
import { useProgress } from "./ProgressProvider";
import Link from "next/link";

export default function Stepper({ currentId }: { currentId: string }) {
  const { completed } = useProgress();
  const order = getLessonOrder();
  
  return (
    <div className="flex gap-2 overflow-x-auto pb-2">
      {order.map((id, idx) => (
        <Link
          key={id}
          href={`/learn/${id}`}
          scroll={false}
          className={`flex-shrink-0 rounded px-3 py-1 text-sm ${
            id === currentId
              ? "bg-sky-600 text-white"
              : completed.has(id)
              ? "bg-emerald-600/20 text-emerald-300"
              : "bg-slate-800 text-slate-400"
          }`}
        >
          {idx + 1}. {concepts[id].title}
        </Link>
      ))}
    </div>
  );
}