import { SectionHead, sectionClass } from "@/components/section-head";
import { Pill } from "@/components/ui/pill";
import { COUNTRIES } from "@/lib/countries";
import { cn } from "@/lib/utils";

const th = "whitespace-nowrap border-b border-line bg-sunk px-4 py-[11px] text-left text-[11px] font-extrabold uppercase tracking-[.1em] text-ink-soft";
const td = "border-b border-line px-4 py-3.5 align-top";

// From plutus-hr-system docs/countries and app/compliance/engine (October 2026).
const RULES = [
  ["rules / sourced", "Every figure names its source", "Each built-in figure cites where it comes from, and says whether that is the law or the authority's own publication, or a secondary source such as an accounting firm or payroll vendor."],
  ["rules / approved", "Every rule set records its approval", "A rule set runs only once it is approved by someone other than the person who prepared it. The five newer countries were approved by Plutus Technologies, before review by a local tax adviser."],
  ["settings / yours", "Open figures are entered by you", "Where sources disagree or are silent, an admin chooses among the values the sources give, under Tax Settings. Rwanda's 14% pension from 2027, for example, leaves the employee's share to each company."],
  ["engine / fail closed", "No approved rules, no calculation", "Payroll waits until every figure is entered. VAT and withholding tax for the five newer countries aren't approved, so Plutus refuses them rather than guess."],
] as const;

export function CountryCatalogue() {
  return (
    <section aria-labelledby="catalogue-title" className={sectionClass}>
      <div className="wrap">
        <SectionHead eyebrow="Country catalogue" id="catalogue-title" title="Six countries. Payroll in every one.">
          Each country runs in its own currency, on dated rule sets. A new rule set takes over from its start date, and pay
          runs already locked keep the rules they used.
        </SectionHead>
        <div className="overflow-hidden rounded-card border border-line bg-surface">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[860px] border-collapse text-[14px]">
              <thead>
                <tr>
                  <th className={th}>Country</th>
                  <th className={th}>Currency</th>
                  <th className={th}>Tax authority</th>
                  <th className={th}>Payroll</th>
                  <th className={th}>Business taxes</th>
                </tr>
              </thead>
              <tbody className="[&_tr:last-child_td]:border-b-0 [&_tr:last-child_th]:border-b-0">
                {COUNTRIES.map((c) => (
                  <tr key={c.code}>
                    <th scope="row" className={cn(td, "whitespace-nowrap text-left")}>
                      <span className="mr-2.5 font-mono text-xs text-ink-soft">{c.code}</span>
                      <b className="font-display text-[22px] font-semibold">{c.name}</b>
                    </th>
                    <td className={cn(td, "font-mono text-[13px]")}>{c.currency}</td>
                    <td className={cn(td, "text-ink-2")}>{c.authority}</td>
                    <td className={td}>
                      <span className="grid justify-items-start gap-1.5">
                        <Pill tone="good">Active</Pill>
                        <span className="font-mono text-xs text-ink-soft">{c.payroll}</span>
                      </span>
                    </td>
                    <td className={td}>
                      <Pill tone={c.businessTax.approved ? "good" : "warn"}>{c.businessTax.label}</Pill>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="border-t border-line bg-sunk px-5 py-3.5 text-sm text-ink-2">
            Nigeria runs on its own rule versions. The other five run on rule sets Plutus Technologies approved on 27 October
            2026 from published sources, before review by a local tax adviser.{" "}
            <a href="/docs/tax-rules">See every country&apos;s bands, contributions, Tax Settings and sources.</a>
          </p>
        </div>
      </div>
    </section>
  );
}

export function CountryRules() {
  return (
    <section aria-labelledby="country-rules-title" className={cn(sectionClass, "bg-sunk")}>
      <div className="wrap">
        <SectionHead
          eyebrow="How a country goes live"
          id="country-rules-title"
          title="A new country adds a rule set, not a new platform."
        />
        <div className="grid border-t border-line sm:grid-cols-2 lg:grid-cols-4">
          {RULES.map(([tag, title, body], i) => (
            <article
              key={tag}
              className={cn(
                "grid content-start gap-2.5 border-b border-line pt-7 pr-6 pb-[30px]",
                i % 2 === 1 && "sm:border-l sm:pl-6",
                i === 2 && "lg:border-l lg:pl-6",
              )}
            >
              <span className="font-mono text-[.82em] text-gold-text">{tag}</span>
              <h3 className="text-[17px] font-extrabold leading-[1.35]">{title}</h3>
              <p className="text-[14.5px] text-ink-2">{body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
