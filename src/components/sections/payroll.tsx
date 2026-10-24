import { SectionHead, deepSectionClass, sectionClass } from "@/components/section-head";
import { Chip } from "@/components/ui/pill";
import { NG_2026_1, type Scheme } from "@/lib/compliance/ng-2026-1";
import { cn } from "@/lib/utils";
import { MODULE_GROUPS } from "./platform";

const th = "whitespace-nowrap border-b border-deep-line px-4 py-[11px] text-left text-[11px] font-extrabold uppercase tracking-[.1em] text-deep-soft";
const td = "border-b border-deep-line px-4 py-3 align-top";

const PAYROLL_FEATURES = [
  ["Pay runs", "Monthly, bonus, 13th-month, arrears and off-cycle runs. A locked run is never edited: a mistake is reversed with a compensating journal."],
  ["Statutory liabilities", "Each run raises PAYE, pension, NHF, NSITF and ITF liabilities with due dates taken from the rule version."],
  ["Journals at lock", "Gross pay, employer pension and NSITF post to the ledger as balanced journals when a run is locked."],
  ["Contractors", "Withholding tax deducted from contractor and supplier payments and tracked to remittance."],
  ["Final settlement", "Leavers' final pay worked out in the same engine, and their termination recorded."],
  ["Simulation and PAYE calculator", "Try a pay change before it runs, and see PAYE worked out band by band."],
] as const;

function BorneBy({ who }: { who: Scheme["borneBy"] }) {
  return (
    <span
      className={cn(
        "whitespace-nowrap rounded-full border px-2 py-[3px] text-[11px] font-extrabold uppercase tracking-[.06em]",
        who === "Employer" ? "border-gold/45 text-gold" : "border-deep-line text-deep-soft",
      )}
    >
      {who}
    </span>
  );
}

export function PayrollSchemes() {
  return (
    <section aria-labelledby="schemes-title" className={deepSectionClass}>
      <div className="wrap">
        <SectionHead eyebrow="Payroll compliance" id="schemes-title" title="Seven schemes, each with its own base, rate and deadline.">
          The payroll rule set sits beside the business taxes in the same versioned engine. A change in the law is one new
          rule version, and past pay runs stay reproducible under the rules that applied at the time.
        </SectionHead>
        <div className="overflow-hidden rounded-card border border-deep-line bg-deep-2">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-deep-line px-[18px] py-3.5">
            <b className="text-[11.5px] font-extrabold uppercase tracking-[.14em] text-deep-soft">Statutory schemes</b>
            <span className="font-mono text-xs text-gold">
              {NG_2026_1.version} · effective {NG_2026_1.effectiveFrom}
            </span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[860px] border-collapse text-[13.5px]">
              <thead>
                <tr>
                  <th className={th}>Scheme</th>
                  <th className={th}>Base</th>
                  <th className={th}>Rate</th>
                  <th className={th}>Borne by</th>
                  <th className={th}>Remit to</th>
                  <th className={th}>Deadline</th>
                </tr>
              </thead>
              <tbody className="[&_tr:last-child_td]:border-b-0 [&_tr:last-child_th]:border-b-0">
                {NG_2026_1.schemes.map((s) => (
                  <tr key={s.name}>
                    <th scope="row" className={cn(td, "whitespace-nowrap text-left font-extrabold")}>
                      {s.name}
                    </th>
                    <td className={cn(td, "text-deep-soft")}>{s.base}</td>
                    <td className={cn(td, "whitespace-nowrap font-mono text-[12.5px] text-gold")}>{s.rate}</td>
                    <td className={td}>
                      <BorneBy who={s.borneBy} />
                    </td>
                    <td className={cn(td, "text-deep-soft")}>{s.remitTo}</td>
                    <td className={cn(td, "text-deep-soft")}>{s.deadline}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <p className="mt-[18px] max-w-[80ch] text-[12.5px] text-deep-soft">
          Employer-side costs (NSITF, ITF, employer pension) are tracked separately and never appear as employee
          deductions. Figures follow the {NG_2026_1.framework}. Plutus applies statutory rules; it does not provide tax or
          legal advice.
        </p>
      </div>
    </section>
  );
}

export function PayrollFeatures() {
  const hr = MODULE_GROUPS.find((g) => g.heading === "HR and workforce");
  return (
    <section aria-labelledby="payroll-features-title" className={sectionClass}>
      <div className="wrap grid items-start gap-[clamp(32px,5vw,64px)] lg:grid-cols-[minmax(0,1.1fr)_minmax(0,.9fr)]">
        <div>
          <SectionHead eyebrow="Payroll" id="payroll-features-title" title="From pay run to remittance, inside the books." />
          <div className="grid border-t border-line sm:grid-cols-2">
            {PAYROLL_FEATURES.map(([title, body], i) => (
              <article key={title} className={cn("grid content-start gap-1.5 border-b border-line py-5 pr-5", i % 2 === 1 && "sm:border-l sm:pl-5")}>
                <h3 className="text-[16px] font-extrabold">{title}</h3>
                <p className="text-[14px] text-ink-2">{body}</p>
              </article>
            ))}
          </div>
        </div>
        <div className="grid gap-4 rounded-card border border-line bg-sunk p-6">
          <h3 className="text-[11px] font-extrabold uppercase tracking-[.12em] text-ink-soft">
            The people records payroll depends on
          </h3>
          <p className="text-[14px] text-ink-2">
            HR lives in the same system, so a change to someone&apos;s pay, leave or attendance reaches payroll without
            re-keying.
          </p>
          <ul className="flex flex-wrap gap-2">
            {hr?.items.map((m) => (
              <li key={m}>
                <Chip>{m}</Chip>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
