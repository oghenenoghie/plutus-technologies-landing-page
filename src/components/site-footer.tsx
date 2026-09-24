import { Logo } from "@/components/logo";

const LINKS = [
  ["#product", "Product"],
  ["#compliance", "Compliance"],
  ["#editions", "Cloud & Desktop"],
  ["#security", "Security"],
  ["#pricing", "Pricing"],
  ["#contact", "Contact"],
] as const;

export function SiteFooter() {
  return (
    <footer className="border-t border-deep-line bg-deep pt-10 pb-8 text-[13.5px] text-deep-soft">
      <div className="wrap grid gap-7">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <Logo tone="deep" />
          <nav aria-label="Footer" className="flex flex-wrap gap-x-[22px] gap-y-1.5">
            {LINKS.map(([href, label]) => (
              <a key={href} href={href} className="font-semibold text-deep-soft no-underline hover:text-deep-ink">
                {label}
              </a>
            ))}
          </nav>
        </div>
        <div className="flex flex-wrap justify-between gap-x-6 gap-y-3 border-t border-deep-line pt-[22px] text-[12.5px]">
          <span>© {new Date().getFullYear()} Plutus Technologies. Lagos · Hemel Hempstead.</span>
          <span>Plutus applies statutory rules; it does not provide tax or legal advice.</span>
        </div>
      </div>
    </footer>
  );
}
