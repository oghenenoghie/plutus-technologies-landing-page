"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { Chip, Pill } from "@/components/ui/pill";
import { cn } from "@/lib/utils";

type Tone = "good" | "warn" | "bad" | "mute";

type Role = {
  id: string;
  name: string;
  tag?: string;
  blurb: string;
  path: string;
  title: string;
  sub: string;
  kv: [string, string][];
  rows: [string, string, Tone, string][];
  perms: string[];
};

// Sample data only. Role names are the app's own. INV-0412 follows the hero default (₦2.4m + 7.5% VAT);
// the VAT return matches the tax engine panel.
const ROLES: Role[] = [
  {
    id: "admin",
    name: "Super Admin",
    tag: "Full access",
    blurb: "Company setup, permissions, approval workflows and every ledger.",
    path: "app.plutusng.com/overview",
    title: "Overview",
    sub: "Cash, receivables, stock and tax due at a glance",
    kv: [
      ["Cash at bank", "₦38.2m"],
      ["Stock value", "₦18.7m"],
      ["Returns due", "3"],
    ],
    rows: [
      ["VAT return · March", "21 Apr", "warn", "Due"],
      ["WHT remittance · March", "21 Apr", "warn", "Due"],
      ["PAYE · Lagos IRS", "10 Apr", "good", "Filed"],
    ],
    perms: ["Setup & onboarding", "Permissions", "Approval workflows", "Integrations", "Security", "Subscription"],
  },
  {
    id: "accountant",
    name: "Accountant",
    blurb: "Journals, bills, invoices, inventory, reconciliation and returns.",
    path: "app.plutusng.com/general-ledger",
    title: "Month-end close · March 2026",
    sub: "Reconcile, review and lock the period",
    kv: [
      ["Journals", "1,286"],
      ["Unreconciled", "4"],
      ["Trial balance", "Balanced"],
    ],
    rows: [
      ["Bank rec · Operating account", "4 lines", "warn", "Open"],
      ["Inventory vs GL", "₦0 diff.", "good", "Reconciled"],
      ["VAT return · March", "₦690,000", "good", "Ready"],
    ],
    perms: ["General ledger", "Vendors & customers", "Bank reconciliation", "Inventory", "Fixed assets", "Financial reports"],
  },
  {
    id: "department",
    name: "Department Manager",
    blurb: "Stock requests for their department, plus leave and attendance for their team.",
    path: "app.plutusng.com/inventory/issues",
    title: "Stock issues · Production",
    sub: "Requests for this department",
    kv: [
      ["Open requests", "3"],
      ["Awaiting approval", "1"],
      ["Issued in March", "₦1.2m"],
    ],
    rows: [
      ["SI-0142 · Packaging film", "40 rolls", "good", "Posted"],
      ["SI-0145 · Safety gloves", "120 pairs", "warn", "Approval"],
      ["SI-0146 · Machine oil", "Lot L-2291", "mute", "Draft"],
    ],
    perms: ["Stock issue requests", "My team", "Leave", "Attendance", "Tasks"],
  },
  {
    id: "auditor",
    name: "Auditor",
    tag: "Read-only",
    blurb: "Read-only books, stock and payroll, with every entry traced to its source.",
    path: "app.plutusng.com/audit-log",
    title: "Audit trail · FY2025",
    sub: "Read-only",
    kv: [
      ["Entries", "14,902"],
      ["Reversals", "41"],
      ["Periods locked", "12 of 12"],
    ],
    rows: [
      ["December 2025 · Lock date", "Set", "good", "Closed"],
      ["JE-1186 · Accrual reversal", "Linked", "mute", "Reversal"],
      ["Stocktake ST-007 · Variance", "Approved", "good", "Posted"],
    ],
    perms: ["Read-only ledgers", "Financial reports", "Inventory reports", "Payroll reports", "Audit trail"],
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
              {r.tag ? (
                <Pill tone={r.tag === "Read-only" ? "mute" : "gold"} className="self-center">
                  {r.tag}
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
