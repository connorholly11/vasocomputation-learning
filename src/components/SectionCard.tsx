"use client";
import { useEffect, useState } from "react";

export type LessonSection = { id: string; title: string; content: string };

export default function SectionCard({
  conceptId,
  section,
}: {
  conceptId: string;
  section: LessonSection;
}) {
  const key = `vc-sec-${conceptId}`;
  const [open, setOpen] = useState(true);
  const [readIds, setReadIds] = useState<string[]>([]);

  useEffect(() => {
    const raw = localStorage.getItem(key);
    if (raw) {
      try { setReadIds(JSON.parse(raw)); } catch {}
    }
  }, [key]);

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(readIds));
  }, [key, readIds]);

  const isRead = readIds.includes(section.id);

  return (
    <div className="card p-4">
      <div className="flex items-center justify-between">
        <button className="text-left font-semibold" onClick={() => setOpen((v) => !v)}>
          {section.title}
        </button>
        <button
          className={`rounded px-2 py-0.5 text-xs border ${
            isRead ? "border-emerald-600/50 bg-emerald-600/10 text-emerald-200" : "border-slate-700/50 bg-slate-800/30 text-slate-300"
          }`}
          onClick={() =>
            setReadIds((ids) => (isRead ? ids.filter((i) => i !== section.id) : [...ids, section.id]))
          }
        >
          {isRead ? "Read ✓" : "Mark read"}
        </button>
      </div>
      {open && <p className="mt-2 text-slate-300 whitespace-pre-wrap">{section.content}</p>}
    </div>
  );
}