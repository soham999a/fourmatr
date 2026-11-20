import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/cn";

interface RevealProps {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  delay?: number;
  immediate?: boolean;
}

export function Reveal({
  children,
  className,
  as: Tag = "div",
  delay = 0,
  immediate = false,
}: RevealProps) {
  return (
    <Tag
      className={cn("reveal", className)}
      data-reveal={immediate ? undefined : ""}
      data-visible={immediate ? "true" : undefined}
      style={immediate ? undefined : { transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}
