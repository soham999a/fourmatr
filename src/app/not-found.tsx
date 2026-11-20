import { HeroImageRotation } from "@/components/figures/HeroImageRotation";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";

export default function NotFound() {
  return (
    <section className="tone-dark-home relative flex min-h-[70vh] items-center overflow-hidden">
      <HeroImageRotation />
      <div className="container-shell relative z-10 py-24">
        <Eyebrow tone="bone">404 / Not found</Eyebrow>
        <h1 className="display-lg mt-8 max-w-4xl text-bone">This path does not resolve.</h1>
        <p className="lede mt-8 max-w-xl text-bone/70">
          The page may have moved, or the address may be incomplete.
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <Button href="/" variant="primary">
            Return home
          </Button>
          <Button href="/platforms">Explore the platforms</Button>
        </div>
      </div>
    </section>
  );
}
