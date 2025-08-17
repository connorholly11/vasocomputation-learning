import Link from "next/link";
import { lessons } from "@/lib/concepts";
import LessonCard from "@/components/LessonCard";

export default function LearnIndex() {
  return (
    <section className="space-y-6">
      <h1 className="text-2xl font-bold">Start here</h1>
      <p className="text-slate-300">
        Work through the prerequisites. Each lesson is short, with a quick quiz.
      </p>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {lessons.map((l) => (
          <Link key={l.id} href={`/learn/${l.id}`} className="no-underline">
            <LessonCard lesson={l} />
          </Link>
        ))}
      </div>
    </section>
  );
}