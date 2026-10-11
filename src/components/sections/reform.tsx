import { SectionHead, sectionClass } from "@/components/section-head";
import { NG_2026_1 } from "@/lib/compliance/ng-2026-1";
import { formatNaira, pct } from "@/lib/money";

const { cit, developmentLevy } = NG_2026_1;

const CHANGES = [
  {
    k: "CIT",
    title: "Small companies pay 0%",
    body: `Companies with turnover up to ${formatNaira(cit.smallCompany.turnoverMax)} and fixed assets up to ${formatNaira(cit.smallCompany.fixedAssetsMax)} pay no company income tax. Others pay ${pct(cit.rate)}. Professional services firms do not qualify.`,
  },
  {
    k: "Levy",
    title: "One development levy",
    body: `A single ${pct(developmentLevy.rate)} levy on assessable profits replaces the tertiary education tax and several sector levies. Small companies are exempt.`,
  },
  {
    k: "NTAA",
    title: "TIN is mandatory",
    body: "Every taxable person must hold a valid Tax Identification Number. Plutus flags customers and vendors without one before you invoice or pay them, not after an audit.",
  },
  {
    k: "NRS",
    title: "Enforcement goes digital",
    body: "The Nigeria Revenue Service cross-references returns against bank records, with wider audit and penalty powers.",
  },
];

export function Reform() {
  return (
    <section id="reform" aria-labelledby="reform-title" className={sectionClass}>
      <div className="wrap">
        <SectionHead eyebrow="The 2026 reform" id="reform-title" title={<>Nigeria rewrote business tax on 1&nbsp;January&nbsp;2026.</>}>
          Four Acts signed in June 2025 consolidated Nigeria&apos;s tax laws and changed how every company calculates,
          records and files tax under the Nigeria Tax Act 2025, effective 1 January 2026. Most books are still kept in
          spreadsheets or in software built for the old code.
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
            The reform did not simplify the books. It raised the cost of getting them wrong.{" "}
            <em className="text-gold-text">Plutus turns that risk into a product.</em>
          </p>
        </blockquote>
      </div>
    </section>
  );
}
