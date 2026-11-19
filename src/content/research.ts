export interface ResearchFramework {
  id: string;
  name: string;
  kind: string;
  lead: string;
  body: string;
  details: string[];
  href?: string;
}

export const RESEARCH_FRAMEWORKS: ResearchFramework[] = [
  {
    id: "ces-qn",
    name: "CES-QN Framework",
    kind: "Framework",
    lead: "Coherence · Systems · Quantified Reasoning",
    body: "CES-QN is a conservation-law-grounded framework for AI that reasons with physical and causal integrity.",
    details: [
      "Grounded in Noether's theorem",
      "Grounded in the Constructal Law",
      "Grounded in West's scaling principles",
    ],
  },
  {
    id: "omega-model",
    name: "Omega Model",
    kind: "Shared infrastructure",
    lead: "Shared intelligence infrastructure",
    body: "The Omega Model is the shared intelligence infrastructure beneath the platform layer. Gravity is its most direct commercial expression.",
    details: [
      "Shared reasoning substrate",
      "Foundation for enterprise deployments",
    ],
  },
];

export interface Publication {
  id: string;
  kind: string;
  title: string;
  meta: string;
  href?: string;
  external?: boolean;
}

export const PUBLICATIONS: Publication[] = [
  {
    id: "zenodo",
    kind: "Publication",
    title: "CES-QN framework — Zenodo record",
    meta: "Zenodo",
    href: "https://zenodo.org/records/20364601",
    external: true,
  },
  {
    id: "preprint",
    kind: "Preprint · 2026",
    title: "The Architecture of Intelligence: From Discrete Agency to Field-Based Cognition",
    meta: "Preprint · 2026",
  },
  {
    id: "patent",
    kind: "Patent publication",
    title: "Patent Application 202631019776 A (QiDS)",
    meta: "Publication entry",
  },
];

export const RESEARCH_HERO = {
  eyebrow: "Open notebooks, slow questions",
  titleLines: ["Capabilities that begin as", "research."],
  lead: "We publish the questions, frameworks and early work that shape the platforms.",
  index: "01-03",
};

export const RESEARCH_NOTE = {
  eyebrow: "Research note",
  title: "Frontier research, stated honestly",
  body: "These programmes are research-stage. No validated deployment is claimed here; the work is shared so its assumptions can be examined.",
};

export const RESEARCH_STAGE_NOTE =
  "Frontier work is research-stage. No validated deployment is claimed.";
