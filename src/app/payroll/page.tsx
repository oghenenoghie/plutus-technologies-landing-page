import { PageIntro } from "@/components/page-intro";
import { PayrollFeatures, PayrollSchemes } from "@/components/sections/payroll";
import { pageMetadata } from "@/lib/metadata";

export async function generateMetadata() {
  return pageMetadata({
    title: "Payroll & HR",
    description:
      "Pay runs with PAYE, pension, NHF, NHIS, NSITF, ITF and WHT from a versioned rule set, posted to the ledger, with the HR records payroll depends on.",
    path: "/payroll",
  });
}

export default function PayrollPage() {
  return (
    <main id="top">
      <PageIntro eyebrow="Payroll & HR" title="Payroll that posts to the books.">
        Pay runs, statutory deductions and remittances in the same system as the ledger, with leave, attendance and the
        rest of HR feeding payroll directly.
      </PageIntro>
      <PayrollFeatures />
      <PayrollSchemes />
    </main>
  );
}
