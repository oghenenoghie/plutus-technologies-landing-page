"use client";

import { useEffect, useState } from "react";
import { Icon } from "@/components/icons";
import { ButtonLink } from "@/components/ui/button";
import { LINKS, NAV } from "@/lib/site";

export function MobileNav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <button
        type="button"
        className="ml-auto inline-grid size-[46px] cursor-pointer place-items-center rounded-btn border border-line-strong bg-transparent text-ink nav:hidden"
        aria-expanded={open}
        aria-controls="mobile-nav"
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((o) => !o)}
      >
        <Icon name={open ? "close" : "menu"} width={20} height={20} />
      </button>
      <div
        id="mobile-nav"
        hidden={!open}
        className="absolute inset-x-0 top-full border-y border-line bg-paper nav:hidden"
        onClick={(e) => {
          if ((e.target as HTMLElement).closest("a")) setOpen(false);
        }}
      >
        <nav aria-label="Mobile" className="wrap grid gap-0.5 pt-3 pb-5">
          {NAV.map((item) => (
            <a key={item.href} href={item.href} className="border-b border-line py-3 font-bold no-underline">
              {item.label}
            </a>
          ))}
          <div className="mt-3 grid gap-2.5 sm:grid-cols-2">
            <ButtonLink variant="line" href={LINKS.download}>
              <Icon name="down" />
              Download
            </ButtonLink>
            <ButtonLink href="#contact">Book a demo</ButtonLink>
          </div>
        </nav>
      </div>
    </>
  );
}
