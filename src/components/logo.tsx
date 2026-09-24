import { cn } from "@/lib/utils";

/** Lockup: P mark, 1px gold rule, PLUTUS wordmark over the letterhead strapline. */
export function Logo({ tone = "paper", className }: { tone?: "paper" | "deep"; className?: string }) {
  const deep = tone === "deep";
  return (
    <a
      href="#top"
      aria-label="Plutus Technologies, home"
      className={cn("flex flex-none items-center gap-3.5 no-underline", deep ? "text-deep-ink" : "text-ink", className)}
    >
      <svg viewBox="0 0 108 132" className="h-auto w-[30px]" aria-hidden="true">
        <use href="#mark" />
      </svg>
      <span className="h-9 w-px bg-gold" aria-hidden="true" />
      <span className="grid leading-none">
        <b className="font-mark text-[23px] font-semibold tracking-[.08em]">PLUTUS</b>
        <small
          className={cn(
            "mt-1.5 text-[8.5px] font-extrabold uppercase tracking-[.22em]",
            deep ? "text-gold" : "text-gold-text",
          )}
        >
          Enterprise · Business · Solutions
        </small>
      </span>
    </a>
  );
}
