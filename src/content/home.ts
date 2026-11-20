import { PLATFORMS } from "./platforms";
import { PUBLICATIONS } from "./research";

export const HOME_HERO = {
  eyebrow: "Independent applied intelligence · Kolkata, India",
  titleLines: ["Four intelligences.", "One architecture."],
  lead: "Decision, supply chain, analytics and operations — built on a shared intelligence architecture.",
  primary: { label: "Explore the architecture", href: "/architecture" },
  secondary: { label: "Meet the platforms", href: "/platforms" },
  counter: "01 : OF : 04",
  scroll: "Descend",
};

export const HOME_SYSTEM = {
  titleLines: ["Distinct domains.", "Common foundations."],
  body: "MATRKA's connected intelligence architecture. Four specialized domains connect through a shared reasoning core and knowledge foundation.",
};

export const HOME_POSITION = {
  index: "01 — PRINCIPLE",
  eyebrow: "THE MATRKA POINT OF VIEW",
  lines: [
    "We do not build",
    "disconnected software.",
    "We build the conditions under which intelligence can be trusted.",
  ],
  body: "Architecture before applications. Research beneath reasoning. Context carried across decisions. MATRKA develops connected systems where each domain has its own purpose—and a place within a larger whole.",
  cta: { label: "See how the system connects", href: "/architecture" },
  principles: [
    { number: "01", title: "Research as foundation" },
    { number: "02", title: "Context before answer" },
    { number: "03", title: "Architecture over isolation" },
    { number: "04", title: "Impact through application" },
  ],
};

export const HOME_PLATFORMS = {
  index: "02 — PLATFORMS",
  eyebrow: "FOUR EXPRESSIONS / ONE SYSTEM",
  titleLines: ["Intelligence,", "in its domains."],
  body: "Purpose-built applications grounded in a shared architectural direction. Each is a distinct expression—not a disconnected point solution.",
  footnote:
    "The public Humming URL currently presents a different product name. Current development stages for Datum and Humming are not stated.",
  cards: PLATFORMS.map((platform) => ({
    slug: platform.slug,
    domain: platform.homeDomain,
    status: platform.homeStatus,
    name: platform.name,
    type: platform.homeType,
    body: platform.homeBody,
    ctaLabel: platform.homeCtaLabel,
    image: platform.homeImage,
    imageOpacity: platform.homeImageOpacity,
    href: platform.liveUrl,
  })),
};

export const HOME_RESEARCH = {
  index: "05 — RESEARCH",
  eyebrow: "PUBLICATIONS & FRAMEWORKS",
  titleLines: ["Grounded in", "original research."],
  body: "Explore MATRKA's current Zenodo records on supply-chain resilience and adaptive computational intelligence.",
  publications: PUBLICATIONS.filter((publication) =>
    ["arps-preprint", "gravity-framework"].includes(publication.id),
  ),
  cta: { label: "Full research index", href: "/research" },
};

export const HOME_COLLABORATION = {
  index: "CONTACT",
  eyebrow: "SELECTIVE BY DESIGN",
  titleLines: ["FOR THE SYSTEMS", "THAT MATTER"],
  lead: "The door is narrow on purpose.",
  body: "We welcome thoughtful conversations with enterprises, institutions, researchers, funders and technology partners working on consequential systems.",
  note: "A small number of carefully considered engagements each year.",
  cta: { label: "Begin a correspondence", href: "/contact" },
};
