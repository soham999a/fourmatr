"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

const OrbitalField = dynamic(() => import("./OrbitalField").then((mod) => mod.OrbitalField), {
  ssr: false,
});

interface LazyOrbitalFieldProps {
  className?: string;
}

/** Defers the orbital effect to capable desktops only. */
export function LazyOrbitalField({ className }: LazyOrbitalFieldProps) {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(max-width: 767px)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const nav = navigator as Navigator & { deviceMemory?: number };
    const lowPower = (nav.hardwareConcurrency ?? 8) <= 4 || (nav.deviceMemory ?? 8) <= 4;
    if (lowPower || nav.webdriver) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setEnabled(true);
          observer.disconnect();
        }
      },
      { rootMargin: "160px 0px" },
    );
    observer.observe(wrap);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={wrapRef}
      className={cn("pointer-events-none absolute inset-0", className)}
      aria-hidden="true"
    >
      {enabled ? <OrbitalField /> : null}
    </div>
  );
}
