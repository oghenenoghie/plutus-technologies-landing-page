import { PageIntro } from "@/components/page-intro";
import { Inventory } from "@/components/sections/inventory";
import { pageMetadata } from "@/lib/metadata";

export async function generateMetadata() {
  return pageMetadata({
    title: "Inventory",
    description:
      "Purchase orders, goods receipts, stock issues, transfers and stocktakes, valued at weighted-average cost and reconciled to the general ledger.",
    path: "/inventory",
  });
}

export default function InventoryPage() {
  return (
    <main id="top">
      <PageIntro eyebrow="Inventory" title="Stock that reconciles to the ledger.">
        Purchase orders to stocktakes, with lots and expiry, reorder suggestions and every warehouse in one place. Stock is
        valued at weighted-average cost and checked against the general ledger.
      </PageIntro>
      <Inventory />
    </main>
  );
}
