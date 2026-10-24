import { SectionHead, sectionClass } from "@/components/section-head";
import { cn } from "@/lib/utils";

// The Accounts screens in plutus-hr-system-frontend (src/lib/nav.ts), October 2026.
const FEATURES = [
  ["General ledger", "Journals on a chart of accounts you control. Debits must equal credits before an entry is written."],
  ["Vendors and bills", "Vendor bills, including recurring bills, with input VAT recorded on each and linked to goods receipts."],
  ["Customers and invoices", "Customer invoices, including recurring invoices, in the same ledger as everything else."],
  ["Bank reconciliation", "Bank statement lines matched to the entries in the ledger."],
  ["Financial statements", "Profit and loss account, balance sheet and financial reports straight from the ledger."],
  ["Fixed assets", "A fixed asset register in the same books."],
  ["Budgets", "Budgets set by account and compared with actual ledger activity."],
  ["Audit trail and lock date", "Every change logged. An accounting lock date closes past periods so filed returns keep matching the books."],
] as const;

export function AccountingFeatures() {
  return (
    <section aria-labelledby="accounting-features-title" className={sectionClass}>
      <div className="wrap">
        <SectionHead eyebrow="Ledger core" id="accounting-features-title" title="The books, from first invoice to financial statements." />
        <div className="grid border-t border-line sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map(([title, body], i) => (
            <article
              key={title}
              className={cn(
                "grid content-start gap-2 border-b border-line pt-6 pr-5 pb-7",
                i % 2 === 1 && "sm:max-lg:border-l sm:max-lg:pl-5",
                i % 4 !== 0 && "lg:border-l lg:pl-5",
              )}
            >
              <h3 className="text-[16px] font-extrabold leading-[1.35]">{title}</h3>
              <p className="text-[14px] text-ink-2">{body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
