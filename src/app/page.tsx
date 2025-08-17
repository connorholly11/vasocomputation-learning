"use client";
import Link from "next/link";
import { useProgress } from "@/components/ProgressProvider";

export default function Home() {
  const { xp, completed } = useProgress();
  return (
    <section className="grid gap-10 md:grid-cols-[1.2fr_.8fr]">
      <div className="card p-8">
        <h1 className="mb-3 text-3xl font-bold">Vasocomputation 101</h1>
        <p className="mb-6 text-slate-300">
          A guided, interactive introduction to Michael Edward Johnson's
          <span className="px-1 font-semibold"> vasocomputation</span>—how
          predictions, vascular tension, and smooth muscle "latches" might
          shape experience and behavior.
        </p>
        <div className="flex gap-3">
          <Link className="btn" href="/learn">Start learning</Link>
          <Link className="btn" href="/map">Explore the map</Link>
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
      <div className="card p-6">
        <h2 className="mb-2 font-semibold">What you'll learn</h2>
        <ul className="space-y-2 text-slate-300">
          <li>• *Taṇhā* as a "grabby" reflex and why it matters</li>
          <li>• Active Inference / Free Energy basics</li>
          <li>• Resonant modes (SOHMs) as "where patterns live"</li>
          <li>• Hemo‑Neural Hypothesis (blood flow ↔ neural activity)</li>
          <li>• Smooth muscle "latch‑bridge" mechanism</li>
          <li>• CVH / VCH / LHH → Vasocomputation</li>
        </ul>
        <p className="mt-4 text-xs text-slate-400">
          Names occasionally seen: "vasocomputation," sometimes misspelled
          "Vasco computation." We use the former throughout.
        </p>
      </div>
    </section>
  );
}