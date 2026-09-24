import { SectionHead, sectionClass } from "@/components/section-head";
import { Chip, Pill } from "@/components/ui/pill";
import { cn } from "@/lib/utils";

const PILLARS = [
  {
    title: "Payroll Core",
    body: "Multi-frequency runs with itemised digital payslips and a full audit trail.",
    items: [
      "Monthly, bi-weekly and weekly runs",
      "Bonuses, arrears and 13th-month pay",
      "Cumulative PAYE recalculated when pay changes mid-year",
      "Bank disbursement files once a run is approved",
    ],
  },
  {
    title: "Compliance Engine",
    key: true,
    body: "A rules engine over the payroll core. When the law changes, the rule set changes once for every client.",
    items: [
      "PAYE, pension, NHF, NHIS, NSITF, ITF and WHT",
      "State-specific PAYE filing schedules",
      "Remittance tracking by authority and deadline",
      "Contractor WHT with certificate generation",
    ],
  },
  {
    title: "People Operations",
    body: "The rest of HR in the same system, so every change reaches payroll without re-keying.",
    items: [
      "Leave and attendance tied to pay",
      "Loans, advances and expense claims",
      "Benefits and final settlement",
      "Employee and manager self-service",
    ],
  },
];

const MODULES = [
  "Employee Management",
  "Payroll Setup",
  "Salary Structure",
  "Earnings Management",
  "Deductions",
  "Attendance Integration",
  "Leave Management",
  "Overtime Management",
  "Loans & Advances",
  "Tax Management",
  "Benefits Administration",
  "Payroll Processing",
  "Payslips",
  "Direct Deposit & Payments",
  "Expense Reimbursement",
  "Compliance",
  "Employee Self-Service",
  "Manager Self-Service",
  "Reporting & Analytics",
  "Accounting Integration",
  "Workflow & Approvals",
  "Notifications",
  "Security",
  "Multi-Company & Global Payroll",
  "Integrations",
  "Final Settlement",
  "Advanced Features",
];

export function Platform() {
  return (
    <section id="product" aria-labelledby="product-title" className={sectionClass}>
      <div className="wrap">
        <SectionHead eyebrow="The platform" id="product-title" title="One core. Three pillars. Compliance at the centre.">
          Most payroll software treats compliance as a feature added later. In Plutus it is the core, and payroll and
          people operations are built around it.
        </SectionHead>
        <div className="grid gap-5 lg:grid-cols-3">
          {PILLARS.map((p) => (
            <article
              key={p.title}
              className={cn(
                "grid content-start gap-4 rounded-card border bg-surface p-7",
                p.key ? "border-gold" : "border-line",
              )}
            >
              <div className="flex items-center justify-between gap-3">
                <h3 className="font-display text-[30px] font-semibold leading-[1.05]">{p.title}</h3>
                {p.key ? <Pill tone="gold">The core</Pill> : null}
              </div>
              <p className="text-[15px] text-ink-2">{p.body}</p>
              <ul className="gold-list">
                {p.items.map((i) => (
                  <li key={i}>{i}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
        <div className="mt-7 grid gap-4 rounded-card border border-line bg-sunk p-6">
          <div className="flex flex-wrap items-baseline justify-between gap-3">
            <b className="text-xs font-extrabold uppercase tracking-[.14em]">Full feature map</b>
            <span className="text-[13px] text-ink-soft">27 modules in scope · ask us which are live for your rollout</span>
          </div>
          <ul className="flex flex-wrap gap-2">
            {MODULES.map((m) => (
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
