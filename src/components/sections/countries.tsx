import { SectionHead, sectionClass } from "@/components/section-head";
import { Pill } from "@/components/ui/pill";
import { COUNTRIES, TAX_MODULES } from "@/lib/countries";
import { cn } from "@/lib/utils";

const th = "whitespace-nowrap border-b border-line bg-sunk px-4 py-[11px] text-left text-[11px] font-extrabold uppercase tracking-[.1em] text-ink-soft";
const td = "border-b border-line px-4 py-3.5 align-top";

const RULES = [
  ["rates / effective-dated", "Every rate has a window", "A rate applies from one date up to the next, so a return for last year is always worked out on last year's rules."],
  ["rates / sourced", "Every rate names its source and approver", "A rate cannot be stored without the authority guidance it comes from and the person who approved it."],
  ["engine / fail closed", "No approved rules, no calculation", "For a country still in setup, the engine refuses to calculate rather than guess. It never falls back to another country's rates."],
  ["money / one currency", "Currencies are never mixed", "Each country keeps its own currency, and analytics never adds amounts in different currencies together."],
] as const;

export function CountryCatalogue() {
  return (
    <section aria-labelledby="catalogue-title" className={sectionClass}>
      <div className="wrap">
        <SectionHead eyebrow="Country catalogue" id="catalogue-title" title="Six countries catalogued. One live.">
          Each jurisdiction carries its currency, its tax authority and the same four tax modules. A country goes live only
          when its rules are sourced from the authority, reviewed and approved. No rate has been shipped for the other five.
        </SectionHead>
        <div className="overflow-hidden rounded-card border border-line bg-surface">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] border-collapse text-[14px]">
              <thead>
                <tr>
                  <th className={th}>Country</th>
                  <th className={th}>Currency</th>
                  <th className={th}>Tax authority</th>
                  <th className={th}>Readiness</th>
                </tr>
              </thead>
              <tbody className="[&_tr:last-child_td]:border-b-0 [&_tr:last-child_th]:border-b-0">
                {COUNTRIES.map((c) => (
                  <tr key={c.code}>
                    <th scope="row" className={cn(td, "text-left")}>
                      <span className="mr-2.5 font-mono text-xs text-ink-soft">{c.code}</span>
                      <b className="font-display text-[22px] font-semibold">{c.name}</b>
                    </th>
                    <td className={cn(td, "font-mono text-[13px]")}>{c.currency}</td>
                    <td className={cn(td, "text-ink-2")}>{c.authority}</td>
                    <td className={td}>
                      <span className="flex flex-wrap items-center gap-2">
                        <Pill tone={c.readiness === "Active" ? "good" : "warn"}>{c.readiness}</Pill>
                        {c.planned ? <span className="text-xs text-ink-soft">Planned {c.planned}</span> : null}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex flex-wrap items-center gap-x-[18px] gap-y-2 border-t border-line bg-sunk px-5 py-3.5 text-sm">
            <b className="text-[11.5px] font-extrabold uppercase tracking-[.14em] text-gold-text">Tax modules per country</b>
            <span>{TAX_MODULES.join(" · ")}</span>
          </div>
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
