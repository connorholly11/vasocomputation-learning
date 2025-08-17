import { wrap } from "./utils";

export type Ref = { title: string; url: string };
export type Quiz = { question: string; options: string[]; answerIndex: number; explain: string };
export type Concept = {
  id: string;
  title: string;
  short: string;
  long: string;
  prereqs: string[];
  references: Ref[];
  quiz?: Quiz;
};
export type LessonMeta = { id: string; title: string; summary: string; minutes: number };

export const concepts: Record<string, Concept> = {
  // Root
  vasocomputation: {
    id: "vasocomputation",
    title: "Vasocomputation (overview)",
    short: wrap(
      "Hypothesis: the body stores and manipulates predictions as patterns of vascular tension. These tensions can freeze neural dynamics short‑term, and prolonged holds can 'latch,' biasing future perception/action."
    ),
    long: wrap(
      "Vasocomputation ties three levels together: (1) phenomenology (taṇhā as a grabby reflex), (2) Active Inference (predictions held until made true), and (3) a concrete effector—vascular smooth muscle cells (VSMCs). \
       Johnson proposes three linked hypotheses: CVH (compressive vasomotion sweeps ambiguous patterns into specificity), VCH (constrictions clamp nearby neural dynamics and act like medium‑term memory for specific predictions), and LHH (if contraction is held, the latch‑bridge engages, creating a sticky hyperprior). \
       On this view, releasing unskillful predictions lowers tension and broadens the system's dynamical repertoire."
    ),
    prereqs: ["tanha", "active-inference", "sohms", "hemo-neural", "latch-bridge", "cvh", "vch", "lhh", "annealing"],
    references: [
      { title: "Principles of Vasocomputation (Part I)", url: "https://opentheory.net/2023/07/principles-of-vasocomputation-a-unification-of-buddhist-phenomenology-active-inference-and-physical-reflex-part-i/" }
    ],
    quiz: {
      question: "Which trio summarizes the core hypotheses inside vasocomputation?",
      options: [
        "CVH, VCH, LHH",
        "PNS, CNS, ENS",
        "SOMA, DENDRITE, AXON",
        "EEG, fMRI, PET"
      ],
      answerIndex: 0,
      explain: "Compressive Vasomotion, Vascular Clamp, and Latched Hyperprior hypotheses make up the working set."
    }
  },

  // Phenomenology
  tanha: {
    id: "tanha",
    title: "Taṇhā (the 'grab')",
    short: "Buddhist accounts describe a quick 'grabbing' or clenching toward pleasant and away from unpleasant sensations.",
    long: wrap(
      "Vasocomputation reframes taṇhā as the felt signature of prediction‑driven grasping. Seeing it in real time offers a lever to stop doing it—reducing unnecessary tension. In the model, tanhā motifs align with how compression pressure is applied to experience."
    ),
    prereqs: [],
    references: [
      { title: "Principles of Vasocomputation (Part I) — section on taṇhā", url: "https://opentheory.net/2023/07/principles-of-vasocomputation-a-unification-of-buddhist-phenomenology-active-inference-and-physical-reflex-part-i/" }
    ],
    quiz: {
      question: "In this guide, taṇhā is closest to which idea?",
      options: ["Slow homeostatic drift", "A fast grabby reflex toward/away from sensations", "Random noise", "A muscle tear"],
      answerIndex: 1,
      explain: "Johnson highlights taṇhā as a quick 'grab' dynamic that maps onto prediction/compression drives."
    }
  },

  // Active inference
  "active-inference": {
    id: "active-inference",
    title: "Active Inference",
    short: "Brains generate predictions and act to make them true, minimizing surprise (free energy).",
    long: wrap(
      "Active Inference treats action as closing the gap between predicted and actual sensations. Predictions can be thought of as temporary 'to‑do' items. Vasocomputation suggests these predictions are physically hosted as vascular tensions."
    ),
    prereqs: [],
    references: [
      { title: "Friston et al. (2017) Active Inference: A Process Theory", url: "https://direct.mit.edu/neco/article/29/1/1/8207/Active-Inference-A-Process-Theory" }
    ],
    quiz: {
      question: "Active Inference roughly says…",
      options: [
        "The brain only reacts; it never predicts.",
        "The brain predicts and acts to bring sensations in line with predictions.",
        "The brain ignores surprise.",
        "Action and perception are unrelated."
      ],
      answerIndex: 1,
      explain: "Minimizing free energy (prediction error) binds action and perception."
    }
  },

  // SOHMs / resonance
  sohms: {
    id: "sohms",
    title: "SOHMs & Resonance",
    short: "Self‑organizing harmonic modes (SOHMs) are synchronous patterns that can carry information as resonant modes.",
    long: wrap(
      "Resonant modes provide a physical basis for 'where' structured patterns live in the brain. They can be thought of as attractors/eigenmodes. Vasocomputation posits that vascular motifs apply compression pressure to these modes."
    ),
    prereqs: [],
    references: [
      { title: "Safron (2020) Integrated World Modeling Theory (SOHMs)", url: "https://www.frontiersin.org/journals/artificial-intelligence/articles/10.3389/frai.2020.00030/full" }
    ]
  },

  // Hemo-neural
  "hemo-neural": {
    id: "hemo-neural",
    title: "Hemo‑Neural Hypothesis",
    short: "Blood flow can modulate neural activity (beyond mere energy delivery).",
    long: wrap(
      "The hemo‑neural hypothesis argues that changes in local hemodynamics influence information processing. This supports the plausibility that vascular dynamics matter computationally, not just metabolically."
    ),
    prereqs: [],
    references: [
      { title: "Moore & Cao (2008) Hemo‑Neural Hypothesis", url: "https://pubmed.ncbi.nlm.nih.gov/17913979/" }
    ]
  },

  // Latch
  "latch-bridge": {
    id: "latch-bridge",
    title: "Latch‑Bridge Mechanism",
    short: "Smooth muscle can enter a low‑energy 'latched' state that maintains tension with little ATP.",
    long: wrap(
      "In smooth muscle (including VSMCs), myosin heads can remain attached in slowly detaching states. Functionally this sustains tension cheaply. Vasocomputation uses this as a candidate mechanism for 'latched hyperpriors.'"
    ),
    prereqs: [],
    references: [
      { title: "Murphy (2005) Latch‑Bridge hypothesis", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC2278007/" },
      { title: "Hai & Murphy (1988) Latch state model", url: "https://pubmed.ncbi.nlm.nih.gov/3337223/" }
    ]
  },

  // CVH / VCH / LHH
  cvh: {
    id: "cvh",
    title: "CVH: Compressive Vasomotion",
    short: "Vasomotion acts like a compression sweep that pushes ambiguous patterns toward specificity.",
    long: wrap(
      "Ambiguous resonances get 'collapsed' toward definite interpretations as vasomotion applies compression pressure. This aligns with taṇhā's impulse to make sensations stable, satisfactory, and controllable."
    ),
    prereqs: ["tanha", "sohms"],
    references: [
      { title: "Vasocomputation Part I — CVH section", url: "https://opentheory.net/2023/07/principles-of-vasocomputation-a-unification-of-buddhist-phenomenology-active-inference-and-physical-reflex-part-i/" }
    ]
  },

  vch: {
    id: "vch",
    title: "VCH: Vascular Clamp",
    short: "Specific constrictions freeze local neural dynamics and act like medium‑term memory for predictions.",
    long: wrap(
      "Clamping holds a local pattern steady while the system acts to fulfill a prediction. Release can come from successful action, annealing/consolidation, or remodeling."
    ),
    prereqs: ["active-inference", "hemo-neural"],
    references: [
      { title: "Vasocomputation Part I — VCH section", url: "https://opentheory.net/2023/07/principles-of-vasocomputation-a-unification-of-buddhist-phenomenology-active-inference-and-physical-reflex-part-i/" }
    ]
  },

  lhh: {
    id: "lhh",
    title: "LHH: Latched Hyperprior",
    short: "Sustained contraction engages the latch‑bridge, biasing future interpretation (a sticky prior).",
    long: wrap(
      "If tension is held, the latch‑bridge engages and the system 'commits' to a narrow model (hyperprior). Unlatching broadens the available repertoire again."
    ),
    prereqs: ["latch-bridge", "vch"],
    references: [
      { title: "Vasocomputation Part I — LHH section", url: "https://opentheory.net/2023/07/principles-of-vasocomputation-a-unification-of-buddhist-phenomenology-active-inference-and-physical-reflex-part-i/" }
    ]
  },

  // Neural annealing (background in Opentheory corpus)
  annealing: {
    id: "annealing",
    title: "Neural Annealing (background)",
    short: "Holding patterns can consolidate and smooth into defaults (annealing-style dynamics).",
    long: wrap(
      "Johnson's prior work discusses 'neural annealing' — patterns held and reheated can consolidate into more harmonious basins. VCH suggests tension can be released via consolidation or remodeling."
    ),
    prereqs: ["sohms"],
    references: [
      { title: "Neural Annealing — Opentheory", url: "https://opentheory.net/2019/12/neural-annealing-toward-a-neural-theory-of-everything/" }
    ]
  }
};

export type LessonId = keyof typeof concepts;

export const lessons: LessonMeta[] = [
  { id: "tanha", title: concepts["tanha"].title, summary: concepts["tanha"].short, minutes: 4 },
  { id: "active-inference", title: concepts["active-inference"].title, summary: concepts["active-inference"].short, minutes: 5 },
  { id: "sohms", title: concepts["sohms"].title, summary: concepts["sohms"].short, minutes: 6 },
  { id: "hemo-neural", title: concepts["hemo-neural"].title, summary: concepts["hemo-neural"].short, minutes: 5 },
  { id: "latch-bridge", title: concepts["latch-bridge"].title, summary: concepts["latch-bridge"].short, minutes: 6 },
  { id: "cvh", title: concepts["cvh"].title, summary: concepts["cvh"].short, minutes: 5 },
  { id: "vch", title: concepts["vch"].title, summary: concepts["vch"].short, minutes: 5 },
  { id: "lhh", title: concepts["lhh"].title, summary: concepts["lhh"].short, minutes: 5 },
  { id: "annealing", title: concepts["annealing"].title, summary: concepts["annealing"].short, minutes: 6 },
  { id: "vasocomputation", title: concepts["vasocomputation"].title, summary: concepts["vasocomputation"].short, minutes: 8 }
];

export function getLessonOrder(): LessonId[] {
  return lessons.map((l) => l.id) as LessonId[];
}