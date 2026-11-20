"use client";

import { useActiveSection } from "@/hooks/useActiveSection";

export interface RailItem {
  id: string;
  label: string;
}

export function SectionRail({ items }: { items: RailItem[] }) {
  const active = useActiveSection(items.map((item) => item.id));

  return (
    <nav
      aria-label="Section index"
      className="fixed right-5 top-1/2 z-30 hidden -translate-y-1/2 flex-col gap-1 border border-line/60 bg-bone/80 px-2 py-3 backdrop-blur-sm xl:flex"
    >
      {items.map((item, index) => {
        const current = active === item.id;
        return (
          <a
            key={item.id}
            href={`#${item.id}`}
            aria-label={item.label}
            aria-current={current ? "location" : undefined}
            className="group flex items-center justify-end gap-2 py-1.5"
          >
            <span className="font-mono text-[0.5625rem] uppercase tracking-[0.18em] text-muted opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
              {item.label}
            </span>
            <span
              className={`h-px transition-all duration-300 ${
                current ? "w-5 bg-gold" : "w-2 bg-line group-hover:w-4 group-hover:bg-gold"
              }`}
            />
            <span
              className={`font-mono text-[0.5625rem] tabular-nums transition-colors ${
                current ? "text-gold" : "text-muted"
              }`}
            >
              {String(index + 1).padStart(2, "0")}
            </span>
          </a>
        );
      })}
    </nav>
  );
}
