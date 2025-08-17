"use client";
import { useParams, useRouter } from "next/navigation";
import { concepts, getLessonOrder } from "@/lib/concepts";
import { useProgress } from "@/components/ProgressProvider";
import Link from "next/link";
import { useState } from "react";
import Stepper from "@/components/Stepper";
import LessonFlow from "@/components/LessonFlow";

export default function LessonPage() {
  const [mode, setMode] = useState<"eli5" | "deep" | "standard">("standard");
  const { slug } = useParams() as { slug: string };
  const concept = concepts[slug];
  const { markComplete, completed } = useProgress();
  const router = useRouter();

  if (!concept) {
    return <p className="text-slate-300">Unknown lesson.</p>;
  }

  const order = getLessonOrder();
  const idx = order.findIndex((id) => id === slug);
  const prev = order[idx - 1];
  const next = order[idx + 1];

  return (
    <>
      {/* subtle top progress bar */}
      <div className="fixed left-0 right-0 top-0 z-[60] h-0.5 bg-slate-800">
        <div
          className="h-full bg-sky-500 transition-[width]"
          style={{ width: "var(--flow-progress, 0%)" }}
        />
      </div>

      <div className="not-prose mb-6">
        <Stepper currentId={slug} />
      </div>

      <LessonFlow concept={concept} />

      {/* Actions */}
      <div className="not-prose my-6 flex flex-wrap gap-3">
        <button
          className="btn"
          onClick={() => markComplete(concept.id)}
          disabled={completed.has(concept.id)}
          aria-disabled={completed.has(concept.id)}
        >
          {completed.has(concept.id) ? "Completed ✓" : "Mark complete"}
        </button>
        <Link className="btn" href="/map">
          See on concept map
        </Link>
      </div>

      {/* Navigation */}
      <nav className="not-prose mt-10 flex items-center justify-between text-sm">
        <div>
          {prev && (
            <button className="btn" onClick={() => router.push(`/learn/${prev}`, { scroll: false })}>
              ← {concepts[prev].title}
            </button>
          )}
        </div>
        <div>
          {next && (
            <button className="btn" onClick={() => router.push(`/learn/${next}`, { scroll: false })}>
              {concepts[next].title} →
            </button>
          )}
        </div>
      </nav>
    </>
  );
}