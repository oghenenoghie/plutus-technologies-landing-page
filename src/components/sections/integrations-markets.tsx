import { sectionClass } from "@/components/section-head";
import { Pill } from "@/components/ui/pill";
import { cn } from "@/lib/utils";
import { EditionIcon } from "./editions";

const INTEGRATIONS = [
  { icon: "bank" as const, title: "Bank statements", body: "Import statements and match every line to an invoice, bill or journal." },
  { icon: "book" as const, title: "Payroll journals", body: "Pay runs from Plutus payroll, or from your HR system via the API, post to the ledger as balanced journals." },
  { icon: "api" as const, title: "Open APIs and webhooks", body: "Scoped keys for ERP sync, online sales and data-warehouse export." },
];

const MARKETS = [
  { name: "Nigeria", schemes: "VAT · WHT · CIT · Development levy · PAYE", status: "Live", tone: "good" as const },
  { name: "Ghana", schemes: "VAT · Corporate income tax · PAYE", status: "Roadmap · Q1 2027", tone: "warn" as const },
  { name: "Kenya", schemes: "VAT · Corporate income tax · PAYE", status: "Roadmap · Q3 2027", tone: "warn" as const },
];

export function IntegrationsMarkets() {
  return (
    <section id="integrations" aria-label="Integrations and markets" className={cn(sectionClass, "bg-sunk")}>
      <div className="wrap grid items-start gap-[clamp(32px,5vw,72px)] lg:grid-cols-2">
        <div>
          <p className="eyebrow">Integrations</p>
          <h2 className="h2 mt-[18px]">Connected to where the money moves.</h2>
          <div className="mt-7 grid gap-3.5">
            {INTEGRATIONS.map((i) => (
              <div
                key={i.title}
                className="grid grid-cols-[44px_1fr] items-start gap-4 rounded-card border border-line bg-surface px-[22px] py-5"
              >
                <EditionIcon name={i.icon} className="size-11" />
                <div>
                  <h3 className="mb-1 text-[17px] font-extrabold">{i.title}</h3>
                  <p className="text-[14.5px] text-ink-2">{i.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <p className="eyebrow">Markets</p>
          <h2 className="h2 mt-[18px]">Nigeria is the proving ground, not the ceiling.</h2>
          <ul className="mt-7 overflow-hidden rounded-card border border-line bg-surface">
            {MARKETS.map((m) => (
              <li
                key={m.name}
                className="grid grid-cols-[1fr_auto] items-center gap-4 border-b border-line px-[22px] py-[18px] last:border-b-0 sm:grid-cols-[120px_1fr_auto]"
              >
                <b className="font-display text-[26px] font-semibold">{m.name}</b>
                <span className="col-span-full row-start-2 text-[13.5px] text-ink-2 sm:col-span-1 sm:row-start-auto">
                  {m.schemes}
                </span>
                <Pill tone={m.tone} className="sm:col-start-3 sm:row-start-1">
                  {m.status}
                </Pill>
              </li>
            ))}
          </ul>
          <p className="mt-[18px] text-[13px] text-ink-soft">
            Each new country will add a tax rule set, not a new platform. Ghana and Kenya rule sets are planned and not yet
            available.
          </p>
        </div>
      </div>
    </section>
  );
}
