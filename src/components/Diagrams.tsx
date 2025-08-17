"use client";

export function ConceptDiagram({ id }: { id: string }) {
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

  if (id === "latch-bridge") {
    return (
      <svg className="w-full" viewBox="0 0 500 120" role="img" aria-label="Latch-bridge idea">
        <rect x="20" y="30" width="460" height="20" fill="#94a3b8" opacity="0.3" />
        <rect x="50" y="28" width="120" height="24" fill="#f472b6" />
        <text x="110" y="20" textAnchor="middle" fill="#e2e8f0" fontSize="12">Initial clamp</text>
        <rect x="220" y="28" width="220" height="24" fill="#f472b6" opacity="0.6"/>
        <text x="330" y="20" textAnchor="middle" fill="#e2e8f0" fontSize="12">Latched hold (low ATP)</text>
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