"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_ITEMS } from "@/content/site";
import { cn } from "@/lib/cn";

export function MobileBottomNav() {
  const pathname = usePathname();
  const dark = pathname === "/" || pathname === "/platforms/gravity";

  return (
    <nav
      aria-label="Section navigation"
      className={cn(
        "fixed inset-x-0 bottom-0 z-40 grid grid-cols-4 border-t py-3 lg:hidden",
        dark
          ? "border-line-dark bg-ink-home/95 text-bone"
          : "border-line bg-bone/95 text-ink",
      )}
    >
      {NAV_ITEMS.map((item) => {
        const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
        return (
          <Link prefetch={false}
            key={item.href}
            href={item.href}
            aria-current={active ? "page" : undefined}
            className={cn(
              "text-center font-mono text-[0.625rem] uppercase tracking-[0.08em]",
              active ? "text-gold" : "opacity-70",
            )}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
