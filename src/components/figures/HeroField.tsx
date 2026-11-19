import { cn } from "@/lib/cn";

interface HeroFieldProps {
  variant?: "home" | "gravity";
  className?: string;
}

const LINES = Array.from({ length: 28 }, (_, index) => {
  const y = 40 + index * 22;
  const amplitude = 12 + (index % 5) * 7;
  const phase = index * 0.42;
  const steps = 16;
  const points = Array.from({ length: steps + 1 }, (_, step) => {
    const x = (step / steps) * 1200;
    const wave =
      Math.sin(step * 0.55 + phase) * amplitude +
      Math.sin(step * 0.17 + phase * 0.5) * amplitude * 0.55;
    return `${x.toFixed(1)},${(y + wave).toFixed(1)}`;
  });
  return points.join(" ");
});

const NODES = Array.from({ length: 14 }, (_, index) => ({
  cx: 80 + ((index * 173) % 1080),
  cy: 60 + ((index * 97) % 560),
  r: index % 4 === 0 ? 2.5 : 1.5,
}));

export function HeroField({ variant = "home", className }: HeroFieldProps) {
  const gold = variant === "gravity" ? "#C09426" : "#CDA448";

  return (
    <svg
      className={cn("decorative field-drift h-full w-full", className)}
      viewBox="0 0 1200 700"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      focusable="false"
    >
      <g fill="none" stroke="currentColor" strokeWidth="0.7" opacity="0.28">
        {LINES.map((points, index) => (
          <polyline key={index} points={points} vectorEffect="non-scaling-stroke" />
        ))}
      </g>
      <g fill="none" stroke={gold} strokeWidth="0.8" opacity="0.42">
        <path d="M90 470 C 320 330, 480 620, 720 420 S 1020 250, 1160 360" />
        <path d="M40 250 C 280 180, 420 390, 660 260 S 980 120, 1180 190" />
      </g>
      <g fill={gold} opacity="0.6">
        {NODES.map((node, index) => (
          <circle
            key={index}
            cx={node.cx}
            cy={node.cy}
            r={node.r}
            className={index % 4 === 0 ? "node-pulse" : undefined}
            style={index % 4 === 0 ? { animationDelay: `${index * 0.4}s` } : undefined}
          />
        ))}
      </g>
      <g fill="none" stroke="currentColor" strokeWidth="0.6" opacity="0.18">
        <circle cx="620" cy="350" r="210" />
        <circle cx="620" cy="350" r="286" />
        <path d="M620 30 V 670 M340 350 H 900" />
      </g>
    </svg>
  );
}
