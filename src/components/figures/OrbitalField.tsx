"use client";

import { useEffect, useRef } from "react";

interface Dot {
  x: number;
  y: number;
  phase: number;
  speed: number;
  base: number;
}

interface Orb {
  angle: number;
  speed: number;
  rx: number;
  ry: number;
  rotation: number;
  radius: number;
}

const ORBS: Orb[] = [
  { angle: 0.2, speed: 0.16, rx: 0.34, ry: 0.22, rotation: -0.5, radius: 118 },
  { angle: 1.8, speed: -0.12, rx: 0.28, ry: 0.26, rotation: 0.7, radius: 96 },
  { angle: 3.4, speed: 0.09, rx: 0.38, ry: 0.18, rotation: 0.2, radius: 132 },
  { angle: 5.1, speed: -0.18, rx: 0.22, ry: 0.3, rotation: -0.8, radius: 88 },
];

/** Lightweight 2D orbital field. Loaded only after the desktop capability checks pass. */
export function OrbitalField() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = canvas?.parentElement;
    if (!canvas || !host) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const surface = host.parentElement ?? host;
    const sprite = document.createElement("canvas");
    sprite.width = 128;
    sprite.height = 128;
    const spriteCtx = sprite.getContext("2d");
    if (!spriteCtx) return;

    const gradient = spriteCtx.createRadialGradient(64, 64, 0, 64, 64, 64);
    gradient.addColorStop(0, "rgba(205,164,72,0.5)");
    gradient.addColorStop(0.45, "rgba(205,164,72,0.14)");
    gradient.addColorStop(1, "rgba(205,164,72,0)");
    spriteCtx.fillStyle = gradient;
    spriteCtx.fillRect(0, 0, 128, 128);

    let width = 0;
    let height = 0;
    let dots: Dot[] = [];
    let raf = 0;
    let running = false;
    let inView = false;
    let ready = false;

    const pointer = { x: 0, y: 0, tx: 0, ty: 0, active: false, lastMove: -9999 };

    function resize() {
      const rect = host!.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      if (!width || !height) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas!.width = Math.round(width * dpr);
      canvas!.height = Math.round(height * dpr);
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);

      const pitch = 22;
      const cols = Math.ceil(width / pitch) + 1;
      const rows = Math.ceil(height / pitch) + 1;
      dots = [];
      for (let row = 0; row < rows; row += 1) {
        for (let col = 0; col < cols; col += 1) {
          dots.push({
            x: col * pitch,
            y: row * pitch,
            phase: Math.random() * Math.PI * 2,
            speed: 0.35 + Math.random() * 0.7,
            base: 0.035 + Math.random() * 0.04,
          });
        }
      }

      pointer.x = width / 2;
      pointer.y = height / 2;
      pointer.tx = pointer.x;
      pointer.ty = pointer.y;
    }

    function draw(now: number) {
      if (!width || !height) {
        if (running) raf = requestAnimationFrame(draw);
        return;
      }

      ctx!.clearRect(0, 0, width, height);

      const auto = !pointer.active || now - pointer.lastMove > 2400;
      if (auto) {
        const t = now * 0.00035;
        pointer.tx = width * (0.5 + 0.22 * Math.cos(t));
        pointer.ty = height * (0.5 + 0.16 * Math.sin(t * 1.3));
      }
      pointer.x += (pointer.tx - pointer.x) * 0.06;
      pointer.y += (pointer.ty - pointer.y) * 0.06;

      const positions = ORBS.map((orb) => {
        const t = now * 0.001 * orb.speed + orb.angle;
        const ex = Math.cos(t) * orb.rx * width;
        const ey = Math.sin(t) * orb.ry * height;
        const cos = Math.cos(orb.rotation);
        const sin = Math.sin(orb.rotation);
        return { x: width / 2 + ex * cos - ey * sin, y: height / 2 + ex * sin + ey * cos };
      });

      positions.forEach((position, index) => {
        const radius = ORBS[index].radius;
        ctx!.globalAlpha = 0.17;
        ctx!.drawImage(sprite, position.x - radius, position.y - radius, radius * 2, radius * 2);
      });

      ctx!.globalAlpha = pointer.active ? 0.2 : 0.12;
      ctx!.drawImage(sprite, pointer.x - 110, pointer.y - 110, 220, 220);

      const radius = Math.min(width * 0.2, 220);
      const radiusSq = radius * radius;
      ctx!.fillStyle = "#F6F3EE";

      for (const dot of dots) {
        let heat = 0;
        const dx = dot.x - pointer.x;
        const dy = dot.y - pointer.y;
        const distanceSq = dx * dx + dy * dy;
        if (distanceSq < radiusSq) {
          const falloff = 1 - Math.sqrt(distanceSq) / radius;
          heat = falloff * falloff;
        }

        let wave = 0;
        for (const position of positions) {
          const ox = dot.x - position.x;
          const oy = dot.y - position.y;
          const orbitSq = ox * ox + oy * oy;
          if (orbitSq < 25600) {
            wave += (1 - Math.sqrt(orbitSq) / 160) * 0.4;
          }
        }

        const twinkle = 0.5 + 0.5 * Math.sin(now * 0.001 * dot.speed + dot.phase);
        ctx!.globalAlpha = Math.min(0.42, dot.base + twinkle * 0.035 + heat * 0.22 + wave * 0.06);
        ctx!.fillRect(dot.x, dot.y, 1, 1);
      }

      ctx!.globalAlpha = 1;
      if (!ready) {
        ready = true;
        canvas!.classList.add("is-on");
      }
      if (running) raf = requestAnimationFrame(draw);
    }

    function start() {
      if (running) return;
      running = true;
      raf = requestAnimationFrame(draw);
    }

    function stop() {
      running = false;
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
    }

    function onPointerMove(event: PointerEvent) {
      const rect = surface.getBoundingClientRect();
      pointer.tx = event.clientX - rect.left;
      pointer.ty = event.clientY - rect.top;
      pointer.active = true;
      pointer.lastMove = performance.now();
      if (inView) start();
    }

    function onPointerLeave() {
      pointer.active = false;
      pointer.lastMove = -9999;
    }

    function onVisibility() {
      if (document.hidden) stop();
      else if (inView) start();
    }

    resize();
    draw(performance.now());

    const resizeObserver =
      typeof ResizeObserver !== "undefined" ? new ResizeObserver(resize) : null;
    if (resizeObserver) resizeObserver.observe(host);
    else window.addEventListener("resize", resize);

    const intersectionObserver =
      typeof IntersectionObserver !== "undefined"
        ? new IntersectionObserver(
            ([entry]) => {
              inView = Boolean(entry?.isIntersecting);
              if (inView) start();
              else stop();
            },
            { threshold: 0.02 },
          )
        : null;
    if (intersectionObserver) intersectionObserver.observe(host);
    else {
      inView = true;
      start();
    }

    surface.addEventListener("pointermove", onPointerMove, { passive: true });
    surface.addEventListener("pointerleave", onPointerLeave);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      stop();
      resizeObserver?.disconnect();
      intersectionObserver?.disconnect();
      if (!resizeObserver) window.removeEventListener("resize", resize);
      surface.removeEventListener("pointermove", onPointerMove);
      surface.removeEventListener("pointerleave", onPointerLeave);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return <canvas ref={canvasRef} className="orbital-canvas" aria-hidden="true" />;
}
