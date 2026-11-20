import Link from "next/link";
import { FOOTER_COLUMNS, LEGAL_LINKS, SITE } from "@/content/site";
import { BrandMark } from "@/components/ui/BrandMark";

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-bone pb-24 text-ink lg:pb-0">
      <div className="container-shell py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="flex items-center gap-3">
              <BrandMark size={40} />
              <div className="font-display text-3xl leading-none tracking-[-0.03em]">
                MATRKA
                <span className="ml-2 font-mono text-[0.625rem] uppercase tracking-[0.18em]">
                  Applied Systems
                </span>
              </div>
            </div>
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-muted">
              Applied intelligence for enterprise. Built in Kolkata, India.
            </p>
            <a
              href={SITE.parent.href}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 border-b border-gold/60 pb-1 font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-ink transition-colors hover:text-gold"
            >
              {SITE.parent.label} <span aria-hidden="true">↗</span>
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          </div>

          {FOOTER_COLUMNS.map((column) => (
            <div key={column.heading} className="lg:col-span-2">
              <h2 className="font-mono text-[0.625rem] uppercase tracking-[0.2em] text-muted">
                {column.heading}
              </h2>
              <ul className="mt-6 space-y-3">
                {column.links.map((link) => (
                  <li key={`${column.heading}-${link.label}`}>
                    {"external" in link && link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm transition-colors hover:text-gold"
                      >
                        {link.label} <span aria-hidden="true">↗</span>
                      </a>
                    ) : (
                      <Link
                        prefetch={false}
                        href={link.href}
                        className="text-sm transition-colors hover:text-gold"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-20 flex flex-col gap-6 border-t border-line pt-8 md:flex-row md:items-center md:justify-between">
          <ul className="flex flex-wrap gap-x-6 gap-y-3">
            {LEGAL_LINKS.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-[0.625rem] uppercase tracking-[0.12em] text-muted transition-colors hover:text-gold"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <p className="font-mono text-[0.625rem] uppercase tracking-[0.12em] text-muted">
            {SITE.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
}
