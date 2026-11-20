import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export interface FigureAnnotation {
  label: string;
  x: number;
  y: number;
}

interface FigurePlateProps {
  caption: string;
  previewLabel?: string;
  tone?: "light" | "dark";
  annotations?: FigureAnnotation[];
  className?: string;
  children: ReactNode;
}

export function FigurePlate({
  caption,
  previewLabel = "Interface preview",
  tone = "light",
  annotations,
  className,
  children,
}: FigurePlateProps) {
  return (
    <figure
      className={cn(
        "figure-plate group relative border p-4 md:p-8",
        tone === "dark" ? "border-line-dark bg-ink text-bone" : "border-line bg-panel text-ink",
        className,
      )}
    >
      <span aria-hidden="true" className="plate-corner plate-corner-tl" />
      <span aria-hidden="true" className="plate-corner plate-corner-tr" />
      <span aria-hidden="true" className="plate-corner plate-corner-bl" />
      <span aria-hidden="true" className="plate-corner plate-corner-br" />

      <div className="relative z-10 flex flex-wrap items-center justify-between gap-4">
        <figcaption
          className={cn(
            "font-mono text-[0.625rem] uppercase tracking-[0.18em]",
            tone === "dark" ? "text-muted-light" : "text-muted",
          )}
        >
          {caption}
        </figcaption>
        {previewLabel ? (
          <span className="border border-current/25 px-2 py-1 font-mono text-[0.5625rem] uppercase tracking-[0.18em] opacity-70">
            {previewLabel}
          </span>
        ) : null}
      </div>

      <div className="relative z-10 mt-8">{children}</div>

      {annotations?.length ? (
        <div aria-hidden="true" className="absolute inset-0 z-20">
          {annotations.map((annotation, index) => (
            <span
              key={`${annotation.label}-${index}`}
              className="plate-annotation"
              style={{ left: `${annotation.x}%`, top: `${annotation.y}%` }}
            >
              <span>{annotation.label}</span>
            </span>
          ))}
        </div>
      ) : null}
    </figure>
  );
}
