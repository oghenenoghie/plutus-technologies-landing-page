import { PageIntro } from "@/components/page-intro";
import { AnalyticsDashboards, AnalyticsPrinciples } from "@/components/sections/analytics";
import { pageMetadata } from "@/lib/metadata";

export async function generateMetadata() {
  return pageMetadata({
    title: "Analytics & Insights",
    description:
      "Ten dashboards for payroll cost, headcount, attendance, leave, recruitment, performance, tax obligations and the ledger, computed on the server with every definition shown.",
    path: "/analytics",
  });
}

export default function AnalyticsPage() {
  return (
    <main id="top">
      <PageIntro eyebrow="Analytics & Insights" isNew title="Ten dashboards, worked out from the records.">
        Payroll cost, headcount, attendance, leave, recruitment, performance, tax obligations and the ledger, each computed
        from the same records the rest of Plutus keeps. Every figure carries its definition and links to the records behind
        it.
      </PageIntro>
      <AnalyticsDashboards />
      <AnalyticsPrinciples />
    </main>
  );
}
