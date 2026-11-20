"use client";

import { useActiveSection } from "@/hooks/useActiveSection";
import type { RailItem } from "./SectionRail";

export function StickySubNav({ items }: { items: RailItem[] }) {
  const active = useActiveSection(items.map((item) => item.id), "-20% 0px -70% 0px");

  return (
    <nav
      aria-label="Page sections"
      className="sticky top-[76px] z-30 border-y border-line/70 bg-bone/90 backdrop-blur-sm"
    >
      <div className="container-shell flex gap-7 overflow-x-auto py-3">
        {items.map((item) => {
          const current = active === item.id;
          return (
            <a
              key={item.id}
              href={`#${item.id}`}
              aria-current={current ? "location" : undefined}
              className={`relative shrink-0 pb-1 font-mono text-[0.625rem] uppercase tracking-[0.16em] transition-colors ${
                current ? "text-gold" : "text-muted hover:text-ink"
              }`}
            >
              {item.label}
              <span
                aria-hidden="true"
                className={`absolute bottom-0 left-0 h-px bg-gold transition-all duration-300 ${
                  current ? "w-full" : "w-0"
                }`}
              />
            </a>
          );
        })}
      </div>
    </nav>
  );
}
