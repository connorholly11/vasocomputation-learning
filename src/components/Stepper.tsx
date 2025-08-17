"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import { concepts, getLessonOrder } from "@/lib/concepts";
import { useProgress } from "./ProgressProvider";
import Link from "next/link";

export default function Stepper({ currentId }: { currentId: string }) {
  const { completed } = useProgress();
  const order = getLessonOrder();

  const containerRef = useRef<HTMLDivElement | null>(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(false);

  const updateNav = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;
    const left = el.scrollLeft;
    const maxLeft = el.scrollWidth - el.clientWidth;
    setCanLeft(left > 2);
    setCanRight(left < maxLeft - 2);
  }, []);

  const scrollByAmount = useCallback((dir: "left" | "right") => {
    const el = containerRef.current;
    if (!el) return;
    const by = Math.max(160, Math.floor(el.clientWidth * 0.8));
    el.scrollBy({ left: dir === "left" ? -by : by, behavior: "smooth" });
  }, []);

  const scrollToSelected = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;
    const target = el.querySelector(`[data-id="${currentId}"]`) as HTMLElement | null;
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
    }
  }, [currentId]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    updateNav();
    const onScroll = () => updateNav();
    el.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", updateNav);
    return () => {
      el.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", updateNav);
    };
  }, [updateNav]);

  useEffect(() => {
    // Ensure the current lesson chip is visible/centered whenever currentId changes
    scrollToSelected();
  }, [scrollToSelected]);

  return (
    <div className="relative">
      {/* Gradient edge hints (widened to match container padding) */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-[#0b1020] to-transparent" aria-hidden />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-[#0b1020] to-transparent" aria-hidden />

      {/* Arrow controls */}
      <button
        type="button"
        aria-label="Scroll lessons left"
        onClick={() => scrollByAmount("left")}
        disabled={!canLeft}
        aria-disabled={!canLeft}
        className={`absolute left-1 top-1/2 z-10 -translate-y-1/2 rounded-full border border-slate-700/50 bg-[#0b1020]/70 p-1 backdrop-blur transition ${canLeft ? "opacity-100" : "opacity-0 pointer-events-none"}`}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M15 6L9 12L15 18" stroke="#e2e8f0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <button
        type="button"
        aria-label="Scroll lessons right"
        onClick={() => scrollByAmount("right")}
        disabled={!canRight}
        aria-disabled={!canRight}
        className={`absolute right-1 top-1/2 z-10 -translate-y-1/2 rounded-full border border-slate-700/50 bg-[#0b1020]/70 p-1 backdrop-blur transition ${canRight ? "opacity-100" : "opacity-0 pointer-events-none"}`}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M9 6L15 12L9 18" stroke="#e2e8f0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {/* Scroll container with extra side padding so first/last chips are never under the overlays */}
      <div
        ref={containerRef}
        className="flex gap-2 overflow-x-auto pb-2 pl-12 pr-12 scroll-smooth [scrollbar-width:none] [-ms-overflow-style:none]"
      >
        {order.map((id, idx) => (
          <Link
            key={id}
            href={`/learn/${id}`}
            scroll={false}
            data-id={id}
            aria-current={id === currentId ? "page" : undefined}
            className={`flex-shrink-0 whitespace-nowrap rounded px-3 py-1 text-sm transition ${
              id === currentId
                ? "bg-sky-600 text-white shadow-[var(--shadow-glow)]"
                : completed.has(id)
                ? "bg-emerald-600/20 text-emerald-300"
                : "bg-slate-800 text-slate-400 hover:bg-slate-700"
            }`}
          >
            {idx + 1}. {concepts[id].title}
          </Link>
        ))}
      </div>
    </div>
  );
}