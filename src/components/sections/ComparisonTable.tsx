import Link from "next/link";
import { StatusBadge } from "@/components/ui/StatusBadge";
import type { Platform } from "@/content/platforms";

export function ComparisonTable({ platforms }: { platforms: Platform[] }) {
  return (
    <div className="border border-line">
      <table className="w-full border-collapse text-left">
        <caption className="sr-only">Platform comparison</caption>
        <thead className="hidden md:table-header-group">
          <tr className="border-b border-line">
            {["Platform", "Capability", "Status", "Detail"].map((heading) => (
              <th
                key={heading}
                scope="col"
                className="px-6 py-4 font-mono text-[0.625rem] font-medium uppercase tracking-[0.18em] text-muted"
              >
                {heading}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {platforms.map((platform) => (
            <tr
              key={platform.slug}
              className="block border-b border-line p-5 last:border-b-0 md:table-row md:p-0"
            >
              <th
                scope="row"
                className="block font-display text-2xl md:table-cell md:px-6 md:py-6 md:text-xl"
              >
                <span className="mb-1 block font-mono text-[0.5625rem] uppercase tracking-[0.18em] text-muted md:hidden">
                  Platform
                </span>
                {platform.roman} · {platform.name}
              </th>
              <td
                data-label="Capability"
                className="block pt-3 text-sm text-muted before:mr-3 before:font-mono before:text-[0.5625rem] before:uppercase before:tracking-[0.18em] before:content-[attr(data-label)] md:table-cell md:px-6 md:py-6 md:pt-6 md:before:hidden"
              >
                {platform.capability}
              </td>
              <td className="block pt-3 md:table-cell md:px-6 md:py-6">
                <StatusBadge status={platform.status} />
              </td>
              <td className="block pt-4 md:table-cell md:px-6 md:py-6">
                <Link
                  href={`/platforms/${platform.slug}`}
                  className="inline-flex items-center gap-2 border-b border-gold/60 pb-1 font-mono text-[0.6875rem] uppercase tracking-[0.16em] transition-colors hover:border-gold hover:text-gold"
                >
                  View platform <span aria-hidden="true">→</span>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
