import Image from "next/image";
import { PageIntro } from "@/components/page-intro";
import { sectionClass } from "@/components/section-head";
import { ArrowIcon, ButtonLink } from "@/components/ui/button";
import { DOC_GUIDES, guideCover } from "@/lib/docs";
import { pageMetadata } from "@/lib/metadata";
import { LINKS } from "@/lib/site";

export async function generateMetadata() {
  return pageMetadata({
    title: "Documentation",
    description:
      "Step-by-step guides to Plutus, with screenshots: getting started, accounting, inventory, payroll, people and HR, analytics and the Desktop edition.",
    path: "/docs",
  });
}

export default function DocsPage() {
  return (
    <main id="top">
      <PageIntro
        eyebrow="Documentation"
        title="How to use Plutus, screen by screen."
        actions={
          <ButtonLink href="/docs/getting-started">
            Start with the basics <ArrowIcon />
          </ButtonLink>
        }
      >
        Step-by-step guides with a screenshot of every screen they mention. Each step names the menu to open and the
        button to press, and screenshots outline that button in gold.
      </PageIntro>

      <section aria-labelledby="guides-title" className={sectionClass}>
        <div className="wrap">
          <h2 id="guides-title" className="sr-only">
            Guides
          </h2>
          <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {DOC_GUIDES.map((guide) => {
              const cover = guideCover(guide);
              return (
                <li key={guide.slug} className="grid content-start overflow-hidden rounded-card border border-line bg-surface">
                  {cover ? (
                    <a href={`/docs/${guide.slug}`} tabIndex={-1} aria-hidden="true" className="block border-b border-line bg-sunk">
                      <Image
                        src={cover.src}
                        width={cover.width}
                        height={cover.height}
                        alt=""
                        sizes="(min-width: 1024px) 380px, (min-width: 768px) 50vw, 100vw"
                        className="block aspect-[16/10] h-auto w-full object-cover object-left-top"
                      />
                    </a>
                  ) : null}
                  <div className="grid content-start gap-3 p-6">
                    <h3 className="font-display text-[28px] font-semibold leading-[1.05]">
                      <a href={`/docs/${guide.slug}`} className="text-ink no-underline hover:text-gold-text">
                        {guide.title}
                      </a>
                    </h3>
                    <p className="text-[15px] text-ink-2">{guide.summary}</p>
                    <ul className="gold-list" aria-label={`In ${guide.title}`}>
                      {guide.sections.map((s) => (
                        <li key={s.id}>
                          <a href={`/docs/${guide.slug}#${s.id}`} className="text-ink-2 no-underline hover:text-ink">
                            {s.title}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <section aria-labelledby="about-shots-title" className={sectionClass}>
        <div className="wrap grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          <div className="grid content-start gap-4">
            <p className="eyebrow">About these guides</p>
            <h2 id="about-shots-title" className="h2">
              Sample company, real screens.
            </h2>
          </div>
          <ul className="gold-list self-start text-ink-2">
            <li>
              <span>
                The screenshots come from Plutus Cloud, set up for a fictional company, Sample Trading Ltd. Every name and
                figure in them is sample data.
              </span>
            </li>
            <li>
              <span>You only see the menus your role allows. Each guide says which roles can do what it describes.</span>
            </li>
            <li>
              <span>
                Plutus Desktop has the same screens, including Analytics &amp; Insights and Country Compliance since build 42.
              </span>
            </li>
            <li>
              <span>
                Can&apos;t find what you need? <a href={LINKS.contact}>Contact us</a> and we&apos;ll walk you through it.
              </span>
            </li>
          </ul>
        </div>
      </section>
    </main>
  );
}
