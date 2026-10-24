import { SectionHead, sectionClass } from "@/components/section-head";
import { cn } from "@/lib/utils";
import { EditionIcon } from "./editions";

const INTEGRATIONS = [
  { icon: "bank" as const, title: "Bank statements", body: "Import statements and match every line to an invoice, bill or journal." },
  { icon: "book" as const, title: "Payroll journals", body: "Pay runs from Plutus payroll, or from your HR system via the API, post to the ledger as balanced journals." },
  { icon: "api" as const, title: "Open APIs and webhooks", body: "Scoped keys for ERP sync, online sales and data-warehouse export." },
];

export function Integrations() {
  return (
    <section id="integrations" aria-labelledby="integrations-title" className={cn(sectionClass, "bg-sunk")}>
      <div className="wrap">
        <SectionHead eyebrow="Integrations" id="integrations-title" title="Connected to where the money moves." />
        <div className="grid gap-3.5 md:grid-cols-3">
          {INTEGRATIONS.map((i) => (
            <div key={i.title} className="grid grid-cols-[44px_1fr] items-start gap-4 rounded-card border border-line bg-surface px-[22px] py-5">
              <EditionIcon name={i.icon} className="size-11" />
              <div>
                <h3 className="mb-1 text-[17px] font-extrabold">{i.title}</h3>
                <p className="text-[14.5px] text-ink-2">{i.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
