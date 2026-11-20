# PLAN — Matrka Applied Systems

## Stack

- Next.js 16 (App Router, React 19), TypeScript strict
- Tailwind CSS 4 with CSS-variable design tokens wired via `@theme inline`
- `next/font/google`: Cormorant Garamond (display), Inter (body), IBM Plex Mono (labels)
- CSS IntersectionObserver reveals (reduced-motion safe); Framer Motion only if needed
- Inline SVG for every abstract figure; `next/image` only for raster content (none in scope)
- Typed content in `src/content/*.ts`
- Validation: Zod (client + server); mail: Resend or SMTP via env, otherwise logged fallback
- pnpm, Vercel-ready

## Folder structure

```
src/
  app/
    layout.tsx  page.tsx  not-found.tsx  globals.css
    platforms/page.tsx  platforms/[slug]/page.tsx
    architecture/page.tsx  research/page.tsx  engage/page.tsx  contact/page.tsx
    not-found/page.tsx  api/contact/route.ts
    sitemap.ts  robots.ts  opengraph-image.tsx  icon.svg
  components/
    layout/  ui/  sections/  figures/
  content/
    site.ts  platforms.ts  architecture.ts  research.ts  engage.ts  home.ts
  lib/
    cn.ts  validation.ts  mail.ts  rate-limit.ts  metadata.ts
public/
  favicon assets (generated from app/icon.svg)
docs/
  BRAINSTORM.md  PLAN.md  QA.md
```

## Build phases and acceptance criteria

### Phase 0 — Brainstorm and plan
- [x] Audit all 30 screens (route, sections, inconsistencies)
- [x] Document IA, components, tokens, alternatives, risks, content gaps
- [x] Write stack, structure, phases and checklists

### Phase 1 — Foundation
- [x] Initialise pnpm project, TS strict, ESLint, Tailwind 4 tokens
- [x] Fonts load with fallbacks and no layout shift
- [x] Layout shell: header (desktop + mobile), footer, skip link, bottom nav
- [x] Shared UI components with typed props
- [x] All content data files typed and populated; zero hard-coded platform facts in JSX
- [x] `pnpm lint`, `pnpm typecheck`, `pnpm build` pass at end of phase

### Phase 2 — Home
- [x] Ten sections in screen order, copy and counters match screens
- [x] Hero SVG line field, lightweight, decorative/aria-hidden
- [x] Platform cards, static architecture figure, live rows, audience grid, CTA
- [x] Desktop 1140 reference checked against OCR coordinates

### Phase 3 — Platform pages
- [x] Reusable `PlatformPage` template driven by `platforms.ts`
- [x] Four detail routes with correct hero tone (Gravity dark), modules/pillars, methods, previews
- [x] Per-platform SVG figures, labelled previews
- [x] `/platforms` comparison table (desktop) and stacked cards (mobile) + four alternating rows

### Phase 4 — Architecture, Research, Engage, Contact, 404
- [x] Interactive layer diagram, five layers, keyboard accessible, active description
- [x] Research page with CES-QN, Omega Model, publications, research-stage caveat
- [x] Engage: four shapes, five steps, audiences, FAQ accordion with ARIA
- [x] Contact form with client + server validation, honeypot, rate limit, mail/fallback
- [x] `/api/contact` never exposes secrets; fallback message when unconfigured
- [x] Custom 404

### Phase 5 — Responsive
- [x] Mobile screens (402 CSS px) reproduced: stacked grids, hamburger, bottom nav
- [x] No horizontal scroll at 360, 390, 768, 1024, 1140, 1440, 1920
- [x] Full-width primary buttons on mobile; comparison collapses to cards

### Phase 6 — Polish
- [x] Quiet reveals, hover states, focus-visible rings, reduced-motion safe
- [x] No heavy page transitions

### Phase 7 — SEO, accessibility, performance
- [x] Unique metadata, canonicals, OG/Twitter, generated OG image, sitemap, robots
- [x] JSON-LD Organization + WebSite
- [x] WCAG 2.2 AA: contrast, landmarks, alt/aria-hidden, keyboard, skip link
- [x] Lighthouse run on Home + one platform page; scores recorded in `docs/QA.md`

### Phase 8 — Deploy readiness
- [x] `.env.example`, README (run/build/deploy, Vercel CNAME for `appliedsystems.matrka.net`)
- [x] Security headers, favicon/app icons
- [x] Final verification: lint, typecheck, build, link click-test, `docs/QA.md` complete

## Verification commands

```bash
pnpm lint
pnpm typecheck
pnpm build
pnpm dev
```
