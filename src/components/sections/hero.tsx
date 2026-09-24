import { Icon } from "@/components/icons";
import { ArrowIcon, ButtonLink } from "@/components/ui/button";
import { LINKS } from "@/lib/site";
import { PayeInstrument } from "./paye-instrument";

const CHECKS = ["2026 PAYE bands and rent relief", "TIN checked before every run", "PAYE routed by state of residence"];

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="py-[clamp(48px,7vw,96px)]">
      <div className="wrap grid items-start gap-[clamp(36px,5vw,72px)] lg:grid-cols-[minmax(0,1.08fr)_minmax(0,.92fr)]">
        <div className="grid gap-[26px] pt-3">
          <p className="eyebrow rise">HR &amp; payroll for Nigeria and Africa</p>
          <h1
            id="hero-title"
            className="rise font-display text-[clamp(50px,7.2vw,96px)] font-semibold leading-[.96] tracking-[-.018em] [animation-delay:.06s]"
          >
            Payroll, correct <em className="font-medium italic text-gold-text">by construction.</em>
          </h1>
          <p className="rise max-w-[54ch] text-[clamp(17px,1.6vw,20px)] text-ink-2 [animation-delay:.12s]">
            Plutus is the compliance-native HR and payroll platform. PAYE, pension, NHF, NHIS, NSITF, ITF and withholding
            tax are calculated from a versioned rule set, routed to the right authority, and tracked to the deadline. Run
            it in the cloud or fully offline on your own machine.
          </p>
          <div className="rise flex flex-wrap gap-3 [animation-delay:.18s]">
            <ButtonLink href="#contact">
              Book a demo <ArrowIcon />
            </ButtonLink>
            <ButtonLink variant="line" href={LINKS.cloud}>
              Open Plutus Cloud
            </ButtonLink>
            <ButtonLink variant="line" href={LINKS.download}>
              <Icon name="down" />
              Download Desktop
            </ButtonLink>
          </div>
          <ul className="rise flex flex-wrap gap-x-[22px] gap-y-2 border-t border-line pt-[22px] text-[13px] text-ink-soft [animation-delay:.24s]">
            {CHECKS.map((c) => (
              <li key={c} className="inline-flex items-center gap-2">
                <Icon name="check" className="size-3.5 text-gold" />
                {c}
              </li>
            ))}
          </ul>
        </div>
        <PayeInstrument />
      </div>
    </section>
  );
}
