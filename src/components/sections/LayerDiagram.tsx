"use client";

import { useState } from "react";
import type { ArchitectureLayer } from "@/content/architecture";
import { cn } from "@/lib/cn";

interface LayerDiagramProps {
  layers: ArchitectureLayer[];
  short?: boolean;
  className?: string;
}

export function LayerDiagram({ layers, short = false, className }: LayerDiagramProps) {
  const [activeIndex, setActiveIndex] = useState(2);
  const active = layers[activeIndex];

  function onKeyDown(event: React.KeyboardEvent<HTMLButtonElement>, index: number) {
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      const next =
        event.key === "ArrowDown"
          ? (index + 1) % layers.length
          : (index - 1 + layers.length) % layers.length;
      setActiveIndex(next);
      const buttons = event.currentTarget.parentElement?.querySelectorAll("button");
      buttons?.[next]?.focus();
    }
  }

  return (
    <div className={cn("grid gap-10 lg:grid-cols-12", className)}>
      <div className="lg:col-span-7">
        <p className="mb-5 font-mono text-[0.625rem] uppercase tracking-[0.2em] text-muted">
          Select a layer
        </p>
        <div className="flex flex-col" role="group" aria-label="Architecture layers">
          {layers.map((layer, index) => {
            const isActive = index === activeIndex;
            return (
              <button
                key={layer.id}
                type="button"
                aria-pressed={isActive}
                onClick={() => setActiveIndex(index)}
                onKeyDown={(event) => onKeyDown(event, index)}
                className={cn(
                  "group grid grid-cols-[auto_1fr_auto] items-center gap-4 border border-line bg-panel px-4 py-5 text-left transition-colors duration-300 hover:border-gold md:px-6",
                  isActive && "border-l-2 border-l-gold border-y-line border-r-line",
                )}
              >
                <span className="font-mono text-[0.625rem] tracking-[0.16em] text-muted">
                  {layer.number}
                </span>
                <span>
                  <span
                    className={cn(
                      "block font-display text-xl md:text-2xl",
                      isActive && "text-gold",
                    )}
                  >
                    {short ? layer.shortName : layer.name}
                  </span>
                  <span className="mt-1 block text-xs leading-relaxed text-muted md:text-sm">
                    {short ? layer.shortDetail : layer.detail}
                  </span>
                </span>
                <span
                  aria-hidden="true"
                  className={cn(
                    "h-1.5 w-1.5 rounded-full transition-colors",
                    isActive ? "bg-gold" : "bg-line",
                  )}
                />
              </button>
            );
          })}
        </div>
      </div>

      <div className="lg:col-span-5">
        <div className="border border-line p-6 md:p-8">
          <p className="font-mono text-[0.625rem] uppercase tracking-[0.2em] text-muted">
            Layer note
          </p>
          <p className="mt-6 font-display text-2xl leading-snug md:text-3xl">
            {active.note}
          </p>
          <p className="mt-8 font-mono text-[0.625rem] uppercase tracking-[0.16em] text-gold">
            Active layer · {active.number}
          </p>
        </div>
      </div>
    </div>
  );
}
