export type PlatformStatus = "research-mvp" | "in-development" | "prototype" | "live";

/** Public-facing labels used only by the home platform grid. */
export type HomePlatformStatus =
  | "MVP · SAMPLE VERSION"
  | "MVP STAGE"
  | "STATUS NOT STATED";

export const STATUS_LABEL: Record<PlatformStatus, string> = {
  "research-mvp": "Research + MVP",
  "in-development": "In Development",
  prototype: "Prototype",
  live: "Live",
};

export type PlatformSlug = "arps" | "gravity" | "datum" | "humming";

export interface PlatformFeature {
  number: string;
  title: string;
  body: string;
}

export interface Platform {
  slug: PlatformSlug;
  index: number;
  roman: string;
  capability: string;
  name: string;
  oneLiner: string;
  status: PlatformStatus;
  homeDomain: string;
  homeStatus: HomePlatformStatus;
  homeType: string;
  homeBody: string;
  homeCtaLabel: string;
  homeImage: string;
  homeImageOpacity: number;
  liveUrl: string;
  tone: "light" | "dark";
  heroLead: string;
  statement: string;
  figure: "arps" | "gravity" | "datum" | "humming";
  featuresHeading: string;
  features: PlatformFeature[];
  methodHeading?: string;
  methodLead?: string;
  method?: PlatformFeature[];
  asideHeading?: string;
  asideBody?: string;
  reasoning?: string[];
  previewLabel: string;
  secondaryCta: { label: string; href: string };
  closingLead: string;
  audience?: string[];
  example?: string;
  note?: string;
}

export const PLATFORMS: Platform[] = [
  {
    slug: "arps",
    index: 1,
    roman: "I",
    capability: "Supply Chain Intelligence",
    name: "ARPS",
    oneLiner: "Autonomous procurement and resilient supply chain decisions",
    status: "research-mvp",
    homeDomain: "I / SUPPLY CHAIN",
    homeStatus: "MVP · SAMPLE VERSION",
    homeType: "Autonomous Resilient Procurement System",
    homeBody:
      "Autonomous procurement and resilient supply-chain decisions. Its public page presents a 2026 conceptual sample using synthetic data.",
    homeCtaLabel: "Explore ARPS",
    homeImage: "/platforms/arps-supply-chain.jpg",
    homeImageOpacity: 0.78,
    liveUrl: "https://aps-intelligence.vercel.app/",
    tone: "light",
    heroLead: "Resilient decisions across procurement, logistics and risk.",
    statement:
      "Supply chains break when risk arrives from several directions at once and decisions move more slowly than the disruption.",
    figure: "arps",
    featuresHeading: "Five Layers of Intelligence",
    features: [
      {
        number: "01",
        title: "Demand Forecasting",
        body: "See demand as a changing signal, not a fixed assumption.",
      },
      {
        number: "02",
        title: "Procurement Intelligence",
        body: "Compare options against cost, continuity and consequence.",
      },
      {
        number: "03",
        title: "Inventory Intelligence",
        body: "Hold the right resilience in the right places.",
      },
      {
        number: "04",
        title: "Logistics Optimisation",
        body: "Reconfigure movement as constraints change.",
      },
      {
        number: "05",
        title: "Risk Intelligence",
        body: "Fuse weak signals before they become a break.",
      },
    ],
    asideHeading: "How it reasons",
    asideBody: "Reasoning methods behind the platform.",
    reasoning: [
      "Multi-source risk fusion",
      "Graph-based contagion modelling",
      "Digital-twin simulation",
      "Multi-objective optimisation",
      "Governed agentic procurement",
    ],
    previewLabel: "Interface preview",
    secondaryCta: { label: "Request a pilot", href: "/contact?platform=arps" },
    closingLead: "Decisions that hold when conditions change.",
    note: "Research-stage system with a working MVP. No validated deployment is claimed.",
  },
  {
    slug: "gravity",
    index: 2,
    roman: "II",
    capability: "Computational Adaptive Intelligence",
    name: "Gravity",
    oneLiner: "Multi-agent decision intelligence that reconfigures its own reasoning",
    status: "in-development",
    homeDomain: "II / ADAPTIVE COMPUTATION",
    homeStatus: "MVP STAGE",
    homeType: "Computational Adaptive Intelligence",
    homeBody:
      "Multi-agent decision intelligence that adapts its reasoning strategy to the problem.",
    homeCtaLabel: "Explore Gravity",
    homeImage: "/platforms/gravity-computational.jpg",
    homeImageOpacity: 0.82,
    liveUrl: "https://gravity.matrka.net/",
    tone: "dark",
    heroLead: "Intelligence that chooses its own way of thinking.",
    statement:
      "Gravity reconfigures its reasoning strategy to fit the structure of the problem rather than applying one fixed algorithm.",
    figure: "gravity",
    featuresHeading: "Pillars of adaptive intelligence",
    features: [
      {
        number: "01",
        title: "Multi-Agent Coordination",
        body: "Agents divide a decision into perspectives, then deliberate across a shared state.",
      },
      {
        number: "02",
        title: "Causal Reasoning",
        body: "The system asks what changes what, not only what correlates.",
      },
      {
        number: "03",
        title: "Adaptive Inference",
        body: "The route to an answer changes when the problem changes.",
      },
    ],
    methodHeading: "The Method",
    methodLead: "A decision, step by step",
    method: [
      { number: "01", title: "Name the decision", body: "" },
      { number: "02", title: "Select reasoning strategy", body: "" },
      { number: "03", title: "Agents deliberate", body: "" },
      { number: "04", title: "Explainable recommendation", body: "" },
    ],
    asideHeading: "Relationship to the Omega Model",
    asideBody:
      "Gravity is the most direct commercial expression of the Omega Model and the foundation for enterprise deployments.",
    previewLabel: "Interface preview",
    secondaryCta: { label: "Discuss a deployment", href: "/contact?platform=gravity" },
    closingLead: "Choose the way of thinking.",
    note: "In development. No validated deployment is claimed.",
  },
  {
    slug: "datum",
    index: 3,
    roman: "III",
    capability: "Analytics Intelligence",
    name: "Datum",
    oneLiner: "Natural language analytics and self-service BI",
    status: "prototype",
    homeDomain: "III / ANALYTICS",
    homeStatus: "STATUS NOT STATED",
    homeType: "Analytics Intelligence",
    homeBody:
      "Natural-language analytics and self-service business intelligence for data-to-decision work.",
    homeCtaLabel: "Explore Datum",
    homeImage: "/platforms/datum-analytics.jpg",
    homeImageOpacity: 0.76,
    liveUrl: "https://datum-nine-henna.vercel.app/",
    tone: "light",
    heroLead: "Ask your data. Understand the answer.",
    statement:
      "Advanced analytics for organisations without a dedicated data science team.",
    figure: "datum",
    featuresHeading: "The Platform",
    features: [
      {
        number: "01",
        title: "Natural Language Analytics",
        body: "Ask questions in plain language and trace the answer.",
      },
      {
        number: "02",
        title: "Self-Service BI",
        body: "Move from exploration to a shared view without a specialist queue.",
      },
      {
        number: "03",
        title: "Enterprise Reporting",
        body: "Make recurring reporting clear, consistent and useful.",
      },
      {
        number: "04",
        title: "Decision Support",
        body: "Carry evidence into the moment of choice.",
      },
    ],
    methodHeading: "The Method",
    methodLead: "From question to decision",
    method: [
      { number: "01", title: "Ask in plain language", body: "" },
      { number: "02", title: "See the analysis", body: "" },
      { number: "03", title: "Act with decision support", body: "" },
    ],
    example: "Which product line slowed down last quarter, and why?",
    previewLabel: "Interface preview",
    secondaryCta: { label: "Join the MSME pilot", href: "/contact?platform=datum" },
    closingLead: "Make the answer usable.",
    audience: ["MSMEs", "Business teams", "Finance and operations leads", "Decision makers"],
    note: "Prototype. An MSME pilot is in progress; no validated deployment is claimed.",
  },
  {
    slug: "humming",
    index: 4,
    roman: "IV",
    capability: "Operational Intelligence",
    name: "Humming",
    oneLiner: "An AI copilot for executive decisions and continuous monitoring",
    status: "research-mvp",
    homeDomain: "IV / OPERATIONS",
    homeStatus: "STATUS NOT STATED",
    homeType: "Operational Intelligence · linked page: NEXORA AI",
    homeBody:
      "The linked public page currently presents NEXORA AI by MATRIX for retail, FMCG and distribution operations.",
    homeCtaLabel: "Explore linked site",
    homeImage: "/platforms/humming-operations.jpg",
    homeImageOpacity: 0.78,
    liveUrl: "https://humming-amber.vercel.app/",
    tone: "light",
    heroLead: "An AI copilot for the people who run the business.",
    statement:
      "Executive dashboards, decision intelligence, management AI and continuous monitoring, unified into one operational layer.",
    figure: "humming",
    featuresHeading: "Five capabilities",
    features: [
      {
        number: "01",
        title: "Executive Dashboards",
        body: "A calm view of what needs attention.",
      },
      {
        number: "02",
        title: "Decision Intelligence",
        body: "Move from signals to considered choices.",
      },
      {
        number: "03",
        title: "Management AI",
        body: "A reasoning partner for the work between meetings.",
      },
      {
        number: "04",
        title: "Business Monitoring",
        body: "Keep a continuous read on the operating system.",
      },
      {
        number: "05",
        title: "AI Copilot",
        body: "Ask, inspect and act without losing context.",
      },
    ],
    methodHeading: "A day with the copilot",
    method: [
      {
        number: "01",
        title: "Morning brief",
        body: "Start with a clear view of what changed and what matters.",
      },
      {
        number: "02",
        title: "Live monitoring",
        body: "Keep the operating signals visible as the day unfolds.",
      },
      {
        number: "03",
        title: "Decision support",
        body: "Inspect the context behind a choice before acting.",
      },
      {
        number: "04",
        title: "End-of-day review",
        body: "Close the loop with a considered record of the day.",
      },
    ],
    asideHeading: "Frequency Intelligence · Operational Wellness",
    asideBody: "A continuous reading of how the organisation is moving.",
    previewLabel: "Interface preview",
    secondaryCta: { label: "Request a walkthrough", href: "/contact?platform=humming" },
    closingLead: "Keep the business in view.",
    note: "Research-stage system with a working MVP. No validated deployment is claimed.",
  },
];

export function getPlatform(slug: string): Platform | undefined {
  return PLATFORMS.find((platform) => platform.slug === slug);
}
