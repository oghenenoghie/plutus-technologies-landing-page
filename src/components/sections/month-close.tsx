import { SectionHead, sectionClass } from "@/components/section-head";

const STEPS = [
  {
    title: "Set up the books",
    body: "RC number, company TIN, VAT registration, financial year end and opening balances. This sets which taxes and returns apply.",
  },
  {
    title: "Record the month",
    body: "Invoices, bills, receipts, payments and pay runs. Each one posts double-entry, with VAT and WHT calculated as it posts.",
  },
  {
    title: "Reconcile",
    body: "Bank statements matched line by line, WHT credit notes matched to receipts, and anything unexplained held for review.",
  },
  {
    title: "Close, file and report",
    body: "Lock the period, file VAT and WHT returns with their schedules, and produce the trial balance and financial statements.",
  },
];

export function MonthClose() {
  return (
    <section id="how" aria-labelledby="how-title" className={sectionClass}>
      <div className="wrap">
        <SectionHead eyebrow="How a month closes" id="how-title" title="From opening balances to filed returns in four steps." />
        <ol className="grid border-t-2 border-ink sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s, i) => (
            <li
              key={s.title}
              className={[
                "grid content-start gap-2.5 border-line pt-6 pb-2 pr-[22px]",
                i > 0 ? "max-sm:border-t" : "",
                i % 2 === 1 ? "sm:border-l sm:pl-[22px]" : "",
                i >= 2 ? "sm:max-lg:mt-2 sm:max-lg:border-t" : "",
                i === 2 ? "lg:border-l lg:pl-[22px]" : "",
              ].join(" ")}
            >
              <span className="font-display text-[54px] font-semibold leading-none text-gold-text">{i + 1}</span>
              <h3 className="text-lg font-extrabold leading-[1.3]">{s.title}</h3>
              <p className="text-[14.5px] text-ink-2">{s.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
