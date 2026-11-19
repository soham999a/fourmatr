import type { Metadata } from "next";
import { PlatformFigure } from "@/components/figures/PlatformFigure";
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

export default function PlatformsPage() {
  return (
    <>
      <PageHero
        breadcrumb="Home"
        eyebrow="The Platforms"
        title="Four intelligences. One architecture."
        lead="Each platform addresses a different decision. The reasoning beneath them is deliberately shared."
        actions={[
          { label: "Explore the architecture", href: "/architecture" },
          { label: "Begin a correspondence", href: "/contact", variant: "primary" },
        ]}
      />

      <section className="container-shell border-b border-line py-14 md:py-20">
        <div className="mb-10 flex items-end justify-between gap-6">
          <Eyebrow>At a glance</Eyebrow>
          <span className="font-mono text-[0.625rem] uppercase tracking-[0.18em] text-muted">
            01 — 04
          </span>
        </div>
        <ComparisonTable platforms={PLATFORMS} />
      </section>

      <section className="container-shell py-20 md:py-28">
        <div className="space-y-20 md:space-y-28">
          {PLATFORMS.map((platform, index) => {
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
                      <div className="flex items-center gap-4">
                        <Eyebrow tone={dark ? "gold" : "gold"}>{platform.roman}</Eyebrow>
                        <Rule className="max-w-12" accent />
                      </div>
                      <p
                        className={`mt-6 font-mono text-[0.625rem] uppercase tracking-[0.18em] ${dark ? "text-muted-light" : "text-muted"}`}
                      >
                        {String(index + 1).padStart(2, "0")} / 04
                      </p>
                    </div>
                    <div className="lg:col-span-6">
                      <h2 className="display-md">{platform.name}</h2>
                      <p
                        className={`font-display text-xl mt-3 ${dark ? "text-bone/80" : "text-muted"}`}
                      >
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
                        <div className="h-28">
                          <PlatformFigure
                            kind={platform.figure}
                            dark={dark}
                            className="opacity-90"
                          />
                        </div>
                        <p
                          className={`mt-4 font-mono text-[0.5625rem] uppercase tracking-[0.18em] ${dark ? "text-muted-light" : "text-muted"}`}
                        >
                          Figure {String(index + 1).padStart(2, "0")}
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
