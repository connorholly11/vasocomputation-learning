"use client";
import { useMemo, useState } from "react";

function clamp(n: number, a=0, b=100){ return Math.max(a, Math.min(b, n)); }

export default function Playground() {
  const [predictionRate, setPredictionRate] = useState(40); // items/min
  const [controlAbility, setControlAbility] = useState(50); // %
  const [duration, setDuration] = useState(20); // seconds sustained

  // toy formulas to illustrate ideas
  const tension = useMemo(() => clamp(predictionRate * (1 - controlAbility/100)), [predictionRate, controlAbility]);
  const latchRisk = useMemo(() => clamp((tension/100) * (duration/30) * 100), [tension, duration]);

  return (
    <section className="space-y-6">
      <h1 className="text-2xl font-bold">Tension & Latching Playground</h1>
      <p className="text-slate-300">
        This lightweight simulation illustrates how prediction load (unresolved "to‑make‑true" predictions) and
        control ability might increase tension, and how sustained tension can enter a low‑energy "latch" regime.
        It's a toy model to build intuition, not a physiological simulator.
      </p>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="card p-6 space-y-4">
          <div>
            <label className="block text-sm text-slate-400">Prediction generation rate</label>
            <input type="range" min={0} max={120} value={predictionRate} onChange={(e)=>setPredictionRate(+e.target.value)} />
            <div className="text-slate-300">{predictionRate} items/min</div>
          </div>
          <div>
            <label className="block text-sm text-slate-400">Ability to make predictions true (control / slack)</label>
            <input type="range" min={0} max={100} value={controlAbility} onChange={(e)=>setControlAbility(+e.target.value)} />
            <div className="text-slate-300">{controlAbility}%</div>
          </div>
          <div>
            <label className="block text-sm text-slate-400">Time holding tension</label>
            <input type="range" min={0} max={120} value={duration} onChange={(e)=>setDuration(+e.target.value)} />
            <div className="text-slate-300">{duration}s</div>
          </div>
        </div>

        <div className="card p-6">
          <h3 className="mb-2 font-semibold">Outputs</h3>
          <div className="mb-4">
            <div className="mb-1 text-slate-300">Vascular tension (proxy)</div>
            <div className="h-3 w-full rounded bg-slate-800">
              <div className="h-full rounded bg-sky-500 transition-all" style={{ width: `${tension}%` }} />
            </div>
            <div className="mt-1 text-sm text-slate-400">{tension.toFixed(0)} / 100</div>
          </div>

          <div className="mb-2">
            <div className="mb-1 text-slate-300">Latch likelihood (toy)</div>
            <div className="h-3 w-full rounded bg-slate-800">
              <div className="h-full rounded bg-fuchsia-500 transition-all" style={{ width: `${latchRisk}%` }} />
            </div>
            <div className="mt-1 text-sm text-slate-400">{latchRisk.toFixed(0)}%</div>
          </div>

          <p className="mt-4 text-xs text-slate-400">
            Inspiration: latch‑bridge mechanism in smooth muscle; hemo‑neural hypothesis; Active Inference's view of predictions as actions held until made true. See "Sources" for papers.
          </p>
        </div>
      </div>
    </section>
  );
}