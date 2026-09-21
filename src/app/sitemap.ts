import type { MetadataRoute } from "next";
import { showMedia, siteMeta } from "@/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: siteMeta.url, lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: `${siteMeta.url}/about`, lastModified: now, changeFrequency: "yearly", priority: 0.7 },
    // /media redirects while it is disabled, so it stays out of the sitemap.
    ...(showMedia
      ? [
          {
            url: `${siteMeta.url}/media`,
            lastModified: now,
            changeFrequency: "monthly" as const,
            priority: 0.6,
          },
        ]
      : []),
  ];
}
