import { SectionHead, deepSectionClass } from "@/components/section-head";
import { NG_2026_1, type Scheme } from "@/lib/compliance/ng-2026-1";
import { formatNaira } from "@/lib/compliance/paye";
import { cn } from "@/lib/utils";

const th = "whitespace-nowrap border-b border-deep-line px-4 py-[11px] text-left text-[11px] font-extrabold uppercase tracking-[.1em] text-deep-soft";
const td = "border-b border-deep-line px-4 py-3 align-top";

function Panel({ title, tag, children }: { title: string; tag: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="overflow-hidden rounded-card border border-deep-line bg-deep-2">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-deep-line px-[18px] py-3.5">
        <b className="text-[11.5px] font-extrabold uppercase tracking-[.14em] text-deep-soft">{title}</b>
        {tag}
      </div>
      {children}
    </div>
  );
}

function BorneBy({ who }: { who: Scheme["borneBy"] }) {
  return (
    <span
      className={cn(
        "whitespace-nowrap rounded-full border px-2 py-[3px] text-[11px] font-extrabold uppercase tracking-[.06em]",
        who === "Employer" ? "border-gold/45 text-gold" : "border-deep-line text-deep-soft",
      )}
    >
      {who}
    </span>
  );
}

function bandLabel(start: number, width: number | null) {
  if (start === 0 && width !== null) return `First ${formatNaira(width)}`;
  if (width === null) return `Above ${formatNaira(start)}`;
  return `${formatNaira(start + 1)} – ${formatNaira(start + width)}`;
}

const SAMPLE_TIN = [
  { initials: "AO", name: "Adaeze Okafor", state: "Lagos", ok: false },
  { initials: "TB", name: "Tunde Bello", state: "Ogun", ok: false },
  { initials: "IM", name: "Ibrahim Musa", state: "FCT", ok: true },
];

export function ComplianceEngine() {
  let start = 0;
  const bands = NG_2026_1.paye.bands.map((b) => {
    const row = { label: bandLabel(start, b.width), rate: `${b.rate * 100}%` };
    start += b.width ?? 0;
    return row;
  });
  const flagged = SAMPLE_TIN.filter((e) => !e.ok).length;

  return (
    <section id="compliance" aria-labelledby="compliance-title" className={deepSectionClass}>
      <div className="wrap">
        <SectionHead
          eyebrow="Compliance engine"
          id="compliance-title"
          title="Seven schemes. Each with its own base, rate, authority and deadline."
        >
          Rules are stored as effective-dated data, never hard-coded. A change in the law is one new rule version, and
          past pay runs stay reproducible under the rules that applied at the time.
        </SectionHead>

        <div className="grid gap-6">
          <Panel
            title="Statutory schemes"
            tag={
              <span className="font-mono text-xs text-gold">
                {NG_2026_1.version} · effective {NG_2026_1.effectiveFrom}
              </span>
            }
          >
            <div className="overflow-x-auto">
              <table className="w-full min-w-[860px] border-collapse text-[13.5px]">
                <thead>
                  <tr>
                    <th className={th}>Scheme</th>
                    <th className={th}>Base</th>
                    <th className={th}>Rate</th>
                    <th className={th}>Borne by</th>
                    <th className={th}>Remit to</th>
                    <th className={th}>Deadline</th>
                  </tr>
                </thead>
                <tbody className="[&_tr:last-child_td]:border-b-0">
                  {NG_2026_1.schemes.map((s) => (
                    <tr key={s.name}>
                      <th scope="row" className={cn(td, "whitespace-nowrap text-left font-extrabold")}>
                        {s.name}
                      </th>
                      <td className={cn(td, "text-deep-soft")}>{s.base}</td>
                      <td className={cn(td, "whitespace-nowrap font-mono text-[12.5px] text-gold")}>{s.rate}</td>
                      <td className={td}>
                        <BorneBy who={s.borneBy} />
                      </td>
                      <td className={cn(td, "text-deep-soft")}>{s.remitTo}</td>
                      <td className={cn(td, "text-deep-soft")}>{s.deadline}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Panel>

          <div className="grid items-start gap-6 md:grid-cols-2">
            <Panel title="PAYE bands" tag={<span className="font-mono text-xs text-gold">annual</span>}>
              <table className="w-full border-collapse font-mono text-[12.5px]">
                <tbody className="[&_tr:last-child_td]:border-b-0">
                  {bands.map((b) => (
                    <tr key={b.label}>
                      <td className={cn(td, "tabular-nums")}>{b.label}</td>
                      <td className={cn(td, "text-right text-gold")}>{b.rate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Panel>

            <Panel
              title="TIN check · Sample data"
              tag={
                <span className="rounded-full bg-[#ef8479]/15 px-[9px] py-1 text-[11px] font-extrabold uppercase tracking-[.06em] text-[#f09a90]">
                  {flagged} flagged
                </span>
              }
            >
              <ul className="py-1.5">
                {SAMPLE_TIN.map((e) => (
                  <li
                    key={e.name}
                    className="grid grid-cols-[32px_1fr_auto] items-center gap-3 border-b border-deep-line px-[18px] py-2.5 text-[13.5px] last:border-b-0"
                  >
                    <span className="grid size-8 place-items-center rounded-full border border-deep-line bg-deep text-[11px] font-extrabold">
                      {e.initials}
                    </span>
                    <span>
                      {e.name}
                      <small className="block text-xs text-deep-soft">
                        {e.state} · TIN {e.ok ? "verified" : "missing"}
                      </small>
                    </span>
                    <span
                      className={cn(
                        "rounded-full px-[9px] py-1 text-[11px] font-extrabold uppercase tracking-[.06em]",
                        e.ok ? "bg-[#62c28e]/15 text-[#7fd1a4]" : "bg-[#ef8479]/15 text-[#f09a90]",
                      )}
                    >
                      {e.ok ? "Ready" : "Held"}
                    </span>
                  </li>
                ))}
              </ul>
            </Panel>
          </div>
        </div>
        <p className="mt-[18px] max-w-[80ch] text-[12.5px] text-deep-soft">
          Employer-side costs (NSITF, ITF, employer pension) are tracked separately and never appear as employee
          deductions. Figures follow the {NG_2026_1.framework}, and are kept current in the rule set. Plutus applies
          statutory rules; it does not provide tax or legal advice.
        </p>
      </div>
    </section>
  );
}
