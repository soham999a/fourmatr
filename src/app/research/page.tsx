import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { HairlineCard } from "@/components/ui/HairlineCard";
import { Reveal } from "@/components/ui/Reveal";
import { Rule } from "@/components/ui/Rule";
import { SectionHeader } from "@/components/ui/SectionHeader";
import {
  PUBLICATIONS,
  RESEARCH_FRAMEWORKS,
  RESEARCH_HERO,
  RESEARCH_NOTE,
  RESEARCH_STAGE_NOTE,
} from "@/content/research";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Research",
  description: RESEARCH_HERO.lead,
  path: "/research",
});

export default function ResearchPage() {
  return (
    <>
      <PageHero
        breadcrumb="Home"
        eyebrow={RESEARCH_HERO.eyebrow}
        title={RESEARCH_HERO.titleLines.join(" ")}
        lead={RESEARCH_HERO.lead}
        actions={[{ label: "Explore the platforms", href: "/platforms", variant: "primary" }]}
      />

      {/* Frameworks */}
      <section className="container-shell py-20 md:py-28" id="frameworks">
        <Reveal>
          <SectionHeader
            eyebrow="Frameworks"
            titleLines={["The ideas beneath", "the systems."]}
            index={RESEARCH_HERO.index}
          />
        </Reveal>
        <div className="mt-14 space-y-6">
          {RESEARCH_FRAMEWORKS.map((framework, index) => (
            <Reveal key={framework.id} delay={index * 80}>
              <HairlineCard className="bg-bone" accent={index === 0}>
                <div className="grid gap-8 lg:grid-cols-12">
                  <div className="lg:col-span-3">
                    <Eyebrow className="text-gold">{framework.kind}</Eyebrow>
                    <p className="mt-4 font-mono text-[0.625rem] tracking-[0.18em] text-muted">
                      0{index + 1} / 0{RESEARCH_FRAMEWORKS.length}
                    </p>
                  </div>
                  <div className="lg:col-span-9">
                    <h3 className="font-display text-3xl md:text-4xl">{framework.name}</h3>
                    <p className="mt-3 text-sm text-muted">{framework.lead}</p>
                    <p className="lede mt-6">{framework.body}</p>
                    <div className="mt-8 grid gap-3 sm:grid-cols-3">
                      {framework.details.map((detail) => (
                        <div key={detail} className="border border-line px-4 py-3 text-xs text-muted">
                          {detail}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </HairlineCard>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Publications */}
      <section className="border-y border-line bg-tint/50 py-20 md:py-28" id="publications">
        <div className="container-shell">
          <Reveal>
            <SectionHeader
              eyebrow="Publications"
              titleLines={["Open questions,", "recorded."]}
              aside={<p className="lede">Published work and research records from Matrka.</p>}
            />
          </Reveal>
          <div className="mt-14 border-t border-line">
            {PUBLICATIONS.map((publication, index) => (
              <Reveal key={publication.id} delay={index * 60}>
                <div className="grid gap-4 border-b border-line py-7 md:grid-cols-12 md:items-center">
                  <div className="md:col-span-1">
                    <span className="font-mono text-[0.625rem] tracking-[0.2em] text-muted">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <div className="md:col-span-3">
                    <Eyebrow className="text-gold">{publication.kind}</Eyebrow>
                  </div>
                  <div className="md:col-span-5">
                    <h3 className="font-display text-xl leading-snug md:text-2xl">
                      {publication.title}
                    </h3>
                  </div>
                  <div className="md:col-span-3 md:text-right">
                    {publication.href ? (
                      <ArrowLink href={publication.href} external={publication.external}>
                        {publication.meta}
                      </ArrowLink>
                    ) : (
                      <span className="font-mono text-[0.625rem] uppercase tracking-[0.16em] text-muted">
                        {publication.meta}
                      </span>
                    )}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <p className="mt-8 max-w-2xl text-xs text-muted">{RESEARCH_STAGE_NOTE}</p>
        </div>
      </section>

      {/* Note */}
      <section className="container-shell py-20 md:py-28">
        <Reveal>
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <Eyebrow tone="gold">{RESEARCH_NOTE.eyebrow}</Eyebrow>
              <Rule className="mt-8 max-w-16" accent />
            </div>
            <div className="lg:col-span-8">
              <h2 className="display-md">{RESEARCH_NOTE.title}</h2>
              <p className="lede mt-8">{RESEARCH_NOTE.body}</p>
            </div>
          </div>
        </Reveal>
      </section>

      {/* CTA */}
      <section className="tone-dark py-16 md:py-20">
        <div className="container-shell flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div>
            <Eyebrow tone="gold">Correspondence</Eyebrow>
            <p className="mt-4 max-w-xl font-display text-2xl md:text-3xl">
              Discuss the research with us directly.
            </p>
          </div>
          <Button href="/contact" variant="primary">
            Begin a correspondence
          </Button>
        </div>
      </section>
    </>
  );
}
