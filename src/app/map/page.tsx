"use client";
import ConceptGraph from "@/components/ConceptGraph";
import { concepts } from "@/lib/concepts";
import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";

export default function MapPage() {
  const search = useSearchParams();
  const router = useRouter();
  const initial = search.get("c") ?? "vasocomputation";
  const [selected, setSelected] = useState<string>(initial);
  useEffect(() => {
    router.replace(`/map?c=${selected}`);
  }, [selected, router]);

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
        {/* REPOMARK:SCOPE: 3 - Add quick actions to open the lesson or jump to references */}
        <div className="mt-4 flex gap-2">
          <Link className="btn" href={`/learn/${selected}`}>Open lesson</Link>
          <Link className="btn" href={`/learn/${selected}#refs`}>Jump to sources</Link>
        </div>
      </aside>
    </section>
  );
}