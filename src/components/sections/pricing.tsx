import { SectionHead, sectionClass } from "@/components/section-head";
import { ButtonLink } from "@/components/ui/button";
import { Pill } from "@/components/ui/pill";
import { cn } from "@/lib/utils";

const TIERS = [
  {
    tier: "Core",
    title: "Payroll & Compliance",
    items: ["Payroll runs and digital payslips", "All seven statutory schemes", "TIN check and state PAYE schedules", "Statutory reports and audit trail"],
    cta: "Request a quote",
  },
  {
    tier: "Complete",
    title: "Full HR Suite",
    recommended: true,
    items: ["Everything in Core", "Leave, attendance and benefits", "Loans, advances and expenses", "Employee and manager self-service"],
    cta: "Request a quote",
  },
  {
    tier: "Enterprise",
    title: "Multi-entity",
    items: ["Everything in Complete", "Multiple companies and states", "APIs, webhooks and ERP sync", "Onboarding and dedicated support"],
    cta: "Talk to sales",
  },
];

export function Pricing() {
  return (
    <section id="pricing" aria-labelledby="pricing-title" className={sectionClass}>
      <div className="wrap">
        <SectionHead eyebrow="Pricing" id="pricing-title" title="Priced per employee, per month.">
          Plans are tiered by depth. Every plan includes the full Nigerian compliance engine.
        </SectionHead>
        <div className="grid gap-5 lg:grid-cols-3">
          {TIERS.map((t) => (
            <article
              key={t.tier}
              className={cn(
                "grid grid-rows-[auto_auto_auto_1fr_auto] gap-[18px] rounded-card border bg-surface p-7",
                t.recommended ? "border-gold outline outline-1 -outline-offset-1 outline-gold" : "border-line",
              )}
            >
              <div className="flex min-h-[26px] items-center justify-between gap-2.5">
                <Pill tone={t.recommended ? "gold" : "mute"}>{t.tier}</Pill>
              </div>
              <h3 className="font-display text-[34px] font-semibold leading-none">{t.title}</h3>
              <div className="border-y border-line py-3 text-[13px] text-ink-soft">
                <b className="block text-xl font-extrabold text-ink">Talk to sales</b>
                per employee / month
              </div>
              <ul className="gold-list self-start">
                {t.items.map((i) => (
                  <li key={i}>{i}</li>
                ))}
              </ul>
              <ButtonLink variant={t.recommended ? "gold" : "line"} href="#contact" className="w-full">
                {t.cta}
              </ButtonLink>
            </article>
          ))}
        </div>
        <p className="mt-[18px] text-[13px] text-ink-soft">Plutus Cloud and Plutus Desktop licensing are quoted with your plan.</p>
      </div>
    </section>
  );
}
