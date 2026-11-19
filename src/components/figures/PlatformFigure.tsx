import { cn } from "@/lib/cn";

export type FigureKind = "arps" | "gravity" | "datum" | "humming";

interface PlatformFigureProps {
  kind: FigureKind;
  className?: string;
  dark?: boolean;
}

const GOLD = "#C09426";

function ArpsFigure({ dark }: { dark: boolean }) {
  const nodes = [
    [90, 210], [220, 110], [250, 300], [390, 190], [430, 360], [560, 90],
    [600, 270], [730, 160], [760, 350], [900, 240], [1010, 130], [1040, 330],
  ];
  const links: Array<[number, number]> = [
    [0, 1], [0, 2], [1, 3], [2, 3], [2, 4], [3, 5], [3, 6], [4, 6], [4, 8],
    [5, 7], [6, 7], [6, 8], [7, 9], [8, 9], [8, 11], [9, 10], [9, 11],
  ];
  const stroke = dark ? "#45423B" : "#C8C4BC";
  return (
    <>
      <g stroke={stroke} strokeWidth="0.8" fill="none">
        {links.map(([a, b], index) => (
          <line
            key={index}
            x1={nodes[a][0]}
            y1={nodes[a][1]}
            x2={nodes[b][0]}
            y2={nodes[b][1]}
          />
        ))}
      </g>
      <g stroke={GOLD} strokeWidth="1" fill="none" opacity="0.7" strokeDasharray="4 6">
        <path d="M90 210 C 300 60, 520 420, 760 350 S 980 180, 1040 330" />
      </g>
      <g fill={GOLD}>
        {nodes.map(([cx, cy], index) => (
          <circle key={index} cx={cx} cy={cy} r={index % 3 === 0 ? 5 : 3} />
        ))}
      </g>
      <g stroke={stroke} strokeWidth="0.6" fill="none" opacity="0.6">
        <circle cx="600" cy="270" r="120" />
        <circle cx="600" cy="270" r="180" strokeDasharray="2 8" />
      </g>
    </>
  );
}

function GravityFigure({ dark }: { dark: boolean }) {
  const stroke = dark ? "#45423B" : "#C8C4BC";
  return (
    <>
      <g fill="none" stroke={stroke} strokeWidth="0.8">
        <circle cx="560" cy="240" r="70" />
        <circle cx="560" cy="240" r="130" />
        <circle cx="560" cy="240" r="195" strokeDasharray="3 7" />
        <ellipse cx="560" cy="240" rx="250" ry="110" transform="rotate(-18 560 240)" />
        <ellipse cx="560" cy="240" rx="250" ry="110" transform="rotate(42 560 240)" />
      </g>
      <g fill={GOLD}>
        <circle cx="560" cy="240" r="7" />
        <circle cx="690" cy="170" r="4" />
        <circle cx="430" cy="300" r="4" />
        <circle cx="755" cy="315" r="4" />
      </g>
      <g stroke={GOLD} strokeWidth="0.9" opacity="0.55" fill="none">
        <path d="M430 300 L560 240 L690 170 L755 315 Z" />
        <path d="M560 240 L755 315" strokeDasharray="3 6" />
      </g>
    </>
  );
}

function DatumFigure({ dark }: { dark: boolean }) {
  const stroke = dark ? "#45423B" : "#C8C4BC";
  const bars = [120, 190, 150, 260, 210, 320, 275, 360];
  return (
    <>
      <g stroke={stroke} strokeWidth="0.7" fill="none">
        <path d="M80 400 H 1040 M80 400 V 60" />
        {[130, 200, 270, 340].map((y) => (
          <path key={y} d={`M80 ${y} H 1040`} strokeDasharray="2 8" />
        ))}
      </g>
      <g fill="none" stroke={GOLD} strokeWidth="1.2">
        <path d="M120 400 L260 330 L400 350 L540 230 L680 270 L820 170 L960 120" />
      </g>
      <g fill={GOLD} opacity="0.75">
        {bars.map((height, index) => (
          <rect key={index} x={105 + index * 118} y={400 - height * 0.6} width="42" height={height * 0.6} opacity={0.18 + index * 0.05} />
        ))}
      </g>
      <g fill={GOLD}>
        <circle cx="820" cy="170" r="4" />
        <circle cx="960" cy="120" r="4" />
      </g>
    </>
  );
}

function HummingFigure() {
  const lines = Array.from({ length: 22 }, (_, index) => {
    const phase = index * 0.28;
    const amp = 26 + (index % 6) * 8;
    return Array.from({ length: 41 }, (_, step) => {
      const x = 60 + step * 25;
      const envelope = Math.sin((step / 40) * Math.PI);
      const y = 240 + Math.sin(step * 0.42 + phase) * amp * envelope;
      return `${x},${y.toFixed(1)}`;
    }).join(" ");
  });
  return (
    <>
      <g fill="none" stroke={GOLD} strokeWidth="0.65" opacity="0.45">
        {lines.map((points, index) => (
          <polyline key={index} points={points} vectorEffect="non-scaling-stroke" />
        ))}
      </g>
      <g fill="none" stroke="#C8C4BC" strokeWidth="0.7" opacity="0.55">
        <path d="M60 240 H 1060" strokeDasharray="3 8" />
        <path d="M60 120 C 320 40, 800 440, 1060 360" strokeDasharray="2 10" />
      </g>
    </>
  );
}

export function PlatformFigure({ kind, className, dark = false }: PlatformFigureProps) {
  return (
    <svg
      className={cn("decorative h-full w-full", className)}
      viewBox="0 0 1120 480"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
      focusable="false"
    >
      {kind === "arps" ? <ArpsFigure dark={dark} /> : null}
      {kind === "gravity" ? <GravityFigure dark={dark} /> : null}
      {kind === "datum" ? <DatumFigure dark={dark} /> : null}
      {kind === "humming" ? <HummingFigure /> : null}
    </svg>
  );
}
