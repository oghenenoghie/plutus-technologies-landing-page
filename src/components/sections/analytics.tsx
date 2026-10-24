import { SectionHead, sectionClass } from "@/components/section-head";
import { Chip, Pill } from "@/components/ui/pill";
import { cn } from "@/lib/utils";

// Taken from the Analytics & Insights module in plutus-hr-system and plutus-hr-system-frontend
// (October 2026) and its metric definitions (docs/analytics-metrics.md).
const DASHBOARDS = [
  ["Executive overview", "The headline figures from every section you can see, on one screen."],
  ["Workforce", "Headcount, hires and leavers, turnover rate and length of service, by department, location and type."],
  ["Payroll", "Payroll cost, gross and net pay, deductions by kind, employees paid and overtime paid."],
  ["Attendance", "Attendance and absence against rostered shifts, late arrivals, and scheduled against actual hours."],
  ["Leave", "Requests, approved days, approval rate, outstanding requests, balances and utilisation."],
  ["Recruitment", "Open vacancies, applications received and candidates in the pipeline by stage."],
  ["Performance", "Review completion, rating distribution, average rating by department and training completion."],
  ["Tax and compliance", "PAYE and statutory liabilities, what is overdue, what falls due in 30 days, and input VAT on bills."],
  ["Financial", "Revenue, expenses, payroll's share of expenses, net income, net cash movement and budget against actual."],
  ["Custom reports", "Any dashboard, or the records behind it, as CSV, XLSX or PDF."],
] as const;

const FILTERS = [
  "Period presets",
  "Custom dates",
  "Previous period",
  "Same period last year",
  "Department",
  "Location",
  "Employment type",
  "Status",
  "Payroll status",
  "Country",
];

const PRINCIPLES = [
  ["server / computed", "Computed on the server", "Every figure is aggregated from the source records by the API. The screens only format and draw it."],
  ["payroll / reconciled", "Payroll matches the payroll-cost report", "Locked runs only, and employer cost is gross pay plus employer pension: the same figure the payroll-cost report gives."],
  ["no data / not zero", "No data is not zero", "A period without source records shows no figure, so a comparison never reads as a rise from nothing."],
  ["definition / (i)", "Every figure shows its definition", "The formula behind each figure sits behind an (i), goes into every export, and links to the records it counts."],
  ["access / ten permissions", "Each role sees what it already could", "Ten analytics permissions follow each role's access to the source records. Department managers see only the departments they head."],
  ["privacy / small groups", "Small pay groups stay hidden", "A pay group of one or two people is hidden from anyone who cannot already see individual pay. Every export is audited."],
] as const;

// Sample data only.
const SAMPLE_KPIS = [
  { label: "Payroll cost", value: "₦61.4m", change: "3.2% higher", note: "than the previous period" },
  { label: "Headcount", value: "148", change: "4 more", note: "than the previous period" },
  { label: "Attendance rate", value: "96.4%", change: "0.8 points lower", note: "than the previous period" },
  { label: "Overdue obligations", value: "0", change: "None overdue", note: "3 due in the next 30 days" },
];
const SAMPLE_TREND = [52.1, 53.4, 53.0, 55.2, 56.8, 56.1, 57.9, 58.4, 59.0, 59.6, 60.2, 61.4];
const MONTHS = ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar"];

export function AnalyticsDashboards() {
  return (
    <section aria-labelledby="dashboards-title" className={sectionClass}>
      <div className="wrap grid items-start gap-[clamp(32px,5vw,64px)] lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <div>
          <SectionHead eyebrow="Ten dashboards" id="dashboards-title" title="One view for each part of the business.">
            Filters stay in the address, so a view can be shared and carry across sections. Every chart has a table view and
            works from the keyboard.
          </SectionHead>
          <ol className="grid border-t border-line sm:grid-cols-2">
            {DASHBOARDS.map(([title, body], i) => (
              <li
                key={title}
                className={cn("grid content-start gap-1.5 border-b border-line py-4 pr-5", i % 2 === 1 && "sm:border-l sm:pl-5")}
              >
                <b className="text-[15px] font-extrabold">{title}</b>
                <span className="text-[13.5px] text-ink-2">{body}</span>
              </li>
            ))}
          </ol>
        </div>

        <div className="grid gap-5 lg:sticky lg:top-[100px]">
          <div className="overflow-hidden rounded-card border border-line-strong bg-surface">
            <div className="flex items-center justify-between gap-3 border-b border-line bg-sunk px-5 py-3.5">
              <span className="text-[11px] font-extrabold uppercase tracking-[.14em] text-ink-soft">
                Executive overview · Sample data
              </span>
              <Pill tone="mute">Last 12 months</Pill>
            </div>
            <dl className="grid grid-cols-2">
              {SAMPLE_KPIS.map((k, i) => (
                <div
                  key={k.label}
                  className={cn("grid gap-1 border-b border-line px-5 py-4", i % 2 === 1 && "border-l")}
                >
                  <dt className="text-[10.5px] font-extrabold uppercase tracking-[.1em] text-ink-soft">{k.label}</dt>
                  <dd className="m-0 grid gap-0.5">
                    <span className="font-display text-[30px] font-semibold leading-none tabular-nums">{k.value}</span>
                    <span className="text-xs text-ink-soft">
                      <b className="font-bold text-ink-2">{k.change}</b> {k.note}
                    </span>
                  </dd>
                </div>
              ))}
            </dl>
            <figure className="grid gap-2 px-5 pt-4 pb-5">
              <figcaption className="text-[11px] font-extrabold uppercase tracking-[.1em] text-ink-soft">
                Payroll cost by month, ₦m
              </figcaption>
              <div className="flex h-28 items-end gap-1.5" aria-hidden="true">
                {SAMPLE_TREND.map((v, i) => (
                  <span
                    key={MONTHS[i]}
                    className="flex-1 rounded-t-[3px] border border-gold/60 bg-gold/70"
                    style={{ height: `${(v / Math.max(...SAMPLE_TREND)) * 100}%` }}
                  />
                ))}
              </div>
              <div className="flex gap-1.5 font-mono text-[10px] text-ink-soft" aria-hidden="true">
                {MONTHS.map((m) => (
                  <span key={m} className="flex-1 text-center">
                    {m[0]}
                  </span>
                ))}
              </div>
            </figure>
            <p className="border-t border-line bg-sunk px-5 py-3 text-xs text-ink-soft">
              Each figure links to the records behind it. Drill down, then export to CSV, XLSX or PDF.
            </p>
          </div>
          <div className="grid gap-2.5">
            <b className="text-[11px] font-extrabold uppercase tracking-[.12em] text-ink-soft">Filters</b>
            <ul className="flex flex-wrap gap-2" aria-label="Analytics filters">
              {FILTERS.map((f) => (
                <li key={f}>
                  <Chip>{f}</Chip>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export function AnalyticsPrinciples() {
  return (
    <section aria-labelledby="analytics-trust-title" className={cn(sectionClass, "bg-sunk")}>
      <div className="wrap">
        <SectionHead
          eyebrow="Figures you can audit"
          id="analytics-trust-title"
          title="Numbers that agree with the records they come from."
        />
        <div className="grid border-t border-line sm:grid-cols-2 lg:grid-cols-3">
          {PRINCIPLES.map(([tag, title, body], i) => (
            <article
              key={tag}
              className={[
                "grid content-start gap-2.5 border-b border-line pt-7 pr-6 pb-[30px]",
                i % 2 === 1 ? "sm:max-lg:border-l sm:max-lg:pl-6" : "",
                i % 3 !== 0 ? "lg:border-l lg:pl-6" : "",
              ].join(" ")}
            >
              <span className="font-mono text-[.82em] text-gold-text">{tag}</span>
              <h3 className="text-[17px] font-extrabold leading-[1.35]">{title}</h3>
              <p className="text-[14.5px] text-ink-2">{body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
