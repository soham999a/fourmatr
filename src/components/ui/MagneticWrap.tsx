"use client";

import { useRef, type PointerEvent, type ReactNode } from "react";
import { cn } from "@/lib/cn";

export function MagneticWrap({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLSpanElement | null>(null);

  function onPointerMove(event: PointerEvent<HTMLSpanElement>) {
    const node = ref.current;
    if (!node || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rect = node.getBoundingClientRect();
    const dx = ((event.clientX - (rect.left + rect.width / 2)) / rect.width) * 8;
    const dy = ((event.clientY - (rect.top + rect.height / 2)) / rect.height) * 8;
    node.style.transform = `translate3d(${Math.max(-4, Math.min(4, dx))}px, ${Math.max(-4, Math.min(4, dy))}px, 0)`;
  }

  function reset() {
    if (ref.current) ref.current.style.transform = "translate3d(0, 0, 0)";
  }

  return (
    <span
      ref={ref}
      className={cn("inline-block transition-transform duration-300 ease-out", className)}
      onPointerMove={onPointerMove}
      onPointerLeave={reset}
      onBlur={reset}
    >
      {children}
    </span>
  );
}
