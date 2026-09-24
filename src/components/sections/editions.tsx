import { Icon, type IconName } from "@/components/icons";
import { SectionHead, sectionClass } from "@/components/section-head";
import { ArrowIcon, ButtonLink } from "@/components/ui/button";
import { Pill } from "@/components/ui/pill";
import { NG_2026_1 } from "@/lib/compliance/ng-2026-1";
import { LINKS } from "@/lib/site";
import { cn } from "@/lib/utils";

export function EditionIcon({ name, className }: { name: IconName; className?: string }) {
  return (
    <span className={cn("grid size-12 flex-none place-items-center rounded-btn border border-line-strong text-gold-text", className)}>
      <Icon name={name} className="size-6" />
    </span>
  );
}

const EDITIONS = [
  {
    name: "Cloud",
    icon: "cloud" as const,
    pill: <Pill tone="good">Online</Pill>,
    body: "The full platform in the browser, for teams that work across offices and states.",
    items: [
      "Sign in from any browser, no installation",
      "Role-based access with MFA for admins and payroll managers",
      "Bank disbursement files and accounting journal sync",
      "Employee self-service for payslips, leave and claims",
    ],
    primary: (
      <ButtonLink href={LINKS.cloud}>
        Open Plutus Cloud <ArrowIcon />
      </ButtonLink>
    ),
    secondary: (
      <ButtonLink variant="line" href="#contact">
        Book a demo
      </ButtonLink>
    ),
  },
  {
    name: "Desktop",
    icon: "desk" as const,
    pill: <Pill tone="gold">Offline</Pill>,
    body: "An installed application that runs without an internet connection. Payroll keeps working when the network does not.",
    items: [
      "No internet connection required to run payroll",
      "Payroll data stays on your own machine",
      "Built-in database, sign-in and scheduler",
      "The same statutory calculations as Plutus Cloud",
    ],
    primary: (
      <ButtonLink href={LINKS.download}>
        <Icon name="down" />
        Download Desktop
      </ButtonLink>
    ),
    secondary: (
      <ButtonLink variant="line" href="#contact">
        Licensing questions
      </ButtonLink>
    ),
  },
];

export function Editions() {
  return (
    <section id="editions" aria-labelledby="editions-title" className={cn(sectionClass, "bg-sunk")}>
      <div className="wrap">
        <SectionHead eyebrow="Cloud & Desktop" id="editions-title" title="Run Plutus online, or entirely on your own machine.">
          Both editions run the same compliance engine and rule set. Choose by where your data needs to live and how your
          office connects.
        </SectionHead>
        <div className="grid overflow-hidden rounded-card border border-line-strong bg-surface md:grid-cols-2">
          {EDITIONS.map((e, i) => (
            <article
              key={e.name}
              className={cn(
                "grid content-start gap-5 p-[clamp(24px,3.4vw,40px)]",
                i > 0 && "border-line-strong max-md:border-t md:border-l",
              )}
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <EditionIcon name={e.icon} />
                {e.pill}
              </div>
              <h3 className="font-display text-[clamp(32px,3.4vw,42px)] font-semibold leading-none">
                <span className="mb-2 block font-mark text-[.62em] font-semibold tracking-[.08em] text-ink-soft">PLUTUS</span>
                {e.name}
              </h3>
              <p className="text-ink-2">{e.body}</p>
              <ul className="gold-list">
                {e.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <div className="mt-1 flex flex-wrap gap-2.5">
                {e.primary}
                {e.secondary}
              </div>
            </article>
          ))}
          <div className="col-span-full flex flex-wrap items-center gap-x-[18px] gap-y-2.5 border-t border-line-strong bg-sunk px-[clamp(24px,3.4vw,40px)] py-[18px] text-sm">
            <b className="text-[11.5px] font-extrabold uppercase tracking-[.14em] text-gold-text">In both</b>
            <span>{NG_2026_1.schemes.map((s) => s.name).join(" · ")}</span>
            <span className="font-mono text-[.82em]">{NG_2026_1.version}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
