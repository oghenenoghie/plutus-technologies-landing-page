import { SectionHead, sectionClass } from "@/components/section-head";
import { Chip, Pill } from "@/components/ui/pill";
import { formatNaira } from "@/lib/money";

// Taken from the Inventory module in plutus-hr-system-frontend (phases 1 to 5, October 2026).
const DOCUMENTS = [
  {
    doc: "Purchase order",
    does: "Price, discount and tax per line. Submitted, approved and issued to the vendor, or closed short when the balance will not arrive.",
    posts: "Nothing yet: an order is a commitment, not a transaction",
  },
  {
    doc: "Goods receipt",
    does: "Received against an issued order and prefilled with what is outstanding. Rejected quantities need a reason; lots and expiry dates are recorded.",
    posts: "Stock into inventory, accrued to goods received not invoiced",
  },
  {
    doc: "Vendor bill",
    does: "Linked to the unbilled receipt it invoices, then approved.",
    posts: "Clears the accrual and posts any price difference",
  },
  {
    doc: "Stock issue",
    does: "Requested by stores or by a department manager for their department, approved, then posted.",
    posts: "Out of inventory, to the category's expense account",
  },
  {
    doc: "Stock transfer",
    does: "Dispatched into transit and received line by line at the other warehouse. A shortfall needs a reason.",
    posts: "Through stock in transit; shortfalls are written off",
  },
  {
    doc: "Adjustment and stocktake",
    does: "Counted against a snapshot. Write-offs, and gains above the limit you set, go for approval before they post.",
    posts: "Gains and losses, once approved",
  },
];

const FEATURES = [
  "Items with unit conversions",
  "Warehouses and stock on hand",
  "Lot and expiry tracking",
  "Stock movement ledger",
  "Reorder suggestions",
  "Count and variance sheets",
  "Valuation report with GL check",
  "Expiring stock report",
  "CSV and PDF exports",
  "Approval workflows",
  "Department stock requests",
  "Accounting lock date",
];

// Sample data only. The app shows this check on the Inventory overview.
const RECONCILIATION = [
  { label: "Stock value", left: "Inventory valuation report", right: "Inventory account (GL)", amount: 18_742_500 },
  { label: "Unbilled receipts", left: "Goods receipts not yet billed", right: "Goods received not invoiced (GL)", amount: 2_310_000 },
];

export function Inventory() {
  return (
    <section id="inventory" aria-labelledby="inventory-title" className={sectionClass}>
      <div className="wrap">
        <SectionHead eyebrow="Inventory · New module" id="inventory-title" title="Stock that reconciles to the ledger.">
          Inventory is the newest module in Plutus. Every receipt, issue, transfer and adjustment writes a stock movement
          and posts its journal to the general ledger, so the stock report and the balance sheet tell the same story.
        </SectionHead>

        <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,.7fr)]">
          <div className="overflow-hidden rounded-card border border-line bg-surface">
            <div className="hidden grid-cols-[150px_1fr_1fr] gap-5 border-b border-line bg-sunk px-5 py-3 text-[11px] font-extrabold uppercase tracking-[.1em] text-ink-soft md:grid">
              <span>Document</span>
              <span>What happens</span>
              <span>What it posts</span>
            </div>
            <ol>
              {DOCUMENTS.map((d) => (
                <li
                  key={d.doc}
                  className="grid gap-1.5 border-b border-line px-5 py-4 last:border-b-0 md:grid-cols-[150px_1fr_1fr] md:gap-5"
                >
                  <b className="text-[15px] font-extrabold">{d.doc}</b>
                  <span className="text-[14px] text-ink-2">{d.does}</span>
                  <span className="text-[13.5px] text-ink-soft md:text-ink-2">
                    <span className="mr-1.5 font-mono text-[11px] text-gold-text md:hidden">Posts:</span>
                    {d.posts}
                  </span>
                </li>
              ))}
            </ol>
          </div>

          <div className="grid gap-6">
            <div className="overflow-hidden rounded-card border border-line-strong bg-surface">
              <div className="flex items-center justify-between gap-3 border-b border-line bg-sunk px-5 py-3.5">
                <span className="text-[11px] font-extrabold uppercase tracking-[.14em] text-ink-soft">
                  Ledger check · Sample data
                </span>
                <Pill tone="good">Reconciled</Pill>
              </div>
              <ul>
                {RECONCILIATION.map((r) => (
                  <li key={r.label} className="grid gap-2 border-b border-line px-5 py-4 last:border-b-0">
                    <b className="text-sm font-extrabold">{r.label}</b>
                    {[r.left, r.right].map((side) => (
                      <div key={side} className="flex items-baseline justify-between gap-3 text-[13px]">
                        <span className="text-ink-soft">{side}</span>
                        <span className="font-mono tabular-nums">{formatNaira(r.amount)}</span>
                      </div>
                    ))}
                    <div className="flex items-baseline justify-between gap-3 border-t border-line pt-2 text-[13px]">
                      <span className="font-bold">Difference</span>
                      <span className="font-mono font-medium tabular-nums text-good">{formatNaira(0)}</span>
                    </div>
                  </li>
                ))}
              </ul>
              <p className="border-t border-line bg-sunk px-5 py-3 text-xs text-ink-soft">
                Stock is valued at weighted-average cost: one average per item across all warehouses.
              </p>
            </div>

            <ul className="flex flex-wrap gap-2" aria-label="Inventory features">
              {FEATURES.map((f) => (
                <li key={f}>
                  <Chip>{f}</Chip>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
