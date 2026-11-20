import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { HeroImageRotation } from "@/components/figures/HeroImageRotation";
import { SharedSystemFigure } from "@/components/figures/SharedSystemFigure";
import { LazyOrbitalField } from "@/components/figures/LazyOrbitalField";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { HairlineCard } from "@/components/ui/HairlineCard";
import { MagneticWrap } from "@/components/ui/MagneticWrap";
import { Reveal } from "@/components/ui/Reveal";
import { Rule } from "@/components/ui/Rule";
import { SectionHeader } from "@/components/ui/SectionHeader";
import {
  HOME_COLLABORATION,
  HOME_HERO,
  HOME_PLATFORMS,
  HOME_POSITION,
  HOME_RESEARCH,
  HOME_SYSTEM,
} from "@/content/home";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Applied intelligence for enterprise",
  description:
    "Four intelligences. One architecture. Applied intelligence for enterprise, built in Kolkata, India.",
  path: "/",
});

export default function HomePage() {
  return (
    <>
      {/* 01 — Hero */}
      <section className="tone-dark-home relative overflow-hidden" id="top">
        <HeroImageRotation />
        <div className="container-shell relative grid min-h-[86vh] content-end gap-10 py-24 md:py-32">
          <Reveal immediate>
            <Eyebrow tone="bone" className="block">
              {HOME_HERO.eyebrow}
            </Eyebrow>
          </Reveal>
          <Reveal immediate>
            <h1 className="display-xl max-w-5xl text-bone">
              {HOME_HERO.titleLines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h1>
          </Reveal>
          <div className="grid gap-10 lg:grid-cols-12">
            <Reveal immediate className="lg:col-span-7">
              <p className="lede max-w-2xl text-bone/75">{HOME_HERO.lead}</p>
              <div className="mt-10 flex flex-wrap gap-4">
                <MagneticWrap>
                  <Button href={HOME_HERO.primary.href} variant="primary">
                    {HOME_HERO.primary.label}
                  </Button>
                </MagneticWrap>
                <MagneticWrap>
                  <Button href={HOME_HERO.secondary.href}>{HOME_HERO.secondary.label}</Button>
                </MagneticWrap>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 01b — Shared system */}
      <section
        className="tone-dark-home relative overflow-hidden border-t border-line-dark/70"
        id="intelligence"
      >
        <LazyOrbitalField />
        <div className="container-shell relative grid gap-12 py-16 md:py-24 lg:grid-cols-12 lg:items-center">
          <Reveal className="lg:col-span-5">
            <h2 className="font-display text-[1.75rem] leading-[1.05] tracking-[-0.024em] text-bone sm:text-3xl md:text-[2.25rem]">
              {HOME_SYSTEM.titleLines.map((line) => (
                <span key={line} className="block whitespace-nowrap">
                  {line}
                </span>
              ))}
            </h2>
            <p className="lede mt-6 text-muted-light">{HOME_SYSTEM.body}</p>
            <div className="mt-8">
              <ArrowLink href="/architecture" className="text-bone">
                Explore the architecture
              </ArrowLink>
            </div>
          </Reveal>
          <Reveal delay={100} className="relative z-10 lg:col-span-7">
            <div className="border border-line-dark bg-ink/30">
              <div className="px-3 py-4 md:px-8 md:py-6">
                <SharedSystemFigure />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 01c — Principle */}
      <section className="container-shell py-20 md:py-28" id="position">
        <Reveal>
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line pb-6 font-mono text-[0.625rem] uppercase tracking-[0.18em]">
            <span className="text-gold">{HOME_POSITION.index}</span>
            <span className="text-muted">{HOME_POSITION.eyebrow}</span>
          </div>
        </Reveal>

        <div className="py-12">
          <Reveal>
            <h2 className="display-lg max-w-4xl text-ink">
              <span className="block">{HOME_POSITION.lines[0]}</span>
              <span className="block">{HOME_POSITION.lines[1]}</span>
            </h2>
            <p className="mt-6 max-w-3xl font-display text-2xl leading-snug text-muted md:text-3xl">
              {HOME_POSITION.lines[2]}
            </p>
            <p className="mt-6 max-w-2xl text-sm leading-[1.8] text-muted">{HOME_POSITION.body}</p>
            <div className="mt-8">
              <Link
                prefetch={false}
                href={HOME_POSITION.cta.href}
                className="group inline-flex items-center gap-2 border-b border-gold/60 pb-1 font-mono text-[0.6875rem] uppercase tracking-[0.16em] transition-colors hover:border-gold hover:text-gold"
              >
                {HOME_POSITION.cta.label}
                <span aria-hidden="true" className="inline-block transition-transform duration-300 group-hover:translate-x-0.5">
                  ↘
                </span>
              </Link>
            </div>
          </Reveal>

          <Reveal delay={80}>
            <div className="mt-14 grid gap-px border border-line bg-line/60">
              {HOME_POSITION.principles.map((principle) => (
                <div key={principle.number} className="flex items-center gap-6 bg-bone px-5 py-5 md:px-7">
                  <span className="font-mono text-[0.625rem] tracking-[0.18em] text-gold">
                    {principle.number}
                  </span>
                  <p className="font-display text-2xl leading-snug md:text-3xl">{principle.title}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        <Rule className="hairline-draw" />
      </section>

      {/* 02 — Platforms */}
      <section className="bg-tint/70 py-20 md:py-24" id="platforms">
        <div className="container-shell">
          <Reveal>
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line pb-6 font-mono text-[0.625rem] uppercase tracking-[0.18em]">
              <span className="text-gold">{HOME_PLATFORMS.index}</span>
              <span className="text-muted">{HOME_PLATFORMS.eyebrow}</span>
            </div>
          </Reveal>

          <Reveal>
            <div className="flex flex-col gap-8 py-12 lg:flex-row lg:items-end lg:justify-between">
              <h2 className="display-lg max-w-3xl">
                <span className="block">{HOME_PLATFORMS.titleLines[0]}</span>
                <span className="block font-serif italic">{HOME_PLATFORMS.titleLines[1]}</span>
              </h2>
              <p className="max-w-sm text-sm leading-[1.8] text-muted lg:pb-2">
                {HOME_PLATFORMS.body}
              </p>
            </div>
          </Reveal>

          <div className="grid gap-px border border-line bg-line/60 md:grid-cols-2">
            {HOME_PLATFORMS.cards.map((card, index) => (
              <Reveal key={card.slug} className="h-full" delay={index * 70}>
                <article className="group relative flex h-full min-h-[26rem] flex-col overflow-hidden bg-ink p-5 text-bone md:p-7">
                  <Image
                    src={card.image}
                    alt=""
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    style={{ opacity: card.imageOpacity }}
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ink/20 via-ink/65 to-ink/95" />

                  <div className="relative z-10 flex h-full flex-col">
                    <div className="flex items-start justify-between gap-3 font-mono text-[0.5625rem] uppercase leading-tight tracking-[0.12em] text-bone/70">
                      <span>{card.domain}</span>
                      <span className="text-right">{card.status}</span>
                    </div>

                    <div className="my-6 h-px w-10 bg-gold" aria-hidden="true" />

                    <h3 className="font-display text-3xl leading-none">{card.name}</h3>
                    <p className="mt-2 font-mono text-[0.625rem] uppercase leading-relaxed tracking-[0.1em] text-bone/70">
                      {card.type}
                    </p>
                    <p className="mt-4 text-xs leading-[1.7] text-bone/75">{card.body}</p>

                    <div className="mt-auto pt-6">
                      <div className="border-t border-line-dark pt-4">
                        <ArrowLink href={card.href} external className="w-full justify-between">
                          {card.ctaLabel}
                        </ArrowLink>
                      </div>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <p className="mt-5 text-right font-mono text-[0.625rem] uppercase leading-relaxed tracking-[0.12em] text-muted">
              {HOME_PLATFORMS.footnote}
            </p>
          </Reveal>
        </div>
      </section>

      {/* 05 — Research */}
      <section className="border-y border-line bg-tint/50 py-20 md:py-28" id="research">
        <div className="container-shell">
          <Reveal>
            <SectionHeader
              eyebrow={HOME_RESEARCH.index}
              index={HOME_RESEARCH.eyebrow}
              titleLines={HOME_RESEARCH.titleLines}
              ghost="05"
              aside={
                <div>
                  <p className="lede">{HOME_RESEARCH.body}</p>
                  <div className="mt-8">
                    <ArrowLink href={HOME_RESEARCH.cta.href}>{HOME_RESEARCH.cta.label}</ArrowLink>
                  </div>
                </div>
              }
            />
          </Reveal>
          <div className="mt-14 grid gap-px border border-line bg-line/60">
            {HOME_RESEARCH.publications.map((publication, index) => (
              <Reveal key={publication.id} delay={index * 70}>
                <HairlineCard className="h-full bg-bone p-6 md:p-8">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <Eyebrow className="text-gold">{publication.kind}</Eyebrow>
                    <span className="font-mono text-[0.625rem] uppercase tracking-[0.18em] text-muted">
                      {publication.meta}
                    </span>
                  </div>
                  <h3 className="mt-6 max-w-3xl font-display text-2xl leading-snug md:text-3xl">
                    {publication.title}
                  </h3>
                  {publication.href ? (
                    <div className="mt-6">
                      <ArrowLink href={publication.href} external={publication.external}>
                        {publication.external ? "View record" : "Read the framework"}
                      </ArrowLink>
                    </div>
                  ) : null}
                </HairlineCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 06 — Contact */}
      <section className="reference-contact" id="company">
        <Reveal immediate>
          <div className="reference-shell reference-section-kicker">
            <span>{HOME_COLLABORATION.index}</span>
            <span>{HOME_COLLABORATION.eyebrow}</span>
          </div>
        </Reveal>

        <Reveal immediate>
          <div className="reference-shell reference-collab-layout">
            <div>
              <p className="reference-eyebrow">{HOME_COLLABORATION.lead}</p>
              <h2 className="reference-collab-title">
                <span>{HOME_COLLABORATION.titleLines[0]}</span>
                <em>{HOME_COLLABORATION.titleLines[1]}</em>
              </h2>
            </div>
            <div className="reference-collab-copy">
              <p>{HOME_COLLABORATION.body}</p>
              <p className="reference-small-copy">{HOME_COLLABORATION.note}</p>
              <a
                href={HOME_COLLABORATION.cta.href}
                target="_blank"
                rel="noopener noreferrer"
                className="reference-light-button"
              >
                {HOME_COLLABORATION.cta.label}
                <span aria-hidden="true" className="reference-button-arrow">
                  ↗
                </span>
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            </div>
          </div>
        </Reveal>

        <Reveal immediate>
          <div className="reference-shell reference-audience-strip">
            {HOME_COLLABORATION.audiences.map((audience) => (
              <span key={audience}>{audience}</span>
            ))}
          </div>
        </Reveal>
      </section>
    </>
  );
}
