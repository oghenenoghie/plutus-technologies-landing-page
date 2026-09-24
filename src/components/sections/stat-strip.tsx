const STATS = [
  ["7", "statutory schemes calculated and tracked"],
  ["37", "PAYE jurisdictions: 36 states and the FCT"],
  ["27", "HR and payroll modules in the platform scope"],
  ["2", "editions: Plutus Cloud and Plutus Desktop"],
] as const;

export function StatStrip() {
  return (
    <div className="border-y border-line bg-surface">
      <dl className="wrap grid grid-cols-2 md:grid-cols-4">
        {STATS.map(([n, label], i) => (
          <div
            key={n}
            className={[
              "grid gap-1 border-line py-[26px]",
              i % 2 === 1 ? "border-l pl-[22px]" : "pr-[22px]",
              i >= 2 ? "border-t md:border-t-0" : "",
              i === 2 ? "md:border-l md:pl-[22px]" : "",
            ].join(" ")}
          >
            <dt className="order-2 text-[13.5px] text-ink-soft">{label}</dt>
            <dd className="order-1 m-0 font-display text-[44px] font-semibold leading-none tabular-nums">{n}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
