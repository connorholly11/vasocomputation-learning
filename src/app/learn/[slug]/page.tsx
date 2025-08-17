"use client";
import { useParams, useRouter } from "next/navigation";
import { concepts, getLessonOrder } from "@/lib/concepts";
import { useProgress } from "@/components/ProgressProvider";
import Quiz from "@/components/Quiz";
import SectionCard from "@/components/SectionCard";
import Exercise from "@/components/Exercise";
import { ConceptDiagram } from "@/components/Diagrams";
import Link from "next/link";
import { useState } from "react";
import Stepper from "@/components/Stepper";

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
      <div className="not-prose mb-6">
        <Stepper currentId={slug} />
      </div>
      <article className="prose prose-invert max-w-none prose-headings:scroll-mt-24 prose-p:leading-relaxed">
        <h1 className="mb-1">{concept.title}</h1>
        <p className="text-slate-300">{concept.short}</p>
        
        {/* Mode toggle controls */}
        <div className="not-prose mb-4 flex flex-wrap gap-2">
          <button 
            className={`btn ${mode === "eli5" ? "bg-sky-600 text-white" : ""}`}
            onClick={() => setMode("eli5")}
          >
            ELI5
          </button>
          <button 
            className={`btn ${mode === "deep" ? "bg-sky-600 text-white" : ""}`}
            onClick={() => setMode("deep")}
          >
            Deep-dive
          </button>
          <button 
            className={`btn ${mode === "standard" ? "bg-sky-600 text-white" : ""}`}
            onClick={() => setMode("standard")}
          >
            Standard
          </button>
        </div>

        {/* Mode-specific content */}
        {mode !== "standard" && (
          <div className="not-prose card p-4 text-slate-300 mb-6">
            {mode === "eli5"
              ? (concept.eli5 ?? "No ELI5 for this lesson yet.")
              : (concept.deep ?? "No deep-dive yet.")}
          </div>
        )}

        {/* Main content */}
        <div className="not-prose card my-6 p-6">
          <p className="whitespace-pre-wrap text-slate-200">{concept.long}</p>
        </div>

        {/* Diagram */}
        {concept.hasDiagram && (
          <div className="not-prose card my-6 p-6">
            <h3 className="mb-4 font-semibold">Visual Overview</h3>
            <ConceptDiagram id={concept.id} />
          </div>
        )}

        {/* Sections */}
        {concept.sections && concept.sections.length > 0 && (
          <div className="not-prose my-6">
            <h3 className="mb-4 font-semibold">Explore Further</h3>
            <div className="space-y-4">
              {concept.sections.map((section) => (
                <SectionCard key={section.id} conceptId={concept.id} section={section} />
              ))}
            </div>
          </div>
        )}

        {/* Exercises */}
        {concept.exercises && concept.exercises.length > 0 && (
          <div className="not-prose my-6">
            <h3 className="mb-4 font-semibold">Practice & Reflection</h3>
            <div className="space-y-4">
              {concept.exercises.map((exercise) => (
                <Exercise key={exercise.id} conceptId={concept.id} exercise={exercise} />
              ))}
            </div>
          </div>
        )}

        {/* Connections */}
        {concept.connections && concept.connections.length > 0 && (
          <div className="not-prose card my-6 p-6">
            <h3 className="mb-4 font-semibold">Connections</h3>
            <div className="space-y-2">
              {concept.connections.map((conn) => (
                <div key={conn.id} className="flex items-center gap-2 text-slate-300">
                  <Link 
                    href={`/learn/${conn.id}`}
                    className="text-sky-400 hover:text-sky-300 underline"
                  >
                    {concepts[conn.id]?.title || conn.id}
                  </Link>
                  <span className="text-slate-500">—</span>
                  <span className="text-sm">{conn.relation}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Applications */}
        {concept.applications && concept.applications.length > 0 && (
          <div className="not-prose card my-6 p-6">
            <h3 className="mb-4 font-semibold">Applications</h3>
            <ul className="space-y-1 text-slate-300">
              {concept.applications.map((app, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full flex-shrink-0"></span>
                  {app}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Quiz */}
        {concept.quiz && (
          <div className="not-prose card my-6 p-6">
            <h3 className="mb-2 font-semibold">Quick Check</h3>
            <Quiz {...concept.quiz} />
          </div>
        )}

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
          <Link className="btn" href="/map">See on concept map</Link>
        </div>

        {/* Navigation */}
        <nav className="not-prose mt-10 flex items-center justify-between text-sm">
          <div>
            {prev && (
              <button className="btn" onClick={() => router.push(`/learn/${prev}`)}>
                ← {concepts[prev].title}
              </button>
            )}
          </div>
          <div>
            {next && (
              <button className="btn" onClick={() => router.push(`/learn/${next}`)}>
                {concepts[next].title} →
              </button>
            )}
          </div>
        </nav>

        {/* References */}
        {concept.references?.length > 0 && (
          <section id="refs" className="not-prose card mt-10 p-6">
            <h3 className="mb-2 font-semibold">References</h3>
            <ul className="list-disc pl-5 text-slate-300">
              {concept.references.map((r) => (
                <li key={r.url}>
                  <a className="underline" href={r.url} target="_blank" rel="noreferrer">
                    {r.title}
                  </a>
                </li>
              ))}
            </ul>
          </section>
        )}
      </article>
    </>
  );
}