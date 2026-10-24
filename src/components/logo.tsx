import { SITE } from "@/lib/site";
import { cn } from "@/lib/utils";

/** Lockup: P mark, 1px gold rule, PLUTUS wordmark over a gold TECHNOLOGIES line. */
export function Logo({ tone = "paper", className }: { tone?: "paper" | "deep"; className?: string }) {
  const deep = tone === "deep";
  return (
    <a
      href="/"
      aria-label={`${SITE.name}, home`}
      className={cn("flex flex-none items-center gap-3 no-underline", deep ? "text-deep-ink" : "text-ink", className)}
    >
      <svg viewBox="0 0 108 132" className="h-auto w-[28px] sm:w-[30px]" aria-hidden="true">
        <use href="#mark" />
      </svg>
      <span className="h-9 w-px bg-gold" aria-hidden="true" />
      <span className="grid justify-items-start leading-none">
        <b className="font-mark text-[21px] font-semibold tracking-[.08em] sm:text-[23px]">PLUTUS</b>
        <small
          className={cn(
            "mt-1 font-mark text-[9.5px] font-semibold uppercase tracking-[.27em] sm:text-[10.5px]",
            deep ? "text-gold" : "text-gold-text",
          )}
        >
          Technologies
        </small>
      </span>
    </a>
  );
}
