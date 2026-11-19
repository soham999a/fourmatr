import type { FaqItem } from "@/content/engage";

export function FaqAccordion({ items }: { items: FaqItem[] }) {
  return (
    <div className="border-t border-line">
      {items.map((item, index) => (
        <details key={item.question} className="group border-b border-line py-6">
          <summary className="flex cursor-pointer list-none items-start justify-between gap-6">
            <span className="flex gap-5">
              <span className="mt-1 font-mono text-[0.625rem] tracking-[0.18em] text-muted">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="font-display text-xl md:text-2xl">{item.question}</span>
            </span>
            <span
              aria-hidden="true"
              className="mt-1 font-mono text-lg text-muted transition-transform duration-300 group-open:rotate-45"
            >
              +
            </span>
          </summary>
          <p className="faq-answer lede ml-9 mt-5 max-w-2xl text-sm md:text-base">
            {item.answer}
          </p>
        </details>
      ))}
    </div>
  );
}
