import type { Metadata } from "next";
import { SITE } from "@/lib/site";

/** Title, description, canonical URL and social cards for one public route. */
export function pageMetadata({ title, description, path }: { title: string; description: string; path: string }): Metadata {
  const full = `${title} · ${SITE.name}`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: full,
      description,
      url: new URL(path, SITE.url).toString(),
      siteName: SITE.name,
      type: "website",
      locale: "en_NG",
    },
    twitter: { card: "summary", title: full, description },
  };
}
