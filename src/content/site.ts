import { PLATFORMS } from "./platforms";

export const SITE = {
  name: "Matrka Applied Systems",
  shortName: "MATRKA · APPLIED SYSTEMS",
  origin: "https://appliedsystems.matrka.net",
  tagline: "The invisible architecture behind the future.",
  motto: "Cohered by Design.",
  description:
    "Four intelligences. One architecture. Applied intelligence for enterprise, built in Kolkata, India.",
  contact: {
    email: "system@matrka.net",
    phone: "+91 98756 63417",
    phoneHref: "tel:+919875663417",
    location: "Kolkata, India",
  },
  parent: {
    label: "MATRKA.NET",
    href: "https://www.matrka.net",
  },
  copyright: "© 2026 Matrka · Cohered by design",
} as const;

export const NAV_ITEMS = [
  { label: "Platforms", href: "/platforms" },
  { label: "Architecture", href: "/architecture" },
  { label: "Research", href: "/research" },
  { label: "Engage", href: "/engage" },
] as const;

export const LEGAL_LINKS = [
  { label: "Privacy", href: "https://privacypolicymatrix.oneapp.dev/" },
  { label: "Terms", href: "https://termsofservice.oneapp.dev/" },
  { label: "Imprint", href: "https://imprintcolophon.oneapp.dev/" },
  { label: "Accessibility", href: "https://accessibilitystatement.oneapp.dev/" },
  {
    label: "Responsible Disclosure",
    href: "https://responsibledisclosure.oneapp.dev/",
  },
] as const;

export const FOOTER_COLUMNS = [
  {
    heading: "Explore",
    links: [
      { label: "Platforms", href: "/platforms" },
      { label: "Architecture", href: "/architecture" },
      { label: "Research", href: "/research" },
      { label: "Engage", href: "/engage" },
    ],
  },
  {
    heading: "Platforms",
    links: PLATFORMS.map((platform) => ({
      label: platform.name,
      href: platform.liveUrl,
      external: true,
    })),
  },
  {
    heading: "Company",
    links: [
      { label: "Correspondence", href: "/contact" },
      { label: SITE.parent.label, href: SITE.parent.href, external: true },
    ],
  },
];
