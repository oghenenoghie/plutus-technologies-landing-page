import { SectionHead, deepSectionClass } from "@/components/section-head";
import { NG_2026_1 } from "@/lib/compliance/ng-2026-1";
import { formatNaira, pct } from "@/lib/money";
import { cn } from "@/lib/utils";

const th = "whitespace-nowrap border-b border-deep-line px-4 py-[11px] text-left text-[11px] font-extrabold uppercase tracking-[.1em] text-deep-soft";
const td = "border-b border-deep-line px-4 py-3 align-top";

function Panel({ title, tag, children }: { title: string; tag: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="overflow-hidden rounded-card border border-deep-line bg-deep-2">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-deep-line px-[18px] py-3.5">
        <b className="text-[11.5px] font-extrabold uppercase tracking-[.14em] text-deep-soft">{title}</b>
        {tag}
      </div>
      {children}
    </div>
  );
}

// Sample data only: one month of sales and purchases, both standard-rated.
const SAMPLE_MONTH = { label: "March 2026", due: "21 Apr", sales: 18_400_000, purchases: 9_200_000 };

const SAMPLE_VENDORS = [
  { initials: "OL", name: "Okafor Logistics Ltd", state: "Lagos", ok: false },
  { initials: "BP", name: "Bello Print Works", state: "Ogun", ok: false },
  { initials: "MC", name: "Musa Consulting", state: "FCT", ok: true },
];

const PAYROLL_SCHEMES = NG_2026_1.schemes.filter((s) => s.name !== "WHT").map((s) => s.name);

export function ComplianceEngine() {
  const output = SAMPLE_MONTH.sales * NG_2026_1.vat.rate;
  const input = SAMPLE_MONTH.purchases * NG_2026_1.vat.rate;
  const vatRows = [
    { label: `Output VAT on sales of ${formatNaira(SAMPLE_MONTH.sales)}`, value: formatNaira(output) },
    { label: `Input VAT on purchases of ${formatNaira(SAMPLE_MONTH.purchases)}`, value: `− ${formatNaira(input)}` },
    { label: "Net VAT payable to the NRS", value: formatNaira(output - input), strong: true },
  ];
  const flagged = SAMPLE_VENDORS.filter((v) => !v.ok).length;

  return (
    <section id="compliance" aria-labelledby="compliance-title" className={deepSectionClass}>
      <div className="wrap">
        <SectionHead
          eyebrow="Tax engine"
          id="compliance-title"
          title="Five taxes. Each with its own base, rate, ledger account and deadline."
        >
          Rules are stored as effective-dated data, never hard-coded. A change in the law is one new rule version, and
          past returns stay reproducible under the rules that applied at the time.
        </SectionHead>

        <div className="grid gap-6">
          <Panel
            title="Business taxes"
            tag={
              <span className="font-mono text-xs text-gold">
                {NG_2026_1.version} · effective {NG_2026_1.effectiveFrom}
              </span>
            }
          >
            <div className="overflow-x-auto">
              <table className="w-full min-w-[860px] border-collapse text-[13.5px]">
                <thead>
                  <tr>
                    <th className={th}>Tax</th>
                    <th className={th}>Base</th>
                    <th className={th}>Rate</th>
                    <th className={th}>Posts to</th>
                    <th className={th}>Remit to</th>
                    <th className={th}>Deadline</th>
                  </tr>
                </thead>
                <tbody className="[&_tr:last-child_td]:border-b-0 [&_tr:last-child_th]:border-b-0">
                  {NG_2026_1.taxes.map((t) => (
                    <tr key={t.name}>
                      <th scope="row" className={cn(td, "whitespace-nowrap text-left font-extrabold")}>
                        {t.name}
                      </th>
                      <td className={cn(td, "text-deep-soft")}>{t.base}</td>
                      <td className={cn(td, "whitespace-nowrap font-mono text-[12.5px] text-gold")}>{t.rate}</td>
                      <td className={td}>{t.postsTo}</td>
                      <td className={cn(td, "text-deep-soft")}>{t.remitTo}</td>
                      <td className={cn(td, "text-deep-soft")}>{t.deadline}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Panel>

          <div className="grid items-start gap-6 md:grid-cols-2">
            <Panel
              title="VAT return · Sample data"
              tag={
                <span className="font-mono text-xs text-gold">
                  {SAMPLE_MONTH.label} · {pct(NG_2026_1.vat.rate)}
                </span>
              }
            >
              <table className="w-full border-collapse text-[13.5px]">
                <tbody className="[&_tr:last-child_td]:border-b-0">
                  {vatRows.map((r) => (
                    <tr key={r.label}>
                      <td className={cn(td, r.strong ? "font-extrabold" : "text-deep-soft")}>{r.label}</td>
                      <td className={cn(td, "whitespace-nowrap text-right font-mono tabular-nums", r.strong && "text-gold")}>
                        {r.value}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="border-t border-deep-line px-4 py-3 text-xs text-deep-soft">
                Built from posted invoices and bills, with the schedule behind every figure. Due {SAMPLE_MONTH.due}.
              </p>
            </Panel>

            <Panel
              title="Vendor TIN check · Sample data"
              tag={
                <span className="rounded-full bg-[#ef8479]/15 px-[9px] py-1 text-[11px] font-extrabold uppercase tracking-[.06em] text-[#f09a90]">
                  {flagged} flagged
                </span>
              }
            >
              <ul className="py-1.5">
                {SAMPLE_VENDORS.map((v) => (
                  <li
                    key={v.name}
                    className="grid grid-cols-[32px_1fr_auto] items-center gap-3 border-b border-deep-line px-[18px] py-2.5 text-[13.5px] last:border-b-0"
                  >
                    <span className="grid size-8 place-items-center rounded-full border border-deep-line bg-deep text-[11px] font-extrabold">
                      {v.initials}
                    </span>
                    <span>
                      {v.name}
                      <small className="block text-xs text-deep-soft">
                        {v.state} · TIN {v.ok ? "verified" : "missing"}
                      </small>
                    </span>
                    <span
                      className={cn(
                        "rounded-full px-[9px] py-1 text-[11px] font-extrabold uppercase tracking-[.06em]",
                        v.ok ? "bg-[#62c28e]/15 text-[#7fd1a4]" : "bg-[#ef8479]/15 text-[#f09a90]",
                      )}
                    >
                      {v.ok ? "Ready" : "Payment held"}
                    </span>
                  </li>
                ))}
              </ul>
            </Panel>
          </div>
        </div>
        <p className="mt-[18px] max-w-[80ch] text-[12.5px] text-deep-soft">
          WHT deducted by your customers is held as a tax credit against company income tax, never lost in a suspense
          account. The payroll module applies {PAYROLL_SCHEMES.join(", ")} from the same rule set and posts each pay run
          as a balanced journal. Figures follow the {NG_2026_1.framework}, and are kept current in the rule set. Plutus
          applies statutory rules; it does not provide tax or legal advice.
        </p>
      </div>
    </section>
  );
}
