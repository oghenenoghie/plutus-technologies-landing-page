import type { MetadataRoute } from "next";
import { DOC_GUIDES } from "@/lib/docs";
import { FEATURE_PAGES, SITE } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "/",
    "/features",
    ...FEATURE_PAGES.map((p) => p.href),
    "/pricing",
    "/docs",
    ...DOC_GUIDES.map((g) => `/docs/${g.slug}`),
    "/contact",
  ];
  return paths.map((path) => ({ url: new URL(path, SITE.url).toString() }));
}
