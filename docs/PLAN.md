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
- [ ] Initialise pnpm project, TS strict, ESLint, Tailwind 4 tokens
- [ ] Fonts load with fallbacks and no layout shift
- [ ] Layout shell: header (desktop + mobile), footer, skip link, bottom nav
- [ ] Shared UI components with typed props
- [ ] All content data files typed and populated; zero hard-coded platform facts in JSX
- [ ] `pnpm lint`, `pnpm typecheck`, `pnpm build` pass at end of phase

### Phase 2 — Home
- [ ] Ten sections in screen order, copy and counters match screens
- [ ] Hero SVG line field, lightweight, decorative/aria-hidden
- [ ] Platform cards, static architecture figure, live rows, audience grid, CTA
- [ ] Desktop 1140 reference checked against OCR coordinates

### Phase 3 — Platform pages
- [ ] Reusable `PlatformPage` template driven by `platforms.ts`
- [ ] Four detail routes with correct hero tone (Gravity dark), modules/pillars, methods, previews
- [ ] Per-platform SVG figures, labelled previews
- [ ] `/platforms` comparison table (desktop) and stacked cards (mobile) + four alternating rows

### Phase 4 — Architecture, Research, Engage, Contact, 404
- [ ] Interactive layer diagram, five layers, keyboard accessible, active description
- [ ] Research page with CES-QN, Omega Model, publications, research-stage caveat
- [ ] Engage: four shapes, five steps, audiences, FAQ accordion with ARIA
- [ ] Contact form with client + server validation, honeypot, rate limit, mail/fallback
- [ ] `/api/contact` never exposes secrets; fallback message when unconfigured
- [ ] Custom 404

### Phase 5 — Responsive
- [ ] Mobile screens (402 CSS px) reproduced: stacked grids, hamburger, bottom nav
- [ ] No horizontal scroll at 360, 390, 768, 1024, 1140, 1440, 1920
- [ ] Full-width primary buttons on mobile; comparison collapses to cards

### Phase 6 — Polish
- [ ] Quiet reveals, hover states, focus-visible rings, reduced-motion safe
- [ ] No heavy page transitions

### Phase 7 — SEO, accessibility, performance
- [ ] Unique metadata, canonicals, OG/Twitter, generated OG image, sitemap, robots
- [ ] JSON-LD Organization + WebSite
- [ ] WCAG 2.2 AA: contrast, landmarks, alt/aria-hidden, keyboard, skip link
- [ ] Lighthouse run on Home + one platform page; scores recorded in `docs/QA.md`

### Phase 8 — Deploy readiness
- [ ] `.env.example`, README (run/build/deploy, Vercel CNAME for `appliedsystems.matrka.net`)
- [ ] Security headers, favicon/app icons
- [ ] Final verification: lint, typecheck, build, link click-test, `docs/QA.md` complete

## Verification commands

```bash
pnpm lint
pnpm typecheck
pnpm build
pnpm dev
```
