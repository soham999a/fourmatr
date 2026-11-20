import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "outline" | "ghost";

const base =
  "relative isolate inline-flex min-h-12 items-center justify-center gap-3 overflow-hidden border px-6 py-3 text-[0.6875rem] font-medium uppercase tracking-[0.16em] transition-colors duration-300";

const variants: Record<Variant, string> = {
  primary: "border-gold bg-gold text-ink hover:border-[#d8b45e] btn-wipe-light",
  outline: "border-current/40 bg-transparent text-current hover:border-gold hover:text-ink btn-wipe",
  ghost:
    "border-transparent bg-transparent text-current underline-offset-4 hover:underline focus-visible:outline-gold",
};

interface ButtonProps {
  href: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
  fullWidth?: boolean;
  external?: boolean;
  ariaLabel?: string;
}

export function Button({
  href,
  children,
  variant = "outline",
  className,
  fullWidth,
  external = false,
  ariaLabel,
}: ButtonProps) {
  const classes = cn(base, variants[variant], fullWidth && "w-full", className);
  const externalProps = external
    ? { target: "_blank" as const, rel: "noopener noreferrer" }
    : {};

  return (
    <Link
      href={href}
      prefetch={false}
      className={classes}
      aria-label={ariaLabel}
      {...(external ? externalProps : {})}
    >
      <span className="relative z-10 inline-flex items-center gap-3">
        {children}
        {external ? <span aria-hidden="true">↗</span> : null}
      </span>
    </Link>
  );
}
