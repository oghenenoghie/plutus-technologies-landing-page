import { SectionHead, sectionClass } from "@/components/section-head";

const STEPS = [
  {
    title: "Register the company",
    body: "RC number, company TIN, pay frequency, default PFA and every state you operate in. This sets which filing schedules apply.",
  },
  {
    title: "Enrol employees",
    body: "Pay components, state of residence, TIN and PFA for each person. Each field feeds the calculation that depends on it.",
  },
  {
    title: "Run payroll",
    body: "The engine applies the current rule set, holds anyone without a valid TIN, and shows the derivation behind every payslip.",
  },
  {
    title: "File and remit",
    body: "State-specific PAYE schedules, pension and NHF files, and remittance evidence consolidated across every state.",
  },
];

export function PayCycle() {
  return (
    <section id="how" aria-labelledby="how-title" className={sectionClass}>
      <div className="wrap">
        <SectionHead eyebrow="How a pay cycle runs" id="how-title" title="From setup to remittance evidence in four steps." />
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
