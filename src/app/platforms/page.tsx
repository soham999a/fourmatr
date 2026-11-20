import type { Metadata } from "next";
import Image from "next/image";
import { ComparisonTable } from "@/components/sections/ComparisonTable";
import { PageHero } from "@/components/sections/PageHero";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { HairlineCard } from "@/components/ui/HairlineCard";
import { Reveal } from "@/components/ui/Reveal";
import { Rule } from "@/components/ui/Rule";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { PLATFORMS } from "@/content/platforms";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Platforms",
  description:
    "Four intelligences — ARPS, Gravity, Datum and Humming — held by a single architecture.",
  path: "/platforms",
});

const platformsHeroImage =
  PLATFORMS.find((platform) => platform.slug === "gravity")?.homeImage ?? PLATFORMS[0].homeImage;

export default function PlatformsPage() {
  return (
    <>
      <PageHero
        breadcrumb="Home"
        eyebrow="The Platforms"
        title="Four intelligences. One architecture."
        image={platformsHeroImage}
        lead="Each platform addresses a different decision. The reasoning beneath them is deliberately shared."
        actions={[
          { label: "Explore the architecture", href: "/architecture" },
          { label: "Begin a correspondence", href: "/contact", variant: "primary" },
        ]}
      />

      <section className="container-shell border-b border-line py-14 md:py-20">
        <div className="mb-10 border-b border-line pb-6">
          <Eyebrow>At a glance</Eyebrow>
        </div>
        <ComparisonTable platforms={PLATFORMS} />
      </section>

      <section className="container-shell py-20 md:py-28">
        <div className="space-y-20 md:space-y-28">
          {PLATFORMS.map((platform) => {
            const dark = platform.tone === "dark";
            return (
              <Reveal key={platform.slug}>
                <article
                  className={
                    dark
                      ? "tone-dark -mx-6 border border-line-dark px-6 py-10 md:-mx-10 md:px-10 md:py-14"
                      : ""
                  }
                >
                  <div className="grid gap-10 lg:grid-cols-12">
                    <div className="lg:col-span-3">
                      <Eyebrow tone="gold">{platform.roman}</Eyebrow>
                      <Rule className="hairline-draw mt-8 max-w-12" accent />
                    </div>
                    <div className="lg:col-span-6">
                      <h2 className="display-md">{platform.name}</h2>
                      <p className={`statement-md mt-4 ${dark ? "text-bone/80" : "text-muted"}`}>
                        {platform.capability}
                      </p>
                      <p className={`lede mt-6 ${dark ? "text-muted-light" : ""}`}>
                        {platform.oneLiner}
                      </p>
                      <div className="mt-8 flex flex-wrap gap-4">
                        <StatusBadge status={platform.status} tone={platform.tone} />
                      </div>
                      <div className="mt-10 flex flex-wrap gap-6">
                        <ArrowLink href={`/platforms/${platform.slug}`}>
                          Platform details
                        </ArrowLink>
                        <ArrowLink href={platform.liveUrl} external>
                          Visit live platform
                        </ArrowLink>
                      </div>
                    </div>
                    <div className="lg:col-span-3">
                      <HairlineCard tone={platform.tone} className={dark ? "bg-ink" : "bg-bone"}>
                        <div className="relative h-40 overflow-hidden">
                          <Image
                            src={platform.homeImage}
                            alt=""
                            fill
                            sizes="(min-width: 1024px) 22vw, (min-width: 768px) 45vw, 100vw"
                            className="object-cover"
                            style={{ opacity: 0.78 }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/20 to-transparent" />
                          <span className="absolute bottom-3 left-3 font-mono text-[0.5625rem] uppercase tracking-[0.18em] text-bone">
                            {platform.name}
                          </span>
                        </div>
                        <p
                          className={`mt-4 font-mono text-[0.5625rem] uppercase tracking-[0.18em] ${dark ? "text-muted-light" : "text-muted"}`}
                        >
                          {platform.capability}
                        </p>
                      </HairlineCard>
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section className="tone-dark py-16 md:py-20">
        <div className="container-shell flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div>
            <Eyebrow tone="gold">Engagement</Eyebrow>
            <p className="mt-4 max-w-xl font-display text-2xl md:text-3xl">
              The door is narrow on purpose.
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
