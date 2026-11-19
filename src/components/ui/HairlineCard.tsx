import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

interface HairlineCardProps {
  children: ReactNode;
  className?: string;
  tone?: "light" | "dark";
  accent?: boolean;
}

export function HairlineCard({
  children,
  className,
  tone = "light",
  accent = false,
}: HairlineCardProps) {
  return (
    <div
      className={cn(
        "relative border p-6 md:p-8",
        tone === "dark" ? "border-line-dark" : "border-line",
        accent && "border-t-gold",
        className,
      )}
    >
      {children}
    </div>
  );
}
