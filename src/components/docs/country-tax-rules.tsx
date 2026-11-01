import type { ReactNode } from "react";
import { Pill } from "@/components/ui/pill";
import {
  COUNTRY_RULES,
  KIND_LABEL,
  enteredFreely,
  longDate,
  money,
  monthName,
  ordinal,
  percent,
  possibleValues,
  ruleSetsFor,
  type RuleLine,
  type RuleSet,
  type Variants,
} from "@/lib/country-rules";
import { cn } from "@/lib/utils";

const th = "border-b border-line bg-sunk px-3 py-2.5 text-left align-bottom text-[10.5px] font-extrabold uppercase tracking-[.1em] text-ink-soft";
const td = "border-b border-line px-3 py-3 align-top";
const tableWrap = "overflow-hidden rounded-card border border-line bg-surface";

/** Marks a figure that comes from the company's Tax Settings. */
function SetMark() {
  return (
    <sup className="ml-0.5 font-sans text-[11px] font-extrabold text-gold-text" title="Set under Tax Settings">
      †
    </sup>
  );
}

function H4({ children }: { children: ReactNode }) {
  return <h4 className="text-[12px] font-extrabold uppercase tracking-[.12em] text-ink-soft">{children}</h4>;
}

/** A figure that may be fixed, one of the options' values, or typed in by the company. */
function figure<T>(fixed: T, variants: Variants | undefined, show: (v: T) => string, free: string): ReactNode {
  if (!variants) return show(fixed);
  if (enteredFreely(variants)) {
    return (
      <>
        {free}
        <SetMark />
      </>
    );
  }
  const values = possibleValues<T>(variants);
  return (
    <>
      {(values.length ? values : [fixed]).map(show).join(" or ")}
      <SetMark />
    </>
  );
}

function compactDue(values: string[]): string {
  const days = values.map((v) => /^Day (\d+) of the following month$/.exec(v)?.[1]);
  return days.every(Boolean) && days.length > 1 ? `Day ${days.join(" or ")} of the following month` : values.join(" or ");
}

function Due({ value, variants }: { value: string; variants?: Variants }) {
  if (!variants) return <>{value}</>;
  if (enteredFreely(variants)) {
    return (
      <>
        A day you choose, of the following month
        <SetMark />
      </>
    );
  }
  return (
    <>
      {compactDue(possibleValues<string>(variants))}
      <SetMark />
    </>
  );
}

function LineFigure({ line, rs }: { line: RuleLine; rs: RuleSet }) {
  const v = line.variable;
  const m = (minor: number) => money(minor, rs.currency, rs.exponent);
  const parts: ReactNode[] = [];

  if (line.kind === "tax_credit") {
    const per = line.name.includes("half-share") ? "for each family half-share above one share" : "a month";
    parts.push(`${m(line.amount_minor ?? 0)} off ${shortTax(rs)} ${per}`);
  } else if (line.amount_minor !== null && line.rate_ppm === null) {
    parts.push(<>{figure(line.amount_minor, v.amount_minor, m, "An amount set by your Tax Settings")} a head, a month</>);
  } else {
    parts.push(
      <>
        {figure(line.rate_ppm ?? 0, v.rate_ppm, percent, "A rate you enter")} of{" "}
        {figure(line.base, v.base, (b: string) => b.toLowerCase(), "a base you choose")}
      </>,
    );
    if (line.base_floor_minor > 0) parts.push(`above ${m(line.base_floor_minor)}`);
    if (line.base_ceiling_minor !== null || v.base_ceiling_minor)
      parts.push(<>up to {figure(line.base_ceiling_minor ?? 0, v.base_ceiling_minor, m, "a ceiling you enter")}</>);
    if (line.amount_floor_minor !== null) parts.push(`at least ${m(line.amount_floor_minor)}`);
    if (line.amount_cap_minor !== null) parts.push(`at most ${m(line.amount_cap_minor)}`);
  }
  if (line.applies_to === "local_staff") parts.push("local staff only");
  if (line.applies_to === "expatriates") parts.push("expatriates only");

  const cap = rs.income_tax.deduction_caps.find((c) => c.group === line.tax_deduction_group);
  const deductible =
    v.tax_deductible ? (
      <>
        Deducted before {shortTax(rs)} if you choose
        <SetMark />
      </>
    ) : line.tax_deductible ? (
      `Deducted before ${shortTax(rs)}${cap?.cap_minor ? `, within the ${m(cap.cap_minor)} a month ${cap.group} cap` : ""}`
    ) : null;

  return (
    <span className="grid gap-1">
      <span>
        {parts.map((p, i) => (
          <span key={i}>
            {i > 0 ? ", " : null}
            {p}
          </span>
        ))}
      </span>
      {deductible ? <span className="text-[12.5px] text-ink-soft">{deductible}</span> : null}
      {v.present ? (
        <span className="text-[12.5px] text-ink-soft">
          Only where your Tax Settings include it
          <SetMark />
        </span>
      ) : null}
    </span>
  );
}

// The app names a tax credit by what it does ("Off PAYE, a month"); a table row reads better by what it is.
const CREDIT_NAMES: Record<string, string> = {
  "PERSONAL-RELIEF": "Personal relief",
  RICF: "Family tax reduction (RICF)",
};

function lineLabel(line: RuleLine): string {
  return line.kind === "tax_credit" ? (CREDIT_NAMES[line.code] ?? line.name) : line.name;
}

function shortTax(rs: RuleSet): string {
  return /\(([^)]+)\)/.exec(rs.income_tax.name)?.[1] ?? rs.income_tax.name;
}

function Bands({
  bands,
  show,
  variable,
  unit,
}: {
  bands: { up_to_minor: number | null; rate_ppm: number }[];
  show: (minor: number) => string;
  variable?: Record<string, Variants>;
  unit: string;
}) {
  const limit = (i: number) => figure(bands[i].up_to_minor ?? 0, variable?.[`band.${i}.up_to_minor`], show, "a limit you enter");
  return (
    <div className={tableWrap}>
      <table className="w-full border-collapse text-[14px]">
        <thead>
          <tr>
            <th className={th}>{unit}</th>
            <th className={cn(th, "text-right")}>Rate</th>
          </tr>
        </thead>
        <tbody className="[&_tr:last-child_td]:border-b-0">
          {bands.map((band, i) => (
            <tr key={i}>
              <td className={cn(td, "font-mono text-[13px]")}>
                {i === 0 ? <>Up to {limit(0)}</> : band.up_to_minor === null ? <>Above {limit(i - 1)}</> : <>{limit(i - 1)} to {limit(i)}</>}
              </td>
              <td className={cn(td, "text-right font-mono text-[13px] tabular-nums")}>{percent(band.rate_ppm)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function RuleSetView({ rs }: { rs: RuleSet }) {
  const m = (minor: number) => money(minor, rs.currency, rs.exponent);
  const sourceNumber = new Map(rs.sources.map((s, i) => [s.id, i + 1]));
  const settingLabel = new Map(rs.settings.map((s) => [s.key, s.label]));
  const lineName = new Map(rs.lines.map((l) => [l.code, l.name]));
  const until = rs.effective_to ? new Date(Date.parse(rs.effective_to) - 86_400_000).toISOString().slice(0, 10) : null;
  const tax = rs.income_tax;

  return (
    <div className="grid gap-6 rounded-card border border-line-strong bg-paper p-[clamp(16px,3vw,28px)]">
      <div className="grid gap-3">
        <div className="flex flex-wrap items-center gap-2.5">
          <span className="font-mono text-[15px] font-medium">{rs.id}</span>
          <Pill tone="good">Payroll active</Pill>
          <span className="text-[13.5px] text-ink-soft">
            {until ? `${longDate(rs.effective_from)} to ${longDate(until)}` : `From ${longDate(rs.effective_from)}`} · paid{" "}
            {rs.frequencies.join(", ")} · amounts in {rs.currency}
          </span>
        </div>
        <p className="text-[13.5px] text-ink-2">
          Approved by {rs.approval.approved_by} on {rs.approval.approved_on ? longDate(rs.approval.approved_on) : "—"}
          {rs.approval.basis === "owner_approved" && !rs.approval.reviewed_by ? ", without a local tax adviser's review." : "."}
        </p>
        {rs.summary.map((p) => (
          <p key={p} className="max-w-[72ch] text-[14.5px] text-ink-2">
            {p}
          </p>
        ))}
      </div>

      <div className="grid gap-3">
        <H4>Income tax</H4>
        <p className="text-[14px] text-ink-2">
          <b className="font-extrabold text-ink">{tax.name}</b>, paid to {tax.authority}.{" "}
          {tax.method === "per_period" ? "Worked out on each month's pay on its own." : "Worked out cumulatively over the tax year."}{" "}
          Due: <Due value={tax.due} variants={tax.variable.due} />. <span className="text-ink-soft">[{sourceNumber.get(tax.source)}]</span>
        </p>
        <Bands bands={tax.bands} show={m} variable={tax.variable} unit="Monthly taxable income" />
      </div>

      <div className="grid gap-3">
        <H4>Contributions, levies and credits</H4>
        <div className={tableWrap}>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] border-collapse text-[13.5px]">
              <thead>
                <tr>
                  <th className={th}>Line</th>
                  <th className={th}>Paid by</th>
                  <th className={th}>Figure</th>
                  <th className={th}>Paid to</th>
                  <th className={th}>Due</th>
                  <th className={cn(th, "text-right")}>Source</th>
                </tr>
              </thead>
              <tbody className="[&_tr:last-child_td]:border-b-0">
                {rs.lines.map((line) => (
                  <tr key={line.code}>
                    <td className={td}>
                      <b className="block font-extrabold">{lineLabel(line)}</b>
                      <span className="font-mono text-[11px] text-ink-soft">{line.code}</span>
                    </td>
                    <td className={cn(td, "whitespace-nowrap")}>{KIND_LABEL[line.kind]}</td>
                    <td className={td}>
                      <LineFigure line={line} rs={rs} />
                    </td>
                    <td className={cn(td, "text-ink-2")}>{line.authority}</td>
                    <td className={cn(td, "text-ink-2")}>
                      <Due value={line.due} variants={line.variable.due} />
                    </td>
                    <td className={cn(td, "text-right font-mono text-[12px] text-ink-soft")}>[{sourceNumber.get(line.source)}]</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <p className="text-[12.5px] text-ink-soft">
          <span className="font-extrabold text-gold-text">†</span> Set by your company under Tax Settings. Where the sources
          give a figure, it is shown; otherwise the company enters its own.
        </p>
      </div>

      <div className="grid gap-3">
        <H4>Figures your company enters under Tax Settings ({rs.settings.length})</H4>
        <ol className="grid gap-3">
          {rs.settings.map((s, i) => (
            <li key={s.key} className="grid gap-2 rounded-card border border-line bg-surface px-4 py-3.5 text-[14px]">
              <b className="font-extrabold">
                <span className="mr-2 font-mono text-[12px] text-gold-text">{i + 1}</span>
                {s.label}
              </b>
              <p className="text-[13.5px] text-ink-2">{s.help}</p>
              {s.options.length ? (
                <ul className="grid gap-1 text-[13.5px]">
                  {s.options.map((o) => (
                    <li key={o.display} className="grid gap-0.5 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] sm:gap-3">
                      <span className="font-bold">{o.display}</span>
                      <span className="text-ink-soft">{o.source}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-[13.5px]">
                  <span className="font-bold">Entered by your company</span>
                  {s.minimum && s.maximum ? `, from ${s.minimum} to ${s.maximum}` : s.minimum ? `, at least ${s.minimum}` : ""}.
                </p>
              )}
              <p className="text-[12.5px] text-ink-soft">
                {s.required_when
                  ? `Only needed when “${settingLabel.get(s.required_when.key)}” is ${s.required_when.value === "yes" ? "Yes" : s.required_when.value}. `
                  : null}
                {s.affects.length
                  ? `Used for: ${s.affects.map((a) => (a === "income tax" ? shortTax(rs) + " bands" : lineName.get(a) ?? a)).join(", ")}.`
                  : null}
              </p>
            </li>
          ))}
        </ol>
      </div>

      <div className="grid gap-3">
        <H4>Sources</H4>
        <ol className="grid gap-2 text-[13px]">
          {rs.sources.map((s, i) => (
            <li key={s.id} className="grid grid-cols-[28px_1fr] gap-2">
              <span className="font-mono text-ink-soft">[{i + 1}]</span>
              <span className="grid gap-1">
                <span>
                  <Pill tone={s.official ? "good" : "warn"} className="mr-2 align-middle">
                    {s.official ? "Official" : "Secondary"}
                  </Pill>
                  {s.title}
                </span>
                {/^https?:\/\//.test(s.reference) ? (
                  <a href={s.reference} rel="noopener nofollow" target="_blank" className="break-all text-ink-soft">
                    {s.reference}
                  </a>
                ) : (
                  <span className="text-ink-soft">{s.reference}</span>
                )}
              </span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

function NigeriaView() {
  const ng = COUNTRY_RULES.nigeria;
  const n = (minor: number) => money(minor, "NGN", 2);
  const rows: [string, string, string, string, string][] = [
    ["Pension", `${percent(ng.pension.employee_rate_ppm)} employee, ${percent(ng.pension.employer_rate_ppm)} employer`, "Pensionable pay (basic + housing + transport)", ng.pension.authority, `${ng.pension.due_working_days_after_payment} working days after payment`],
    ["NHF", percent(ng.nhf.rate_ppm), "Basic salary, employee", ng.nhf.authority, `${ng.nhf.due_days_after_payment} days after payment`],
    ["NSITF", percent(ng.nsitf.rate_ppm), "Pensionable pay, employer cost", ng.nsitf.authority, `${ordinal(ng.nsitf.due_day_of_following_month)} of the following month`],
    ["ITF", percent(ng.itf.rate_ppm), "Annual payroll, employer cost (qualifying employers)", ng.itf.authority, `${ordinal(ng.itf.due_day)} ${monthName(ng.itf.due_month)}`],
    ["WHT", ng.wht.categories.map((c) => `${c.category} ${percent(c.rate_ppm)}`).join(", "), "Contractor and vendor payments, by category", ng.wht.authority, `${ordinal(ng.wht.due_day_of_following_month)} of the following month`],
  ];
  return (
    <div className="grid gap-6 rounded-card border border-line-strong bg-paper p-[clamp(16px,3vw,28px)]">
      <div className="flex flex-wrap items-center gap-2.5">
        <span className="font-mono text-[15px] font-medium">{ng.id}</span>
        <Pill tone="good">Payroll active</Pill>
        <span className="text-[13.5px] text-ink-soft">From {longDate(ng.effective_from)} · Nigeria Tax Act 2025 · amounts in NGN</span>
      </div>
      <div className="grid gap-3">
        <H4>PAYE</H4>
        <p className="text-[14px] text-ink-2">
          Worked out cumulatively over the tax year on annual chargeable income, and paid to the state tax authority where the
          employee lives by the {ordinal(ng.paye.due_day_of_following_month)} of the following month. The first{" "}
          {n(ng.paye.tax_free_threshold_minor)} is tax-free. Rent relief is {percent(ng.paye.rent_relief_rate_ppm)} of the
          annual rent paid, up to {n(ng.paye.rent_relief_cap_minor)}.
        </p>
        <Bands bands={ng.paye.bands} show={n} unit="Annual chargeable income" />
      </div>
      <div className="grid gap-3">
        <H4>Contributions and levies</H4>
        <div className={tableWrap}>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] border-collapse text-[13.5px]">
              <thead>
                <tr>
                  <th className={th}>Scheme</th>
                  <th className={th}>Rate</th>
                  <th className={th}>Base</th>
                  <th className={th}>Paid to</th>
                  <th className={th}>Due</th>
                </tr>
              </thead>
              <tbody className="[&_tr:last-child_td]:border-b-0">
                {rows.map(([name, rate, base, to, due]) => (
                  <tr key={name}>
                    <td className={cn(td, "font-extrabold")}>{name}</td>
                    <td className={cn(td, "font-mono text-[13px]")}>{rate}</td>
                    <td className={cn(td, "text-ink-2")}>{base}</td>
                    <td className={cn(td, "text-ink-2")}>{to}</td>
                    <td className={cn(td, "text-ink-2")}>{due}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <p className="text-[13.5px] text-ink-2">
        Nigeria has no Tax Settings: every figure is built into {ng.id}, and shown in the app under Compliance Engine.
      </p>
    </div>
  );
}

/** A country's payroll tax configuration, exactly as the app holds it. */
export function CountryTaxRules({ country }: { country: string }) {
  if (country === "NG") return <NigeriaView />;
  return (
    <div className="grid gap-6">
      {ruleSetsFor(country).map((rs) => (
        <RuleSetView key={rs.id} rs={rs} />
      ))}
    </div>
  );
}
