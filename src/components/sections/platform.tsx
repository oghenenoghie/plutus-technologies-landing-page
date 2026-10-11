import { SectionHead, sectionClass } from "@/components/section-head";
import { Chip, Pill } from "@/components/ui/pill";
import { cn } from "@/lib/utils";

const PILLARS = [
  {
    title: "Ledger Core",
    body: "Double-entry books with a full audit trail, from the first invoice to the financial statements.",
    items: [
      "Chart of accounts and opening balances",
      "Sales invoices, purchase bills and credit notes",
      "Bank reconciliation against statement imports",
      "Trial balance, P&L, balance sheet and cash flow",
    ],
  },
  {
    title: "Tax Engine",
    key: true,
    body: "A rules engine under the ledger. When the law changes, the rule set changes once for every client.",
    items: [
      "VAT, WHT, CIT, development levy and PAYE",
      "VAT and WHT returns with supporting schedules",
      "WHT credit notes tracked against company income tax",
      "Remittance tracking by authority and deadline",
    ],
  },
  {
    title: "Finance Operations",
    body: "The rest of finance in the same system, so every transaction reaches the ledger without re-keying.",
    items: [
      "Fixed assets and depreciation",
      "Inventory, budgets and cost centres",
      "Payroll posted as balanced journals",
      "Expense claims and approvals",
    ],
  },
];

export const MODULES = [
  "Chart of Accounts",
  "General Ledger",
  "Journal Entries",
  "Sales Invoicing",
  "Accounts Receivable",
  "Credit Notes",
  "Purchase Bills",
  "Accounts Payable",
  "Expense Claims",
  "Bank Accounts",
  "Bank Reconciliation",
  "Cash Management",
  "Fixed Assets & Depreciation",
  "Inventory",
  "Budgets",
  "Cost Centres & Projects",
  "VAT",
  "Withholding Tax",
  "Company Income Tax",
  "Payroll",
  "Financial Statements",
  "Management Reporting",
  "Period Close",
  "Multi-Company & Consolidation",
  "Multi-Currency",
  "Audit Trail",
  "Workflow & Approvals",
  "Integrations & API",
];

export function Platform() {
  return (
    <section id="product" aria-labelledby="product-title" className={sectionClass}>
      <div className="wrap">
        <SectionHead eyebrow="The platform" id="product-title" title="One ledger. Three pillars. Tax at the centre.">
          Most accounting software treats tax as a report you run at month end. In Plutus it is the core: every invoice,
          bill and pay run is taxed as it posts, and the books are built around it.
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
            <span className="text-[13px] text-ink-soft">
              {MODULES.length} modules in scope · ask us which are live for your rollout
            </span>
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
