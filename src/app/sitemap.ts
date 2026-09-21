import type { MetadataRoute } from "next";
import { siteMeta } from "@/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: siteMeta.url, lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: `${siteMeta.url}/about`, lastModified: now, changeFrequency: "yearly", priority: 0.7 },
    { url: `${siteMeta.url}/media`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
  ];
}
