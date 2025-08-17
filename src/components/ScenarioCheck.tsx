"use client";
import { useEffect, useMemo, useState } from "react";

type ScenarioLabels = {
  grab?: string;
  awareness?: string;
  releaseRate?: string;
  metric?: string;
  goal?: string;
};

export type ScenarioConfig = {
  enabled: boolean;
  threshold?: number;
  labels?: ScenarioLabels;
};

type Props = { conceptId: string; config?: ScenarioConfig };

function clamp(n: number, a = 0, b = 100) {
  return Math.max(a, Math.min(b, n));
}

export default function ScenarioCheck({ conceptId, config }: Props) {
  // Controls (kept generic; labels configurable)
  const [grab, setGrab] = useState(60); // subjective grasping / clamp intensity
  const [awareness, setAwareness] = useState(20); // attentional slack
  const [releaseRate, setReleaseRate] = useState(20); // %/min
  const [secondsStable, setSecondsStable] = useState(0);
  const goalSeconds = 5;

  const defaultThreshold =
    conceptId === "latch-bridge" || conceptId === "lhh" ? 55 : 60;

  const latchThreshold = config?.threshold ?? defaultThreshold;

  const netTension = useMemo(() => {
    const awarenessFactor = 1 - awareness / 100;
    const released = (releaseRate / 100) * grab;
    return clamp(grab * awarenessFactor - released, 0, 100);
  }, [grab, awareness, releaseRate]);

  const defaultGoal =
    conceptId === "tanha"
      ? "Reduce the grab below the threshold and keep it there"
      : conceptId === "latch-bridge" || conceptId === "lhh"
      ? "Unlatch: drop below latch threshold and hold"
      : "Lower net tension below threshold and hold";

  const labels: Required<ScenarioLabels> = {
    grab: config?.labels?.grab ?? (conceptId === "tanha" ? "Grab intensity" : "Clamp intensity"),
    awareness: config?.labels?.awareness ?? "Awareness / slack",
    releaseRate: config?.labels?.releaseRate ?? "Release rate",
    metric: config?.labels?.metric ?? "Net tension",
    goal: config?.labels?.goal ?? defaultGoal
  } as Required<ScenarioLabels>;

  useEffect(() => {
    let id: any;
    if (netTension < latchThreshold) {
      id = setInterval(() => setSecondsStable((s) => s + 1), 1000);
    } else {
      setSecondsStable(0);
    }
    return () => id && clearInterval(id);
  }, [netTension, latchThreshold]);

  const [won, setWon] = useState(false);
  useEffect(() => {
    if (!won && secondsStable >= goalSeconds) {
      setWon(true);
      (window as any).__vcQuizWin?.();
      if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        try {
          const el = document.createElement("div");
          el.className = "confetti";
          document.body.appendChild(el);
          setTimeout(() => el.remove(), 1200);
        } catch {}
      }
    }
  }, [secondsStable, won]);

  return (
    <div className="space-y-4">
      <div className="rounded border border-slate-700/70 bg-slate-900/40 p-4">
        <div className="mb-2 text-slate-300">{labels.goal}</div>
        <div className="relative h-3 w-full rounded bg-slate-800">
          <div className="h-full rounded bg-fuchsia-500 transition-[width]" style={{ width: `${netTension}%` }} />
          <div className="absolute inset-y-0" style={{ left: `${latchThreshold}%` }}>
            <div className="h-full w-px border-l border-dashed border-sky-300" />
          </div>
        </div>
        <div className="mt-1 text-xs text-slate-400">
          {labels.metric}: {netTension.toFixed(0)} / 100 — hold under {latchThreshold} for {goalSeconds}s
          {secondsStable > 0 && ` (hold: ${secondsStable}s)`}
        </div>
      </div>

      {/* Controls */}
      <div className="grid gap-4 md:grid-cols-3">
        <div>
          <label className="block text-xs text-slate-400">{labels.grab}</label>
          <input type="range" min={0} max={100} value={grab} onChange={(e) => setGrab(+e.target.value)} />
          <div className="text-xs text-slate-300">{grab}</div>
        </div>
        <div>
          <label className="block text-xs text-slate-400">{labels.awareness}</label>
          <input type="range" min={0} max={100} value={awareness} onChange={(e) => setAwareness(+e.target.value)} />
          <div className="text-xs text-slate-300">{awareness}%</div>
        </div>
        <div>
          <label className="block text-xs text-slate-400">{labels.releaseRate}</label>
          <input type="range" min={0} max={100} value={releaseRate} onChange={(e) => setReleaseRate(+e.target.value)} />
          <div className="text-xs text-slate-300">{releaseRate}%/min</div>
        </div>
      </div>

      {/* Success banner */}
      <div
        aria-live="polite"
        className={`rounded border p-3 text-sm transition ${
          won
            ? "border-emerald-600/40 bg-emerald-600/10 text-emerald-200"
            : "border-slate-700/60 bg-slate-900/40 text-slate-300"
        }`}
      >
        {won ? "You widened the repertoire—nice. XP awarded." : "Adjust controls to meet the goal and hold it."}
      </div>
    </div>
  );
}