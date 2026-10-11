"use client";

import { useId, useState } from "react";
import { Pill } from "@/components/ui/pill";
import { postSalesInvoice } from "@/lib/compliance/invoice";
import { NG_2026_1 } from "@/lib/compliance/ng-2026-1";
import { formatNaira, pct } from "@/lib/money";
import { cn } from "@/lib/utils";

const WHT_OPTIONS = [0, ...NG_2026_1.wht.illustrativeRates];

function Step({
  n,
  label,
  note,
  value,
  sign,
}: {
  n: string;
  label: React.ReactNode;
  note?: string;
  value: number;
  sign?: "+" | "−";
}) {
  return (
    <div className="grid grid-cols-[28px_1fr_auto] items-baseline gap-2.5 border-b border-line px-5 py-[11px] text-sm">
      <i className="font-mono text-[11px] not-italic text-ink-soft">{n}</i>
      <span>
        {label}
        {note ? <small className="block text-xs leading-snug text-ink-soft">{note}</small> : null}
      </span>
      <b className={cn("whitespace-nowrap font-mono text-sm font-medium tabular-nums", sign && "text-ink-soft")}>
        {sign ? `${sign} ` : ""}
        {formatNaira(value)}
      </b>
    </div>
  );
}

export function InvoiceInstrument() {
  const [net, setNet] = useState(2_400_000);
  const [whtRate, setWhtRate] = useState<number>(NG_2026_1.wht.illustrativeRates[0]);
  const p = postSalesInvoice(net, whtRate);
  const widest = Math.max(...p.journals.flatMap((j) => j.lines.map((l) => l.amount)));
  const sliderId = useId();
  const whtName = useId();
  const balanced = p.debits === p.credits;

  return (
    <div
      aria-label="Live invoice posting"
      className="rise overflow-hidden rounded-card border border-line-strong bg-surface [animation-delay:.2s]"
    >
      <div className="flex items-center justify-between gap-3 border-b border-line bg-sunk px-5 py-3.5">
        <span className="text-[11px] font-extrabold uppercase tracking-[.14em] text-ink-soft">
          An invoice, posted step by step
        </span>
        <Pill tone="gold" className="font-mono">
          Rule set {NG_2026_1.version}
        </Pill>
      </div>

      <div className="grid gap-[18px] p-5">
        <div className="grid gap-2">
          <div className="flex items-baseline justify-between gap-2.5">
            <label htmlFor={sliderId} className="text-xs font-extrabold uppercase tracking-[.08em] text-ink-soft">
              Invoice value, excl. VAT
            </label>
            <output htmlFor={sliderId} className="font-mono text-[15px] font-medium tabular-nums">
              {formatNaira(net)}
            </output>
          </div>
          <input
            id={sliderId}
            type="range"
            min={100_000}
            max={20_000_000}
            step={50_000}
            value={net}
            onChange={(e) => setNet(Number(e.target.value))}
            className="m-0 h-[22px] w-full accent-gold"
          />
        </div>
        <div role="radiogroup" aria-labelledby={`${whtName}-label`} className="flex flex-wrap items-center justify-between gap-2.5">
          <span id={`${whtName}-label`} className="text-xs font-extrabold uppercase tracking-[.08em] text-ink-soft">
            WHT withheld by customer
          </span>
          <div className="flex gap-1.5">
            {WHT_OPTIONS.map((rate) => (
              <label key={rate} className="cursor-pointer">
                <input
                  type="radio"
                  name={whtName}
                  value={rate}
                  checked={whtRate === rate}
                  onChange={() => setWhtRate(rate)}
                  className="peer sr-only"
                />
                <span className="inline-block rounded-chip border border-line-strong px-3 py-1 font-mono text-[13px] text-ink-soft peer-checked:border-gold peer-checked:bg-gold-tint peer-checked:text-gold-text peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-gold">
                  {rate === 0 ? "None" : pct(rate)}
                </span>
              </label>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-line" aria-live="polite">
        <Step n="01" label="Invoice value" note="Services, excluding VAT" value={p.net} />
        <Step n="02" label={`VAT output ${pct(NG_2026_1.vat.rate)}`} note="Charged to the customer, owed to the NRS" value={p.vat} sign="+" />
        <Step n="03" label={<strong>Invoice total</strong>} value={p.total} />
        <Step
          n="04"
          label={`WHT withheld${whtRate ? ` ${pct(whtRate)}` : ""}`}
          note="On the value excluding VAT, held as a tax credit"
          value={p.wht}
          sign="−"
        />
        <Step n="05" label={<strong>Cash received</strong>} value={p.cash} />
      </div>

      <div className="grid gap-3 border-b border-line px-5 py-3" aria-label="Journal entries">
        {p.journals.map((j) => (
          <div key={j.ref} className="grid gap-1.5">
            <span className="text-[10.5px] font-extrabold uppercase tracking-[.12em] text-ink-soft">{j.ref}</span>
            {j.lines.map((l) => (
              <div key={`${l.side}-${l.code}`} className="grid grid-cols-[22px_minmax(0,1fr)_minmax(40px,.7fr)_92px] items-center gap-2.5 text-xs">
                <span className={cn("font-mono", l.side === "Dr" ? "text-gold-text" : "text-ink-soft")}>{l.side}</span>
                <span className={cn("truncate", l.side === "Cr" && "pl-3")}>
                  <span className="font-mono text-ink-soft">{l.code}</span> {l.account}
                </span>
                <span className="h-2 overflow-hidden rounded-[3px] border border-line bg-sunk">
                  <span
                    className={cn(
                      "block h-full transition-[width] duration-[450ms] ease-[cubic-bezier(.2,.7,.2,1)]",
                      l.side === "Dr" ? "bg-gold" : "bg-gold/45",
                    )}
                    style={{ width: `${widest ? (l.amount / widest) * 100 : 0}%` }}
                  />
                </span>
                <span className="text-right font-mono tabular-nums">{formatNaira(l.amount)}</span>
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2">
        <div className="grid gap-0.5 px-5 py-4">
          <small className="text-[11px] font-extrabold uppercase tracking-[.1em] text-ink-soft">Total debits</small>
          <strong className="font-display text-[34px] font-semibold leading-tight tabular-nums">{formatNaira(p.debits)}</strong>
        </div>
        <div className="grid gap-0.5 border-l border-line px-5 py-4">
          <small className="flex items-center justify-between gap-2 text-[11px] font-extrabold uppercase tracking-[.1em] text-ink-soft">
            Total credits
            <Pill tone={balanced ? "good" : "bad"}>{balanced ? "Balanced" : "Unbalanced"}</Pill>
          </small>
          <strong className="font-display text-[34px] font-semibold leading-tight text-gold-text tabular-nums">
            {formatNaira(p.credits)}
          </strong>
        </div>
      </div>

      <p className="border-t border-line bg-sunk px-5 py-3 text-xs text-ink-soft">
        Illustration of one sales invoice on a sample chart of accounts. WHT rates depend on the transaction category. Not
        tax advice.
      </p>
    </div>
  );
}
