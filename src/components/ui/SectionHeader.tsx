import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Eyebrow } from "./Eyebrow";

interface SectionHeaderProps {
  eyebrow: string;
  titleLines: string[];
  index?: string;
  ghost?: string;
  aside?: ReactNode;
  className?: string;
  tone?: "light" | "dark";
  size?: "md" | "lg";
}

export function SectionHeader({
  eyebrow,
  titleLines,
  index,
  ghost,
  aside,
  className,
  tone = "light",
  size = "lg",
}: SectionHeaderProps) {
  return (
    <div className={cn("relative", className)}>
      {ghost ? (
        <span aria-hidden="true" className="ghost-number">
          {ghost}
        </span>
      ) : null}
      <div className="mb-8 flex items-start justify-between gap-6">
        <Eyebrow tone={tone === "dark" ? "bone" : "ink"}>{eyebrow}</Eyebrow>
        {index ? (
          <span
            className={cn(
              "font-mono text-[0.625rem] tracking-[0.18em]",
              tone === "dark" ? "text-muted-light" : "text-muted",
            )}
          >
            {index}
          </span>
        ) : null}
      </div>
      <div className={cn("grid gap-8", aside ? "lg:grid-cols-12" : "")}>
        <h2
          className={cn(
            aside ? "lg:col-span-7" : "max-w-4xl",
            "relative z-10",
            size === "lg" ? "display-lg" : "display-md",
            tone === "dark" ? "text-bone" : "text-ink",
          )}
        >
          {titleLines.map((line) => (
            <span key={line} className="line-reveal">
              {line}
            </span>
          ))}
        </h2>
        {aside ? <div className="lg:col-span-5 lg:pt-4">{aside}</div> : null}
      </div>
    </div>
  );
}
