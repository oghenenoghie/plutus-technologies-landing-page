import { SectionHead, sectionClass } from "@/components/section-head";

const DECISIONS = [
  ["rules / effective-dated", "Rules are data, not code", "Rates, reliefs and thresholds live in one versioned rule set. No figures are buried in calculation logic."],
  ["history / reproducible", "Every past run can be replayed", "Historical pay runs are recalculated against the rule version that was in force on their date."],
  ["ledger / append-only", "Nothing is quietly overwritten", "Financial and statutory records are append-only. Corrections are new entries with their own audit trail."],
  ["money / integer kobo", "Exact money, no float rounding", "Amounts are stored as whole kobo. Payslips reconcile to the naira, month after month."],
  ["access / row-level", "Role separation in the database", "Admin, payroll manager, HR manager and employee permissions are enforced where the data lives."],
  ["auth / MFA", "MFA for anyone who moves money", "Multi-factor sign-in is required for admins and payroll managers, with every action logged."],
] as const;

export function Engineering() {
  return (
    <section id="security" aria-labelledby="security-title" className={sectionClass}>
      <div className="wrap">
        <SectionHead
          eyebrow="Built like a financial instrument"
          id="security-title"
          title="Engineering decisions a finance director can check."
        />
        <div className="grid border-t border-line sm:grid-cols-2 lg:grid-cols-3">
          {DECISIONS.map(([tag, title, body], i) => (
            <article
              key={tag}
              className={[
                "grid content-start gap-2.5 border-b border-line pt-7 pr-6 pb-[30px]",
                i % 2 === 1 ? "sm:max-lg:border-l sm:max-lg:pl-6" : "",
                i % 3 !== 0 ? "lg:border-l lg:pl-6" : "",
              ].join(" ")}
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
