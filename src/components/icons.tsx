import type { SVGProps } from "react";

export type IconName =
  | "arrow"
  | "down"
  | "check"
  | "cloud"
  | "desk"
  | "bank"
  | "book"
  | "api"
  | "mail"
  | "phone"
  | "globe"
  | "menu"
  | "close";

/** Rendered once in the root layout. The P mark is drawn from the letterhead, not cropped from it. */
export function IconSprite() {
  return (
    <svg width="0" height="0" className="absolute" aria-hidden="true">
      <defs>
        <symbol id="mark" viewBox="0 0 108 132">
          <path
            d="M9 132V9H66A31.5 31.5 0 0 1 66 72H55"
            fill="none"
            stroke="currentColor"
            strokeWidth="17"
            strokeLinejoin="miter"
          />
          <path d="M31 132V30H71A10 10 0 0 1 71 50H48V132Z" fill="#DEA12F" />
        </symbol>
        <symbol id="i-arrow" viewBox="0 0 16 16">
          <path d="M2 8h11M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </symbol>
        <symbol id="i-down" viewBox="0 0 16 16">
          <path d="M8 2v9M4 7l4 4 4-4M2.5 14h11" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </symbol>
        <symbol id="i-check" viewBox="0 0 16 16">
          <path d="M3 8.5l3.2 3L13 4.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </symbol>
        <symbol id="i-cloud" viewBox="0 0 24 24">
          <path d="M7 18h10.5a4 4 0 0 0 .6-7.95A6 6 0 0 0 6.4 9.2 4.4 4.4 0 0 0 7 18z" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
        </symbol>
        <symbol id="i-desk" viewBox="0 0 24 24">
          <rect x="3" y="4" width="18" height="12" rx="1.5" fill="none" stroke="currentColor" strokeWidth="1.6" />
          <path d="M9 20h6M12 16v4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </symbol>
        <symbol id="i-bank" viewBox="0 0 24 24">
          <path d="M3 9l9-5 9 5M5 10v7M9.5 10v7M14.5 10v7M19 10v7M3 20h18" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </symbol>
        <symbol id="i-book" viewBox="0 0 24 24">
          <path d="M4 5h6a2 2 0 0 1 2 2v12a2 2 0 0 0-2-2H4zM20 5h-6a2 2 0 0 0-2 2v12a2 2 0 0 1 2-2h6z" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
        </symbol>
        <symbol id="i-api" viewBox="0 0 24 24">
          <path d="M8 7l-5 5 5 5M16 7l5 5-5 5M13.5 5l-3 14" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </symbol>
        <symbol id="i-mail" viewBox="0 0 24 24">
          <rect x="3" y="5" width="18" height="14" rx="1.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
          <path d="M3.5 6l8.5 7 8.5-7" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
        </symbol>
        <symbol id="i-phone" viewBox="0 0 24 24">
          <path d="M6.6 3.5h2.8l1.4 4.2-2 1.4a11 11 0 0 0 6.1 6.1l1.4-2 4.2 1.4v2.8a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 4.6 5.7a2 2 0 0 1 2-2.2z" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
        </symbol>
        <symbol id="i-globe" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="1.8" />
          <path d="M3 12h18M12 3c2.6 2.6 3.8 5.6 3.8 9s-1.2 6.4-3.8 9c-2.6-2.6-3.8-5.6-3.8-9S9.4 5.6 12 3z" fill="none" stroke="currentColor" strokeWidth="1.6" />
        </symbol>
        <symbol id="i-menu" viewBox="0 0 20 20">
          <path d="M3 6h14M3 10h14M3 14h14" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
        </symbol>
        <symbol id="i-close" viewBox="0 0 20 20">
          <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
        </symbol>
      </defs>
    </svg>
  );
}

export function Icon({ name, ...props }: { name: IconName } & SVGProps<SVGSVGElement>) {
  return (
    <svg aria-hidden="true" {...props}>
      <use href={`#i-${name}`} />
    </svg>
  );
}
