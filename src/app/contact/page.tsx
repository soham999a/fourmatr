import type { Metadata } from "next";
import { ContactForm } from "@/components/sections/ContactForm";
import { PageHero } from "@/components/sections/PageHero";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { Rule } from "@/components/ui/Rule";
import { PLATFORMS } from "@/content/platforms";
import { SITE } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Contact",
  description:
    "Begin a correspondence with Matrka Applied Systems. Describe the decision, the institution and the horizon.",
  path: "/contact",
});

interface ContactPageProps {
  searchParams: Promise<{ platform?: string }>;
}

export default async function ContactPage({ searchParams }: ContactPageProps) {
  const { platform } = await searchParams;
  const selected = PLATFORMS.some((item) => item.slug === platform) ? platform : undefined;

  return (
    <>
      <PageHero
        breadcrumb="Home"
        eyebrow="Correspondence"
        title="Begin with the decision."
        lead="A short description of the decision, institution and horizon is enough. We read every note."
        actions={[
          { label: `Mail ${SITE.contact.email}`, href: `mailto:${SITE.contact.email}` },
        ]}
      />

      <section className="container-shell py-20 md:py-28">
        <div className="grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Reveal>
              <Eyebrow>Direct</Eyebrow>
              <div className="mt-8 space-y-10">
                <div>
                  <p className="font-mono text-[0.625rem] uppercase tracking-[0.18em] text-muted">
                    Email
                  </p>
                  <ArrowLink href={`mailto:${SITE.contact.email}`} className="mt-3 text-base">
                    {SITE.contact.email}
                  </ArrowLink>
                </div>
                <div>
                  <p className="font-mono text-[0.625rem] uppercase tracking-[0.18em] text-muted">
                    Telephone
                  </p>
                  <ArrowLink href={SITE.contact.phoneHref} className="mt-3 text-base">
                    {SITE.contact.phone}
                  </ArrowLink>
                </div>
                <div>
                  <p className="font-mono text-[0.625rem] uppercase tracking-[0.18em] text-muted">
                    Studio
                  </p>
                  <p className="mt-3 font-display text-xl">{SITE.contact.location}</p>
                </div>
              </div>
              <Rule className="mt-12" />
              <p className="mt-8 text-xs text-muted">
                A small number of engagements each year. The door is narrow on purpose.
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-8">
            <Reveal delay={80}>
              <div className="border border-line bg-panel p-6 md:p-10">
                <div className="mb-10 border-b border-line pb-6">
                  <Eyebrow tone="gold">Correspondence form</Eyebrow>
                </div>
                <ContactForm platform={selected} />
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
