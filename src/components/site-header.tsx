import { Icon } from "@/components/icons";
import { Logo } from "@/components/logo";
import { MobileNav } from "@/components/mobile-nav";
import { ButtonLink } from "@/components/ui/button";
import { LINKS, NAV } from "@/lib/site";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper">
      <div className="wrap flex min-h-[76px] items-center gap-7">
        <Logo />
        <nav aria-label="Primary" className="ml-auto hidden gap-1 nav:flex">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="relative whitespace-nowrap rounded-lg px-3 py-2 text-[14.5px] font-bold text-ink-2 no-underline after:absolute after:inset-x-3 after:bottom-[3px] after:h-[1.5px] after:origin-left after:scale-x-0 after:bg-gold after:transition-transform after:duration-200 hover:text-ink hover:after:scale-x-100"
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="hidden gap-2.5 nav:flex">
          <ButtonLink variant="line" href={LINKS.download}>
            <Icon name="down" />
            Download
          </ButtonLink>
          <ButtonLink href="#contact">Book a demo</ButtonLink>
        </div>
        <MobileNav />
      </div>
    </header>
  );
}
