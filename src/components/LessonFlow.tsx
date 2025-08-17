"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { Concept } from "@/lib/concepts";
import { ConceptDiagram } from "@/components/Diagrams";
import ScenarioCheck from "@/components/ScenarioCheck";
import Exercise from "@/components/Exercise";
import SectionCard from "@/components/SectionCard";
import Link from "next/link";

type Props = { concept: Concept };

export default function LessonFlow({ concept }: Props) {
  const railRef = useRef<HTMLDivElement | null>(null);

  const steps = useMemo(() => {
    const base: { id: string; label: string }[] = [
      { id: "hook", label: "Overview" },
      { id: "experience", label: "Felt experience" },
      { id: "mechanism", label: "Mechanism" },
    ];
    if ((concept.scenario?.enabled ?? false)) {
      base.push({ id: "check", label: "Scenario check" });
    }
    base.push({ id: "refs", label: "Connections & sources" });
    return base;
  }, [concept]);

  const [active, setActive] = useState(steps[0].id);

  // Scroll spy to highlight active step in left rail
  useEffect(() => {
    const ids = steps.map((s) => s.id);
    const observers: IntersectionObserver[] = [];
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const ob = new IntersectionObserver(
        (e) => {
          if (e[0].isIntersecting) setActive(id);
        },
        { threshold: 0.5 }
      );
      ob.observe(el);
      observers.push(ob);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, [steps]);

  // Top progress bar updater
  useEffect(() => {
    const handler = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      const progress = Math.min(1, Math.max(0, doc.scrollTop / Math.max(1, max)));
      document.documentElement.style.setProperty("--flow-progress", `${progress * 100}%`);
    };
    handler();
    document.addEventListener("scroll", handler, { passive: true });
    return () => document.removeEventListener("scroll", handler);
  }, []);

  return (
    <div className="grid gap-6 lg:grid-cols-[240px_1fr]">
      {/* Left rail */}
      <aside ref={railRef} className="hidden lg:block">
        <nav className="sticky top-20 space-y-2">
          {steps.map((s, i) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className={`block rounded px-3 py-2 text-sm transition ${
                active === s.id
                  ? "bg-sky-600 text-white shadow-[var(--shadow-glow)]"
                  : "bg-slate-800/70 text-slate-300 hover:bg-slate-800"
              }`}
            >
              {i + 1}. {s.label}
            </a>
          ))}
        </nav>
      </aside>

      {/* Flow content */}
      <div className="space-y-8">
        {/* Hook */}
        <section id="hook" className="card p-6 animate-flow-in">
          <h1 className="mb-1 text-2xl font-bold">{concept.title}</h1>
          <p className="text-slate-300">{concept.short}</p>
          {concept.eli5 && (
            <details className="mt-4 group">
              <summary className="cursor-pointer select-none rounded border border-sky-700/40 bg-sky-900/10 px-3 py-2 text-sm text-sky-300 hover:bg-sky-900/20">
                ELI5 — simple story
              </summary>
              <p className="mt-2 rounded-lg border border-slate-800 bg-slate-900/50 p-3 text-[15px] leading-6 text-slate-200">
                {concept.eli5}
              </p>
            </details>
          )}
        </section>

        {/* Felt experience */}
        <section id="experience" className="card p-6 animate-flow-in">
          <h2 className="mb-2 text-xl font-semibold">Felt experience</h2>
          <p className="text-slate-300">
            What does this concept feel like in the body and behavior? Read, notice, then try.
          </p>
          <div className="mt-4 space-y-3">
            {(concept.sections ?? []).slice(0, 2).map((s) => (
              <SectionCard key={s.id} conceptId={concept.id} section={s} />
            ))}
          </div>
        </section>

        {/* Mechanism */}
        <section id="mechanism" className="card p-6 animate-flow-in">
          <h2 className="mb-3 text-xl font-semibold">Mechanism</h2>
          {concept.hasDiagram && (
            <div className="rounded-lg border border-slate-800 bg-slate-900/40 p-4">
              <ConceptDiagram id={concept.id} />
              <p className="mt-2 text-xs text-slate-400">
                Minimal diagram: before → during → after, with thresholds where relevant.
              </p>
            </div>
          )}
          {(concept.sections ?? []).slice(2).length > 0 && (
            <div className="mt-4 space-y-3">
              {(concept.sections ?? []).slice(2).map((s) => (
                <SectionCard key={s.id} conceptId={concept.id} section={s} />
              ))}
            </div>
          )}
        </section>

        {/* Try it */}
        {(concept.exercises?.length ?? 0) > 0 && (
          <section id="try" className="card p-6 animate-flow-in">
            <h2 className="mb-3 text-xl font-semibold">Try it</h2>
            <div className="space-y-3">
              {concept.exercises!.map((ex) => (
                <Exercise key={ex.id} conceptId={concept.id} exercise={ex} />
              ))}
            </div>
          </section>
        )}

        {/* Scenario check (opt-in) */}
        {(concept.scenario?.enabled ?? false) && (
          <section id="check" className="card p-6 animate-flow-in">
            <h2 className="mb-2 text-xl font-semibold">Scenario check</h2>
            <p className="mb-4 text-slate-300">
              Practice with a tiny, realistic scenario. Meet the goal to earn XP.
            </p>
            <ScenarioCheck conceptId={concept.id} config={concept.scenario} />
          </section>
        )}

        {/* Connections & sources (id fixed to #refs for deep-linking) */}
        <section id="refs" className="card p-6 animate-flow-in">
          <h2 className="mb-3 text-xl font-semibold">Connections & sources</h2>
          {concept.connections && concept.connections.length > 0 && (
            <div className="mb-4 space-y-1">
              {concept.connections.map((c) => (
                <div key={c.id} className="text-slate-300">
                  → <Link className="underline" href={`/learn/${c.id}`}>{c.id}</Link>{" "}
                  <span className="text-slate-500">— {c.relation}</span>
                </div>
              ))}
            </div>
          )}
          {concept.references?.length ? (
            <ul className="list-disc pl-5 text-slate-300">
              {concept.references.map((r) => (
                <li key={r.url}>
                  <a className="underline" href={r.url} target="_blank" rel="noreferrer">{r.title}</a>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-slate-400">No sources listed yet.</p>
          )}
        </section>
      </div>
    </div>
  );
}