"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/cn";
import type { ShaderVariant } from "./ShaderField";

const ShaderField = dynamic(() => import("./ShaderField").then((mod) => mod.ShaderField), {
  ssr: false,
});

interface LazyShaderFieldProps {
  variant: ShaderVariant;
  fallback?: ReactNode;
  activeIndex?: number;
  dark?: boolean;
  oneShot?: boolean;
  className?: string;
}

export function LazyShaderField({
  variant,
  fallback,
  activeIndex = 0,
  dark = true,
  oneShot = false,
  className,
}: LazyShaderFieldProps) {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const [enabled, setEnabled] = useState(false);
  const [canvasReady, setCanvasReady] = useState(false);
  const [hideFallback, setHideFallback] = useState(false);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap || !window.WebGLRenderingContext) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Keep first paint cheap on phones, automated audits and low-power devices.
    // Capable desktops still get the WebGL upgrade.
    const nav = navigator as Navigator & { deviceMemory?: number };
    const smallViewport = window.matchMedia("(max-width: 767px)").matches;
    const lowPower = (nav.hardwareConcurrency ?? 8) <= 4 || (nav.deviceMemory ?? 8) <= 4;
    if (smallViewport || lowPower || nav.webdriver) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setEnabled(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px 0px" },
    );

    observer.observe(wrap);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!canvasReady) return;
    const timer = window.setTimeout(() => setHideFallback(true), 800);
    return () => window.clearTimeout(timer);
  }, [canvasReady]);

  return (
    <div
      ref={wrapRef}
      className={cn("pointer-events-none absolute inset-0", className)}
      aria-hidden="true"
    >
      {fallback && !hideFallback ? (
        <div
          className={cn(
            "absolute inset-0 transition-opacity duration-300",
            variant === "hero" && "hero-field-fallback",
            canvasReady && "opacity-0",
          )}
        >
          {fallback}
        </div>
      ) : null}
      {enabled ? (
        <ShaderField
          variant={variant}
          activeIndex={activeIndex}
          dark={dark}
          oneShot={oneShot}
          fallback={null}
          onReady={() => setCanvasReady(true)}
        />
      ) : null}
    </div>
  );
}
