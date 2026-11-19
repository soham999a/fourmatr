import { cn } from "@/lib/cn";

interface InterfacePreviewProps {
  label?: string;
  className?: string;
  dark?: boolean;
  variant?: "signals" | "decision" | "analytics" | "operations";
}

const BARS = [38, 62, 47, 74, 55, 84, 68];

export function InterfacePreview({
  label = "Interface preview",
  className,
  dark = false,
  variant = "signals",
}: InterfacePreviewProps) {
  const border = dark ? "border-line-dark" : "border-line";
  const muted = dark ? "text-muted-light" : "text-muted";

  return (
    <div
      className={cn(
        "relative border p-4 md:p-6",
        border,
        dark ? "bg-[#0b0906]" : "bg-panel",
        className,
      )}
      aria-label={label}
    >
      <div className="mb-5 flex items-center justify-between gap-4">
        <span
          className={cn(
            "font-mono text-[0.625rem] uppercase tracking-[0.22em]",
            dark ? "text-gold" : "text-gold",
          )}
        >
          {label}
        </span>
        <span className={cn("font-mono text-[0.625rem] tracking-[0.16em]", muted)}>
          Generic layout
        </span>
      </div>

      <div className="grid gap-px border border-line/60 bg-line/40 md:grid-cols-3">
        {[
          { title: "Context", detail: "What changed" },
          { title: "Reasoning", detail: "What it means" },
          { title: "Decision", detail: "What follows" },
        ].map((panel, index) => (
          <div
            key={panel.title}
            className={cn("min-h-32 p-4", dark ? "bg-[#0b0906]" : "bg-panel")}
          >
            <div className="flex items-center justify-between">
              <span className={cn("font-mono text-[0.5625rem] tracking-[0.18em]", muted)}>
                0{index + 1}
              </span>
              <span className="h-1.5 w-1.5 rounded-full bg-gold/70" aria-hidden="true" />
            </div>
            <p className="mt-5 font-display text-lg">{panel.title}</p>
            <p className={cn("mt-1 text-xs", muted)}>{panel.detail}</p>
          </div>
        ))}
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-12">
        <div className={cn("border p-4 md:col-span-7", border)}>
          <p className={cn("font-mono text-[0.5625rem] uppercase tracking-[0.18em]", muted)}>
            {variant === "analytics"
              ? "Analysis view"
              : variant === "operations"
                ? "Monitoring view"
                : variant === "decision"
                  ? "Option view"
                  : "Signal view"}
          </p>
          <div className="mt-6 flex h-28 items-end gap-3" aria-hidden="true">
            {BARS.map((height, index) => (
              <div key={index} className="flex h-full flex-1 items-end">
                <div
                  className="w-full bg-gold/25"
                  style={{ height: `${height}%` }}
                />
              </div>
            ))}
          </div>
          <div className="mt-3 flex justify-between">
            {["A", "B", "C", "D", "E", "F", "G"].map((item) => (
              <span key={item} className={cn("font-mono text-[0.5rem]", muted)}>
                {item}
              </span>
            ))}
          </div>
        </div>
        <div className={cn("border p-4 md:col-span-5", border)}>
          <p className={cn("font-mono text-[0.5625rem] uppercase tracking-[0.18em]", muted)}>
            Review queue
          </p>
          <ul className="mt-4 space-y-3">
            {["Context assembled", "Options compared", "Rationale recorded"].map((item) => (
              <li key={item} className="flex items-center gap-3 text-xs">
                <span className="h-1 w-1 shrink-0 rounded-full bg-gold" aria-hidden="true" />
                <span className={muted}>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
