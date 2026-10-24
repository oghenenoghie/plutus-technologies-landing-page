import { SectionHead, sectionClass } from "@/components/section-head";
import { Chip, Pill } from "@/components/ui/pill";
import { cn } from "@/lib/utils";

const PILLARS = [
  {
    title: "Ledger Core",
    body: "Double-entry books with a full audit trail, from the first invoice to the financial statements.",
    items: [
      "Chart of accounts and general ledger",
      "Vendor bills and customer invoices",
      "Bank reconciliation and an accounting lock date",
      "Profit and loss, balance sheet and financial reports",
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
    title: "Operations",
    body: "Stock, people and assets in the same system, so every transaction reaches the ledger without re-keying.",
    items: [
      "Inventory, from purchase order to stocktake",
      "Payroll posted as balanced journals",
      "Fixed assets and budgets",
      "Expenses, loans and approval workflows",
    ],
  },
];

/** Every screen in the app, grouped as its Full Feature Map groups them (plutus-hr-system-frontend, src/lib/nav.ts). */
export const MODULE_GROUPS = [
  {
    heading: "Accounts",
    items: [
      "General Ledger",
      "Chart of Accounts",
      "Vendors and Bills",
      "Customers and Invoices",
      "Bank Reconciliation",
      "Profit and Loss Account",
      "Balance Sheet",
      "Financial Reports",
      "Fixed Assets",
      "Budgets",
      "Audit Trail",
      "Accounting Settings",
    ],
  },
  {
    heading: "Inventory",
    items: [
      "Inventory Overview",
      "Items",
      "Stock on Hand",
      "Stock Movements",
      "Warehouses",
      "Purchase Orders",
      "Goods Receipts",
      "Stock Issues",
      "Stock Transfers",
      "Stock Adjustments",
      "Stocktakes",
      "Reorder",
      "Inventory Reports",
      "Inventory Settings",
    ],
  },
  {
    heading: "Analytics & Insights",
    isNew: true,
    items: [
      "Executive Overview",
      "Workforce Analytics",
      "Payroll Analytics",
      "Attendance Analytics",
      "Leave Analytics",
      "Recruitment Analytics",
      "Performance Analytics",
      "Compliance Analytics",
      "Financial Analytics",
      "Custom Reports",
    ],
  },
  {
    heading: "Payroll and compliance",
    items: [
      "Payroll Runs",
      "Compliance Engine",
      "Country Compliance",
      "PAYE Calculator",
      "Payroll Reports",
      "Final Settlement",
      "Simulation",
      "Contractors",
    ],
  },
  {
    heading: "HR and workforce",
    items: [
      "Employees",
      "Org Chart",
      "Departments",
      "Branches",
      "Job Grades",
      "Recruitment",
      "Employee Relations",
      "Leave",
      "Expenses",
      "Loans and Advances",
      "Benefits",
      "Attendance",
      "Overtime",
      "Shifts",
      "Shift Roster",
      "Tasks",
      "Calendar",
      "Union Dues",
      "Policies",
      "Learning and Development",
      "Performance",
      "Employee Self-Service",
    ],
  },
  {
    heading: "Company and controls",
    items: [
      "Setup and Onboarding",
      "Integrations",
      "Approval Workflows",
      "Documents",
      "Permissions",
      "Security",
      "Public Holidays",
      "Subscription",
    ],
  },
];

export const MODULE_COUNT = MODULE_GROUPS.reduce((n, g) => n + g.items.length, 0);

export function Platform() {
  return (
    <section id="product" aria-labelledby="product-title" className={sectionClass}>
      <div className="wrap">
        <SectionHead eyebrow="The platform" id="product-title" title="One ledger. Three pillars. Tax at the centre.">
          Most accounting software treats tax as a report you run at month end. In Plutus it is the core: every invoice,
          bill, stock movement and pay run is taxed and posted as it happens, and the books are built around it.
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
        <div className="mt-7 grid gap-5 rounded-card border border-line bg-sunk p-6">
          <div className="flex flex-wrap items-baseline justify-between gap-3">
            <b className="text-xs font-extrabold uppercase tracking-[.14em]">Full feature map</b>
            <span className="text-[13px] text-ink-soft">
              {MODULE_COUNT} screens in {MODULE_GROUPS.length} areas, as the app lists them
            </span>
          </div>
          {MODULE_GROUPS.map((g) => (
            <div key={g.heading} className="grid gap-2.5 border-t border-line pt-4">
              <div className="flex items-center gap-2.5">
                <h3 className="text-[11px] font-extrabold uppercase tracking-[.12em] text-ink-soft">{g.heading}</h3>
                {g.isNew ? <Pill tone="gold">New</Pill> : null}
              </div>
              <ul className="flex flex-wrap gap-2">
                {g.items.map((m) => (
                  <li key={m}>
                    <Chip>{m}</Chip>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
