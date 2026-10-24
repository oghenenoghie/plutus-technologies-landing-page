import { PageIntro } from "@/components/page-intro";
import { AccountingFeatures } from "@/components/sections/accounting-features";
import { ComplianceEngine } from "@/components/sections/compliance-engine";
import { MonthClose } from "@/components/sections/month-close";
import { pageMetadata } from "@/lib/metadata";

export async function generateMetadata() {
  return pageMetadata({
    title: "Accounting & tax",
    description:
      "Double-entry books with VAT, withholding tax, company income tax and the development levy from a versioned Nigerian rule set.",
    path: "/accounting",
  });
}

export default function AccountingPage() {
  return (
    <main id="top">
      <PageIntro eyebrow="Accounting & tax" title="Books that balance, with tax worked out as entries post.">
        A double-entry ledger with VAT, withholding tax, company income tax and the development levy calculated from a
        versioned rule set built on the Nigeria Tax Act 2025.
      </PageIntro>
      <AccountingFeatures />
      <ComplianceEngine />
      <MonthClose />
    </main>
  );
}
