import { SectionHead, sectionClass } from "@/components/section-head";
import { cn } from "@/lib/utils";

// From desktop_plutus_hr-frontend, shipped in desktop-v0.1.0-build.36 (October 2026).
const DETAILS = [
  ["updates / in place", "Updates install over the top", "A new version installs over the one you have. The installer closes the app's own database and server first, and leaves any other PostgreSQL alone."],
  ["startup / visible", "You can see it start", "A window opens straight away and shows each startup step. If the app can't start, it says why and offers to try again."],
  ["install / lighter", "A much smaller install", "The installer no longer carries a second, unused copy of the web toolkit, so it unpacks and scans far faster."],
  ["data / local", "Your data stays on your machine", "The database and server run on your own computer, so the books and payroll keep working without a connection."],
] as const;

export function DesktopDetails() {
  return (
    <section aria-labelledby="desktop-details-title" className={sectionClass}>
      <div className="wrap">
        <SectionHead eyebrow="Plutus Desktop" id="desktop-details-title" title="Easier to install, update and start." />
        <div className="grid border-t border-line sm:grid-cols-2 lg:grid-cols-4">
          {DETAILS.map(([tag, title, body], i) => (
            <article
              key={tag}
              className={cn(
                "grid content-start gap-2.5 border-b border-line pt-7 pr-6 pb-[30px]",
                i % 2 === 1 && "sm:border-l sm:pl-6",
                i === 2 && "lg:border-l lg:pl-6",
              )}
            >
              <span className="font-mono text-[.82em] text-gold-text">{tag}</span>
              <h3 className="text-[17px] font-extrabold leading-[1.35]">{title}</h3>
              <p className="text-[14.5px] text-ink-2">{body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
