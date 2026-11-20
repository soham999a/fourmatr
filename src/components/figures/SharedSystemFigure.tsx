import { PLATFORMS, type PlatformSlug } from "@/content/platforms";

const NODE_LAYOUT: Record<PlatformSlug, { x: number; y: number; lines: string[] }> = {
  arps: { x: 151, y: 166, lines: ["SUPPLY CHAIN", "INTELLIGENCE"] },
  gravity: { x: 449, y: 166, lines: ["COMPUTATIONAL", "ADAPTIVE INTELLIGENCE"] },
  datum: { x: 151, y: 374, lines: ["ANALYTICS", "INTELLIGENCE"] },
  humming: { x: 449, y: 374, lines: ["OPERATION", "INTELLIGENCE"] },
};

/** Four specialized domains connected through one shared reasoning core. */
export function SharedSystemFigure() {
  return (
    <svg
      className="shared-system-figure h-auto w-full"
      viewBox="0 0 600 540"
      role="img"
      aria-labelledby="shared-system-title shared-system-desc"
    >
      <title id="shared-system-title">MATRKA connected intelligence architecture</title>
      <desc id="shared-system-desc">
        Four specialized domains connect through a shared reasoning core and knowledge foundation.
      </desc>

      <g className="system-orbit-lines" fill="none" stroke="currentColor" strokeWidth="0.9">
        <ellipse cx="300" cy="270" rx="218" ry="112" transform="rotate(-31 300 270)" />
        <ellipse cx="300" cy="270" rx="218" ry="112" transform="rotate(31 300 270)" />
        <circle cx="300" cy="270" r="164" />
        <path d="M300 82v376M94 270h412" />
      </g>

      <g className="system-connectors" fill="none" stroke="#CDA448" strokeWidth="0.9">
        <path d="M151 166 240 226M449 166l-89 60M151 374l89-60M449 374l-89-60" />
        <circle cx="300" cy="270" r="81" />
        <circle cx="300" cy="270" r="58" strokeDasharray="3 6" />
      </g>

      {PLATFORMS.map((platform) => {
        const node = NODE_LAYOUT[platform.slug];
        return (
          <a
            key={platform.slug}
            className="system-node"
            href={platform.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${platform.name} — ${platform.capability} (opens in a new tab)`}
          >
            <circle className="system-node__circle" cx={node.x} cy={node.y} r="35" />
            <text className="system-node__roman" x={node.x} y={node.y + 6} textAnchor="middle">
              {platform.roman}
            </text>
            {node.lines.map((line, index) => (
              <text
                key={line}
                className="system-node__label"
                x={node.x}
                y={node.y + 52 + index * 12}
                textAnchor="middle"
              >
                {line}
              </text>
            ))}
          </a>
        );
      })}

      <g className="system-core">
        <image href="/brand/matrka-emblem.png" x="264" y="234" width="72" height="72" />
        <text className="system-core__sub" x="300" y="330" textAnchor="middle">
          SHARED ARCHITECTURE
        </text>
      </g>
    </svg>
  );
}
