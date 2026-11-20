import type { Metadata } from "next";
import { HeroField } from "@/components/figures/HeroField";
import { PlatformFigure } from "@/components/figures/PlatformFigure";
import { LazyShaderField as ShaderField } from "@/components/webgl/LazyShaderField";
import { LayerDiagram } from "@/components/sections/LayerDiagram";
import { PageHero } from "@/components/sections/PageHero";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { FigurePlate } from "@/components/ui/FigurePlate";
import { HairlineCard } from "@/components/ui/HairlineCard";
import { Reveal } from "@/components/ui/Reveal";
import { Rule } from "@/components/ui/Rule";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { StickySubNav } from "@/components/ui/StickySubNav";
import {
  ARCHITECTURE_INTRO,
  ARCHITECTURE_LAYERS,
  ARCHITECTURE_PRINCIPLES,
  COMPOUNDING,
} from "@/content/architecture";
import { PLATFORMS } from "@/content/platforms";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Architecture",
  description: ARCHITECTURE_INTRO,
  path: "/architecture",
});

export default function ArchitecturePage() {
  return (
    <>
      <PageHero
        breadcrumb="Home"
        eyebrow="The Architecture"
        title="The structure beneath the surface."
        lead={ARCHITECTURE_INTRO}
        actions={[{ label: "Explore the platforms", href: "/platforms", variant: "primary" }]}
      >
        <div className="absolute right-0 top-0 h-full w-2/3 opacity-30">
          <ShaderField variant="gravity" dark={false} fallback={<HeroField variant="gravity" />} />
        </div>
      </PageHero>

      <StickySubNav
        items={[
          { id: "layers", label: "Layers" },
          { id: "field", label: "Field" },
          { id: "principles", label: "Principles" },
          { id: "compounding", label: "Compounding" },
          { id: "next", label: "Next" },
        ]}
      />

      {/* Layers */}
      <section className="container-shell py-20 md:py-28" id="layers">
        <Reveal>
          <SectionHeader
            eyebrow="Five layers"
            titleLines={["One stack,", "five layers."]}
            index="L01 — L05"
            ghost="L"
            aside={
              <p className="lede">
                The platforms differ in purpose. The reasoning beneath them is deliberately shared.
              </p>
            }
          />
        </Reveal>
        <div className="mt-14">
          <LayerDiagram layers={ARCHITECTURE_LAYERS} field />
        </div>
      </section>

      {/* Diagram */}
      <section className="tone-dark band-wipe py-20 md:py-28" id="field">
        <div className="container-shell">
          <Reveal>
            <SectionHeader
              eyebrow="Field view"
              titleLines={["A shared field,", "not a stack of silos."]}
              index="FIGURE 01"
              tone="dark"
              aside={
                <p className="lede text-muted-light">
                  Capabilities developed for one platform become available to every other platform.
                </p>
              }
            />
          </Reveal>
          <Reveal delay={80}>
            <FigurePlate
              caption="Field view · Shared reasoning"
              tone="dark"
              className="mt-14"
              annotations={[
                { label: "Shared field", x: 22, y: 30 },
                { label: "Layer convergence", x: 68, y: 46 },
                { label: "Compounding", x: 44, y: 74 },
              ]}
            >
              <div className="figure-glow h-72 md:h-[30rem]">
                <PlatformFigure kind="gravity" dark />
              </div>
              <Rule className="mt-6" tone="dark" />
              <div className="mt-6 flex flex-wrap justify-between gap-4 font-mono text-[0.5625rem] uppercase tracking-[0.18em] text-muted-light">
                {COMPOUNDING.platforms.map((name) => (
                  <span key={name} className="stagger-item">
                    {name}
                  </span>
                ))}
              </div>
            </FigurePlate>
          </Reveal>
        </div>
      </section>

      {/* Principles */}
      <section className="container-shell py-20 md:py-28" id="principles">
        <Reveal>
          <SectionHeader eyebrow="Principles" titleLines={["How we decide", "what to build."]} />
        </Reveal>
        <div className="mt-14 grid gap-px border border-line bg-line/60 md:grid-cols-3">
          {ARCHITECTURE_PRINCIPLES.map((principle, index) => (
            <Reveal key={principle.number} delay={index * 70}>
              <HairlineCard className="h-full bg-bone" accent={index === 0}>
                <span className="font-mono text-[0.625rem] tracking-[0.2em] text-gold">
                  {principle.number}
                </span>
                <h3 className="mt-10 font-display text-2xl leading-snug md:text-3xl">
                  {principle.title}
                </h3>
                <p className="lede mt-4 text-sm">{principle.body}</p>
              </HairlineCard>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Compounding */}
      <section className="border-y border-line bg-tint/50 py-20 md:py-28" id="compounding">
        <div className="container-shell grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <Eyebrow tone="gold">{COMPOUNDING.eyebrow}</Eyebrow>
            <h2 className="display-md mt-8">{COMPOUNDING.title}</h2>
          </Reveal>
          <Reveal delay={80} className="lg:col-span-8">
            <p className="font-display text-2xl leading-snug md:text-3xl">{COMPOUNDING.lead}</p>
            <div className="mt-12 grid gap-px border border-line bg-line/60 sm:grid-cols-2">
              {PLATFORMS.map((platform, index) => (
                <HairlineCard key={platform.slug} className="bg-bone">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <Eyebrow className="text-gold">{platform.roman}</Eyebrow>
                      <h3 className="mt-4 font-display text-2xl">{platform.name}</h3>
                      <p className="mt-2 text-xs text-muted">{platform.capability}</p>
                    </div>
                    <span className="font-mono text-[0.5625rem] text-muted">
                      0{index + 1}
                    </span>
                  </div>
                  <div className="mt-8">
                    <ArrowLink href={`/platforms/${platform.slug}`}>View platform</ArrowLink>
                  </div>
                </HairlineCard>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="container-shell py-20 md:py-24" id="next">
        <Reveal>
          <div className="grid gap-8 md:grid-cols-12 md:items-end">
            <div className="md:col-span-8">
              <Eyebrow>Next</Eyebrow>
              <p className="mt-6 max-w-2xl font-display text-3xl leading-tight md:text-4xl">
                Read the research behind the architecture.
              </p>
            </div>
            <div className="md:col-span-4 md:text-right">
              <Button href="/research" variant="primary" fullWidth>
                Read the research
              </Button>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
