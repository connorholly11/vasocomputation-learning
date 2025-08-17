"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { Concept } from "@/lib/concepts";
import { ConceptDiagram } from "@/components/Diagrams";
import ProgressiveScenario from "@/components/ProgressiveScenario";
import Exercise from "@/components/Exercise";
import SectionCard from "@/components/SectionCard";
import Link from "next/link";

type Props = { concept: Concept };

// Animation teaching notes for each concept
const animationNotes: Record<string, string> = {
  tanha: "Watch how the green zone pulses (breathing) - this shows the quick 25-100ms grab reflex that's reversible. The pink zone stays steady - once you hold too long, it latches and becomes sticky.",
  cvh: "The shape breathing shows compression pressure. The sweep line shows the direction of disambiguation. Notice how ambiguous patterns (left) get forced into specific interpretations (right).",
  vch: "The wave drifts freely, then the clamp slides in and the wave STOPS - this is the key insight. Vascular clamps literally freeze local neural patterns in place for medium-term storage.",
  lhh: "The moving marker shows time progression. Notice how force maintains with low ATP cost (the gradient band) - this is why latched patterns can persist for minutes to years with minimal energy.",
  "latch-bridge": "The moving marker shows time progression. Notice how force maintains with low ATP cost (the gradient band) - this is why latched patterns can persist for minutes to years with minimal energy.",
  "hemo-neural": "The flowing highlight shows blood flow affecting neural excitability. The dashed feedback line animates to show the bidirectional coupling - it's not just one-way nutrient delivery.",
  sohms: "The subtle drift of mode B shows these aren't static patterns but dynamic resonances. Real harmonic modes in the brain constantly shift and interact.",
  annealing: "The crossfade from jagged to smooth shows consolidation over time. This is how held patterns gradually reorganize into more harmonious, lower-energy configurations.",
  "active-inference": "This loop runs continuously: predictions drive actions, actions change sensations, sensations update predictions. Notice it's a closed loop - there's no 'start' or 'end', just continuous cycling to minimize surprise.",
  vasocomputation: "The three hypotheses form a cascade: CVH compresses ambiguity → VCH holds the result → LHH makes it persistent. Each circle represents a different timescale: CVH (milliseconds), VCH (seconds-minutes), LHH (minutes-years)."
};

// Helper to get concepts learned so far
function getPreviousConcepts(currentId: string): string[] {
  const order = ["tanha", "active-inference", "sohms", "hemo-neural", "latch-bridge", "cvh", "vch", "lhh", "annealing", "vasocomputation"];
  const currentIndex = order.indexOf(currentId);
  return currentIndex > 0 ? order.slice(0, currentIndex) : [];
}

// Building connections to previous concepts
function getConnectionText(conceptId: string): string | null {
  const connections: Record<string, string> = {
    "active-inference": "Taṇhā showed us the grab reflex. Active inference explains WHY we grab - we're trying to make predictions come true.",
    "sohms": "These resonant modes are what taṇhā grabs onto. They're the actual patterns that Active Inference tries to predict and control.",
    "hemo-neural": "SOHMs resonate in neural tissue, but blood flow directly modulates their activity. This coupling is how vascular changes affect computation.",
    "latch-bridge": "When taṇhā holds too long, this is the mechanism that engages. It's the physical basis for sticky predictions.",
    "cvh": "Remember how taṇhā tries to make things stable? CVH is HOW - by compressing ambiguous SOHMs into specific patterns.",
    "vch": "After CVH compresses a pattern, VCH can hold it in place. This is Active Inference's prediction storage mechanism.",
    "lhh": "When VCH holds a pattern long enough, the latch-bridge engages creating an LHH. This is how temporary predictions become persistent biases.",
    "annealing": "All those CVH compressions and VCH holds can create tension. Annealing is how the system reorganizes to reduce conflict between latched patterns.",
    "vasocomputation": "Now we see the full picture: taṇhā creates compressions (CVH) that get held (VCH) and can latch (LHH), storing Active Inference predictions in vascular tension affecting SOHMs via hemo-neural coupling."
  };
  
  return connections[conceptId] || null;
}

export default function LessonFlow({ concept }: Props) {
  const railRef = useRef<HTMLDivElement | null>(null);
  const previousConcepts = getPreviousConcepts(concept.id);
  const connectionText = getConnectionText(concept.id);

  const steps = useMemo(() => {
    const base: { id: string; label: string }[] = [
      { id: "hook", label: "Overview" },
    ];
    // Add "Building on" step if there are previous concepts
    if (connectionText) {
      base.push({ id: "building", label: "Building on..." });
    }
    base.push(
      { id: "experience", label: "Felt experience" },
      { id: "mechanism", label: "Mechanism" }
    );
    if ((concept.scenario?.enabled ?? false)) {
      base.push({ id: "check", label: concept.id === "vasocomputation" ? "Full integration" : "Interactive exploration" });
    }
    base.push({ id: "refs", label: "Connections & sources" });
    return base;
  }, [concept, connectionText]);

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

        {/* Building on previous concepts */}
        {connectionText && (
          <section id="building" className="card p-6 animate-flow-in">
            <h2 className="mb-3 text-xl font-semibold">Building on previous concepts</h2>
            <div className="rounded-lg border border-sky-600/30 bg-sky-600/10 p-4 mb-4">
              <p className="text-sm text-sky-200">{connectionText}</p>
            </div>
            {previousConcepts.length > 0 && (
              <div className="mt-4">
                <p className="text-xs text-slate-400 mb-2">Concepts you've learned so far:</p>
                <div className="flex flex-wrap gap-2">
                  {previousConcepts.map(id => (
                    <Link key={id} href={`/learn/${id}`} className="rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-300 hover:bg-slate-700">
                      {id}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </section>
        )}

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
              {animationNotes[concept.id] && (
                <div className="mt-3 rounded bg-slate-800/50 p-3">
                  <p className="text-xs text-slate-400">
                    <span className="text-sky-400 font-medium">What the animation teaches:</span> {animationNotes[concept.id]}
                  </p>
                </div>
              )}
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
            <h2 className="mb-2 text-xl font-semibold">
              {concept.id === "vasocomputation" ? "Full Integration" : "Interactive Exploration"}
            </h2>
            <p className="mb-4 text-slate-300">
              {concept.id === "vasocomputation" 
                ? "See how all three mechanisms (CVH, VCH, LHH) work together in real-time:"
                : concept.id === "lhh"
                ? "Build on the latch-bridge mechanism to see how hyperpriors form:"
                : concept.id === "latch-bridge"
                ? "Explore how the latch-bridge creates energy-efficient holding:"
                : "Experiment with the mechanism to build intuition:"}
            </p>
            <ProgressiveScenario 
              conceptId={concept.id} 
              config={concept.scenario}
              previousConcepts={previousConcepts}
            />
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