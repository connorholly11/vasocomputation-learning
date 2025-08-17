"use client";
import { useParams, useRouter } from "next/navigation";
import { concepts, getLessonOrder } from "@/lib/concepts";
import { useProgress } from "@/components/ProgressProvider";
import Quiz from "@/components/Quiz";
import Link from "next/link";

export default function LessonPage() {
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
    <article className="prose prose-invert max-w-none">
      <h1 className="mb-1">{concept.title}</h1>
      <p className="text-slate-300">{concept.short}</p>
      <div className="not-prose card my-6 p-6">
        <p className="whitespace-pre-wrap text-slate-200">{concept.long}</p>
      </div>

      {concept.quiz && (
        <div className="not-prose card my-6 p-6">
          <h3 className="mb-2 font-semibold">Quick check</h3>
          <Quiz {...concept.quiz} />
        </div>
      )}

      <div className="not-prose my-6 flex flex-wrap gap-3">
        <button
          className="btn"
          onClick={() => markComplete(concept.id)}
          disabled={completed.has(concept.id)}
          aria-disabled={completed.has(concept.id)}
        >
          {completed.has(concept.id) ? "Completed ✓" : "Mark complete"}
        </button>
        <Link className="btn" href="/map">See on concept map</Link>
      </div>

      <nav className="not-prose mt-10 flex items-center justify-between text-sm">
        <div>{prev && <button className="btn" onClick={() => router.push(`/learn/${prev}`)}>← {concepts[prev].title}</button>}</div>
        <div>{next && <button className="btn" onClick={() => router.push(`/learn/${next}`)}>{concepts[next].title} →</button>}</div>
      </nav>
    </article>
  );
}