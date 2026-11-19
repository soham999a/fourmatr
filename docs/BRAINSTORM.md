# BRAINSTORM — Matrka Applied Systems

Phase 0 design and content audit. Sources: all 30 PNG screens in `ui screens/` (2× DPR exports, desktop = 2280×N CSS 1140, mobile = 804×N CSS 402), the project brief, and the Figma board URL (board returned HTTP 403 without authentication, so the exported PNGs are the source of truth).

> Extraction note: the screens were audited by full-document OCR with coordinates plus pixel/colour analysis (the agent cannot view raster files directly). Every file was processed; coordinates below are CSS pixels unless stated. Text marked *OCR* was reconstructed where the OCR dropped a word; the typed content files use the brief's canonical wording.

---

## 1. Design audit

### 1.1 Screen inventory

| # | File | Route | Viewport | Sections observed (top → bottom) |
|---|---|---|---|---|
| 1 | `Home.png` | `/` | 1140 | Nav → Hero (eyebrow, "Four intelligences. / One architecture.", 2 buttons, 01 : OF : 04, DESCEND) → Position statement → The Platforms (2×2 cards) → The Architecture (layer diagram + note) → Live Now (4 rows) → Research Foundation → Who We Work With → Engagement CTA → Footer |
| 2 | `Home (1).png` | `/` | 1140 | Alternate/shorter Home export (CSS h 4722 vs 6299). Same section vocabulary; retained as a spacing/hierarchy cross-check. |
| 3 | `Home Mobile.png` | `/` | 402 | Same ten sections, stacked; nav collapses to wordmark + counter, bottom nav bar with Platforms / Architecture / Research / Engage |
| 4 | `Platforms.png` | `/platforms` | 1140 | Nav → Page hero → comparison matrix → four alternating platform rows → CTA → Footer |
| 5 | `Platforms (1).png` | `/platforms` | 1140 | Alternate export with a tinted (`#ECE7DE`) comparison panel; preferred reference for the table treatment |
| 6 | `Platforms Mobile.png` | `/platforms` | 402 | Stacked hero → swipeable platform cards → CTA → Footer + bottom nav |
| 7 | `ARPS.png` | `/platforms/arps` | 1140 | Nav → "PLATFORMS / ARPS" → hero → position statement → Five Layers of Intelligence → How it reasons (truncated export, CSS h 2396; no footer) |
| 8 | `ARPS (1).png` | `/platforms/arps` | 1140 | Complete export (CSS h 3068): hero → position → five modules → reasoning methods → trace/shared-state figure → CTA → Footer. **Preferred reference.** |
| 9 | `ARPS Mobile.png` | `/platforms/arps` | 402 | Same sections, stacked; module rows, figure, CTA, footer + bottom nav |
| 10 | `Gravity.png` | `/platforms/gravity` | 1140 | Long dark export (CSS h 3548) — same section family as `Gravity (1)` |
| 11 | `Gravity (1).png` | `/platforms/gravity` | 1140 | Dark export (CSS h 2594): nav → PLATFORMS / GRAVITY → hero → The Core Idea → 3 pillars → The Method (4 steps) → Omega Model relationship → Interface preview → CTA → Footer. **Preferred reference.** |
| 12 | `Gravity Mobile.png` | `/platforms/gravity` | 402 | Dark, stacked; same sections + bottom nav |
| 13 | `Datum.png` | `/platforms/datum` | 1140 | Long export (CSS h 3991): nav → hero → Advanced-analytics statement → The Platform (4 features) → The Method (3 steps) → Example → Product preview (Interface preview) → Who it is for → CTA → Footer |
| 14 | `Datum (1).png` | `/platforms/datum` | 1140 | Shorter export (CSS h 2844) with right-hand hero column; same section vocabulary. **Preferred reference for hero split.** |
| 15 | `Datum Mobile.png` | `/platforms/datum` | 402 | Stacked, same sections; bottom nav |
| 16 | `Humming.png` | `/platforms/humming` | 1140 | Nav → hero → statement → capability list → "Frequency Intelligence · Operational Wellness" → interface preview → CTA → Footer |
| 17 | `Humming (1).png` | `/platforms/humming` | 1140 | Alternate export (CSS h 3587); same vocabulary |
| 18 | `Humming Mobile.png` | `/platforms/humming` | 402 | Stacked equivalent |
| 19 | `Architecture.png` | `/architecture` | 1140 | Nav → THE INVISIBLE ARCHITECTURE hero → intro → SHARED INTELLIGENCE ARCHITECTURE diagram (5 layers + LAYER NOTE) → Principles (3) → Compounding effect → Footer. **Preferred reference.** |
| 20 | `Architecture (1).png` | `/architecture` | 1140 | Alternate export (CSS h 2295), same sections, slightly denser diagram |
| 21 | `Architecture Mobile.png` | `/architecture` | 402 | Stacked diagram (layers then note), principles stacked, compounding rows + bottom nav |
| 22 | `Research.png` | `/research` | 1140 | Nav → RESEARCH FOUNDATION hero → CES-QN → Omega Model → publications → CTA → Footer |
| 23 | `Research (1).png` | `/research` | 1140 | Alternate export with a `#E7E4DD` publication panel |
| 24 | `Research Mobile.png` | `/research` | 402 | Stacked equivalent + bottom nav |
| 25 | `Engage.png` | `/engage` | 1140 | Nav → ENGAGE hero ("We begin with the decision, not the model.") → 4 engagement shapes → The Process (5 steps) → Who we work with → Questions (FAQ) → Footer |
| 26 | `Engage (1).png` | `/engage` | 1140 | Alternate export (CSS h 2466); **preferred reference** for card durations and FAQ wording |
| 27 | `Engage Mobile.png` | `/engage` | 402 | Stacked cards/process/FAQ + bottom nav |
| 28 | `Contact.png` | `/contact` | 1140 | Nav → "BEGIN A CORRESPONDENCE" / "Write to us." → left contact details, right form (Name, Organisation, Email, Platform of interest, Message, Send correspondence, reassurance line) → Footer |
| 29 | `Contact (1).png` | `/contact` | 1140 | Alternate export with top micro-header; same form. **Preferred reference.** |
| 30 | `Contact Mobile.png` | `/contact` | 402 | Stacked details then form + bottom nav |
| — | `matrka_audit_reel_voiceover.mp4`, `WhatsApp Video …mp4` | — | — | Reference videos only; no video/audio is embedded in the site (brief does not ask for it). |

No 404 screen was exported. It will be built in the established style using the Home hero + Engage CTA language.

### 1.2 Inconsistencies between screens (resolved choices in brackets)

1. **Two palettes.** Home is near-black (`#000000` base with `#020101`/`#020201` fields) with gold `#CDA448`; Gravity is ink `#070502`; every other page is Bone `#F6F3EE` with gold `#C09426`. [Keep both, as designed: `--gold-home` and `--gold`; dark home/gravity, light elsewhere.]
2. **Two nav treatments.** Primary screens use a two-line wordmark "APPLIED / MATRKA / SYSTEMS" plus centred links; `(1)` exports use one line "MATRKA · APPLIED SYSTEMS" and add a top micro-header "APPLIED INTELLIGENCE / KOLKATA-2026". [Use the single-line wordmark + micro-header; it is the more complete, current treatment. Keep the same link set and gold-outline CTA everywhere.]
3. **Truncated exports.** `ARPS.png` and `Datum.png` are missing later sections/footer. [Use the `(1)` variants as canonical and fill from the prompt where OCR is incomplete.]
4. **Status wording/casing.** "Research + MVP", "In Development", "Prototype" appear in cards; "LIVE NOW" is a Home section label even though some platforms are research-stage. [Keep status text in one content file; rename the Home section eyebrow to "FOUR POINTS OF ENTRY" only if needed — design wins, so keep "LIVE NOW" as the eyebrow but never imply deployment maturity in body copy.]
5. **Counter formats.** `01 : OF : 04`, `I - IV`, `01–04`, `01-of-03`, `Figure 01`, `L01…L05`. [Standardise component as `FigureCounter` with `format` prop; preserve each screen's literal label.]
6. **Button labels.** Home uses "EXPLORE THE PLATFORMS"/"READ THE RESEARCH"; platform pages use "OPEN LIVE PLATFORM ↗" plus a secondary ("REQUEST A PILOT", "DISCUSS A DEPLOYMENT", "JOIN THE MSME PILOT"). [Use one filled gold primary + one thin-outline secondary per hero.]
7. **Layer labels drift.** Home diagram: "APIs · Connectors", "Omega Model · CES-QN", "Validated domain memory", "Foundation models". Architecture page: full names per the brief. [Use brief's canonical layer copy; Home diagram uses the short forms as shown.]
8. **Platform count language.** Home says "Four intelligences, held by a single hand"; Platforms page uses a comparison matrix. [Both retained.]
9. **Footer variants.** Mobile adds a bottom nav bar (Platforms/Architecture/Research/Engage) that desktop lacks. [Implement mobile-only fixed bottom nav with `aria-label`; add body padding to avoid overlap.]
10. **Typography scale drift** between the taller and shorter exports (hero 96 CSS px vs ~80). [Use fluid `clamp()` anchored to the 1140 reference so both feel right across 360–1920.]

---

## 2. Information architecture

### Sitemap

```
/                         Home — 10 sections
/platforms                Comparison matrix + four alternating rows
/platforms/arps           Platform detail (template)
/platforms/gravity        Platform detail (template, dark)
/platforms/datum          Platform detail (template)
/platforms/humming        Platform detail (template)
/architecture             Interactive 5-layer diagram + principles + compounding
/research                 CES-QN, Omega Model, publications (research-stage caveat)
/engage                   Four shapes, five-step process, audiences, FAQ
/contact                  Correspondence form + direct contact details
/not-found                Custom 404 (also served for unknown routes)
/api/contact              POST: validation, honeypot, rate limit, mail/fallback
```

### Navigation model

Persistent header: wordmark → `/`, links **Platforms / Architecture / Research / Engage**, "Parent: matrka.net ↗" (external, new tab), gold-outline **Begin a Correspondence** → `/contact`. Active route marked with `aria-current="page"` and a gold hairline.

Visitor journeys:

1. Home hero → *Explore the platforms* → `/platforms` → platform row/card → detail page → **Open live platform ↗** (real subdomain, new tab) or secondary CTA → `/contact`.
2. Home architecture section → `/architecture` → layer detail → Research → `/contact`.
3. Home research section → `/research` → Zenodo publication ↗ → `/engage` → `/contact`.
4. Any page → header CTA / footer → `/contact` → submit → success state or mail fallback.
5. Mobile: fixed bottom nav mirrors the four primary routes.

Breadcrumb-style eyebrow on platform pages: `PLATFORMS / ARPS`; other pages use the section eyebrow only.

---

## 3. Component inventory

Shared (all pages):

| Component | Props | Notes |
|---|---|---|
| `Container` | `className`, `as` | Max 1140 reference, 56px desktop gutter, 28px mobile |
| `Eyebrow` | `children`, `tone` (ink/bone/gold), `align`, `className` | Mono uppercase, 0.22em tracking |
| `Button` | `href`, `variant` (primary/outline/ghost), `external`, `size`, `children`, `fullWidth` | Filled gold primary; 1px hairline outline |
| `StatusBadge` | `status: PlatformStatus` | Pill, variant from single status map in content |
| `SectionHeader` | `eyebrow`, `title`, `index?`, `total?`, `aside?`, `tone` | Roman numeral/counter support |
| `FigureCounter` | `value`, `format` (`ratio`/`roman`/`figure`/`layer`), `label` | Decorative, `aria-hidden` when redundant |
| `HairlineCard` | `title`, `body`, `index?`, `footer?`, `href?`, `tone` | 1px border, no shadow |
| `SiteHeader` | `pathname` | Desktop links + mobile hamburger + micro-header |
| `MobileNav` | `open`, `onClose` | Overlay sheet + fixed bottom nav |
| `SiteFooter` | — | Four columns, legal links, copyright |
| `Reveal` | `children`, `delay`, `as` | CSS/IO fade+rise, reduced-motion safe |
| `Rule` | `tone`, `accent?` | 1px divider, optional gold |
| `PageHero` | `eyebrow`, `title`, `lead`, `status?`, `actions?`, `tone`, `figure?` | Shared hero for inner pages |
| `InterfacePreview` | `label`, `panels`, `rows` | Clearly labelled "Interface preview"; generic Metric A/B labels only |
| `ArrowLink` | `href`, `children`, `external` | Thin underline-on-hover text link |

Page-specific:

| Component | Props | Page |
|---|---|---|
| `HeroField` | `variant` (`home`/`gravity`) | Home, Gravity hero — inline SVG line field |
| `PlatformCard` | `platform` | Home 2×2 grid |
| `LayerDiagram` | `layers`, `activeLayer`, `onSelect` | Home (static), Architecture (interactive) |
| `LiveEntryRow` | `platform` | Home Live Now |
| `ComparisonTable` | `platforms` | Platforms; desktop table, mobile cards |
| `PlatformRow` | `platform`, `flip` | Platforms alternating rows |
| `ReasonFigure` | `kind` (`arps`/`gravity`/`datum`/`humming`) | Platform detail heroes/figures |
| `MethodSteps` | `steps` | Gravity/Datum detail |
| `ModuleList` | `modules`, `numbered` | ARPS/Datum/Humming detail |
| `FaqAccordion` | `items` | Engage; button + `aria-expanded`/`aria-controls` |
| `EngagementCard` | `shape` | Engage |
| `ProcessList` | `steps` | Engage |
| `ContactForm` | `platforms` | Contact; client validation + honeypot |

---

## 4. Design tokens extracted from screens

| Token | Value | Evidence |
|---|---|---|
| `--ink` | `#070502` | Inner pages, hairline text, dark surfaces |
| `--ink-home` | `#000000` | Home canvas; layered with `#020101`, `#020201` |
| `--bone` | `#F6F3EE` | Inner page canvas, 78–96% of pixels |
| `--bone-panel` | `#FBFAF7` | Diagram/panel fill (Architecture, Engage, Humming) |
| `--bone-tint` | `#E7E4DD` / `#ECE7DE` | Research/Datum and Platforms panel fills |
| `--gold` | `#C09426` | Inner-page accent, rules, badges |
| `--gold-home` | `#CDA448` | Home accent |
| `--line` | `#C8C4BC` | 1px hairlines on Bone; full-width rules at x 56–1099 |
| `--line-dark` | `#45423B` / `#363531` | Hairlines and figure strokes on dark |
| `--muted` | `#5F5C55`, `#807E79`, `#A29F9B` | Secondary text on light/dark |
| Display font | Cormorant Garamond (fallback: closest high-contrast serif) | OCR glyph shapes, tight leading |
| Body font | Inter | Neutral grotesque body copy |
| Mono font | IBM Plex Mono (fallback JetBrains Mono) | Uppercase eyebrows, counters |
| Type scale (CSS px @1140) | eyebrow 11, nav 13, small body 14, body 18–20, H3 24–30, H2 40–56, H1 64–96 | OCR box heights × ~1.3 |
| Leading | headlines 0.92–1.02; body 1.5–1.6 | Line positions in OCR |
| Tracking | eyebrows/labels 0.18–0.24em; headlines −0.02em | Measured text widths |
| Spacing | 8 / 12 / 16 / 24 / 32 / 48 / 64 / 96 / 128 px; section padding 96–128 | Section gaps and card rhythm |
| Grid | 12 columns; 56px outer gutter @1140; 2-column cards at x 56→595 and 621→1099 | Hairline and card x positions |
| Radius | 0–2px (cards squared), pills 999px only for status badges | Screen edges |
| Borders | 1px hairline, no shadows | All cards and dividers |
| Motion | Quiet 300–600ms ease-out fade + 8–12px rise; gold hover rules; no parallax/heavy transitions | Brand mood; brief |

---

## 5. Alternative approaches for the hard parts

### 5.1 Hero background field (Home / Gravity)
- **A — Inline SVG, deterministic paths:** generate 40–70 Bézier curves once at module scope, render as `<path>` with `vectorEffect="non-scaling-stroke"`, low opacity. Zero runtime cost, crisp, SSR-safe, easy `aria-hidden`.
- **B — Canvas with requestAnimationFrame:** drifting field; richer but costs CPU, complicates reduced-motion and SSR.
- **C — CSS repeating gradients + masks:** cheapest, but cannot achieve the organic intersecting-line figure.
- **Chosen: A.** Pixel-close to the reference line figure, performant, static (motion lives in the reveal layer only).

### 5.2 Layered architecture diagram
- **A — CSS grid of interactive `<button>` rows:** semantic, keyboard-accessible, trivial to restyle for mobile, hairline borders and gold active state match the screens.
- **B — SVG stacked isometric blocks:** visually closer to a "stack" but poor text accessibility and awkward responsive reflow.
- **C — Canvas/WebGL:** overkill.
- **Chosen: A**, with a thin inline SVG connector rail drawn beside the rows (decorative, `aria-hidden`).

### 5.3 Comparison table → mobile cards
- **A — One semantic `<table>` with CSS `display:block` at <768px and `data-label` pseudo-content:** one source of truth, accessible table semantics on desktop; mobile becomes stacked rows.
- **B — Two separate DOM trees (table + cards):** easiest styling, duplicates content and risks drift.
- **C — Horizontal scroll table only:** fails the brief's "swipeable cards" requirement and hides columns.
- **Chosen: A**, with a `role="region"`, `tabindex=0`, `aria-label` scroll container for the small-screen card view.

### 5.4 Scroll/reveal motion
- **A — CSS-only with IntersectionObserver adding a class:** tiny, no runtime animation library needed for simple fades, respects `prefers-reduced-motion` in CSS.
- **B — Framer Motion `whileInView`:** elegant but adds ~30 kB and more moving parts.
- **C — No motion:** safe but loses the quiet editorial feel.
- **Chosen: A** for section reveals; Framer Motion only if a later page transition needs it (likely unnecessary).

---

## 6. Risks and open questions

| Risk / question | Conservative resolution |
|---|---|
| Two gold values (`#C09426` vs `#CDA448`) | Both implemented as tokens; Home uses `--gold-home`, all other pages `--gold`. Owner can unify later. |
| Figma board 403 | Exported PNGs treated as authoritative; no guessing from the board. |
| OCR cannot read some decorative micro-labels | Decorative SVGs get `aria-hidden`; only brief-sanctioned copy is rendered as text. |
| `(1)` vs non-`(1)` exports disagree | `(1)` treated as the later, more complete export; noted per screen in audit. |
| Status wording conflict (brief says parent site flips to "Live") | Single `platforms.ts` status map; one edit changes every surface. |
| No mail credentials | API logs server-side and returns a clear "write to system@matrka.net" fallback. No secrets client-side. |
| In-memory rate limiting is per-instance | Documented in README; acceptable for launch, swap to store if scaled. |
| "Interface preview" dashboards | Generic Metric A/B and agent/trace labels only; never real data or client names. |
| No 404 design | Built from Home hero + Engage CTA language; documented as intentional deviation. |
| Font availability offline | `next/font` fetches at build; lockfile + README note. Fallbacks declared in CSS. |
| Blocking questions? | None. All decisions reversible and documented. |

---

## 7. Content gaps (honest placeholders only)

| Gap in screens | Resolution |
|---|---|
| No case studies, customer logos, testimonials, team members, awards | Not invented. Not displayed. |
| Dashboard mockups | `InterfacePreview` with "Interface preview" label and generic metric/agent labels. |
| Platform "status" can change | Centralised map in `src/content/platforms.ts`. |
| Publication metadata beyond the Zenodo record and preprint/patent numbers in the brief | Only the brief's facts; no fabricated authors, journals or dates. |
| FAQ answer text for 3 of 4 questions (screens show questions only) | Short, honest answers derived strictly from the brief; no invented policy. |
| Real mail provider keys, final gold hex, DNS | Owner input requested in final report; fallback behaviour implemented. |
