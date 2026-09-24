import { CONTACT } from "@/lib/site";

export function UtilityBar() {
  return (
    <div role="complementary" aria-label="Contact" className="border-b border-deep-line bg-deep text-[12.5px] text-deep-soft">
      <div className="wrap flex min-h-[38px] flex-wrap items-center justify-between gap-x-6 gap-y-2.5 py-1.5">
        <span>
          <span className="mr-2 inline-block size-[5px] rounded-full bg-gold align-middle" />
          Built on the <b className="font-bold text-deep-ink">Nigeria Tax Act 2025</b>, effective 1 January 2026
        </span>
        <div className="hidden flex-wrap items-center gap-x-5 gap-y-1.5 md:flex">
          <span>{CONTACT.email}</span>
          <span className="tabular-nums">{CONTACT.phones[0].display}</span>
          <span>Lagos · Hemel Hempstead</span>
        </div>
      </div>
    </div>
  );
}

