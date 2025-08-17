"use client";
import ConceptGraph from "@/components/ConceptGraph";
import { concepts } from "@/lib/concepts";
import { useState } from "react";

export default function MapPage() {
  const [selected, setSelected] = useState<string>("vasocomputation");
  const selectedConcept = concepts[selected];

  return (
    <section className="grid gap-6 lg:grid-cols-[1.3fr_.7fr]">
      <div className="card p-2">
        <ConceptGraph selected={selected} onSelect={setSelected} />
      </div>
      <aside className="card p-6">
        <h2 className="mb-2 text-xl font-semibold">{selectedConcept.title}</h2>
        <p className="text-slate-300">{selectedConcept.short}</p>
        <div className="mt-4 space-y-2">
          <h3 className="font-semibold">Prerequisites</h3>
          <ul className="list-disc pl-5 text-slate-300">
            {selectedConcept.prereqs.map((p) => (
              <li key={p}>{concepts[p].title}</li>
            ))}
          </ul>
        </div>
      </aside>
    </section>
  );
}