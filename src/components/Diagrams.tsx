"use client";

export function ConceptDiagram({ id }: { id: string }) {
  if (id === "tanha") {
    // Approach/avoid "grab" meter with latch threshold
    return (
      <svg className="w-full" viewBox="0 0 560 140" role="img" aria-label="Taṇhā grab intensity and latch threshold">
        <defs>
          <marker id="arrowThin" markerWidth="10" markerHeight="10" refX="10" refY="3" orient="auto">
            <path d="M0,0 L0,6 L9,3 z" fill="#7dd3fc" />
          </marker>
        </defs>
        {/* Main tension bar */}
        <rect x="40" y="60" width="480" height="20" rx="10" fill="#0ea5e9" opacity=".15"/>
        <rect x="40" y="60" width="180" height="20" rx="10" fill="#94a3b8" opacity=".4"/>
        {/* Quick grab zone */}
        <rect x="40" y="60" width="180" height="20" rx="10" fill="none" stroke="#10b981" strokeWidth="1.5" strokeDasharray="3 3"/>
        <text x="130" y="55" fill="#10b981" fontSize="11" textAnchor="middle">quick grab (reversible)</text>
        {/* Latch threshold line */}
        <line x1="340" y1="55" x2="340" y2="85" stroke="#f472b6" strokeWidth="2.5"/>
        <text x="340" y="48" textAnchor="middle" fill="#f472b6" fontSize="12">latch threshold</text>
        {/* Latch zone */}
        <rect x="340" y="60" width="180" height="20" rx="10" fill="#f472b6" opacity=".25"/>
        <text x="430" y="100" fill="#f472b6" fontSize="11" textAnchor="middle">latch zone (sticky)</text>
        {/* Labels */}
        <text x="40" y="130" fill="#e2e8f0" fontSize="12">push away ←</text>
        <text x="500" y="130" fill="#e2e8f0" fontSize="12" textAnchor="end">→ grasp</text>
        {/* Arrows showing progression */}
        <line x1="160" y1="25" x2="180" y2="55" stroke="#10b981" strokeWidth="1.5" markerEnd="url(#arrowThin)"/>
        <text x="158" y="20" fill="#10b981" fontSize="11" textAnchor="end">grab (25-100ms)</text>
        <line x1="380" y1="25" x2="400" y2="55" stroke="#f472b6" strokeWidth="1.5" markerEnd="url(#arrowThin)"/>
        <text x="382" y="20" fill="#f472b6" fontSize="11" textAnchor="start">if held → latch</text>
      </svg>
    );
  }

  if (id === "sohms") {
    // Resonant modes (eigenmodes) schematic
    return (
      <svg className="w-full" viewBox="0 0 560 160" role="img" aria-label="Self-organizing harmonic modes">
        <rect x="30" y="20" width="500" height="120" rx="10" fill="#0ea5e9" opacity=".06" />
        <path d="M40,80 C80,40 120,120 160,80 S240,40 280,80 320,120 360,80 400,40 440,80 480,120 520,80"
          fill="none" stroke="#7dd3fc" strokeWidth="2" />
        <path d="M40,110 C80,60 120,100 160,110 S240,120 280,110 320,100 360,110 400,120 440,110 480,100 520,110"
          fill="none" stroke="#94a3b8" strokeWidth="1.5" opacity=".9"/>
        <path d="M40,50 C80,90 120,60 160,50 S240,20 280,50 320,80 360,50 400,20 440,50 480,80 520,50"
          fill="none" stroke="#10b981" strokeWidth="1.5" opacity=".9"/>
        <text x="60" y="38" fill="#e2e8f0" fontSize="12">mode A</text>
        <text x="60" y="68" fill="#e2e8f0" fontSize="12">mode B</text>
        <text x="60" y="128" fill="#e2e8f0" fontSize="12">mode C</text>
      </svg>
    );
  }

  if (id === "hemo-neural") {
    // Neurovascular unit: flow ⇄ neural gain
    return (
      <svg className="w-full" viewBox="0 0 560 160" role="img" aria-label="Hemo-neural coupling schematic">
        <defs>
          <marker id="arrowHN" markerWidth="10" markerHeight="10" refX="10" refY="3" orient="auto">
            <path d="M0,0 L0,6 L9,3 z" fill="#7dd3fc" />
          </marker>
        </defs>
        <rect x="40" y="30" width="200" height="100" rx="10" fill="#ef4444" opacity=".18"/>
        <text x="140" y="85" textAnchor="middle" fill="#fecaca">arteriole / flow</text>
        <rect x="320" y="30" width="200" height="100" rx="10" fill="#10b981" opacity=".18"/>
        <text x="420" y="55" textAnchor="middle" fill="#bbf7d0">neurons</text>
        <text x="420" y="95" textAnchor="middle" fill="#bbf7d0">astrocytes / glia</text>
        <line x1="240" y1="80" x2="320" y2="80" stroke="#7dd3fc" strokeWidth="2" markerEnd="url(#arrowHN)"/>
        <text x="280" y="70" fill="#7dd3fc" fontSize="12" textAnchor="middle">flow → excitability</text>
        <line x1="320" y1="110" x2="240" y2="110" stroke="#7dd3fc" strokeWidth="1.5" strokeDasharray="4 4" markerEnd="url(#arrowHN)"/>
        <text x="280" y="124" fill="#7dd3fc" fontSize="12" textAnchor="middle">NO/K⁺/feedback</text>
      </svg>
    );
  }

  if (id === "cvh") {
    // Compression sweep: ambiguous → specific
    return (
      <svg className="w-full" viewBox="0 0 560 150" role="img" aria-label="Compressive vasomotion sweep">
        <defs>
          <linearGradient id="cvhGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#94a3b8" stopOpacity=".35"/>
            <stop offset="100%" stopColor="#7dd3fc" stopOpacity=".6"/>
          </linearGradient>
        </defs>
        <path d="M60,40 C120,35 140,35 200,40 L200,110 C140,115 120,115 60,110 Z" fill="url(#cvhGrad)" opacity=".5"/>
        <rect x="220" y="45" width="90" height="60" rx="8" fill="#0ea5e9" opacity=".25"/>
        <text x="265" y="80" textAnchor="middle" fill="#e2e8f0" fontSize="12">specific</text>
        <text x="80" y="30" fill="#e2e8f0" fontSize="12">ambiguous</text>
        <text x="120" y="128" fill="#7dd3fc" fontSize="12">compression sweep →</text>
      </svg>
    );
  }

  if (id === "vch") {
    // Clamp: local freeze (medium-term hold)
    return (
      <svg className="w-full" viewBox="0 0 560 150" role="img" aria-label="Vascular clamp freezes local pattern">
        <defs>
          <marker id="arrowVCH" markerWidth="10" markerHeight="10" refX="10" refY="3" orient="auto">
            <path d="M0,0 L0,6 L9,3 z" fill="#7dd3fc" />
          </marker>
        </defs>
        <path d="M60,80 C120,40 180,120 240,80 S360,40 420,80" fill="none" stroke="#94a3b8" strokeWidth="2"/>
        <rect x="240" y="40" width="60" height="80" fill="#f472b6" opacity=".25"/>
        <line x1="240" y1="40" x2="240" y2="120" stroke="#f472b6" strokeWidth="3"/>
        <line x1="300" y1="40" x2="300" y2="120" stroke="#f472b6" strokeWidth="3"/>
        <text x="270" y="36" textAnchor="middle" fill="#f5d0fe" fontSize="12">clamp</text>
        <line x1="180" y1="30" x2="240" y2="30" stroke="#7dd3fc" strokeWidth="2" markerEnd="url(#arrowVCH)"/>
        <text x="210" y="22" textAnchor="middle" fill="#7dd3fc" fontSize="12">hold</text>
      </svg>
    );
  }

  if (id === "latch-bridge" || id === "lhh") {
    // Existing latch diagram retained
    return (
      <svg className="w-full" viewBox="0 0 560 180" role="img" aria-label="Latch-bridge energy over time">
        <defs>
          <marker id="arrow" markerWidth="10" markerHeight="10" refX="10" refY="3" orient="auto">
            <path d="M0,0 L0,6 L9,3 z" fill="#7dd3fc" />
          </marker>
          <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#f472b6" stopOpacity="0.55"/>
            <stop offset="100%" stopColor="#f472b6" stopOpacity="0.05"/>
          </linearGradient>
        </defs>
        <line x1="40" y1="140" x2="520" y2="140" stroke="#475569" strokeWidth="1"/>
        <line x1="40" y1="20" x2="40" y2="140" stroke="#475569" strokeWidth="1"/>
        <text x="530" y="145" fill="#94a3b8" fontSize="11">time</text>
        <text x="12" y="20" fill="#94a3b8" fontSize="11" transform="rotate(-90 12,20)">ATP cost / force</text>
        <path d="M40,130 C120,60 180,40 240,40 S360,60 400,100 480,120 520,120"
          fill="none" stroke="#f472b6" strokeWidth="2.5"/>
        <rect x="40" y="50" width="480" height="24" fill="url(#grad)" />
        <text x="280" y="67" textAnchor="middle" fill="#f5d0fe" fontSize="12">latched state (slow detachment, low ATP)</text>
        <line x1="40" y1="92" x2="520" y2="92" stroke="#7dd3fc" strokeWidth="1.5" strokeDasharray="4 4"/>
        <text x="480" y="88" fill="#7dd3fc" fontSize="12">latch threshold</text>
        <text x="120" y="150" fill="#e2e8f0" fontSize="12">initial clamp</text>
        <text x="360" y="150" fill="#e2e8f0" fontSize="12">hold → release</text>
        <line x1="150" y1="130" x2="150" y2="55" stroke="#7dd3fc" strokeWidth="2" markerEnd="url(#arrow)"/>
        <line x1="420" y1="100" x2="420" y2="135" stroke="#7dd3fc" strokeWidth="2" markerEnd="url(#arrow)"/>
      </svg>
    );
  }

  if (id === "annealing") {
    // Energy landscape smoothing
    return (
      <svg className="w-full" viewBox="0 0 560 160" role="img" aria-label="Neural annealing energy landscape smoothing">
        <defs>
          <marker id="arrowAnn" markerWidth="10" markerHeight="10" refX="10" refY="3" orient="auto">
            <path d="M0,0 L0,6 L9,3 z" fill="#7dd3fc" />
          </marker>
        </defs>
        <path d="M40,120 C80,60 120,140 160,120 200,100 240,140 280,120 320,100 360,140 400,120 440,100 480,140 520,120"
          fill="none" stroke="#94a3b8" strokeWidth="2"/>
        <path d="M40,120 C90,90 130,120 170,110 210,100 250,115 290,110 330,105 370,112 410,110 450,108 490,112 520,110"
          fill="none" stroke="#10b981" strokeWidth="2" opacity=".9"/>
        <line x1="120" y1="40" x2="220" y2="40" stroke="#7dd3fc" strokeWidth="2" markerEnd="url(#arrowAnn)"/>
        <text x="170" y="32" textAnchor="middle" fill="#7dd3fc" fontSize="12">reheat / consolidate</text>
      </svg>
    );
  }

  if (id === "active-inference") {
    return (
      <svg className="w-full" viewBox="0 0 500 120" role="img" aria-label="Active inference loop">
        <rect x="10" y="20" width="140" height="80" rx="10" fill="#0ea5e9" opacity="0.2"/>
        <text x="80" y="60" textAnchor="middle" fill="#e2e8f0">Predictions</text>
        <rect x="180" y="20" width="140" height="80" rx="10" fill="#10b981" opacity="0.2"/>
        <text x="250" y="60" textAnchor="middle" fill="#e2e8f0">Actions</text>
        <rect x="350" y="20" width="140" height="80" rx="10" fill="#94a3b8" opacity="0.2"/>
        <text x="420" y="60" textAnchor="middle" fill="#e2e8f0">Sensations</text>
        <defs>
          <marker id="arrow" markerWidth="10" markerHeight="10" refX="10" refY="3" orient="auto">
            <path d="M0,0 L0,6 L9,3 z" fill="#7dd3fc" />
          </marker>
        </defs>
        <line x1="150" y1="60" x2="180" y2="60" stroke="#7dd3fc" strokeWidth="2" markerEnd="url(#arrow)"/>
        <line x1="320" y1="60" x2="350" y2="60" stroke="#7dd3fc" strokeWidth="2" markerEnd="url(#arrow)"/>
        <line x1="350" y1="95" x2="150" y2="95" stroke="#7dd3fc" strokeWidth="2" markerEnd="url(#arrow)"/>
      </svg>
    );
  }

  if (id === "vasocomputation") {
    return (
      <svg className="w-full" viewBox="0 0 500 140" role="img" aria-label="CVH, VCH, LHH triad">
        <circle cx="120" cy="70" r="50" fill="#0ea5e9" opacity="0.25" />
        <text x="120" y="75" textAnchor="middle" fill="#e2e8f0">CVH</text>
        <circle cx="250" cy="70" r="50" fill="#10b981" opacity="0.25" />
        <text x="250" y="75" textAnchor="middle" fill="#e2e8f0">VCH</text>
        <circle cx="380" cy="70" r="50" fill="#f472b6" opacity="0.25" />
        <text x="380" y="75" textAnchor="middle" fill="#e2e8f0">LHH</text>
        <defs>
          <marker id="arrow2" markerWidth="10" markerHeight="10" refX="10" refY="3" orient="auto">
            <path d="M0,0 L0,6 L9,3 z" fill="#7dd3fc" />
          </marker>
        </defs>
        <line x1="170" y1="70" x2="200" y2="70" stroke="#7dd3fc" strokeWidth="2" markerEnd="url(#arrow2)"/>
        <line x1="300" y1="70" x2="330" y2="70" stroke="#7dd3fc" strokeWidth="2" markerEnd="url(#arrow2)"/>
      </svg>
    );
  }

  return null;
}