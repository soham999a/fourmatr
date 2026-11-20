import Link from "next/link";
import { FOOTER_COLUMNS, SITE } from "@/content/site";
import { BrandMark } from "@/components/ui/BrandMark";

export function SiteFooter() {
  return (
    <footer className="reference-footer">
      <div className="reference-shell">
        <div className="reference-footer-top">
          <Link
            prefetch={false}
            href="/#top"
            className="reference-footer-brand"
            aria-label="MATRKA Applied Systems home"
          >
            <BrandMark size={38} />
            <span className="reference-footer-brand-name">
              MATRKA
              <small>APPLIED SYSTEMS</small>
            </span>
          </Link>
          <p>Built in India.</p>
          <a
            href={SITE.parent.href}
            target="_blank"
            rel="noopener noreferrer"
            className="reference-footer-mail"
          >
            {SITE.parent.label} <span aria-hidden="true">↗</span>
            <span className="sr-only">(opens in a new tab)</span>
          </a>
        </div>

        <div className="reference-footer-links">
          {FOOTER_COLUMNS.map((column) => (
            <div key={column.heading}>
              <span>{column.heading}</span>
              {column.links.map((link) =>
                "external" in link && link.external ? (
                  <a
                    key={`${column.heading}-${link.label}`}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link
                    key={`${column.heading}-${link.label}`}
                    prefetch={false}
                    href={link.href}
                  >
                    {link.label}
                  </Link>
                ),
              )}
            </div>
          ))}
        </div>

        <div className="reference-footer-bottom">
          <span>{SITE.copyright}</span>
          <span>{SITE.motto}</span>
          <Link prefetch={false} href="/#top">
            BACK TO TOP ↑
          </Link>
        </div>
      </div>
    </footer>
  );
}
