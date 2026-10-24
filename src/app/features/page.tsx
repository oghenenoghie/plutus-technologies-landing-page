import { PageIntro } from "@/components/page-intro";
import { Integrations } from "@/components/sections/integrations";
import { ModuleCards } from "@/components/sections/module-cards";
import { MODULE_COUNT, Platform } from "@/components/sections/platform";
import { pageMetadata } from "@/lib/metadata";

export async function generateMetadata() {
  return pageMetadata({
    title: "Features",
    description: `Accounting, tax, inventory, analytics, payroll and HR in one Plutus ledger: ${MODULE_COUNT} screens, in Cloud and Desktop editions.`,
    path: "/features",
  });
}

export default function FeaturesPage() {
  return (
    <main id="top">
      <PageIntro eyebrow="Features" title="Everything in Plutus, on one ledger.">
        Accounting and tax, inventory, analytics, payroll and HR in one system. Explore each area, or see every one of the{" "}
        {MODULE_COUNT} screens in the feature map below.
      </PageIntro>
      <ModuleCards />
      <Platform />
      <Integrations />
    </main>
  );
}
