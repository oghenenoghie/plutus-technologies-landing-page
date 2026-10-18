import { SectionHead, sectionClass } from "@/components/section-head";

const DECISIONS = [
  ["rules / effective-dated", "Tax rules are data, not code", "VAT, WHT, CIT and levy rates live in one versioned rule set. No rate is buried in posting logic."],
  ["ledger / double-entry", "Every post balances, or it does not post", "Debits must equal credits before an entry is written, enforced by the database. Nothing is parked in suspense."],
  ["ledger / append-only", "Nothing is quietly overwritten", "Posted entries are never edited. Corrections are reversing entries with their own audit trail."],
  ["money / integer kobo", "Exact money, no float rounding", "Amounts are stored as whole kobo. The trial balance reconciles to the kobo, month after month."],
  ["access / row-level", "Role separation in the database", "Eight roles, from Super Admin to Employee, with permissions enforced where the data lives."],
  ["auth / MFA", "Multi-factor sign-in for every role", "Any user can turn on an authenticator app, and every action is written to the audit trail."],
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
