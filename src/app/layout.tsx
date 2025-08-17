export const metadata = {
  title: "Vasocomputation 101",
  description:
    "An interactive guide to Michael Edward Johnson's Vasocomputation, prerequisites, and core hypotheses.",
  openGraph: { title: "Vasocomputation 101", images: ["/og.png"] }
};

import "./globals.css";
import Link from "next/link";
import { ProgressProvider } from "@/components/ProgressProvider";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ProgressProvider>
          <header className="sticky top-0 z-50 border-b border-slate-800 bg-[#0b1020]/80 backdrop-blur supports-[backdrop-filter]:bg-[#0b1020]/60">
            <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
              <Link href="/" className="font-semibold tracking-tight">
                Vasocomputation 101
              </Link>
              <div className="flex gap-4 text-sm">
                <Link href="/learn" className="hover:underline">Learn</Link>
                <Link href="/map" className="hover:underline">Map</Link>
                <Link href="/playground" className="hover:underline">Playground</Link>
                <Link href="/sources" className="hover:underline">Sources</Link>
              </div>
            </nav>
          </header>
          <main className="mx-auto max-w-6xl px-4 py-8">{children}</main>
          <footer className="mx-auto max-w-6xl px-4 py-10 text-sm text-slate-400">
            <p>
              Educational explainer inspired by{" "}
              <a href="https://opentheory.net" target="_blank" rel="noreferrer">opentheory.net</a>.
              Not medical advice.
            </p>
          </footer>
        </ProgressProvider>
      </body>
    </html>
  );
}