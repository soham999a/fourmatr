import type { Metadata } from "next";
import Image from "next/image";
import { PlatformFigure } from "@/components/figures/PlatformFigure";
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

const architectureHeroImage =
  PLATFORMS.find((platform) => platform.slug === "gravity")?.homeImage ?? PLATFORMS[0].homeImage;

export default function ArchitecturePage() {
  return (
    <>
      <PageHero
        breadcrumb="Home"
        eyebrow="The Architecture"
        title="The structure beneath the surface."
        lead={ARCHITECTURE_INTRO}
        image={architectureHeroImage}
        actions={[{ label: "Explore the platforms", href: "/platforms", variant: "primary" }]}
      />

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
              previewLabel=""
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
        <div className="mt-14 grid gap-px border border-line bg-line/60">
          {ARCHITECTURE_PRINCIPLES.map((principle, index) => (
            <Reveal key={principle.number} delay={index * 70}>
              <HairlineCard className="bg-bone">
                <div className="grid gap-5 md:grid-cols-12 md:items-center">
                  <span className="font-mono text-[0.625rem] tracking-[0.2em] text-gold md:col-span-1">
                    {principle.number}
                  </span>
                  <h3 className="statement-md md:col-span-5">{principle.title}</h3>
                  <p className="lede text-sm md:col-span-6">{principle.body}</p>
                </div>
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
            <p className="statement-md">{COMPOUNDING.lead}</p>
            <div className="mt-12 grid gap-px border border-line bg-line/60 sm:grid-cols-2">
              {PLATFORMS.map((platform) => (
                <HairlineCard key={platform.slug} className="bg-bone">
                  <div className="relative h-32 overflow-hidden">
                    <Image
                      src={platform.homeImage}
                      alt=""
                      fill
                      sizes="(min-width: 640px) 45vw, 100vw"
                      className="object-cover"
                      style={{ opacity: 0.78 }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/15 to-transparent" />
                  </div>
                  <div className="mt-6">
                    <Eyebrow className="text-gold">{platform.capability}</Eyebrow>
                    <h3 className="statement-md mt-3">{platform.name}</h3>
                  </div>
                  <div className="mt-6">
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
              <p className="statement-md mt-6 max-w-2xl">
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
