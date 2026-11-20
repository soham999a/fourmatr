import Image from "next/image";
import { PLATFORMS } from "@/content/platforms";
import { SITE } from "@/content/site";

/** Four specialized domains arranged as a clean quadrant around one shared core. */
export function SharedSystemFigure() {
  return (
    <div className="system-quadrant" aria-label="Four MATRKA domains connected through one shared architecture">
      <span aria-hidden="true" className="system-quadrant__axis system-quadrant__axis--x" />
      <span aria-hidden="true" className="system-quadrant__axis system-quadrant__axis--y" />

      <a
        href={SITE.parent.href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="MATRKA.NET — parent site (opens in a new tab)"
        className="system-quadrant__core"
      >
        <Image src="/brand/matrka-emblem.png" alt="" width={46} height={46} />
        <span>SHARED ARCHITECTURE</span>
      </a>

      {PLATFORMS.map((platform) => (
        <a
          key={platform.slug}
          href={platform.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${platform.name} — ${platform.capability} (opens in a new tab)`}
          className={`system-quadrant__cell system-quadrant__cell--${platform.slug}`}
        >
          <span className="system-quadrant__roman">{platform.roman}</span>
          <span className="system-quadrant__arrow" aria-hidden="true">
            ↗
          </span>
          <span className="system-quadrant__name">{platform.name}</span>
          <span className="system-quadrant__domain">{platform.capability}</span>
        </a>
      ))}
    </div>
  );
}
