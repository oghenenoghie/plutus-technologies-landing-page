import type { ReactNode } from "react";
import { Pill } from "@/components/ui/pill";

/** The top of every page except home: eyebrow, the page's only h1, and a lede. */
export function PageIntro({
  eyebrow,
  title,
  isNew,
  children,
  actions,
}: {
  eyebrow: string;
  title: ReactNode;
  isNew?: boolean;
  children?: ReactNode;
  actions?: ReactNode;
}) {
  return (
    <section className="py-[clamp(48px,7vw,88px)]">
      <div className="wrap grid max-w-[1200px] gap-[22px]">
        <div className="flex flex-wrap items-center gap-3">
          <p className="eyebrow">{eyebrow}</p>
          {isNew ? <Pill tone="gold">New</Pill> : null}
        </div>
        <h1 className="max-w-[18ch] font-display text-[clamp(42px,5.6vw,72px)] font-semibold leading-[1] tracking-[-.015em]">
          {title}
        </h1>
        {children ? <p className="lede max-w-[62ch]">{children}</p> : null}
        {actions ? <div className="flex flex-wrap gap-3 pt-1">{actions}</div> : null}
      </div>
    </section>
  );
}
