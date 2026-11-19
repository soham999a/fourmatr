export const SITE = {
  name: "Matrka Applied Systems",
  shortName: "MATRKA · APPLIED SYSTEMS",
  origin: "https://appliedsystems.matrka.net",
  tagline: "The invisible architecture behind the future.",
  motto: "Cohered by Design.",
  description:
    "Four intelligences. One architecture. Applied intelligence for enterprise, built in Kolkata, India.",
  microHeader: "APPLIED INTELLIGENCE / KOLKATA-2026",
  contact: {
    email: "system@matrka.net",
    phone: "+91 98756 63417",
    phoneHref: "tel:+919875663417",
    location: "Kolkata, India",
  },
  parent: {
    label: "matrka.net",
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
    heading: "Platforms",
    links: [
      { label: "ARPS", href: "/platforms/arps" },
      { label: "Gravity", href: "/platforms/gravity" },
      { label: "Datum", href: "/platforms/datum" },
      { label: "Humming", href: "/platforms/humming" },
    ],
  },
  {
    heading: "Research",
    links: [
      { label: "Architecture", href: "/architecture" },
      { label: "Whitepapers", href: "/research#publications" },
      { label: "Frameworks", href: "/research#frameworks" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: SITE.contact.email, href: `mailto:${SITE.contact.email}` },
      { label: SITE.contact.location, href: "/contact" },
      { label: SITE.parent.label, href: SITE.parent.href, external: true },
    ],
  },
] as const;
