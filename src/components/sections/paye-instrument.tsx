"use client";

import { useId, useState } from "react";
import { Pill } from "@/components/ui/pill";
import { NG_2026_1 } from "@/lib/compliance/ng-2026-1";
import { deriveIllustrativePaye, formatNaira } from "@/lib/compliance/paye";
import { cn } from "@/lib/utils";

const pct = (rate: number) => `${+(rate * 100).toFixed(2)}%`;

function Slider({
  label,
  value,
  min,
  max,
  step,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
}) {
  const id = useId();
  return (
    <div className="grid gap-2">
      <div className="flex items-baseline justify-between gap-2.5">
        <label htmlFor={id} className="text-xs font-extrabold uppercase tracking-[.08em] text-ink-soft">
          {label}
        </label>
        <output htmlFor={id} className="font-mono text-[15px] font-medium tabular-nums">
          {formatNaira(value)}
        </output>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="m-0 h-[22px] w-full accent-gold"
      />
    </div>
  );
}

function Step({
  n,
  label,
  note,
  value,
  minus,
}: {
  n: string;
  label: React.ReactNode;
  note?: string;
  value: number;
  minus?: boolean;
}) {
  return (
    <div className="grid grid-cols-[28px_1fr_auto] items-baseline gap-2.5 border-b border-line px-5 py-[11px] text-sm">
      <i className="font-mono text-[11px] not-italic text-ink-soft">{n}</i>
      <span>
        {label}
        {note ? <small className="block text-xs leading-snug text-ink-soft">{note}</small> : null}
      </span>
      <b className={cn("whitespace-nowrap font-mono text-sm font-medium tabular-nums", minus && "text-ink-soft")}>
        {minus ? "− " : ""}
        {formatNaira(value)}
      </b>
    </div>
  );
}

export function PayeInstrument() {
  const [gross, setGross] = useState(6_000_000);
  const [rent, setRent] = useState(1_200_000);
  const d = deriveIllustrativePaye(gross, rent);
  const widest = Math.max(...d.slices.map((s) => s.income));
  const { pension, nhf, rentRelief } = NG_2026_1;

  return (
    <div
      aria-label="Live PAYE derivation"
      className="rise overflow-hidden rounded-card border border-line-strong bg-surface [animation-delay:.2s]"
    >
      <div className="flex items-center justify-between gap-3 border-b border-line bg-sunk px-5 py-3.5">
        <span className="text-[11px] font-extrabold uppercase tracking-[.14em] text-ink-soft">PAYE, shown step by step</span>
        <Pill tone="gold" className="font-mono">
          Rule set {NG_2026_1.version}
        </Pill>
      </div>

      <div className="grid gap-[18px] p-5">
        <Slider label="Annual gross pay" value={gross} min={600_000} max={60_000_000} step={100_000} onChange={setGross} />
        <Slider label="Annual rent paid" value={rent} min={0} max={6_000_000} step={50_000} onChange={setRent} />
      </div>

      <div className="border-t border-line" aria-live="polite">
        <Step n="01" label="Annual gross" note="Basic 50% · Housing 30% · Transport 20%" value={d.gross} />
        <Step
          n="02"
          label={`Pension, employee ${pct(pension.employeeRate)}`}
          note="On basic + housing + transport"
          value={d.pension}
          minus
        />
        <Step n="03" label={`National Housing Fund ${pct(nhf.rate)}`} note="On basic salary" value={d.nhf} minus />
        <Step
          n="04"
          label="Rent relief"
          note={`${pct(rentRelief.rate)} of rent, capped at ${formatNaira(rentRelief.cap)}`}
          value={d.rentRelief}
          minus
        />
        <Step n="05" label={<strong>Chargeable income</strong>} value={d.chargeable} />
      </div>

      <div className="grid gap-1.5 border-b border-line px-5 py-3" aria-label="Tax by band">
        {d.slices.map((s, i) => (
          <div key={i} className="grid grid-cols-[44px_1fr_96px] items-center gap-2.5 text-xs">
            <span className="font-mono text-ink-soft">{pct(s.rate)}</span>
            <span className="h-2 overflow-hidden rounded-[3px] border border-line bg-sunk">
              <span
                className="block h-full bg-gold transition-[width] duration-[450ms] ease-[cubic-bezier(.2,.7,.2,1)]"
                style={{ width: `${widest ? (s.income / widest) * 100 : 0}%` }}
              />
            </span>
            <span className="text-right font-mono tabular-nums">{formatNaira(s.tax)}</span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2">
        <div className="grid gap-0.5 px-5 py-4">
          <small className="text-[11px] font-extrabold uppercase tracking-[.1em] text-ink-soft">Annual PAYE</small>
          <strong className="font-display text-[34px] font-semibold leading-tight tabular-nums">{formatNaira(d.annualPaye)}</strong>
        </div>
        <div className="grid gap-0.5 border-l border-line px-5 py-4">
          <small className="text-[11px] font-extrabold uppercase tracking-[.1em] text-ink-soft">Monthly PAYE</small>
          <strong className="font-display text-[34px] font-semibold leading-tight text-gold-text tabular-nums">
            {formatNaira(d.monthlyPaye)}
          </strong>
        </div>
      </div>

      <p className="border-t border-line bg-sunk px-5 py-3 text-xs text-ink-soft">
        Illustration using a 50/30/20 pay split. The engine reads each employee&apos;s real pay components. Not tax advice.
      </p>
    </div>
  );
}
