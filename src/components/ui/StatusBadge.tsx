import { STATUS_LABEL, type PlatformStatus } from "@/content/platforms";
import { cn } from "@/lib/cn";

interface StatusBadgeProps {
  status: PlatformStatus;
  className?: string;
  tone?: "light" | "dark";
}

export function StatusBadge({ status, className, tone = "light" }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-3 py-1 font-mono text-[0.625rem] uppercase tracking-[0.12em]",
        tone === "dark"
          ? "border-line-dark text-muted-light"
          : "border-line text-muted",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "h-1 w-1 rounded-full",
          status === "live" ? "bg-gold" : "bg-current opacity-60",
        )}
      />
      {STATUS_LABEL[status]}
    </span>
  );
}
