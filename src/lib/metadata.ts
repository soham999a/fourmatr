import type { Metadata } from "next";
import { SITE } from "@/content/site";

interface PageMetadata {
  title: string;
  description: string;
  path: string;
}

export function pageMetadata({ title, description, path }: PageMetadata): Metadata {
  const url = `${SITE.origin}${path}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      siteName: SITE.name,
      title: `${title} — ${SITE.name}`,
      description,
      url,
      locale: "en_IN",
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} — ${SITE.name}`,
      description,
    },
  };
}
