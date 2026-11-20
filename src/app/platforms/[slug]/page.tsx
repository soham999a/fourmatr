import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PlatformFigure } from "@/components/figures/PlatformFigure";
import { LazyShaderField as ShaderField } from "@/components/webgl/LazyShaderField";
import { InterfacePreview } from "@/components/sections/InterfacePreview";
import { PageHero } from "@/components/sections/PageHero";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { FigurePlate } from "@/components/ui/FigurePlate";
import { HairlineCard } from "@/components/ui/HairlineCard";
import { Reveal } from "@/components/ui/Reveal";
import { Rule } from "@/components/ui/Rule";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { PLATFORMS, getPlatform } from "@/content/platforms";
import { pageMetadata } from "@/lib/metadata";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return PLATFORMS.map((platform) => ({ slug: platform.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const platform = getPlatform(slug);
  if (!platform) return {};

  return pageMetadata({
    title: `${platform.name} — ${platform.capability}`,
    description: platform.oneLiner,
    path: `/platforms/${platform.slug}`,
  });
}

export default async function PlatformPage({ params }: PageProps) {
  const { slug } = await params;
  const platform = getPlatform(slug);
  if (!platform) notFound();

  const dark = platform.tone === "dark";
  const previewVariant =
    platform.slug === "datum"
      ? "analytics"
      : platform.slug === "humming"
        ? "operations"
        : platform.slug === "gravity"
          ? "decision"
          : "signals";

  return (
    <>
      <PageHero
        breadcrumb="Platforms"
        eyebrow={platform.capability}
        title={platform.name}
        lead={platform.heroLead}
        status={platform.status}
        tone={platform.tone}
        actions={[
          {
            label: `Open ${platform.name}`,
            href: platform.liveUrl,
            variant: "primary",
            external: true,
          },
          { label: platform.secondaryCta.label, href: platform.secondaryCta.href },
        ]}
      >
        <div className="absolute right-[-10%] top-[-20%] h-[520px] w-[720px] opacity-25">
          <ShaderField
            variant={platform.figure}
            dark={dark}
            fallback={<PlatformFigure kind={platform.figure} dark={dark} />}
          />
        </div>
      </PageHero>

      {/* Statement */}
      <section className={dark ? "tone-dark py-20 md:py-28" : "py-20 md:py-28"}>
        <div className="container-shell grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-3">
            <Eyebrow tone={dark ? "gold" : "gold"}>{platform.roman}</Eyebrow>
            <p
              className={`mt-6 font-mono text-[0.625rem] uppercase tracking-[0.18em] ${dark ? "text-muted-light" : "text-muted"}`}
            >
              {platform.capability}
            </p>
            <Rule className="hairline-draw mt-8 max-w-16" accent />
          </Reveal>
          <Reveal delay={80} className="lg:col-span-9">
            <p className="font-display text-3xl leading-[1.15] md:text-4xl lg:text-5xl">
              {platform.statement}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Figure */}
      <section className={dark ? "tone-dark pb-20 md:pb-28" : "pb-20 md:pb-28"}>
        <div className="container-shell">
          <Reveal>
            <FigurePlate
              caption={`Architecture diagram · ${platform.name}`}
              tone={platform.tone}
              annotations={platform.features.slice(0, 3).map((feature, index) => ({
                label: feature.title,
                x: 22 + index * 28,
                y: 32 + index * 18,
              }))}
            >
              <div className="flex items-center justify-between">
                <Eyebrow tone={dark ? "bone" : "ink"}>Architecture diagram</Eyebrow>
                <span
                  className={`font-mono text-[0.625rem] tracking-[0.18em] ${dark ? "text-muted-light" : "text-muted"}`}
                >
                  FIGURE · {platform.name.toUpperCase()}
                </span>
              </div>
              <div className="figure-glow mt-8 h-64 md:h-96">
                <PlatformFigure kind={platform.figure} dark={dark} />
              </div>
              <Rule className="mt-6" tone={dark ? "dark" : "light"} />
            </FigurePlate>
          </Reveal>
        </div>
      </section>

      {/* Features */}
      <section
        className={`${dark ? "tone-dark" : "bg-tint/50"} border-y ${dark ? "border-line-dark" : "border-line"} py-20 md:py-28`}
      >
        <div className="container-shell">
          <Reveal>
            <SectionHeader
              eyebrow="Capability"
              titleLines={[platform.featuresHeading]}
              ghost={platform.roman}
              tone={platform.tone}
              size="md"
            />
          </Reveal>
          <div className="mt-12 grid gap-px border border-line/60 bg-line/40 md:grid-cols-2 lg:grid-cols-3">
            {platform.features.map((feature, index) => (
              <Reveal key={feature.number} delay={index * 50}>
                <HairlineCard
                  tone={platform.tone}
                  className={`h-full ${dark ? "bg-ink" : "bg-bone"}`}
                  accent={index === 0}
                >
                  <span className="font-mono text-[0.625rem] tracking-[0.2em] text-gold">
                    {feature.number}
                  </span>
                  <h3 className="mt-8 font-display text-2xl md:text-3xl">{feature.title}</h3>
                  {feature.body ? (
                    <p className={`lede mt-3 text-sm ${dark ? "text-muted-light" : ""}`}>
                      {feature.body}
                    </p>
                  ) : null}
                </HairlineCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Interface preview */}
      <section className="py-20 md:py-28">
        <div className="container-shell grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <Eyebrow className="block">Interface</Eyebrow>
            <h2 className="display-md mt-8">A view of the work.</h2>
            <p className="lede mt-6">
              An illustration of the platform layout. Labels are generic; no customer data is shown.
            </p>
          </Reveal>
          <Reveal delay={80} className="lg:col-span-8">
            <InterfacePreview
              label={platform.previewLabel}
              dark={dark}
              variant={previewVariant}
            />
          </Reveal>
        </div>
      </section>

      {/* Method */}
      {platform.method?.length ? (
        <section
          className={`${dark ? "tone-dark" : "bg-tint/50"} border-y ${dark ? "border-line-dark" : "border-line"} py-20 md:py-28`}
        >
          <div className="container-shell">
            <Reveal>
              <Eyebrow tone={dark ? "gold" : "gold"}>{platform.methodHeading ?? "The Method"}</Eyebrow>
              <h2 className="display-md mt-8">{platform.methodLead ?? "How it works"}</h2>
            </Reveal>
            <div className="mt-14 space-y-0 border-t border-line">
              {platform.method.map((step, index) => (
                <Reveal key={step.number} delay={index * 50}>
                  <div
                    className={`grid gap-4 border-b py-7 md:grid-cols-12 ${dark ? "border-line-dark" : "border-line"}`}
                  >
                    <div className="md:col-span-2">
                      <span className="font-mono text-[0.625rem] tracking-[0.2em] text-gold">
                        {step.number}
                      </span>
                    </div>
                    <div className="md:col-span-5">
                      <h3 className="font-display text-2xl md:text-3xl">{step.title}</h3>
                    </div>
                    <div className="md:col-span-5">
                      {step.body ? (
                        <p className={`lede text-sm ${dark ? "text-muted-light" : ""}`}>
                          {step.body}
                        </p>
                      ) : null}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* Reasoning / aside */}
      {platform.reasoning?.length || platform.asideBody ? (
        <section className="py-20 md:py-28">
          <div className="container-shell grid gap-12 lg:grid-cols-12">
            <Reveal className="lg:col-span-5">
              <Eyebrow className="block">{platform.asideHeading ?? "How it reasons"}</Eyebrow>
              <p className="lede mt-6">{platform.asideBody}</p>
              {platform.note ? (
                <p className="mt-8 border-l-2 border-gold pl-4 text-xs text-muted">
                  {platform.note}
                </p>
              ) : null}
            </Reveal>
            {platform.reasoning?.length ? (
              <Reveal delay={80} className="lg:col-span-7">
                <div className="grid gap-px border border-line bg-line/60 sm:grid-cols-2">
                  {platform.reasoning.map((item, index) => (
                    <HairlineCard key={item} className="bg-bone">
                      <span className="font-mono text-[0.5625rem] tracking-[0.2em] text-muted">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <p className="mt-4 font-display text-xl">{item}</p>
                    </HairlineCard>
                  ))}
                </div>
              </Reveal>
            ) : null}
          </div>
        </section>
      ) : null}

      {/* Audience / example */}
      {platform.audience?.length || platform.example ? (
        <section className="border-t border-line bg-tint/40 py-16 md:py-20">
          <div className="container-shell grid gap-10 md:grid-cols-12">
            {platform.audience?.length ? (
              <Reveal className="md:col-span-7">
                <Eyebrow>Who it is for</Eyebrow>
                <div className="mt-8 flex flex-wrap gap-3">
                  {platform.audience.map((item) => (
                    <span
                      key={item}
                      className="border border-line px-4 py-2 text-xs text-muted"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </Reveal>
            ) : null}
            {platform.example ? (
              <Reveal delay={80} className="md:col-span-5">
                <Eyebrow>Example question</Eyebrow>
                <p className="mt-8 font-display text-2xl leading-snug">“{platform.example}”</p>
              </Reveal>
            ) : null}
          </div>
        </section>
      ) : null}

      {/* Closing */}
      <section className="tone-dark band-wipe py-20 md:py-28">
        <div className="container-shell grid gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-8">
            <Eyebrow tone="gold">Platform {platform.roman}</Eyebrow>
            <p className="mt-8 font-display text-4xl leading-tight md:text-5xl">
              {platform.closingLead}
            </p>
            {platform.note ? (
              <p className="mt-8 max-w-xl text-sm text-muted-light">{platform.note}</p>
            ) : null}
            <div className="mt-10 flex flex-wrap gap-8">
              <Button href={platform.liveUrl} variant="primary" external>
                Open {platform.name}
              </Button>
              <ArrowLink href={platform.secondaryCta.href}>
                {platform.secondaryCta.label}
              </ArrowLink>
            </div>
          </Reveal>
          <Reveal delay={100} className="lg:col-span-4 lg:pt-16">
            <div className="border border-line-dark p-6">
              <p className="font-mono text-[0.625rem] uppercase tracking-[0.2em] text-muted-light">
                Platform index
              </p>
              <div className="mt-6 space-y-3">
                {PLATFORMS.map((item) => (
                  <div key={item.slug} className="flex items-center justify-between gap-4 text-sm">
                    <span className={item.slug === platform.slug ? "text-gold" : "text-bone/70"}>
                      {item.name}
                    </span>
                    <span className="font-mono text-[0.5625rem] text-muted-light">{item.roman}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
