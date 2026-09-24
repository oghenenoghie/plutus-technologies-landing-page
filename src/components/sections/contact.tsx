import { Icon, type IconName } from "@/components/icons";
import { deepSectionClass } from "@/components/section-head";
import { CONTACT } from "@/lib/site";
import { cn } from "@/lib/utils";
import { CopyButton } from "./copy-button";

type Row = { icon: IconName; label: string; display: string; value: string; href: string };

const ROWS: Row[] = [
  { icon: "mail", label: "Email", display: CONTACT.email, value: CONTACT.email, href: `mailto:${CONTACT.email}` },
  ...CONTACT.phones.map((p) => ({ icon: "phone" as const, label: p.label, display: p.display, value: p.value, href: `tel:${p.value}` })),
  { icon: "globe", label: "Web", display: CONTACT.web.display, value: CONTACT.web.value, href: CONTACT.web.value },
];

export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className={deepSectionClass}>
      <div className="wrap grid items-start gap-[clamp(32px,5vw,72px)] lg:grid-cols-2">
        <div className="grid content-start gap-5">
          <p className="eyebrow">Book a demo</p>
          <h2 className="h2" id="contact-title">
            See your own payroll run through the engine.
          </h2>
          <p className="lede">
            Send us your headcount, the states you operate in and whether you need Cloud or Desktop. We&apos;ll walk you
            through a pay run built on your structure.
          </p>
          <div className="mt-8 grid border-t border-deep-line sm:grid-cols-2">
            {CONTACT.offices.map((o, i) => (
              <address
                key={o.name}
                className={cn(
                  "grid gap-1.5 pt-[22px] pr-[22px] not-italic",
                  i > 0 && "max-sm:mt-[22px] max-sm:border-t max-sm:border-deep-line sm:border-l sm:border-deep-line sm:pl-[22px]",
                )}
              >
                <b className="font-mark text-sm font-semibold uppercase tracking-[.1em] text-gold">{o.name}</b>
                <p className="text-[14.5px] text-deep-soft">
                  {o.lines.map((l) => (
                    <span key={l} className="block">
                      {l}
                    </span>
                  ))}
                </p>
              </address>
            ))}
          </div>
        </div>
        <ul className="overflow-hidden rounded-card border border-deep-line">
          {ROWS.map((r) => (
            <li
              key={r.value}
              className="grid grid-cols-[40px_1fr_auto] items-center gap-3.5 border-b border-deep-line px-5 py-4 last:border-b-0"
            >
              <span className="grid size-10 place-items-center rounded-full bg-gold text-[#0b0c0e]">
                <Icon name={r.icon} className="size-[18px]" />
              </span>
              <div className="min-w-0">
                <small className="block text-[11px] font-extrabold uppercase tracking-[.12em] text-deep-soft">{r.label}</small>
                <a href={r.href} className="copy-value text-[15.5px] font-semibold tabular-nums text-deep-ink no-underline [overflow-wrap:anywhere]">
                  {r.display}
                </a>
              </div>
              <CopyButton value={r.value} label={`${r.label} ${r.display}`} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
