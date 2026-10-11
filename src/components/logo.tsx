import { SITE } from "@/lib/site";
import { cn } from "@/lib/utils";

/** Lockup: P mark, 1px gold rule, PLUTUSBIZTECH wordmark over the letterhead strapline. */
export function Logo({ tone = "paper", className }: { tone?: "paper" | "deep"; className?: string }) {
  const deep = tone === "deep";
  return (
    <a
      href="#top"
      aria-label={`${SITE.name}, home`}
      className={cn("flex flex-none items-center gap-2.5 no-underline sm:gap-3", deep ? "text-deep-ink" : "text-ink", className)}
    >
      <svg viewBox="0 0 108 132" className="h-auto w-[26px] sm:w-[30px]" aria-hidden="true">
        <use href="#mark" />
      </svg>
      <span className="h-9 w-px bg-gold" aria-hidden="true" />
      <span className="grid leading-none">
        <b className="whitespace-nowrap font-mark text-[16px] font-semibold tracking-[.04em] sm:text-[19px] sm:tracking-[.05em]">
          PLUTUS<span className={deep ? "text-gold" : "text-gold-text"}>BIZTECH</span>
        </b>
        <small
          className={cn(
            "mt-1.5 text-[7px] font-extrabold uppercase tracking-[.14em] sm:text-[8px] sm:tracking-[.18em]",
            deep ? "text-gold" : "text-gold-text",
          )}
        >
          Enterprise · Business · Solutions
        </small>
      </span>
    </a>
  );
}
