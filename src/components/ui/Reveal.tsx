"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";
import { cn } from "@/lib/cn";

interface RevealProps {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  delay?: number;
}

export function Reveal({ children, className, as: Tag = "div", delay = 0 }: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      node.setAttribute("data-visible", "true");
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          node.setAttribute("data-visible", "true");
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={cn("reveal", className)}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}
