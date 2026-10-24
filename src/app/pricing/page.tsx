import { PageIntro } from "@/components/page-intro";
import { Pricing } from "@/components/sections/pricing";
import { pageMetadata } from "@/lib/metadata";

export async function generateMetadata() {
  return pageMetadata({
    title: "Pricing",
    description: "Core, Complete and Enterprise plans, priced per employee per month. Every plan includes the full Nigerian tax engine.",
    path: "/pricing",
  });
}

export default function PricingPage() {
  return (
    <main id="top">
      <PageIntro eyebrow="Pricing" title="Priced per employee, per month.">
        Plans are tiered by depth, and every plan includes the full Nigerian tax engine.
      </PageIntro>
      <Pricing />
    </main>
  );
}
