import type { ReactNode } from "react";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { StatusBadge } from "@/components/ui/StatusBadge";
import type { PlatformStatus } from "@/content/platforms";
import { cn } from "@/lib/cn";

interface Action {
  label: string;
  href: string;
  variant?: "primary" | "outline";
  external?: boolean;
}

interface PageHeroProps {
  eyebrow: string;
  breadcrumb?: string;
  title: string;
  lead: string;
  status?: PlatformStatus;
  actions?: Action[];
  tone?: "light" | "dark";
  children?: ReactNode;
  className?: string;
}

export function PageHero({
  eyebrow,
  breadcrumb,
  title,
  lead,
  status,
  actions,
  tone = "light",
  children,
  className,
}: PageHeroProps) {
  const dark = tone === "dark";

  return (
    <section
      className={cn(
        "relative overflow-hidden border-b py-20 md:py-28",
        dark ? "border-line-dark bg-ink text-bone" : "border-line bg-bone text-ink",
        className,
      )}
    >
      {children ? (
        <div className="pointer-events-none absolute inset-0 opacity-70">{children}</div>
      ) : null}
      <div className="container-shell relative grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <Eyebrow tone={dark ? "bone" : "ink"} className="block">
            {breadcrumb ? (
              <>
                {breadcrumb} <span className="mx-3 opacity-50">/</span> {eyebrow}
              </>
            ) : (
              eyebrow
            )}
          </Eyebrow>
          <h1 className="display-lg mt-8 max-w-4xl">{title}</h1>
          <p className={cn("lede mt-8 max-w-2xl", dark && "text-muted-light")}>{lead}</p>
          {status ? <StatusBadge status={status} tone={tone} className="mt-8" /> : null}
          {actions?.length ? (
            <div className="mt-10 flex flex-wrap gap-4">
              {actions.map((action) => (
                <Button
                  key={action.label}
                  href={action.href}
                  variant={action.variant ?? "outline"}
                  external={action.external}
                >
                  {action.label}
                </Button>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
