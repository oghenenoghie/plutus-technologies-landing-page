import { cva, type VariantProps } from "class-variance-authority";
import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export const pillVariants = cva(
  "inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-[9px] py-1 text-[11px] font-extrabold uppercase tracking-[.06em]",
  {
    variants: {
      tone: {
        good: "bg-good-tint text-good",
        warn: "bg-warn-tint text-warn",
        bad: "bg-bad-tint text-bad",
        gold: "bg-gold-tint text-gold-text",
        mute: "border border-line bg-sunk text-ink-soft",
      },
    },
    defaultVariants: { tone: "mute" },
  },
);

export function Pill({
  className,
  tone,
  ...props
}: HTMLAttributes<HTMLSpanElement> & VariantProps<typeof pillVariants>) {
  return <span className={cn(pillVariants({ tone }), className)} {...props} />;
}

export function Chip({ className, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn("rounded-chip border border-line-strong bg-surface px-[11px] py-1.5 text-[13px] font-semibold", className)}
      {...props}
    />
  );
}
