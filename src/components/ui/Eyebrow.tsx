import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type Tone = "ink" | "bone" | "gold" | "muted";

const toneClass: Record<Tone, string> = {
  ink: "text-ink",
  bone: "text-bone",
  gold: "text-gold",
  muted: "text-muted dark:text-muted-light",
};

interface EyebrowProps {
  children: ReactNode;
  tone?: Tone;
  className?: string;
  as?: "span" | "p" | "div" | "h2";
}

export function Eyebrow({ children, tone = "ink", className, as = "span" }: EyebrowProps) {
  const Tag = as;
  return <Tag className={cn("eyebrow", toneClass[tone], className)}>{children}</Tag>;
}
