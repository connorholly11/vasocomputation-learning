"use client";
import { useMemo, useState } from "react";

function clamp(n: number, a = 0, b = 100) {
  return Math.max(a, Math.min(b, n));
}

export default function PlaygroundMini() {
  const [predictionRate, setPredictionRate] = useState(40); // items/min
  const [controlAbility, setControlAbility] = useState(50); // %

  // toy formulas to illustrate ideas
  const tension = useMemo(() => clamp(predictionRate * (1 - controlAbility / 100)), [predictionRate, controlAbility]);
  const latchThreshold = 60;
  const latchRisk = useMemo(() => clamp((tension / latchThreshold) * 100, 0, 100), [tension, latchThreshold]);

  return (
    <div className="space-y-3">
      <div className="space-y-2">
        <div>
          <label className="block text-xs text-slate-400">Prediction rate</label>
          <input 
            type="range" 
            min={0} 
            max={120} 
            value={predictionRate} 
            onChange={(e) => setPredictionRate(+e.target.value)}
            className="w-full"
          />
          <div className="text-xs text-slate-300">{predictionRate} items/min</div>
        </div>
        <div>
          <label className="block text-xs text-slate-400">Control ability</label>
          <input 
            type="range" 
            min={0} 
            max={100} 
            value={controlAbility} 
            onChange={(e) => setControlAbility(+e.target.value)}
            className="w-full"
          />
          <div className="text-xs text-slate-300">{controlAbility}%</div>
        </div>
      </div>

      <div className="space-y-2">
        <div>
          <div className="mb-1 text-xs text-slate-300">Vascular tension</div>
          <div className="relative h-2 w-full rounded bg-slate-800">
            <div className="h-full rounded bg-sky-500 transition-all" style={{ width: `${tension}%` }} />
            <div className="absolute inset-y-0" style={{ left: `${latchThreshold}%` }}>
              <div className="h-full w-px border-l border-dashed border-fuchsia-400" />
            </div>
          </div>
          <div className="text-xs text-slate-400">{tension.toFixed(0)} / 100</div>
        </div>

        <div>
          <div className="mb-1 text-xs text-slate-300">Latch risk</div>
          <div className="h-2 w-full rounded bg-slate-800">
            <div className="h-full rounded bg-fuchsia-500 transition-all" style={{ width: `${latchRisk}%` }} />
          </div>
          <div className="text-xs text-slate-400">{latchRisk.toFixed(0)}%</div>
        </div>
      </div>
    </div>
  );
}