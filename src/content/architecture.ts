export interface ArchitectureLayer {
  id: string;
  number: string;
  name: string;
  shortName: string;
  detail: string;
  shortDetail: string;
  note: string;
}

export const ARCHITECTURE_LAYERS: ArchitectureLayer[] = [
  {
    id: "platforms",
    number: "L01",
    name: "Platforms",
    shortName: "Platforms",
    detail: "ARPS, Gravity, Datum, Humming",
    shortDetail: "ARPS · Gravity · Datum · Humming",
    note: "Four points of entry, each built for a different decision. The purposes differ; the reasoning beneath them is shared.",
  },
  {
    id: "platform-layer",
    number: "L02",
    name: "Platform Layer",
    shortName: "Platform Layer",
    detail: "APIs, integration architecture, SaaS delivery, enterprise connectors",
    shortDetail: "APIs · Connectors",
    note: "Delivery and integration make the reasoning usable inside real enterprise systems without exposing its internals.",
  },
  {
    id: "reasoning-layer",
    number: "L03",
    name: "Reasoning Layer",
    shortName: "Reasoning Layer",
    detail: "Omega Model, CES-QN Framework, structured inference engine",
    shortDetail: "Omega Model · CES-QN",
    note: "The structured inference core. Reasoning strategy is selected and governed here rather than hard-wired into each product.",
  },
  {
    id: "knowledge-layer",
    number: "L04",
    name: "Knowledge Layer",
    shortName: "Knowledge Layer",
    detail: "domain ontologies, validated datasets, research IP, institutional memory",
    shortDetail: "Validated domain memory",
    note: "Domain structure and validated memory give the system something durable to reason over, beyond a single interaction.",
  },
  {
    id: "shared-ai-layer",
    number: "L05",
    name: "Shared AI Layer",
    shortName: "Shared AI Layer",
    detail: "foundation models, causal reasoning, adaptive inference, knowledge representation",
    shortDetail: "Foundation models",
    note: "The shared substrate: models and methods that serve every platform above it.",
  },
];

export const ARCHITECTURE_PRINCIPLES = [
  {
    number: "01",
    title: "Intelligence before automation",
    body: "First understand the decision, then decide what should be automated.",
  },
  {
    number: "02",
    title: "Architecture before applications",
    body: "Durable capability comes from the relationships beneath the interface.",
  },
  {
    number: "03",
    title: "Human and artificial intelligence evolve together",
    body: "The system should clarify human agency, not conceal it.",
  },
];

export const ARCHITECTURE_INTRO =
  "The platforms differ in purpose. The intelligence beneath them is deliberately shared.";

export const COMPOUNDING = {
  eyebrow: "Compounding Effect",
  title: "Why it compounds",
  lead: "Capabilities developed for one platform become available to the next.",
  platforms: ["ARPS", "GRAVITY", "DATUM", "HUMMING"],
  label: "Reasoning investment",
};

export const HOME_ARCHITECTURE_NOTE =
  "A shared architecture lets each platform inherit the reasoning work of the others.";
