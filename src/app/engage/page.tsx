import type { Metadata } from "next";
import { FaqAccordion } from "@/components/sections/FaqAccordion";
import { PageHero } from "@/components/sections/PageHero";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { HairlineCard } from "@/components/ui/HairlineCard";
import { Reveal } from "@/components/ui/Reveal";
import { Rule } from "@/components/ui/Rule";
import { SectionHeader } from "@/components/ui/SectionHeader";
import {
  ENGAGE_INTRO,
  ENGAGE_LEAD,
  ENGAGEMENT_AUDIENCES,
  ENGAGEMENT_PROCESS,
  ENGAGEMENT_SHAPES,
  FAQ_ITEMS,
} from "@/content/engage";
import { PLATFORMS } from "@/content/platforms";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Engage",
  description: ENGAGE_INTRO,
  path: "/engage",
});

const engageHeroImage =
  PLATFORMS.find((platform) => platform.slug === "humming")?.homeImage ?? PLATFORMS[0].homeImage;

export default function EngagePage() {
  return (
    <>
      <PageHero
        breadcrumb="Home"
        eyebrow="Engagement"
        title={ENGAGE_LEAD}
        lead={ENGAGE_INTRO}
        image={engageHeroImage}
        actions={[{ label: "Begin a correspondence", href: "/contact", variant: "primary" }]}
      />

      {/* Shapes */}
      <section className="container-shell py-20 md:py-28">
        <Reveal>
          <SectionHeader
            eyebrow="Engagement shapes"
            titleLines={["Four ways", "to begin."]}
            aside={<p className="lede">Each shape begins with the decision, not the model.</p>}
          />
        </Reveal>
        <div className="mt-14 grid gap-px border border-line bg-line/60 sm:grid-cols-2">
          {ENGAGEMENT_SHAPES.map((shape, index) => (
            <Reveal key={shape.id} delay={index * 60}>
              <HairlineCard className="h-full bg-bone" accent={index === 0}>
                <div className="flex items-start justify-between gap-4 border-b border-line pb-5">
                  <Eyebrow className="text-gold">Engagement shape</Eyebrow>
                  <span className="font-mono text-[0.625rem] tracking-[0.18em] text-muted">
                    {shape.duration}
                  </span>
                </div>
                <h3 className="statement-md mt-10">{shape.name}</h3>
                <p className="lede mt-4 text-sm">{shape.body}</p>
              </HairlineCard>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Process */}
      <section className="tone-dark py-20 md:py-28">
        <div className="container-shell">
          <Reveal>
            <SectionHeader
              eyebrow="Process"
              titleLines={["From first letter", "to handover."]}
              tone="dark"
            />
          </Reveal>
          <div className="mt-14 border-t border-line-dark">
            {ENGAGEMENT_PROCESS.map((step, index) => (
              <Reveal key={step} delay={index * 50}>
                <div className="grid gap-3 border-b border-line-dark py-6 md:grid-cols-12 md:items-center">
                  <span className="font-mono text-[0.625rem] tracking-[0.2em] text-gold md:col-span-2">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p className="statement-md text-bone md:col-span-10">{step}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Audiences */}
      <section className="container-shell py-20 md:py-28">
        <div className="grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <Eyebrow className="block">Who we work with</Eyebrow>
            <h2 className="display-md mt-8">A considered network.</h2>
            <p className="lede mt-6">
              A small number of engagements each year, chosen for fit and horizon.
            </p>
          </Reveal>
          <Reveal delay={80} className="lg:col-span-7">
            <div className="grid gap-px border border-line bg-line/60 sm:grid-cols-2">
              {ENGAGEMENT_AUDIENCES.map((audience) => (
                <HairlineCard key={audience} className="bg-bone">
                  <p className="statement-md">{audience}</p>
                </HairlineCard>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-y border-line bg-tint/50 py-20 md:py-28">
        <div className="container-shell grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <Eyebrow>Questions</Eyebrow>
            <h2 className="statement-md mt-8">Before you write.</h2>
            <Rule className="mt-10 max-w-16" accent />
          </Reveal>
          <Reveal delay={80} className="lg:col-span-8">
            <FaqAccordion items={FAQ_ITEMS} />
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="container-shell py-20 md:py-24">
        <Reveal>
          <div className="border border-line p-8 md:p-12">
            <div className="grid gap-10 md:grid-cols-12 md:items-end">
              <div className="md:col-span-8">
                <Eyebrow tone="gold">Begin</Eyebrow>
                <p className="statement-md mt-6 max-w-2xl">
                  Tell us the decision you are trying to make.
                </p>
              </div>
              <div className="md:col-span-4 md:text-right">
                <Button href="/contact" variant="primary" fullWidth>
                  Begin a correspondence
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
