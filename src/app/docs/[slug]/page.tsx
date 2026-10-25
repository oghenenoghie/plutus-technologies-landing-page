import { notFound } from "next/navigation";
import { DocSectionView } from "@/components/docs/doc-section";
import { DocsNav } from "@/components/docs/docs-nav";
import { ArrowIcon } from "@/components/ui/button";
import { DOC_GUIDES, getGuide } from "@/lib/docs";
import { pageMetadata } from "@/lib/metadata";

export const dynamicParams = false;

export function generateStaticParams() {
  return DOC_GUIDES.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const guide = getGuide((await params).slug);
  if (!guide) return {};
  return pageMetadata({ title: `${guide.title} guide`, description: guide.description, path: `/docs/${guide.slug}` });
}

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const guide = getGuide((await params).slug);
  if (!guide) notFound();
  const index = DOC_GUIDES.indexOf(guide);
  const prev = DOC_GUIDES[index - 1];
  const next = DOC_GUIDES[index + 1];

  return (
    <main id="top">
      <section className="border-b border-line py-[clamp(40px,6vw,72px)]">
        <div className="wrap grid gap-4">
          <p className="eyebrow">
            <a href="/docs" className="text-gold-text no-underline hover:underline">
              Documentation
            </a>
          </p>
          <h1 className="font-display text-[clamp(40px,5vw,64px)] font-semibold leading-[1] tracking-[-.015em]">
            {guide.title}
          </h1>
          <p className="lede">{guide.summary}</p>
        </div>
      </section>

      <div className="wrap grid gap-10 py-[clamp(36px,5vw,64px)] lg:grid-cols-[230px_minmax(0,1fr)] lg:gap-14">
        <aside className="hidden lg:block">
          <div className="sticky top-[100px] max-h-[calc(100vh-120px)] overflow-y-auto pb-6">
            <DocsNav current={guide.slug} id="docs-nav-title" />
          </div>
        </aside>

        <div className="min-w-0">
          <details className="mb-8 rounded-card border border-line bg-surface lg:hidden">
            <summary className="cursor-pointer px-5 py-3.5 text-[14px] font-extrabold">In this guide, and all guides</summary>
            <div className="border-t border-line px-3 py-4">
              <DocsNav current={guide.slug} id="docs-nav-mobile-title" />
            </div>
          </details>

          {guide.sections.map((s, i) => (
            <DocSectionView key={s.id} section={s} first={i === 0} />
          ))}

          <nav aria-label="More guides" className="mt-4 grid gap-3 border-t border-line pt-8 sm:grid-cols-2">
            {prev ? (
              <a
                href={`/docs/${prev.slug}`}
                className="grid gap-1 rounded-card border border-line bg-surface px-5 py-4 text-ink no-underline hover:border-gold"
              >
                <span className="text-[11px] font-extrabold uppercase tracking-[.12em] text-ink-soft">Previous</span>
                <span className="font-display text-[22px] font-semibold">{prev.title}</span>
              </a>
            ) : (
              <span />
            )}
            {next ? (
              <a
                href={`/docs/${next.slug}`}
                className="group grid justify-items-end gap-1 rounded-card border border-line bg-surface px-5 py-4 text-right text-ink no-underline hover:border-gold"
              >
                <span className="text-[11px] font-extrabold uppercase tracking-[.12em] text-ink-soft">Next</span>
                <span className="inline-flex items-center gap-2 font-display text-[22px] font-semibold [&_svg]:size-4">
                  {next.title} <ArrowIcon />
                </span>
              </a>
            ) : null}
          </nav>
        </div>
      </div>
    </main>
  );
}
