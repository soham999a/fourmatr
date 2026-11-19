import { cn } from "@/lib/cn";

export type CounterFormat = "ratio" | "roman" | "figure" | "layer" | "plain";

interface FigureCounterProps {
  value: string;
  format?: CounterFormat;
  label?: string;
  className?: string;
  tone?: "light" | "dark";
}

export function FigureCounter({
  value,
  format = "plain",
  label,
  className,
  tone = "light",
}: FigureCounterProps) {
  const rendered =
    format === "figure" ? `Figure ${value}` : format === "layer" ? value : value;

  return (
    <span
      className={cn(
        "font-mono text-[0.625rem] uppercase tracking-[0.22em]",
        tone === "dark" ? "text-muted-light" : "text-muted",
        className,
      )}
      aria-label={label ? `${rendered} — ${label}` : undefined}
    >
      {rendered}
    </span>
  );
}
