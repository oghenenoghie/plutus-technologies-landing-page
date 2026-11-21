"use client";

import { useMemo, useState } from "react";
import type { DocGuide } from "@/lib/docs";

type SearchResult = {
  key: string;
  title: string;
  guideTitle: string;
  href: string;
  description: string;
};

function normalise(value: string) {
  return value.toLocaleLowerCase().normalize("NFKD").replace(/[\u0300-\u036f]/g, "").trim();
}

export function DocsSearch({ guides }: { guides: DocGuide[] }) {
  const [query, setQuery] = useState("");
  const results = useMemo(() => {
    const term = normalise(query);
    if (!term) return [];

    const matches: SearchResult[] = [];
    for (const guide of guides) {
      const guideText = normalise(`${guide.title} ${guide.summary} ${guide.description}`);
      if (guideText.includes(term)) {
        matches.push({
          key: `${guide.slug}-overview`,
          title: guide.title,
          guideTitle: "Guide overview",
          href: `/docs/${guide.slug}`,
          description: guide.summary,
        });
      }

      for (const section of guide.sections) {
        const searchable = normalise([
          section.title,
          section.intro,
          section.note,
          ...(section.where ?? []),
          ...(section.steps ?? []),
          ...(section.points ?? []),
        ].filter(Boolean).join(" "));
        if (!searchable.includes(term)) continue;
        matches.push({
          key: `${guide.slug}-${section.id}`,
          title: section.title,
          guideTitle: guide.title,
          href: `/docs/${guide.slug}#${section.id}`,
          description: section.intro ?? section.note ?? section.steps?.[0] ?? section.points?.[0] ?? guide.summary,
        });
      }
    }
    return matches.slice(0, 10);
  }, [guides, query]);

  const hasQuery = query.trim().length > 0;

  return (
    <div className="mb-8 rounded-card border border-line bg-surface p-4 sm:p-5">
      <label htmlFor="docs-search" className="mb-2 block text-[13px] font-extrabold text-ink">
        Search all documentation
      </label>
      <div className="flex gap-2">
        <input
          id="docs-search"
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Try “VAT report”, “payroll” or “inventory”…"
          autoComplete="off"
          className="min-h-12 min-w-0 flex-1 rounded-btn border border-line-strong bg-paper px-4 text-[15px] text-ink outline-none placeholder:text-ink-soft focus:border-gold focus:ring-2 focus:ring-gold/20"
        />
        {hasQuery ? (
          <button
            type="button"
            onClick={() => setQuery("")}
            className="min-h-12 rounded-btn border border-line-strong px-4 text-[13px] font-bold text-ink hover:border-gold"
          >
            Clear
          </button>
        ) : null}
      </div>
      {hasQuery ? (
        <div className="mt-4" role="status" aria-live="polite">
          {results.length ? (
            <>
              <p className="mb-2 text-[12px] font-bold text-ink-soft">
                {results.length === 10 ? "Top 10 results" : `${results.length} ${results.length === 1 ? "result" : "results"}`}
              </p>
              <ul className="grid gap-2 sm:grid-cols-2">
                {results.map((result) => (
                  <li key={result.key}>
                    <a
                      href={result.href}
                      className="block h-full rounded-card border border-line bg-paper px-4 py-3 text-ink no-underline transition-colors hover:border-gold"
                    >
                      <span className="block text-[11px] font-extrabold uppercase tracking-[.08em] text-gold-text">
                        {result.guideTitle}
                      </span>
                      <span className="mt-1 block font-bold">{result.title}</span>
                      <span className="mt-1 block text-[13px] leading-relaxed text-ink-2">{result.description}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <p className="text-[14px] text-ink-2">
              No matching guides or sections. Try a different word, such as “invoice”, “tax” or “leave”.
            </p>
          )}
        </div>
      ) : (
        <p className="mt-2 text-[12px] text-ink-soft">Find topics, screens and instructions across every guide.</p>
      )}
    </div>
  );
}
