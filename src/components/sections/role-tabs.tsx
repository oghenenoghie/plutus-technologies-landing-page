"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { Chip, Pill } from "@/components/ui/pill";
import { cn } from "@/lib/utils";

type Tone = "good" | "warn" | "bad" | "mute";

type Role = {
  id: string;
  name: string;
  mfa: boolean;
  blurb: string;
  path: string;
  title: string;
  sub: string;
  kv: [string, string][];
  rows: [string, string, Tone, string][];
  perms: string[];
};

// Sample data only. Figures on the Employee payslip follow the hero default (₦6m gross, ₦1.2m rent).
const ROLES: Role[] = [
  {
    id: "admin",
    name: "Admin",
    mfa: true,
    blurb: "Company setup, every payroll run, integrations and security.",
    path: "app.plutusng.com/overview",
    title: "Overview",
    sub: "Workforce, payroll and compliance at a glance",
    kv: [
      ["Employees", "148"],
      ["March gross", "₦61.4m"],
      ["Filings due", "3"],
    ],
    rows: [
      ["PAYE · Lagos IRS", "10 Apr", "good", "Filed"],
      ["Pension · PFA schedules", "Due", "warn", "Pending"],
      ["NSITF · 1% of payroll", "15 Apr", "warn", "Due"],
    ],
    perms: ["Company setup", "All payroll runs", "All employees", "Reports", "Integrations & security"],
  },
  {
    id: "payroll",
    name: "Payroll Manager",
    mfa: true,
    blurb: "Create and process runs, compliance and statutory reports.",
    path: "app.plutusng.com/payroll",
    title: "Payroll Runs",
    sub: "Multi-frequency runs with full audit trail",
    kv: [
      ["Run", "Mar 2026"],
      ["Employees", "148"],
      ["Net pay", "₦47.9m"],
    ],
    rows: [
      ["March 2026 · Monthly", "148", "good", "Approved"],
      ["Q1 bonus · Off-cycle", "22", "warn", "Review"],
      ["February 2026 · Monthly", "146", "good", "Paid"],
    ],
    perms: ["Payroll runs", "Compliance", "Reports", "Loans & expenses", "Final settlement", "PAYE calculator"],
  },
  {
    id: "hr",
    name: "HR Manager",
    mfa: false,
    blurb: "Onboarding, leave, attendance and benefits.",
    path: "app.plutusng.com/employees",
    title: "Employees",
    sub: "Directory, TIN status and self-service",
    kv: [
      ["Active", "148"],
      ["TIN missing", "2"],
      ["On leave", "6"],
    ],
    rows: [
      ["Adaeze Okafor · Lagos", "TIN", "bad", "Missing"],
      ["Ibrahim Musa · FCT", "TIN", "good", "Valid"],
      ["Chioma Eze · Rivers", "Leave", "warn", "Awaiting"],
    ],
    perms: ["Employees & onboarding", "Leave & attendance", "Benefits", "Manager view"],
  },
  {
    id: "employee",
    name: "Employee",
    mfa: false,
    blurb: "Payslips, leave balance, claims and TIN status.",
    path: "app.plutusng.com/me",
    title: "My payslip · March",
    sub: "Self-service",
    kv: [
      ["Gross", "₦500,000"],
      ["Deductions", "₦106,825"],
      ["Net", "₦393,175"],
    ],
    rows: [
      ["PAYE", "Monthly", "mute", "₦60,575"],
      ["Pension 8%", "PFA", "mute", "₦40,000"],
      ["NHF 2.5%", "FMBN", "mute", "₦6,250"],
    ],
    perms: ["Payslips", "Leave requests", "Expense claims", "Loans", "Benefits"],
  },
];

export function RoleTabs() {
  const [active, setActive] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const role = ROLES[active];

  function onKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    const delta = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }[e.key];
    let next: number | undefined;
    if (delta) next = (active + delta + ROLES.length) % ROLES.length;
    if (e.key === "Home") next = 0;
    if (e.key === "End") next = ROLES.length - 1;
    if (next === undefined) return;
    e.preventDefault();
    setActive(next);
    tabRefs.current[next]?.focus();
  }

  return (
    <div className="grid items-start gap-[clamp(24px,4vw,56px)] lg:grid-cols-[minmax(0,.9fr)_minmax(0,1.1fr)]">
      <div role="tablist" aria-label="Roles" aria-orientation="vertical" className="grid border-t border-line" onKeyDown={onKeyDown}>
        {ROLES.map((r, i) => {
          const selected = i === active;
          return (
            <button
              key={r.id}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              type="button"
              role="tab"
              id={`tab-${r.id}`}
              aria-selected={selected}
              aria-controls="role-panel"
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(i)}
              className="relative grid cursor-pointer grid-cols-[1fr_auto] gap-x-3 gap-y-1 border-b border-line bg-transparent px-1 py-[18px] text-left before:absolute before:top-[18px] before:bottom-[18px] before:-left-3 before:w-0.5 before:origin-center before:bg-gold before:transition-transform before:duration-200 aria-selected:before:scale-y-100 aria-[selected=false]:before:scale-y-0 lg:before:-left-4"
            >
              <strong className={cn("font-display text-[26px] font-semibold leading-[1.1]", selected && "text-gold-text")}>
                {r.name}
              </strong>
              {r.mfa ? (
                <Pill tone="gold" className="self-center">
                  MFA required
                </Pill>
              ) : (
                <span />
              )}
              <small className="col-span-full text-sm text-ink-soft">{r.blurb}</small>
            </button>
          );
        })}
      </div>

      <div
        role="tabpanel"
        id="role-panel"
        aria-labelledby={`tab-${role.id}`}
        className="overflow-hidden rounded-card border border-line-strong bg-surface"
      >
        <div className="flex items-center gap-3 border-b border-line bg-sunk px-4 py-3" aria-hidden="true">
          <span className="flex gap-[5px]">
            {[0, 1, 2].map((d) => (
              <i key={d} className="size-[9px] rounded-full border border-line-strong" />
            ))}
          </span>
          <span className="flex-1 truncate rounded-chip border border-line bg-surface px-2.5 py-1 font-mono text-[11.5px] text-ink-soft">
            {role.path}
          </span>
        </div>
        <div className="grid gap-4 p-5">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h4 className="text-lg font-extrabold">{role.title}</h4>
              <p className="text-[13px] text-ink-soft">{role.sub}</p>
            </div>
            <span className="text-[11.5px] text-ink-soft">Sample data</span>
          </div>
          <dl className="grid rounded-btn border border-line sm:grid-cols-3">
            {role.kv.map(([k, v], i) => (
              <div key={k} className={cn("grid gap-0.5 px-3.5 py-3", i > 0 && "border-line max-sm:border-t sm:border-l")}>
                <dt className="text-[10.5px] font-extrabold uppercase tracking-[.1em] text-ink-soft">{k}</dt>
                <dd className="m-0 font-mono text-[15px] font-medium tabular-nums">{v}</dd>
              </div>
            ))}
          </dl>
          <ul className="overflow-hidden rounded-btn border border-line">
            {role.rows.map(([label, meta, tone, status]) => (
              <li
                key={label}
                className="grid grid-cols-[1fr_auto_auto] items-center gap-3 border-b border-line px-3.5 py-2.5 text-[13.5px] last:border-b-0"
              >
                <span>{label}</span>
                <span className="font-mono text-[.82em] text-ink-soft">{meta}</span>
                <Pill tone={tone} className="tabular-nums">
                  {status}
                </Pill>
              </li>
            ))}
          </ul>
          <ul className="flex flex-wrap gap-1.5" aria-label="Permissions">
            {role.perms.map((p) => (
              <li key={p}>
                <Chip>{p}</Chip>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
