import type { ReactNode } from "react";

export function SectionHead({
  eyebrow,
  title,
  id,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  id: string;
  children?: ReactNode;
}) {
  return (
    <div className="mb-[clamp(36px,5vw,56px)] grid max-w-[780px] gap-[18px]">
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="h2" id={id}>
        {title}
      </h2>
      {children ? <p className="lede">{children}</p> : null}
    </div>
  );
}

export const sectionClass = "border-t border-line py-[clamp(72px,10vw,128px)]";
export const deepSectionClass = "deep bg-deep py-[clamp(72px,10vw,128px)] text-deep-ink";
