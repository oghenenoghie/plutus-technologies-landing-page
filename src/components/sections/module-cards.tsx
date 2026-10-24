import { SectionHead, sectionClass } from "@/components/section-head";
import { ArrowIcon } from "@/components/ui/button";
import { Pill } from "@/components/ui/pill";
import { FEATURE_PAGES } from "@/lib/site";

export function ModuleCards() {
  return (
    <section aria-labelledby="modules-title" className={sectionClass}>
      <div className="wrap">
        <SectionHead eyebrow="What's in Plutus" id="modules-title" title="One system for the books, the stock and the people.">
          Every part posts to the same double-entry ledger and runs on the same versioned rule set, in Cloud or on your own
          machine.
        </SectionHead>
        <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {FEATURE_PAGES.map((p) => (
            <li key={p.href}>
              <a
                href={p.href}
                className="group grid h-full content-start gap-4 rounded-card border border-line bg-surface p-7 text-ink no-underline transition-colors hover:border-gold"
              >
                <div className="flex items-center justify-between gap-3">
                  <h3 className="font-display text-[28px] font-semibold leading-[1.05]">{p.title}</h3>
                  {"isNew" in p && p.isNew ? <Pill tone="gold">New</Pill> : null}
                </div>
                <p className="text-[15px] text-ink-2">{p.blurb}</p>
                <ul className="gold-list">
                  {p.points.map((pt) => (
                    <li key={pt}>{pt}</li>
                  ))}
                </ul>
                <span className="mt-1 inline-flex items-center gap-2 text-[14px] font-extrabold text-gold-text [&_svg]:size-4">
                  Explore <ArrowIcon />
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
