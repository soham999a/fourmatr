import type { Metadata } from "next";
import Link from "next/link";
import { HeroField } from "@/components/figures/HeroField";
import { PlatformFigure } from "@/components/figures/PlatformFigure";
import { LayerDiagram } from "@/components/sections/LayerDiagram";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { FigureCounter } from "@/components/ui/FigureCounter";
import { HairlineCard } from "@/components/ui/HairlineCard";
import { Reveal } from "@/components/ui/Reveal";
import { Rule } from "@/components/ui/Rule";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";
import {
  ARCHITECTURE_LAYERS,
  COMPOUNDING,
  HOME_ARCHITECTURE_NOTE,
} from "@/content/architecture";
import {
  HOME_ARCHITECTURE,
  HOME_AUDIENCES,
  HOME_ENGAGEMENT,
  HOME_HERO,
  HOME_LIVE,
  HOME_PLATFORMS,
  HOME_POSITION,
  HOME_RESEARCH,
} from "@/content/home";
import { PLATFORMS } from "@/content/platforms";
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
      <section className="tone-dark-home relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 text-bone/80">
          <HeroField variant="home" />
        </div>
        <div className="container-shell relative grid min-h-[86vh] content-end gap-10 py-24 md:py-32">
          <Reveal>
            <Eyebrow tone="bone" className="block">
              {HOME_HERO.eyebrow}
            </Eyebrow>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="display-xl max-w-5xl text-bone">
              {HOME_HERO.titleLines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h1>
          </Reveal>
          <div className="grid gap-10 lg:grid-cols-12">
            <Reveal delay={140} className="lg:col-span-7">
              <p className="lede max-w-2xl text-bone/75">{HOME_HERO.lead}</p>
              <div className="mt-10 flex flex-wrap gap-4">
                <Button href={HOME_HERO.primary.href} variant="primary">
                  {HOME_HERO.primary.label}
                </Button>
                <Button href={HOME_HERO.secondary.href}>{HOME_HERO.secondary.label}</Button>
              </div>
            </Reveal>
            <div className="lg:col-span-5 lg:flex lg:items-end lg:justify-end">
              <Reveal delay={200} className="flex items-end gap-8">
                <FigureCounter value={HOME_HERO.counter} tone="dark" label="Section counter" />
                <span className="font-mono text-[0.625rem] uppercase tracking-[0.2em] text-muted-light">
                  {HOME_HERO.scroll} ↓
                </span>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* 02 — Position */}
      <section className="container-shell py-24 md:py-32">
        <Reveal>
          <Eyebrow className="block">{HOME_POSITION.eyebrow}</Eyebrow>
          <p className="mt-10 max-w-5xl font-display text-3xl leading-[1.15] md:text-5xl lg:text-6xl">
            {HOME_POSITION.lines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </p>
        </Reveal>
        <Rule className="mt-16" />
      </section>

      {/* 03 — Platforms */}
      <section className="container-shell py-20 md:py-28" id="platforms">
        <Reveal>
          <SectionHeader
            eyebrow={HOME_PLATFORMS.eyebrow}
            titleLines={HOME_PLATFORMS.titleLines}
            index={HOME_PLATFORMS.index}
          />
        </Reveal>
        <div className="mt-14 grid gap-px border border-line bg-line/60 md:grid-cols-2">
          {PLATFORMS.map((platform, index) => (
            <Reveal key={platform.slug} delay={index * 70}>
              <HairlineCard className="h-full bg-bone transition-colors hover:bg-tint/40">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <Eyebrow className="text-gold">{platform.roman}</Eyebrow>
                    <p className="mt-4 font-mono text-[0.625rem] uppercase tracking-[0.18em] text-muted">
                      {platform.capability}
                    </p>
                  </div>
                  <StatusBadge status={platform.status} />
                </div>
                <h3 className="mt-10 font-display text-4xl md:text-5xl">{platform.name}</h3>
                <p className="lede mt-4 max-w-md text-sm md:text-base">{platform.oneLiner}</p>
                <div className="mt-10 flex flex-wrap gap-6">
                  <ArrowLink href={`/platforms/${platform.slug}`}>View platform</ArrowLink>
                  <ArrowLink href={platform.liveUrl} external>
                    Open platform
                  </ArrowLink>
                </div>
              </HairlineCard>
            </Reveal>
          ))}
        </div>
        <div className="mt-10">
          <ArrowLink href="/platforms">All platforms</ArrowLink>
        </div>
      </section>

      {/* 04 — Architecture */}
      <section className="tone-dark py-20 md:py-28" id="architecture">
        <div className="container-shell">
          <Reveal>
            <SectionHeader
              eyebrow={HOME_ARCHITECTURE.eyebrow}
              titleLines={HOME_ARCHITECTURE.titleLines}
              index={HOME_ARCHITECTURE.figureLabel}
              tone="dark"
              aside={
                <div>
                  <p className="lede text-muted-light">{HOME_ARCHITECTURE_NOTE}</p>
                  <div className="mt-8">
                    <ArrowLink href="/architecture">Read the architecture</ArrowLink>
                  </div>
                </div>
              }
            />
          </Reveal>
          <div className="mt-14 border-t border-line-dark pt-12">
            <LayerDiagram layers={ARCHITECTURE_LAYERS} short className="[&_button]:border-line-dark [&_button]:bg-ink [&_button]:hover:border-gold [&_.border-line]:!border-line-dark [&_.bg-panel]:!bg-ink [&_.text-muted]:!text-muted-light" />
          </div>
          <div className="mt-16 grid gap-10 lg:grid-cols-12">
            <Reveal className="lg:col-span-7">
              <div className="border border-line-dark p-4 md:p-8">
                <PlatformFigure kind="gravity" dark />
              </div>
            </Reveal>
            <Reveal delay={100} className="lg:col-span-5">
              <Eyebrow tone="gold">{COMPOUNDING.eyebrow}</Eyebrow>
              <h3 className="mt-6 font-display text-3xl">{COMPOUNDING.title}</h3>
              <p className="lede mt-4 text-muted-light">{COMPOUNDING.lead}</p>
              <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 font-mono text-[0.6875rem] tracking-[0.18em] text-bone/70">
                {COMPOUNDING.platforms.map((name) => (
                  <span key={name}>{name}</span>
                ))}
              </div>
              <p className="mt-10 font-mono text-[0.625rem] uppercase tracking-[0.2em] text-gold">
                {COMPOUNDING.label}
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 05 — Live entries */}
      <section className="container-shell py-20 md:py-28">
        <Reveal>
          <Eyebrow className="block">{HOME_LIVE.eyebrow}</Eyebrow>
          <h2 className="display-md mt-8">{HOME_LIVE.title}</h2>
        </Reveal>
        <div className="mt-12 border-t border-line">
          {PLATFORMS.map((platform) => (
            <Reveal key={platform.slug}>
              <div className="group grid gap-4 border-b border-line py-6 md:grid-cols-12 md:items-center">
                <div className="md:col-span-2">
                  <FigureCounter value={platform.roman} format="roman" />
                </div>
                <div className="md:col-span-4">
                  <Link
                    href={`/platforms/${platform.slug}`}
                    className="font-display text-2xl transition-colors hover:text-gold md:text-3xl"
                  >
                    {platform.name}
                  </Link>
                  <p className="mt-1 text-xs text-muted">{platform.capability}</p>
                </div>
                <div className="md:col-span-3">
                  <StatusBadge status={platform.status} />
                </div>
                <div className="md:col-span-3 md:text-right">
                  <ArrowLink href={platform.liveUrl} external>
                    {platform.liveUrl.replace("https://", "")}
                  </ArrowLink>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* 06 — Research */}
      <section className="border-y border-line bg-tint/50 py-20 md:py-28" id="research">
        <div className="container-shell">
          <Reveal>
            <SectionHeader
              eyebrow={HOME_RESEARCH.eyebrow}
              titleLines={HOME_RESEARCH.titleLines}
              aside={
                <div>
                  <p className="lede">{HOME_RESEARCH.body}</p>
                  <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
                    {HOME_RESEARCH.links.map((link) => (
                      <ArrowLink key={link.label} href={link.href}>
                        {link.label}
                      </ArrowLink>
                    ))}
                  </div>
                </div>
              }
            />
          </Reveal>
        </div>
      </section>

      {/* 07 — Audiences */}
      <section className="container-shell py-20 md:py-28">
        <Reveal>
          <Eyebrow className="block">{HOME_AUDIENCES.eyebrow}</Eyebrow>
          <h2 className="display-md mt-8">{HOME_AUDIENCES.title}</h2>
        </Reveal>
        <div className="mt-12 grid gap-px border border-line bg-line/60 sm:grid-cols-2">
          {HOME_AUDIENCES.items.map((item, index) => (
            <Reveal key={item.title} delay={index * 60}>
              <HairlineCard className="h-full bg-bone">
                <Eyebrow className="text-gold">0{index + 1}</Eyebrow>
                <h3 className="mt-8 font-display text-2xl md:text-3xl">{item.title}</h3>
                <p className="lede mt-3 text-sm">{item.body}</p>
              </HairlineCard>
            </Reveal>
          ))}
        </div>
      </section>

      {/* 08 — Engagement */}
      <section className="tone-dark py-20 md:py-28" id="engage">
        <div className="container-shell">
          <Reveal>
            <SectionHeader
              eyebrow={HOME_ENGAGEMENT.eyebrow}
              titleLines={HOME_ENGAGEMENT.titleLines}
              tone="dark"
              aside={
                <div>
                  <p className="lede text-muted-light">{HOME_ENGAGEMENT.body}</p>
                  <div className="mt-8">
                    <Button href={HOME_ENGAGEMENT.cta.href} variant="primary">
                      {HOME_ENGAGEMENT.cta.label}
                    </Button>
                  </div>
                </div>
              }
            />
          </Reveal>
        </div>
      </section>

      {/* 09 — Contact strip */}
      <section className="container-shell py-16 md:py-20">
        <Reveal>
          <div className="grid gap-8 md:grid-cols-12 md:items-end">
            <div className="md:col-span-8">
              <Eyebrow className="block">Correspondence</Eyebrow>
              <p className="mt-6 max-w-2xl font-display text-3xl leading-tight md:text-4xl">
                A conversation begins with the decision you are trying to make.
              </p>
            </div>
            <div className="md:col-span-4 md:text-right">
              <Button href="/contact" variant="primary" fullWidth>
                Begin a correspondence
              </Button>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
