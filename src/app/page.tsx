import type { Metadata } from "next";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { UtilityBar } from "@/components/utility-bar";
import { ComplianceEngine } from "@/components/sections/compliance-engine";
import { Contact } from "@/components/sections/contact";
import { Editions } from "@/components/sections/editions";
import { Engineering } from "@/components/sections/engineering";
import { Hero } from "@/components/sections/hero";
import { IntegrationsMarkets } from "@/components/sections/integrations-markets";
import { MonthClose } from "@/components/sections/month-close";
import { Platform } from "@/components/sections/platform";
import { Pricing } from "@/components/sections/pricing";
import { Reform } from "@/components/sections/reform";
import { Roles } from "@/components/sections/roles";
import { StatStrip } from "@/components/sections/stat-strip";
import { SITE } from "@/lib/site";

export async function generateMetadata(): Promise<Metadata> {
  const title = "Plutus Technologies · Compliance-native accounting for Nigeria";
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
    <>
      <UtilityBar />
      <SiteHeader />
      <main id="top">
        <Hero />
        <StatStrip />
        <Reform />
        <Platform />
        <ComplianceEngine />
        <MonthClose />
        <Editions />
        <Roles />
        <Engineering />
        <IntegrationsMarkets />
        <Pricing />
        <Contact />
      </main>
      <SiteFooter />
    </>
  );
}
