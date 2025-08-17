"use client";
import { useEffect, useMemo, useState, useCallback } from "react";
import { ScenarioConfig } from "@/lib/concepts";

type Props = { 
  conceptId: string; 
  config?: ScenarioConfig;
  previousConcepts?: string[];
};

function clamp(n: number, a = 0, b = 100) {
  return Math.max(a, Math.min(b, n));
}

// Different scenario types that build on each other
function TanhaScenario() {
  const [grab, setGrab] = useState(60);
  const [awareness, setAwareness] = useState(20);
  const [pulseRate, setPulseRate] = useState(0);
  const [success, setSuccess] = useState(false);
  
  const tension = useMemo(() => {
    const base = grab * (1 - awareness/100);
    const pulse = Math.sin(Date.now() / 1000 * pulseRate) * 10;
    return clamp(base + pulse);
  }, [grab, awareness, pulseRate]);
  
  useEffect(() => {
    setSuccess(tension < 30 && grab < 40);
  }, [tension, grab]);
  
  return (
    <div className="space-y-4">
      <div className="rounded-lg border border-slate-700 bg-slate-900/50 p-4">
        <h4 className="mb-2 text-sm font-medium text-slate-200">
          Stage 1: Basic Grab Recognition
        </h4>
        <p className="mb-3 text-xs text-slate-400">
          Notice how the "grab" reflex creates tension. Can you release it before it latches?
        </p>
        
        {/* Visual feedback */}
        <div className="relative h-20 rounded bg-slate-800 overflow-hidden">
          <div className="absolute inset-y-0 left-0 bg-gradient-to-r from-emerald-500/20 to-transparent" 
               style={{width: '30%'}}>
            <div className="text-xs text-emerald-400 p-1">safe zone</div>
          </div>
          <div className="absolute inset-y-0 right-0 bg-gradient-to-l from-rose-500/20 to-transparent" 
               style={{width: '40%'}}>
            <div className="text-xs text-rose-400 p-1 text-right">latch risk</div>
          </div>
          <div className="absolute top-1/2 -translate-y-1/2 transition-all duration-300"
               style={{left: `${tension}%`}}>
            <div className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
          </div>
        </div>
        
        <div className="mt-2 text-xs text-slate-400">
          Tension: {tension.toFixed(0)}% | Target: &lt; 30%
        </div>
      </div>
      
      <div className="grid gap-3 md:grid-cols-3">
        <div>
          <label className="block text-xs text-slate-400 mb-1">Grab intensity (25-100ms reflex)</label>
          <input type="range" min={0} max={100} value={grab} 
                 onChange={(e) => setGrab(+e.target.value)}
                 className="w-full" />
          <div className="text-xs text-slate-300 mt-1">{grab}%</div>
        </div>
        <div>
          <label className="block text-xs text-slate-400 mb-1">Awareness (reduces grab)</label>
          <input type="range" min={0} max={100} value={awareness} 
                 onChange={(e) => setAwareness(+e.target.value)}
                 className="w-full" />
          <div className="text-xs text-slate-300 mt-1">{awareness}%</div>
        </div>
        <div>
          <label className="block text-xs text-slate-400 mb-1">Sensory pulse rate</label>
          <input type="range" min={0} max={5} step={0.5} value={pulseRate} 
                 onChange={(e) => setPulseRate(+e.target.value)}
                 className="w-full" />
          <div className="text-xs text-slate-300 mt-1">{pulseRate} Hz</div>
        </div>
      </div>
      
      {success && (
        <div className="rounded border border-emerald-600/40 bg-emerald-600/10 p-3 text-sm text-emerald-200">
          ✓ Released the grab before latching! The reflex is quick but reversible.
        </div>
      )}
    </div>
  );
}

function LatchBridgeScenario() {
  const [tension, setTension] = useState(70);
  const [holdTime, setHoldTime] = useState(0);
  const [latched, setLatched] = useState(false);
  const [atpCost, setAtpCost] = useState(100);
  const [success, setSuccess] = useState(false);
  
  useEffect(() => {
    const timer = setInterval(() => {
      if (tension > 60) {
        setHoldTime(t => t + 0.1);
        if (!latched && holdTime > 2) {
          setLatched(true);
        }
      } else {
        setHoldTime(0);
        if (latched && tension < 40) {
          setTimeout(() => setLatched(false), 1000);
        }
      }
      
      // ATP cost drops when latched
      setAtpCost(latched ? 20 : tension);
    }, 100);
    
    return () => clearInterval(timer);
  }, [tension, holdTime, latched]);
  
  useEffect(() => {
    setSuccess(latched && atpCost < 30);
  }, [latched, atpCost]);
  
  return (
    <div className="space-y-4">
      <div className="rounded-lg border border-slate-700 bg-slate-900/50 p-4">
        <h4 className="mb-2 text-sm font-medium text-slate-200">
          Stage 2: Latch-Bridge Efficiency
        </h4>
        <p className="mb-3 text-xs text-slate-400">
          Hold tension long enough to engage the latch. Notice how ATP cost drops while force maintains.
        </p>
        
        {/* Dual meters */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 w-16">Force:</span>
            <div className="flex-1 h-3 rounded bg-slate-800 relative">
              <div className="h-full rounded bg-fuchsia-500 transition-all" 
                   style={{width: `${tension}%`}} />
              {latched && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xs text-white font-medium">LATCHED</span>
                </div>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 w-16">ATP:</span>
            <div className="flex-1 h-3 rounded bg-slate-800">
              <div className="h-full rounded bg-amber-500 transition-all duration-1000" 
                   style={{width: `${atpCost}%`}} />
            </div>
          </div>
        </div>
        
        <div className="mt-2 text-xs text-slate-400">
          Hold time: {holdTime.toFixed(1)}s | Latch forms at 2s | Status: {latched ? 'Latched (low ATP!)' : 'Cycling'}
        </div>
      </div>
      
      <div className="grid gap-3 md:grid-cols-2">
        <div>
          <label className="block text-xs text-slate-400 mb-1">Muscle tension</label>
          <input type="range" min={0} max={100} value={tension} 
                 onChange={(e) => setTension(+e.target.value)}
                 className="w-full" />
          <div className="text-xs text-slate-300 mt-1">{tension}%</div>
        </div>
        <div className="text-xs text-slate-400">
          <div>• Hold above 60% for 2s to latch</div>
          <div>• Latch maintains force with ~80% less ATP</div>
          <div>• Drop below 40% to unlatch</div>
        </div>
      </div>
      
      {success && (
        <div className="rounded border border-emerald-600/40 bg-emerald-600/10 p-3 text-sm text-emerald-200">
          ✓ Latch engaged! Force maintained with minimal energy. This is how predictions persist.
        </div>
      )}
    </div>
  );
}

function LHHScenario() {
  const [priors, setPriors] = useState([
    { id: 'a', strength: 30, latched: false, age: 0 },
    { id: 'b', strength: 50, latched: false, age: 0 },
    { id: 'c', strength: 20, latched: false, age: 0 }
  ]);
  const [newInput, setNewInput] = useState(50);
  const [success, setSuccess] = useState(false);
  
  useEffect(() => {
    const timer = setInterval(() => {
      setPriors(prev => prev.map(p => {
        const newAge = p.latched ? p.age + 0.1 : 0;
        const shouldLatch = p.strength > 60 && !p.latched && newAge === 0;
        const shouldUnlatch = p.latched && p.strength < 30;
        
        return {
          ...p,
          latched: shouldLatch ? true : (shouldUnlatch ? false : p.latched),
          age: p.latched ? newAge : 0
        };
      }));
    }, 100);
    
    return () => clearInterval(timer);
  }, []);
  
  const biasedInterpretation = useMemo(() => {
    const latchedPriors = priors.filter(p => p.latched);
    if (latchedPriors.length === 0) return newInput;
    
    const totalBias = latchedPriors.reduce((sum, p) => sum + p.strength * Math.min(p.age, 10), 0);
    const maxBias = latchedPriors.length * 100 * 10;
    const biasFactor = totalBias / maxBias;
    
    return Math.round(newInput * (1 - biasFactor) + 50 * biasFactor);
  }, [priors, newInput]);
  
  useEffect(() => {
    const allLatched = priors.filter(p => p.latched).length >= 2;
    const interpreted = Math.abs(biasedInterpretation - 50) < 10;
    setSuccess(allLatched && interpreted);
  }, [priors, biasedInterpretation]);
  
  return (
    <div className="space-y-4">
      <div className="rounded-lg border border-slate-700 bg-slate-900/50 p-4">
        <h4 className="mb-2 text-sm font-medium text-slate-200">
          Stage 3: Latched Hyperpriors
        </h4>
        <p className="mb-3 text-xs text-slate-400">
          Multiple latched patterns create persistent biases. Watch how they affect new interpretations.
        </p>
        
        {/* Prior states */}
        <div className="space-y-2 mb-3">
          {priors.map((p, i) => (
            <div key={p.id} className="flex items-center gap-2">
              <span className="text-xs text-slate-400 w-20">Prior {p.id.toUpperCase()}:</span>
              <input type="range" min={0} max={100} value={p.strength}
                     onChange={(e) => setPriors(prev => {
                       const next = [...prev];
                       next[i].strength = +e.target.value;
                       return next;
                     })}
                     className="flex-1" />
              <div className="w-24 text-xs text-slate-300">
                {p.latched ? `Latched ${p.age.toFixed(1)}s` : `${p.strength}%`}
              </div>
            </div>
          ))}
        </div>
        
        {/* Interpretation bias */}
        <div className="border-t border-slate-700 pt-3">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs text-slate-400">New input:</span>
            <input type="range" min={0} max={100} value={newInput}
                   onChange={(e) => setNewInput(+e.target.value)}
                   className="flex-1" />
            <span className="text-xs text-slate-300">{newInput}</span>
          </div>
          <div className="text-xs text-slate-400">
            Raw: {newInput} → Interpreted: <span className="text-sky-400">{biasedInterpretation}</span>
            {Math.abs(biasedInterpretation - newInput) > 10 && (
              <span className="text-amber-400 ml-2">(biased by latched priors!)</span>
            )}
          </div>
        </div>
      </div>
      
      {success && (
        <div className="rounded border border-emerald-600/40 bg-emerald-600/10 p-3 text-sm text-emerald-200">
          ✓ Hyperpriors established! New inputs are now interpreted through these latched patterns.
        </div>
      )}
    </div>
  );
}

function VasocomputationIntegrated() {
  const [ambiguity, setAmbiguity] = useState(80);
  const [clampStrength, setClampStrength] = useState(0);
  const [latchEngaged, setLatchEngaged] = useState(false);
  const [holdTime, setHoldTime] = useState(0);
  const [systemFlexibility, setSystemFlexibility] = useState(100);
  const [success, setSuccess] = useState(false);
  
  // CVH: compression reduces ambiguity
  const compressed = useMemo(() => {
    return Math.max(20, ambiguity - clampStrength * 0.5);
  }, [ambiguity, clampStrength]);
  
  // VCH: clamping holds pattern
  useEffect(() => {
    const timer = setInterval(() => {
      if (clampStrength > 50) {
        setHoldTime(t => t + 0.1);
      } else {
        setHoldTime(0);
      }
      
      // LHH: latch engages after hold
      if (holdTime > 3 && !latchEngaged) {
        setLatchEngaged(true);
      } else if (clampStrength < 30 && latchEngaged) {
        setTimeout(() => setLatchEngaged(false), 2000);
      }
      
      // System flexibility decreases with compression and latching
      const flex = 100 - clampStrength * 0.3 - (latchEngaged ? 40 : 0);
      setSystemFlexibility(Math.max(10, flex));
    }, 100);
    
    return () => clearInterval(timer);
  }, [clampStrength, holdTime, latchEngaged]);
  
  useEffect(() => {
    setSuccess(compressed < 30 && !latchEngaged && systemFlexibility > 70);
  }, [compressed, latchEngaged, systemFlexibility]);
  
  return (
    <div className="space-y-4">
      <div className="rounded-lg border border-slate-700 bg-slate-900/50 p-4">
        <h4 className="mb-2 text-sm font-medium text-slate-200">
          Final Stage: Full Vasocomputation Integration
        </h4>
        <p className="mb-3 text-xs text-slate-400">
          All three mechanisms work together: CVH compresses ambiguity, VCH holds patterns, LHH creates lasting biases.
        </p>
        
        {/* Multi-dimensional visualization */}
        <div className="grid grid-cols-3 gap-2 mb-3">
          <div className="text-center">
            <div className="text-xs text-slate-400 mb-1">CVH: Compression</div>
            <div className="h-20 bg-slate-800 rounded relative overflow-hidden">
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-sky-500/30 to-transparent transition-all"
                   style={{height: `${100 - compressed}%`}}>
                <div className="text-xs text-sky-300 p-1">compressed</div>
              </div>
            </div>
            <div className="text-xs text-slate-300 mt-1">Ambiguity: {compressed.toFixed(0)}%</div>
          </div>
          
          <div className="text-center">
            <div className="text-xs text-slate-400 mb-1">VCH: Clamp</div>
            <div className="h-20 bg-slate-800 rounded relative overflow-hidden">
              {clampStrength > 50 && (
                <div className="absolute inset-0 border-2 border-fuchsia-500 animate-pulse">
                  <div className="text-xs text-fuchsia-300 p-1">holding</div>
                </div>
              )}
              <div className="absolute bottom-0 left-0 right-0 bg-fuchsia-500/30 transition-all"
                   style={{height: `${clampStrength}%`}} />
            </div>
            <div className="text-xs text-slate-300 mt-1">Hold: {holdTime.toFixed(1)}s</div>
          </div>
          
          <div className="text-center">
            <div className="text-xs text-slate-400 mb-1">LHH: Latch</div>
            <div className="h-20 bg-slate-800 rounded relative overflow-hidden">
              {latchEngaged && (
                <div className="absolute inset-0 bg-rose-500/40 flex items-center justify-center">
                  <div className="text-xs text-rose-300 font-medium">LATCHED</div>
                </div>
              )}
            </div>
            <div className="text-xs text-slate-300 mt-1">
              {latchEngaged ? 'Biased' : 'Flexible'}
            </div>
          </div>
        </div>
        
        {/* System state */}
        <div className="border-t border-slate-700 pt-3">
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400">System flexibility:</span>
            <div className="flex-1 h-3 rounded bg-slate-800">
              <div className="h-full rounded bg-emerald-500 transition-all"
                   style={{width: `${systemFlexibility}%`}} />
            </div>
            <span className="text-xs text-slate-300">{systemFlexibility.toFixed(0)}%</span>
          </div>
        </div>
      </div>
      
      <div className="grid gap-3 md:grid-cols-2">
        <div>
          <label className="block text-xs text-slate-400 mb-1">Initial ambiguity</label>
          <input type="range" min={0} max={100} value={ambiguity} 
                 onChange={(e) => setAmbiguity(+e.target.value)}
                 className="w-full" />
          <div className="text-xs text-slate-300 mt-1">{ambiguity}%</div>
        </div>
        <div>
          <label className="block text-xs text-slate-400 mb-1">Vascular pressure</label>
          <input type="range" min={0} max={100} value={clampStrength} 
                 onChange={(e) => setClampStrength(+e.target.value)}
                 className="w-full" />
          <div className="text-xs text-slate-300 mt-1">{clampStrength}%</div>
        </div>
      </div>
      
      <div className="text-xs text-slate-400 space-y-1">
        <div>• Low pressure = high flexibility but ambiguous patterns</div>
        <div>• Medium pressure = specific patterns, temporary holds</div>
        <div>• High pressure + time = latched biases, reduced flexibility</div>
      </div>
      
      {success && (
        <div className="rounded border border-emerald-600/40 bg-emerald-600/10 p-3 text-sm text-emerald-200">
          ✓ Optimal balance achieved! Specific patterns without rigid latching. The system remains adaptive.
        </div>
      )}
    </div>
  );
}

export default function ProgressiveScenario({ conceptId, config, previousConcepts = [] }: Props) {
  // Choose appropriate scenario based on concept
  if (conceptId === "tanha") {
    return <TanhaScenario />;
  }
  
  if (conceptId === "latch-bridge") {
    return <LatchBridgeScenario />;
  }
  
  if (conceptId === "lhh") {
    return <LHHScenario />;
  }
  
  if (conceptId === "vasocomputation") {
    return <VasocomputationIntegrated />;
  }
  
  // Fallback to simple scenario for other concepts
  return null;
}