import type { MetadataRoute } from "next";
import { FEATURE_PAGES, SITE } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["/", "/features", ...FEATURE_PAGES.map((p) => p.href), "/pricing", "/contact"];
  return paths.map((path) => ({ url: new URL(path, SITE.url).toString() }));
}
