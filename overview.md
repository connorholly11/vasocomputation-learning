Here’s a self-contained briefing you can paste into a new chat to bring them up to speed fast:

---

# Vasocomputation 101 — Project Briefing

## 1) Core Topic & Objective

* **Topic:** Building an interactive web experience that teaches Michael Edward Johnson’s **Vasocomputation** (opentheory.net) to newcomers.
* **Primary Objective:** Create a **showable** Next.js site that’s clearer and more engaging than the source blog post, with a guided path, interactive visuals, and practical exercises so first-time readers actually *understand* the ideas.

## 2) Key Background

* **You** already set up a Next.js app and want it to be **interactive, cool, and simple**, guiding users through prerequisites and dependencies between concepts.
* **Tech stack (current):** Next.js 15.4.6, React 19.1.0, TypeScript, Tailwind CSS v4, D3 v7.
* **Initial issues fixed:** Tailwind v4 styles weren’t applying; we switched to `@import "tailwindcss"` and added `@plugin` lines for Typography & Forms. We also improved structure, content, and interactivity.

## 3) Major Decisions / Conclusions

* **Learning model:** Multi-modal lessons (ELI5, Standard, Deep, Research) + quizzes + exercises + diagrams + concept map + mini/playground simulation.
* **Information architecture:**

  * Pages: `/` (guided hub), `/learn` (index), `/learn/[slug]` (lessons), `/map`, `/playground`, `/sources`.
  * **Concept map** as a clickable graph that reflects prerequisite relationships and links directly to lessons.
  * **Playground** to build intuition (tension, latch threshold, release rate).
* **Lesson content structure:** Each concept can now include **sections**, **exercises**, **connections**, **applications**, **research excerpts**, and **references**.
* **UX conventions:** Progress with XP; Stepper on lessons; quick actions on map; references block with deep-link anchor `#refs`.

## 4) Current Status

* **Styling works** under Tailwind v4 (using `@import "tailwindcss"` and plugins).
* **Homepage** redesigned as a guided hub (2×2 dashboard): Hero/Guidance, **Map preview** (clickable), **Learn quick start**, and **Mini-Playground**.
* **Map page** syncs selected node to URL (`/map?c=<id>`) and includes “Open lesson” / “Jump to sources” actions.
* **Playground** now has **release rate** and a visible **latch threshold** indicator.
* **Lessons** upgraded:

  * ELI5/Deep/Standard/Research toggles (Research shows excerpts if provided).
  * Sectioned content (Why, Core, Examples, Connections).
  * Exercises (reflect/thought/mini) with local persistence.
  * Simple inline diagrams for key concepts.
  * Stepper + references list.
* **Data model extended** in `concepts.ts` for several anchor lessons (Vasocomputation, Taṇhā, Active Inference, Latch-bridge). Others still show baseline text but are ready for expansion.
* **Components added:** `Stepper`, `PlaygroundMini`, `SectionCard`, `Exercise`, `Diagrams`. `ConceptGraph` now accepts a `height` prop.

## 5) Open Questions / Next Steps

1. **Nav simplification:** Do we reduce top nav to just **Learn** and **Sources** (with Map/Playground linked from the homepage), or keep Map/Playground in the header? (Current code still shows all four.)
2. **Content expansion:** Add sections/exercises/applications/research excerpts for remaining lessons (`sohms`, `hemo-neural`, `cvh`, `vch`, `lhh`, `annealing`) to match the richer ones.
3. **Story Mode (optional):** A 5-minute guided scenario page (`/learn/story`) that steps users through prediction → clamp → latch → release.
4. **Glossary hovers (optional):** Add a `GlossaryHover` component to inline-define terms like prediction, precision, vasomotion, hyperprior.
5. **Command-K search (optional):** Quick navigation over all concepts/keywords.
6. **Metadata & social card:** Add `metadataBase` in `layout.tsx` and `public/og.png` for clean OG/Twitter previews (currently recommended but not finalized in code).
7. **Consistency & A11Y polish:** Active nav highlighting, minor aria improvements across new components.

## 6) Important Details (Tools, Resources, Technical)

* **Repo structure (key routes):**

  * `/` (hub with map preview + mini-playground)
  * `/learn` (lesson index) and `/learn/[slug]` (individual lessons)
  * `/map` (interactive D3 concept graph, deep-link via `?c=<id>`)
  * `/playground` (full simulation with release rate & latch threshold)
  * `/sources` (links to Johnson’s post and related papers)
* **Core teaching artifacts:**

  * Concept graph (D3): shows prerequisites; clickable; selected node glows; direct links to lessons.
  * Playground: sliders for prediction rate, control ability, duration, and release rate; latch threshold line; clearly marked as a toy intuition pump.
  * Lessons: ELI5/Deep/Research modes; section cards (collapsible, mark read); exercises with local persistence; diagrams; references.
* **Key files & components:**

  * `src/app/globals.css`: Tailwind v4 setup:

    ```css
    @import "tailwindcss";
    @plugin "@tailwindcss/typography";
    @plugin "@tailwindcss/forms";
    ```
  * `postcss.config.mjs`: `{ plugins: ["@tailwindcss/postcss"] }`
  * `src/lib/concepts.ts`: extended `Concept` type with `sections`, `exercises`, `applications`, `connections`, `research`. Several concepts pre-populated.
  * `src/components/*`: `ConceptGraph` (now accepts `height`), `PlaygroundMini`, `SectionCard`, `Exercise`, `Diagrams`, `Stepper`, `Quiz`, `ProgressProvider`.
* **Dependencies (notable):**

  * Runtime: `next@15.4.6`, `react@19.1.0`, `d3@^7.9.0`
  * Styling: `tailwindcss@^4`, `@tailwindcss/typography`, `@tailwindcss/forms`
* **Env/SEO:** Set `NEXT_PUBLIC_SITE_URL` and add `metadataBase` in `layout.tsx`; add `public/og.png` (1200×630).
* **Persistence:** Progress & exercise notes saved to `localStorage` (keys prefixed `vc-`).

---

If the new assistant needs to act immediately: prioritize **metadata/OG setup**, **nav decision**, and **lesson content expansion** for the remaining topics so the whole curriculum feels consistently “complete.”
