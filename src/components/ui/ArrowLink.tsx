import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

interface ArrowLinkProps {
  href: string;
  children: ReactNode;
  external?: boolean;
  className?: string;
}

export function ArrowLink({ href, children, external, className }: ArrowLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center gap-2 border-b border-gold/60 pb-1 font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-current transition-colors hover:border-gold hover:text-gold",
        className,
      )}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
      <span aria-hidden="true">{external ? "↗" : "→"}</span>
      {external ? <span className="sr-only">(opens in a new tab)</span> : null}
    </Link>
  );
}
