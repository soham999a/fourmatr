"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/cn";
import { FRAGMENT_SHADER, VERTEX_SHADER } from "./shaders";

export type ShaderVariant =
  | "hero"
  | "architecture"
  | "arps"
  | "gravity"
  | "datum"
  | "humming"
  | "ripple";

const VARIANT_INDEX: Record<ShaderVariant, number> = {
  hero: 0,
  architecture: 1,
  arps: 2,
  gravity: 3,
  datum: 4,
  humming: 5,
  ripple: 6,
};

interface ShaderFieldProps {
  variant: ShaderVariant;
  fallback?: ReactNode;
  activeIndex?: number;
  dark?: boolean;
  oneShot?: boolean;
  className?: string;
  onReady?: () => void;
}

function compileShader(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

export function ShaderField({
  variant,
  fallback,
  activeIndex = 0,
  dark = true,
  oneShot = false,
  className,
  onReady,
}: ShaderFieldProps) {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const stateRef = useRef({ pointer: { x: 0.5, y: 0.5 }, scroll: 0, active: activeIndex });
  const onReadyRef = useRef(onReady);

  useEffect(() => {
    onReadyRef.current = onReady;
  }, [onReady]);

  useEffect(() => {
    stateRef.current.active = activeIndex;
  }, [activeIndex]);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const gl = canvas.getContext("webgl", {
      alpha: false,
      antialias: false,
      depth: false,
      stencil: false,
      powerPreference: "low-power",
    });
    if (!gl) return;

    const vertex = compileShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER);
    const fragment = compileShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
    if (!vertex || !fragment) {
      if (vertex) gl.deleteShader(vertex);
      if (fragment) gl.deleteShader(fragment);
      return;
    }

    const program = gl.createProgram();
    if (!program) {
      gl.deleteShader(vertex);
      gl.deleteShader(fragment);
      return;
    }
    gl.attachShader(program, vertex);
    gl.attachShader(program, fragment);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      gl.deleteProgram(program);
      gl.deleteShader(vertex);
      gl.deleteShader(fragment);
      return;
    }
    gl.useProgram(program);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW,
    );
    const position = gl.getAttribLocation(program, "aPosition");
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

    const uniform = {
      resolution: gl.getUniformLocation(program, "uResolution"),
      time: gl.getUniformLocation(program, "uTime"),
      pointer: gl.getUniformLocation(program, "uPointer"),
      scroll: gl.getUniformLocation(program, "uScroll"),
      variant: gl.getUniformLocation(program, "uVariant"),
      active: gl.getUniformLocation(program, "uActive"),
      dark: gl.getUniformLocation(program, "uDark"),
    };

    gl.uniform1f(uniform.variant, VARIANT_INDEX[variant]);
    gl.uniform1f(uniform.dark, dark ? 1 : 0);

    const resize = () => {
      const rect = wrap.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const width = Math.max(1, Math.round(rect.width * dpr));
      const height = Math.max(1, Math.round(rect.height * dpr));
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
        gl.viewport(0, 0, width, height);
      }
    };

    resize();

    const surface = wrap.closest("section") ?? wrap.parentElement ?? wrap;
    const onPointer = (event: PointerEvent) => {
      const rect = surface.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      stateRef.current.pointer = {
        x: (event.clientX - rect.left) / rect.width,
        y: 1 - (event.clientY - rect.top) / rect.height,
      };
    };
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      stateRef.current.scroll = max > 0 ? window.scrollY / max : 0;
    };
    const onContextLost = (event: Event) => {
      event.preventDefault();
      canvas.dataset.ready = "false";
    };

    surface.addEventListener("pointermove", onPointer, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    canvas.addEventListener("webglcontextlost", onContextLost);

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(wrap);
    window.addEventListener("resize", resize);

    let visible = true;
    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        visible = Boolean(entry?.isIntersecting);
      },
      { threshold: 0.01 },
    );
    intersectionObserver.observe(wrap);

    let frame = 0;
    let ready = false;
    const start = performance.now();
    const duration = oneShot ? 1300 : Number.POSITIVE_INFINITY;

    const draw = (now: number) => {
      frame = requestAnimationFrame(draw);
      if (!visible || document.hidden) return;

      const elapsed = (now - start) / 1000;
      if (elapsed * 1000 > duration) {
        cancelAnimationFrame(frame);
        frame = 0;
        return;
      }

      gl.uniform2f(uniform.resolution, canvas.width, canvas.height);
      gl.uniform1f(uniform.time, elapsed);
      gl.uniform2f(uniform.pointer, stateRef.current.pointer.x, stateRef.current.pointer.y);
      gl.uniform1f(uniform.scroll, stateRef.current.scroll);
      gl.uniform1f(uniform.active, stateRef.current.active);
      gl.drawArrays(gl.TRIANGLES, 0, 6);

      if (!ready) {
        ready = true;
        canvas.dataset.ready = "true";
        onReadyRef.current?.();
      }
    };

    frame = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(frame);
      intersectionObserver.disconnect();
      resizeObserver.disconnect();
      surface.removeEventListener("pointermove", onPointer);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("webglcontextlost", onContextLost);
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
      gl.deleteShader(vertex);
      gl.deleteShader(fragment);
    };
  }, [variant, dark, oneShot]);

  return (
    <div ref={wrapRef} className={cn("pointer-events-none absolute inset-0", className)} aria-hidden="true">
      {fallback ? <div className="absolute inset-0">{fallback}</div> : null}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full opacity-0 transition-opacity duration-700 data-[ready=true]:opacity-100"
      />
    </div>
  );
}
