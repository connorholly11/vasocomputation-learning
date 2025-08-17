"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useProgress } from "@/components/ProgressProvider";
import ConceptGraph from "@/components/ConceptGraph";
import PlaygroundMini from "@/components/PlaygroundMini";

export default function Home() {
  const { xp, completed } = useProgress();
  const router = useRouter();

  return (
    <section className="relative">
      <div className="pointer-events-none absolute inset-0 [background-image:radial-gradient(#1f2937_1px,transparent_1px)] [background-size:24px_24px] opacity-20" />
      <div className="grid gap-6 md:grid-cols-2">
        {/* Top-left: Hero & guidance */}
        <div className="card p-8">
          <h1 className="mb-3 text-3xl font-bold">Vasocomputation 101</h1>
          <p className="mb-6 text-slate-300">
            Understand how predictions might be held as patterns of vascular tension,
            why that can "latch," and how it links to experience.
          </p>

          <div className="mb-4 grid gap-2 text-slate-300">
            <div>1) <strong>Start Learning</strong> — short lessons with quizzes.</div>
            <div>2) <strong>Explore the Map</strong> — see how ideas depend on each other.</div>
            <div>3) <strong>Play</strong> — tweak variables to build intuition.</div>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link className="btn" href="/learn">Start learning</Link>
            <Link className="btn" href="/map">Open full map</Link>
            <Link className="btn" href="/playground">Open playground</Link>
          </div>

          <div className="mt-8 flex items-center gap-3">
            <span className="badge">Progress</span>
            <div className="h-2 w-56 overflow-hidden rounded bg-slate-800">
              <div
                className="h-full bg-sky-500 transition-all"
                style={{ width: `${Math.min(100, (completed.size / 10) * 100)}%` }}
              />
            </div>
            <span className="text-slate-300">{xp} XP</span>
          </div>
        </div>

        {/* Top-right: Map preview (click a node to jump to its lesson) */}
        <div className="card p-4">
          <div className="mb-2 flex items-center justify-between">
            <h2 className="font-semibold">Concept Map (preview)</h2>
            <Link className="text-sm underline" href="/map">Explore →</Link>
          </div>
          <div className="h-[340px]">
            <ConceptGraph
              selected="vasocomputation"
              onSelect={(id) => router.push(`/learn/${id}`)}
              height={320}
            />
          </div>
          <p className="mt-2 text-xs text-slate-400">
            Tip: Click a node to open its lesson.
          </p>
        </div>

        {/* Bottom-left: Fast lane to lessons */}
        <div className="card p-6">
          <h2 className="mb-2 font-semibold">Learn (quick start)</h2>
          <ul className="space-y-2 text-slate-300">
            <li>• <Link className="underline" href="/learn/tanha">Taṇhā</Link> — the quick "grab."</li>
            <li>• <Link className="underline" href="/learn/active-inference">Active Inference</Link> — predictions as actions.</li>
            <li>• <Link className="underline" href="/learn/latch-bridge">Latch‑bridge</Link> — holding tension.</li>
            <li>• <Link className="underline" href="/learn/vasocomputation">Vasocomputation</Link> — the synthesis.</li>
          </ul>
          <p className="mt-4 text-xs text-slate-400">
            Prefer a structured path? Use the <Link className="underline" href="/learn">Learn</Link> page.
          </p>
        </div>

        {/* Bottom-right: Mini Playground */}
        <div className="card p-4">
          <div className="mb-2 flex items-center justify-between">
            <h2 className="font-semibold">Playground (mini)</h2>
            <Link className="text-sm underline" href="/playground">Open full →</Link>
          </div>
          <PlaygroundMini />
          <p className="mt-2 text-xs text-slate-400">
            Idea: more predictions + less control → more tension → higher latch risk.
          </p>
        </div>
      </div>
    </section>
  );
}