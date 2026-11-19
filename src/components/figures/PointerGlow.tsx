"use client";

import { useEffect, useRef } from "react";

/** A faint pointer-following glow for dark hero surfaces. */
export function PointerGlow() {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const node = ref.current;
    const target = node?.parentElement;
    if (!node || !target) return;

    const onMove = (event: PointerEvent) => {
      const rect = target.getBoundingClientRect();
      node.style.setProperty("--mx", `${event.clientX - rect.left}px`);
      node.style.setProperty("--my", `${event.clientY - rect.top}px`);
    };

    target.addEventListener("pointermove", onMove);
    return () => target.removeEventListener("pointermove", onMove);
  }, []);

  return <div ref={ref} className="pointer-glow" aria-hidden="true" />;
}
