"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { NAV_ITEMS, SITE } from "@/content/site";
import { cn } from "@/lib/cn";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [lastPathname, setLastPathname] = useState(pathname);
  const dark = pathname === "/" || pathname === "/platforms/gravity";

  // Close the mobile menu on navigation without a cascading effect.
  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setOpen(false);
  }

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "relative z-50 border-b",
        dark ? "border-line-dark bg-ink-home text-bone" : "border-line bg-bone text-ink",
      )}
    >
      <div className="container-shell">
        <div className="hidden items-center justify-between border-b border-current/15 py-3 lg:flex">
          <span className="font-mono text-[0.625rem] uppercase tracking-[0.2em] opacity-70">
            {SITE.microHeader}
          </span>
          <div className="flex items-center gap-8">
            <a
              href={SITE.parent.href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] transition-colors hover:text-gold"
            >
              Parent: {SITE.parent.label} <span aria-hidden="true">↗</span>
            </a>
            <Link
              href="/contact"
              className="border border-gold px-5 py-2 font-mono text-[0.625rem] uppercase tracking-[0.14em] text-gold transition-colors hover:bg-gold hover:text-ink"
            >
              Begin a Correspondence
            </Link>
          </div>
        </div>

        <div className="flex h-[76px] items-center justify-between gap-8">
          <Link href="/" className="group flex items-baseline gap-2" aria-label="Matrka Applied Systems — home">
            <span className="font-display text-2xl tracking-[-0.03em]">MATRKA</span>
            <span className="hidden font-mono text-[0.625rem] uppercase tracking-[0.18em] opacity-70 sm:inline">
              Applied Systems
            </span>
          </Link>

          <nav aria-label="Primary" className="hidden items-center gap-9 lg:flex">
            {NAV_ITEMS.map((item) => {
              const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "relative py-2 font-mono text-[0.6875rem] uppercase tracking-[0.16em] transition-colors hover:text-gold",
                    active && "text-gold",
                  )}
                >
                  <span
                    aria-hidden="true"
                    className="active-marker absolute -left-2 top-1/2 h-1 w-1 -translate-y-1/2 bg-gold"
                  />
                  {item.label}
                  {active ? (
                    <span
                      aria-hidden="true"
                      className="absolute -bottom-0.5 left-0 h-px w-full bg-gold"
                    />
                  ) : null}
                </Link>
              );
            })}
          </nav>

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="flex h-11 w-11 flex-col items-center justify-center gap-1.5 border border-current/25 lg:hidden"
          >
            <span
              className={cn(
                "block h-px w-5 bg-current transition-transform",
                open && "translate-y-[3.5px] rotate-45",
              )}
            />
            <span
              className={cn(
                "block h-px w-5 bg-current transition-transform",
                open && "-translate-y-[3.5px] -rotate-45",
              )}
            />
          </button>
        </div>
      </div>

      {open ? (
        <nav
          id="mobile-menu"
          aria-label="Mobile"
          className={cn(
            "fixed inset-0 top-[76px] z-40 flex flex-col gap-8 overflow-y-auto px-7 py-12 lg:hidden",
            dark ? "bg-ink-home text-bone" : "bg-bone text-ink",
          )}
        >
          {NAV_ITEMS.map((item, index) => (
            <Link
              key={item.href}
              href={item.href}
              className="mobile-nav-item font-display text-4xl leading-none"
              style={{ animationDelay: `${index * 70}ms` }}
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <a
            href={SITE.parent.href}
            target="_blank"
            rel="noopener noreferrer"
            className="mobile-nav-item font-mono text-xs uppercase tracking-[0.16em]"
            style={{ animationDelay: `${NAV_ITEMS.length * 70}ms` }}
          >
            Parent: {SITE.parent.label} ↗
          </a>
          <Link
            href="/contact"
            onClick={() => setOpen(false)}
            className="mobile-nav-item mt-2 inline-flex w-fit border border-gold px-6 py-3 font-mono text-xs uppercase tracking-[0.14em] text-gold"
            style={{ animationDelay: `${(NAV_ITEMS.length + 1) * 70}ms` }}
          >
            Begin a Correspondence
          </Link>
        </nav>
      ) : null}
    </header>
  );
}
