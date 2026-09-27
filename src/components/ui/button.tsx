import { cva, type VariantProps } from "class-variance-authority";
import type { AnchorHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export const buttonVariants = cva(
  "group inline-flex min-h-[46px] items-center justify-center gap-2.5 whitespace-nowrap rounded-btn border px-[22px] text-[14.5px] font-extrabold tracking-[.01em] no-underline transition-colors [&_svg]:size-4 [&_svg]:flex-none",
  {
    variants: {
      variant: {
        gold: "border-gold bg-gold text-on-gold hover:border-ink hover:bg-ink hover:text-paper",
        line: "border-line-strong bg-transparent text-ink hover:border-ink",
        "line-deep": "border-deep-line bg-transparent text-deep-ink hover:border-gold",
      },
    },
    defaultVariants: { variant: "gold" },
  },
);

type ButtonLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> &
  VariantProps<typeof buttonVariants> & { disabled?: boolean };

export function ButtonLink({ className, variant, disabled, href, ...props }: ButtonLinkProps) {
  if (disabled) {
    // No href: a disabled link is not focusable or followable.
    return (
      <a
        aria-disabled="true"
        className={cn(buttonVariants({ variant }), "pointer-events-none cursor-not-allowed opacity-50", className)}
        {...props}
      />
    );
  }
  return <a href={href} className={cn(buttonVariants({ variant }), className)} {...props} />;
}

/** Arrow that nudges right on hover of the parent button. */
export function ArrowIcon() {
  return (
    <svg aria-hidden="true" className="transition-transform group-hover:translate-x-[3px]">
      <use href="#i-arrow" />
    </svg>
  );
}
