import { wrap } from "./utils";

export type ScenarioConfig = {
  enabled: boolean;
  threshold?: number;
  labels?: {
    grab?: string;
    awareness?: string;
    releaseRate?: string;
    metric?: string;
    goal?: string;
  };
};

export type Ref = { title: string; url: string };
export type Quiz = { question: string; options: string[]; answerIndex: number; explain: string };
export type LessonSection = { id: string; title: string; content: string };
export type ExerciseModel = {
  id: string;
  type: "reflect" | "thought" | "mini";
  prompt: string;
  details?: string;
};
export type Concept = {
  id: string;
  title: string;
  short: string;
  long: string;
  prereqs: string[];
  references: Ref[];
  quiz?: Quiz;
  eli5?: string;
  deep?: string;
  keywords?: string[];
  sections?: LessonSection[];
  exercises?: ExerciseModel[];
  hasDiagram?: boolean;
  connections?: { id: string; relation: string }[];
  applications?: string[];
  scenario?: ScenarioConfig;
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
    },
    eli5: "Predictions feel like tiny 'holds' in the body. This model says those holds are literally patterns of vascular tension that can stick if we keep holding them.",
    deep: wrap(
      "Vasocomputation posits VSMC-mediated tension as a substrate for short-to-medium term prediction holding. CVH applies compression pressure to disambiguate resonant modes; VCH locally clamps neural dynamics to maintain a prediction; and LHH leverages latch-bridge mechanics to create low-energy, slowly-decaying hyperpriors. Releasing maladaptive predictions widens accessible system dynamics."
    ),
    keywords: ["vasocomputation", "CVH", "VCH", "LHH", "hyperprior", "tension"],
    hasDiagram: true,
    scenario: {
      enabled: true,
      threshold: 0.3,
      labels: {
        grab: "Prediction Holding",
        awareness: "Pattern Recognition",
        releaseRate: "Release Rate",
        metric: "System Flexibility",
        goal: "Balanced Dynamics"
      }
    },
    sections: [
      {
        id: "phenomenology",
        title: "Phenomenological Level",
        content: wrap(
          "At the experiential level, vasocomputation explains taṇhā—the grabby reflex toward or away from sensations. This grasping creates felt tension that corresponds to vascular compression patterns. When we notice this grabbing in real-time, we can choose to release it, reducing both subjective suffering and physiological tension."
        )
      },
      {
        id: "computational",
        title: "Computational Level",
        content: wrap(
          "Active Inference provides the computational framework: brains generate predictions and act to make them true. Vasocomputation proposes that these predictions are literally held as patterns of vascular smooth muscle contraction, creating a physical substrate for predictive processing."
        )
      },
      {
        id: "physical",
        title: "Physical Substrate",
        content: wrap(
          "Vascular smooth muscle cells (VSMCs) throughout the body can contract and relax, modulating local blood flow and neural activity. The three core hypotheses (CVH, VCH, LHH) describe how these contractions implement prediction holding, disambiguation, and long-term biasing."
        )
      }
    ],
    exercises: [
      {
        id: "notice-tension",
        type: "reflect",
        prompt: "For the next few minutes, notice any areas of bodily tension. Can you connect these to specific thoughts, predictions, or emotional states?",
        details: "This helps develop awareness of the mind-body connection central to vasocomputation."
      },
      {
        id: "release-experiment",
        type: "mini",
        prompt: "Try consciously relaxing an area of tension while maintaining the same thought or emotional state.",
        details: "Notice if releasing physical tension affects your mental state or the persistence of thoughts."
      }
    ],
    connections: [
      { id: "tanha", relation: "provides phenomenological foundation" },
      { id: "active-inference", relation: "provides computational framework" },
      { id: "latch-bridge", relation: "provides physical mechanism" }
    ],
    applications: [
      "Meditation and mindfulness practices",
      "Understanding psychosomatic symptoms",
      "Developing body-aware therapeutic interventions",
      "Bridging contemplative practice with neuroscience"
    ]
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
    },
    scenario: {
      enabled: true,
      threshold: 0.4,
      labels: {
        grab: "Grasping Intensity",
        awareness: "Recognition Clarity",
        releaseRate: "Letting Go",
        metric: "Tension Level",
        goal: "Equanimity"
      }
    },
    sections: [
      {
        id: "recognition",
        title: "Recognizing the Grab",
        content: wrap(
          "Taṇhā manifests as a quick, often unconscious movement toward pleasant experiences and away from unpleasant ones. This isn't just psychological—it has a felt, embodied quality. Learning to catch this reflex in real-time is the first step in working with it skillfully."
        )
      },
      {
        id: "embodiment",
        title: "Embodied Grasping",
        content: wrap(
          "The 'grab' isn't just mental—it creates physical tension. You might notice shoulders tensing when avoiding difficulty, or a reaching quality when pursuing pleasure. Vasocomputation suggests these tensions are vascular compressions that literally hold predictions in place."
        )
      },
      {
        id: "mechanism",
        title: "Vascular Compression Patterns",
        content: wrap(
          "At the physiological level, taṇhā corresponds to rapid changes in vascular smooth muscle tone. When we grasp toward pleasure or push away from pain, specific patterns of vessel constriction emerge that literally 'hold' the prediction in the body's tissues."
        )
      },
      {
        id: "release",
        title: "The Art of Release",
        content: wrap(
          "Once you notice taṇhā in action, you can experiment with releasing it. This doesn't mean suppressing the experience, but rather letting go of the grabby reflex itself. Often this creates immediate relief and opens up new possibilities for response."
        )
      }
    ],
    exercises: [
      {
        id: "grab-detection",
        type: "reflect",
        prompt: "Notice the next time you experience something pleasant or unpleasant. Can you catch the subtle 'grab' or 'push' in your body-mind?",
        details: "Start with strong experiences where the grab is more obvious, then work toward subtler ones."
      },
      {
        id: "release-practice",
        type: "mini",
        prompt: "When you notice grasping, try consciously softening without changing the experience itself.",
        details: "The goal isn't to stop having preferences, but to hold them more lightly."
      }
    ],
    connections: [
      { id: "cvh", relation: "creates compression patterns" },
      { id: "vasocomputation", relation: "provides mechanistic foundation" }
    ],
    applications: [
      "Mindfulness meditation",
      "Reducing reactive patterns",
      "Improving emotional regulation",
      "Developing equanimity"
    ]
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
    },
    eli5: "Your brain is always guessing what will happen next and moves your body to make those guesses come true as cheaply as possible.",
    deep: wrap(
      "Perception and action jointly minimize variational free energy by aligning predictions with sensory input. Control signals can be framed as predictions at deeper levels. In vasocomputation, such predictions may be instantiated via transient vascular tension patterns that locally stabilize neural dynamics until prediction errors are resolved."
    ),
    keywords: ["free energy", "prediction", "control", "perception-action"],
    hasDiagram: true,
    sections: [
      {
        id: "prediction-cycle",
        title: "The Prediction-Action Cycle",
        content: wrap(
          "Active inference describes a continuous loop: the brain predicts what sensations should arise, compares these predictions with actual input, and acts to minimize any discrepancy. This creates a unified framework where perception and action work together to minimize surprise."
        )
      },
      {
        id: "free-energy",
        title: "Free Energy Minimization",
        content: wrap(
          "Free energy is a measure of surprise or prediction error. The brain constantly works to minimize this by either updating its predictions (perception) or changing the world to match predictions (action). This principle explains both learning and behavior."
        )
      },
      {
        id: "hierarchical",
        title: "Hierarchical Processing",
        content: wrap(
          "Active inference operates at multiple levels simultaneously. Higher levels make more abstract, longer-term predictions, while lower levels handle immediate sensorimotor control. This hierarchy allows for both rapid reflexes and complex planning."
        )
      }
    ],
    exercises: [
      {
        id: "prediction-awareness",
        type: "reflect",
        prompt: "Before reaching for an object, pause and notice your predictions: where is it, how heavy will it be, how your hand should move?",
        details: "This exercise builds awareness of the constant predictive processing underlying simple actions."
      },
      {
        id: "surprise-tracking",
        type: "thought",
        prompt: "Think of a recent surprise. How did your brain quickly update its predictions to accommodate the new information?",
        details: "Understanding how surprise drives learning illuminates the active inference process."
      }
    ],
    connections: [
      { id: "vch", relation: "predictions held as vascular tension" },
      { id: "vasocomputation", relation: "provides physical substrate for predictions" },
      { id: "sohms", relation: "resonant modes as prediction carriers" }
    ],
    applications: [
      "Understanding learning and adaptation",
      "Developing predictive AI systems",
      "Explaining perception-action coupling",
      "Therapeutic interventions for prediction errors"
    ]
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
    ],
    hasDiagram: true,
    sections: [
      {
        id: "felt-resonance",
        title: "Feeling Resonant Patterns",
        content: wrap(
          "SOHMs aren't just abstract mathematical structures—they have a felt quality. When multiple brain regions synchronize into a harmonic mode, this creates a distinct experiential signature. You might notice this as the 'coming together' feeling when understanding a complex idea or the coherent quality of focused attention."
        )
      },
      {
        id: "embodied-modes",
        title: "Embodied Harmonic Experience",
        content: wrap(
          "These resonant modes extend beyond the brain into the entire body. Emotional states, for instance, involve characteristic patterns of neural-somatic resonance. The feeling of 'being in flow' reflects a particularly coherent and stable harmonic mode across multiple systems."
        )
      },
      {
        id: "vascular-modulation",
        title: "Vascular Modulation of Modes",
        content: wrap(
          "Vasocomputation proposes that vascular smooth muscle contractions can selectively pressure different resonant modes, effectively 'tuning' the brain's harmonic landscape. This provides a mechanism for how predictions and attention can bias which patterns of activity emerge and stabilize."
        )
      }
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
    ],
    hasDiagram: true,
    sections: [
      {
        id: "felt-flow",
        title: "Sensing Blood Flow Changes",
        content: wrap(
          "Changes in local blood flow create subtle but detectable shifts in sensation. You might notice this as the warm spreading feeling when blood vessels dilate, or the tight, constrictive quality when they constrict. These aren't just side effects—they're part of the informational content."
        )
      },
      {
        id: "cognitive-shifts",
        title: "Hemodynamic Cognitive States",
        content: wrap(
          "Different patterns of blood flow correspond to distinct cognitive states. The focused clarity of deep concentration involves different vascular patterns than the expansive awareness of creative insight. Learning to recognize these hemodynamic signatures can enhance metacognitive awareness."
        )
      },
      {
        id: "computational-coupling",
        title: "Computation-Circulation Coupling",
        content: wrap(
          "The hemo-neural hypothesis suggests that blood flow changes aren't just supporting neural computation—they're participating in it. Vascular smooth muscle contractions can create local pressure changes that directly influence neural firing patterns and information processing."
        )
      }
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
    ],
    eli5: "Smooth muscles have a 'sticky gear' that lets them hold tension without spending much energy.",
    deep: wrap(
      "Cross-bridge cycling can enter a slowly detaching state (latch) where force is maintained with reduced ATP turnover. In VSMCs, this provides a mechanism for low-energy persistence of constriction, offering a substrate for 'latched hyperpriors' that bias inference/action until released or remodeled."
    ),
    keywords: ["smooth muscle", "cross-bridge", "energy", "hyperprior"],
    hasDiagram: true,
    scenario: {
      enabled: true,
      threshold: 0.35,
      labels: {
        grab: "Tension Holding",
        awareness: "Latch Detection",
        releaseRate: "Release Rate",
        metric: "Energy Efficiency",
        goal: "Optimal Tension"
      }
    },
    sections: [
      {
        id: "mechanism",
        title: "Molecular Mechanism",
        content: wrap(
          "In smooth muscle, myosin cross-bridges can enter a 'latch' state where they remain attached to actin with very slow detachment rates. This allows sustained force generation with minimal ongoing ATP consumption—a highly energy-efficient way to maintain tension over long periods."
        )
      },
      {
        id: "vascular-context",
        title: "Vascular Applications",
        content: wrap(
          "Vascular smooth muscle cells throughout the body can utilize latch-bridge mechanics to maintain vessel constriction with minimal metabolic cost. This provides a plausible physical substrate for 'holding' predictions or biases over extended timeframes."
        )
      },
      {
        id: "computational",
        title: "Computational Implications",
        content: wrap(
          "If predictions are held as vascular tensions, the latch-bridge mechanism offers a way for these 'hyperpriors' to persist with minimal energy expenditure. This could explain how certain cognitive or emotional patterns become 'sticky' and resistant to change."
        )
      }
    ],
    exercises: [
      {
        id: "tension-holding",
        type: "reflect",
        prompt: "Think of a persistent emotional or mental pattern you have. Does it feel like it 'holds itself' with minimal effort?",
        details: "This analogy helps understand how latched patterns might feel subjectively."
      },
      {
        id: "release-experiment",
        type: "mini",
        prompt: "Try holding physical tension (like clenching your jaw) and then consciously releasing it. Notice the 'letting go' sensation.",
        details: "This gives a bodily sense of what unlatching might feel like."
      }
    ],
    connections: [
      { id: "lhh", relation: "provides mechanism for latched hyperpriors" },
      { id: "vasocomputation", relation: "enables persistent prediction holding" },
      { id: "vch", relation: "supports long-term vascular clamping" }
    ],
    applications: [
      "Understanding chronic tension patterns",
      "Explaining persistent cognitive biases",
      "Developing somatic therapies",
      "Insights into trauma and holding patterns"
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
    ],
    hasDiagram: true,
    sections: [
      {
        id: "compression-feeling",
        title: "Feeling Compression Dynamics",
        content: wrap(
          "Compressive vasomotion has a distinct felt quality—like a wave of pressure that moves through experience, collapsing uncertainty into specificity. You might notice this when an ambiguous situation suddenly 'clicks' into clarity, often accompanied by a sense of tension or compression."
        )
      },
      {
        id: "disambiguation",
        title: "The Disambiguation Process",
        content: wrap(
          "When faced with ambiguous sensory input, the mind-body system applies compression pressure to force a specific interpretation. This feels like a narrowing or focusing, where multiple possibilities collapse into a single, definite perception or understanding."
        )
      },
      {
        id: "vasomotion-waves",
        title: "Vasomotion as Pattern Collapse",
        content: wrap(
          "Rhythmic vasomotion—the spontaneous oscillation of vascular smooth muscle—creates waves of compression that sweep through neural tissue. These waves physically compress resonant modes, forcing ambiguous patterns to stabilize into specific configurations."
        )
      }
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
    ],
    hasDiagram: true,
    sections: [
      {
        id: "clamping-sensation",
        title: "The Felt Sense of Clamping",
        content: wrap(
          "Vascular clamping creates a distinctive sensation of 'holding' or 'freezing' in specific areas of the body. You might notice this as a quality of fixation—where attention or sensation gets locked in place, creating a sense of rigidity or immobility in both mind and body."
        )
      },
      {
        id: "prediction-holding",
        title: "Embodied Prediction Storage",
        content: wrap(
          "When the system makes a prediction, vascular clamps can literally hold that prediction 'in place' by constraining local neural dynamics. This feels like carrying a specific expectation or intention in the body—a somatic commitment to a particular outcome."
        )
      },
      {
        id: "clamp-mechanism",
        title: "Local Dynamic Constraint",
        content: wrap(
          "Vascular smooth muscle contractions create localized pressure that constrains nearby neural activity to specific patterns. This acts like a biological 'register' that can maintain a prediction or intention until it's either fulfilled, consolidated into long-term memory, or actively released."
        )
      }
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
    ],
    hasDiagram: true,
    scenario: {
      enabled: true,
      threshold: 0.25,
      labels: {
        grab: "Hyperprior Strength",
        awareness: "Bias Recognition",
        releaseRate: "Unlatch Rate",
        metric: "Cognitive Flexibility",
        goal: "Adaptive Priors"
      }
    },
    sections: [
      {
        id: "sticky-patterns",
        title: "Feeling Sticky Patterns",
        content: wrap(
          "Latched hyperpriors create a distinct sensation of 'stuckness'—patterns of thought, emotion, or behavior that feel locked in place and resistant to change. These aren't just mental habits; they have a physical component that feels like deeply held tension that maintains itself."
        )
      },
      {
        id: "bias-embodiment",
        title: "Embodied Cognitive Bias",
        content: wrap(
          "When hyperpriors latch, they create a bodily bias toward certain interpretations and responses. You might notice this as a 'pull' toward familiar patterns, even when they're no longer appropriate. The body literally holds these biases as sustained vascular tensions."
        )
      },
      {
        id: "latch-mechanism",
        title: "The Latching Process",
        content: wrap(
          "When vascular tension is sustained long enough, the latch-bridge mechanism engages, allowing the contraction to maintain itself with minimal energy. This creates a hyperprior—a deeply held assumption that biases all future perception and action until consciously unlatched."
        )
      }
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
    ],
    hasDiagram: true,
    sections: [
      {
        id: "pattern-heating",
        title: "Feeling Pattern Consolidation",
        content: wrap(
          "Neural annealing feels like a warming, softening process where rigid patterns gradually become more fluid and harmonious. You might notice this during meditation or therapy when old tensions begin to dissolve and reorganize into more comfortable configurations."
        )
      },
      {
        id: "harmonic-settling",
        title: "Settling into Harmony",
        content: wrap(
          "As patterns anneal, there's often a felt sense of 'settling' or 'finding the right place.' Conflicting tensions resolve into more stable, lower-energy configurations. This process can feel like puzzle pieces clicking into place or knots untying themselves."
        )
      },
      {
        id: "remodeling-mechanism",
        title: "Structural Remodeling",
        content: wrap(
          "Neural annealing involves the actual restructuring of connection patterns to minimize internal conflict and energy expenditure. In vasocomputation terms, this might correspond to vascular tensions reorganizing themselves into more sustainable and harmonious arrangements."
        )
      }
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