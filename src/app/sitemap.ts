import type { MetadataRoute } from "next";
import { PLATFORMS } from "@/content/platforms";
import { SITE } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/platforms",
    "/architecture",
    "/research",
    "/engage",
    "/contact",
  ];

  return [
    ...routes.map((path) => ({
      url: `${SITE.origin}${path}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: path === "" ? 1 : 0.8,
    })),
    ...PLATFORMS.map((platform) => ({
      url: `${SITE.origin}/platforms/${platform.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
