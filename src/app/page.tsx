import type { Metadata } from "next";
import { Contact } from "@/components/sections/contact";
import { Engineering } from "@/components/sections/engineering";
import { Hero } from "@/components/sections/hero";
import { ModuleCards } from "@/components/sections/module-cards";
import { Reform } from "@/components/sections/reform";
import { Roles } from "@/components/sections/roles";
import { StatStrip } from "@/components/sections/stat-strip";
import { SITE } from "@/lib/site";

export async function generateMetadata(): Promise<Metadata> {
  const title = `${SITE.name} · Compliance-native accounting for Nigeria`;
  return {
    title: { absolute: title },
    description: SITE.description,
    alternates: { canonical: "/" },
    openGraph: { title, description: SITE.description, url: SITE.url, siteName: SITE.name, type: "website", locale: "en_NG" },
    twitter: { card: "summary", title, description: SITE.description },
  };
}

export default function HomePage() {
  return (
    <main id="top">
      <Hero />
      <StatStrip />
      <ModuleCards />
      <Reform />
      <Roles />
      <Engineering />
      <Contact />
    </main>
  );
}
