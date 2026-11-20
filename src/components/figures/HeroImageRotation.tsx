import Image from "next/image";
import { PLATFORMS } from "@/content/platforms";

/** Server-rendered hero rotation: the first image paints immediately, then four
 * platform images crossfade on a fixed loop without hydration or layout shift. */
export function HeroImageRotation() {
  return (
    <div className="hero-rotation" aria-hidden="true">
      {PLATFORMS.map((platform, index) => (
        <Image
          key={platform.slug}
          src={platform.homeImage}
          alt=""
          fill
          sizes="100vw"
          className="hero-rotation__image"
          {...(index === 0
            ? { preload: true }
            : { loading: "eager" as const, fetchPriority: "low" as const })}
        />
      ))}
      <div className="hero-rotation__scrim" />
    </div>
  );
}
