# Matrka Applied Systems

Production website for `appliedsystems.matrka.net`, built from the exported Stitch screens in
`ui screens/`. Next.js 16 App Router, TypeScript strict, Tailwind CSS 4.

## Run locally

```bash
pnpm install
pnpm dev
```

Open <http://localhost:3000>.

## Verify

```bash
pnpm lint
pnpm typecheck
pnpm build
```

## Routes

- `/` — home
- `/platforms` — platform overview and comparison
- `/platforms/arps`, `/platforms/gravity`, `/platforms/datum`, `/platforms/humming`
- `/architecture`
- `/research`
- `/engage`
- `/contact`
- `/api/contact` — JSON POST endpoint
- `/not-found` — custom 404

## Content model

All editable copy lives in `src/content/*.ts`.

Platform status is centralised in `src/content/platforms.ts` through `STATUS_LABEL` and the
`PlatformStatus` type. Only four platforms exist: ARPS, Gravity, Datum and Humming. QiDS appears
only as a patent publication entry in `src/content/research.ts`.

## Contact mail

Copy `.env.example` to `.env.local` and configure **one** provider:

- `RESEND_API_KEY` with optional `MAIL_FROM` / `MAIL_TO`
- or `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USER`, `SMTP_PASSWORD`

If no provider is configured, `/api/contact` logs the correspondence server-side and returns a
fallback message asking the sender to mail `system@matrka.net`. No message is silently dropped.

The endpoint applies Zod validation, a honeypot field and an in-memory rate limit (5 requests per
10 minutes per IP). For multi-instance deployments, replace the in-memory store in
`src/lib/rate-limit.ts` with Redis or another shared store.

## Deploy

Deploy to Vercel (or any Node.js host) with Node 20+. Add the environment variables above in the
project settings. Point a CNAME for `appliedsystems.matrka.net` at the deployment, then add the
domain in the host's project settings. Security headers are configured in `next.config.ts`.

External platform links open in a new tab with `rel="noopener noreferrer"`.

## Documentation

- `docs/BRAINSTORM.md` — screen audit, IA, tokens, risks
- `docs/PLAN.md` — build phases and acceptance criteria
- `docs/QA.md` — verification record
