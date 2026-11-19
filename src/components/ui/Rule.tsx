import { cn } from "@/lib/cn";

interface RuleProps {
  className?: string;
  accent?: boolean;
  tone?: "light" | "dark";
}

export function Rule({ className, accent, tone = "light" }: RuleProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "h-px w-full",
        accent ? "bg-gold" : tone === "dark" ? "bg-line-dark" : "bg-line",
        className,
      )}
    />
  );
}
