import { SectionHead, sectionClass } from "@/components/section-head";

const CHANGES = [
  {
    k: "PAYE",
    title: "New progressive bands",
    body: "The first ₦800,000 of chargeable income is tax-free. Rates then step through 15%, 18%, 21% and 23% to 25% above ₦50 million.",
  },
  {
    k: "Reliefs",
    title: "CRA abolished",
    body: "The Consolidated Relief Allowance is gone. In its place: rent relief of 20% of annual rent, capped at ₦500,000.",
  },
  {
    k: "NTAA",
    title: "TIN is mandatory",
    body: "Every worker must hold a valid Tax Identification Number. Plutus flags anyone without one before the run, not after an audit.",
  },
  {
    k: "NRS",
    title: "Enforcement goes digital",
    body: "The Nigeria Revenue Service cross-references payroll data against bank records, with wider audit and penalty powers.",
  },
];

export function Reform() {
  return (
    <section id="reform" aria-labelledby="reform-title" className={sectionClass}>
      <div className="wrap">
        <SectionHead eyebrow="The 2026 reform" id="reform-title" title={<>Nigeria rewrote payroll tax on 1&nbsp;January&nbsp;2026.</>}>
          Four Acts signed in June 2025 replaced the Personal Income Tax Act and changed how every employer calculates,
          withholds and remits tax under the Nigeria Tax Act 2025, effective 1 January 2026. Most payroll still runs on
          spreadsheets or on software built for the old code.
        </SectionHead>
        <div className="grid overflow-hidden rounded-card border border-line bg-surface sm:grid-cols-2 lg:grid-cols-4">
          {CHANGES.map((c) => (
            <article
              key={c.k}
              className="-mt-px -ml-px grid content-start gap-3 border-t border-l border-line px-6 pt-[26px] pb-7"
            >
              <span className="font-mono text-xs text-gold-text">{c.k}</span>
              <h3 className="font-display text-[26px] font-semibold leading-[1.1]">{c.title}</h3>
              <p className="text-[14.5px] text-ink-2">{c.body}</p>
            </article>
          ))}
        </div>
        <blockquote className="mt-[clamp(36px,5vw,56px)] max-w-[900px] border-l-2 border-gold pl-6">
          <p className="font-display text-[clamp(24px,2.8vw,34px)] font-medium leading-[1.2]">
            The reform did not simplify payroll. It raised the cost of getting it wrong.{" "}
            <em className="text-gold-text">Plutus turns that risk into a product.</em>
          </p>
        </blockquote>
      </div>
    </section>
  );
}
