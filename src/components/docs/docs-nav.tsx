import { cn } from "@/lib/utils";
import { DOC_GUIDES } from "@/lib/docs";

/** Every guide, with the current guide's sections listed under it. */
export function DocsNav({ current, id }: { current?: string; id: string }) {
  return (
    <nav aria-labelledby={id} className="grid gap-1 text-[14px]">
      <p id={id} className="mb-2 text-[11px] font-extrabold uppercase tracking-[.14em] text-ink-soft">
        Guides
      </p>
      <a
        href="/docs"
        aria-current={current ? undefined : "page"}
        className={cn(
          "rounded-lg border-l-2 px-3 py-2 font-bold no-underline hover:bg-sunk",
          current ? "border-transparent text-ink-2" : "border-gold bg-sunk text-ink",
        )}
      >
        All guides
      </a>
      {DOC_GUIDES.map((guide) => {
        const active = guide.slug === current;
        return (
          <div key={guide.slug} className="grid gap-0.5">
            <a
              href={`/docs/${guide.slug}`}
              aria-current={active ? "page" : undefined}
              className={cn(
                "rounded-lg border-l-2 px-3 py-2 font-bold no-underline hover:bg-sunk",
                active ? "border-gold bg-sunk text-ink" : "border-transparent text-ink-2",
              )}
            >
              {guide.title}
            </a>
            {active ? (
              <ul className="mb-2 grid gap-0.5 border-l border-line pl-3 ml-3">
                {guide.sections.map((s) => (
                  <li key={s.id}>
                    <a
                      href={`#${s.id}`}
                      className="block rounded-md px-2 py-1 text-[13.5px] text-ink-soft no-underline hover:text-ink"
                    >
                      {s.title}
                    </a>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        );
      })}
    </nav>
  );
}
