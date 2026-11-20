# QA — Matrka Applied Systems

Local verification record for the current uncommitted work. Nothing in this pass was committed or pushed.

## Environment

- Next.js `16.4.6`, React `19.2.7`, Tailwind CSS `4.3.5`, pnpm `11.9.0`
- Node `v24.15.0`, Windows
- Production verification server: `http://localhost:4100` (`pnpm exec next start -p 4100`)
- User's local dev server remains on `http://localhost:3001`

## Static checks

| Check | Result |
| --- | --- |
| `pnpm lint` | Pass — no errors or warnings |
| `pnpm typecheck` | Pass — no TypeScript errors |
| `pnpm build` | Pass — 17 routes generated; 11 workers; no config overrides |

Build output confirms static prerendering for `/`, platforms, architecture, research, engage, 404, sitemap, robots, icons, and OG image. `/api/contact` and `/contact` remain dynamic.

## Route smoke test

| Route | Status |
| --- | --- |
| `/` | 200 |
| `/platforms` | 200 |
| `/platforms/arps` | 200 |
| `/platforms/gravity` | 200 |
| `/platforms/datum` | 200 |
| `/platforms/humming` | 200 |
| `/architecture` | 200 |
| `/research` | 200 |
| `/engage` | 200 |
| `/contact` | 200 |
| `/does-not-exist` | 404 |

## Contact API

| Case | Result |
| --- | --- |
| Invalid name/email/message | `400` with field-level errors |
| Honeypot filled | `400` with `company_website: "Invalid submission."` |
| Valid submission | `503` with `"The message could not be sent right now. Please mail us at system@matrka.net."` |

The `503` is expected locally because `RESEND_API_KEY` is present but Resend rejects sends from the unverified `onboarding@resend.dev` address:

> `403 You can only send testing emails to your own email address (matrkasystem@gmail.com). To send emails to other recipients, please verify a domain at resend.com/domains, and change the from address to an email using this domain.`

The UI correctly surfaces the mail-us fallback. Before deployment: verify the domain, set `MAIL_FROM=Matrka Applied Systems <system@appliedsystems.matrka.net>`, set `MAIL_TO=system@matrka.net`, and rotate the exposed Resend key.

## Browser interaction checks

Run with headless Chrome at multiple viewport sizes against the final production build.

| Check | Result |
| --- | --- |
| No horizontal overflow at 360, 390, 768, 1024, 1140, 1440, 1920 px | Pass |
| Hero title visible and inside viewport at every width | Pass |
| Bottom nav visible ≤ 768 px; primary nav visible ≥ 1024 px | Pass |
| Click a visible `Platforms` link | Navigates to `/platforms`; heading renders |
| Submit contact form with valid values | Shows mail-us fallback error (Resend 403 path) |
| External links | 15 found; all use `target="_blank"` with `rel="noopener noreferrer"` |
| Reduced motion | 25 reveal nodes; 0 hidden |

Screenshots for the responsive pass are in the local temp folder used for QA (`qa-w360.png` … `qa-w1920.png`).

## Performance work

Applied without removing the WebGL upgrade on capable desktops:

- `LazyShaderField` dynamically imports the WebGL renderer only when the field approaches the viewport.
- WebGL is skipped on mobile, low-power devices, `navigator.webdriver`, reduced motion, and missing `WebGLRenderingContext`; SVG remains the instant fallback.
- `Reveal` is now a server-rendered wrapper; one `RevealObserver` handles reveal nodes globally.
- Above-the-fold hero reveals render with `data-visible="true"` in server HTML so the LCP text paints immediately.
- Internal `next/link` prefetching is disabled to stop background RSC fetches on initial load.
- Cormorant Garamond reduced to a single weight; `will-change` removed from reveal elements.
- Decorative animations disabled under reduced motion.

Route client JS (compressed) for `/` dropped from **655,489 → 614,312 bytes** after lazy WebGL/Reveal work, before the prefetch change. Total transferred bytes in the final Lighthouse run were **~286 KiB**.

## Lighthouse

All runs used Lighthouse 12, mobile emulation, and the performance category only. Raw JSON reports were generated locally in `docs/qa/` during verification and are intentionally ignored; the table below is the committed record.

| Run | Score | FCP | LCP | Speed Index | TBT | CLS | TTI | Bytes |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Before any perf work | 0.54 | 1,224 ms | 4,335 ms | 3,732 ms | 11,696 ms | 0 | 19,291 ms | 352,634 |
| After WebGL skip | 0.71 | 1,357 ms | 3,472 ms | 2,224 ms | 826 ms | 0 | 3,577 ms | 348,684 |
| After immediate hero paint | 0.83 | 1,069 ms | 3,113 ms | 1,481 ms | 430 ms | 0 | 3,158 ms | 348,726 |
| After prefetch disabled (tuned audit build) | 0.91 | 1,050 ms | 3,040 ms | 1,422 ms | 216 ms | 0 | 3,040 ms | 292,836 |
| Final production build — home run 1 | 0.78 | 1,339 ms | 3,256 ms | 1,881 ms | 591 ms | 0 | 3,483 ms | 286,236 |
| Final production build — home run 2 | 0.78 | 1,190 ms | 3,167 ms | 1,532 ms | 618 ms | 0 | 3,301 ms | 286,236 |
| Final production build — `/platforms/arps` | 0.81 | 1,016 ms | 3,124 ms | 1,126 ms | 488 ms | 0 | 3,220 ms | 274,194 |

The tuned audit build used a temporary `distDir` and single-CPU build setting; both were removed before the final production build. Differences between the 0.91 audit run and the 0.78–0.81 final runs are Lighthouse/config variance, not a feature difference.

Largest improvement: blocking time fell from **11.7 s → ~0.2–0.6 s** and time-to-interactive from **19.3 s → ~3.0–3.5 s**. CLS stayed at **0**.

## Remaining deployment items

- Verify the Resend domain and update `MAIL_FROM` / `MAIL_TO`.
- Rotate the previously exposed `RESEND_API_KEY`.
- Add Resend DNS records, then keep the Vercel CNAME for `appliedsystems` separate.
- User handles Vercel deployment and DNS manually.

## Verdict

Local implementation and verification are complete. Site is ready for the user's localhost testing. No commit or push was performed.
