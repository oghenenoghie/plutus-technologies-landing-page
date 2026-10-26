import { DocFigure } from "@/components/docs/doc-figure";
import { DocText } from "@/components/docs/doc-text";
import { Chip } from "@/components/ui/pill";
import { ROLE_LABEL, type DocSection } from "@/lib/docs";
import { cn } from "@/lib/utils";

/** One task in a guide: where it lives, who can do it, the steps, and the screen. */
export function DocSectionView({ section, first }: { section: DocSection; first?: boolean }) {
  const s = section;
  return (
    <section
      id={s.id}
      aria-labelledby={`${s.id}-title`}
      className={cn(
        "grid scroll-mt-[96px] gap-5 py-[clamp(36px,5vw,56px)]",
        first ? "pt-0" : "border-t border-line",
      )}
    >
      <h2 id={`${s.id}-title`} className="font-display text-[clamp(28px,3vw,38px)] font-semibold leading-[1.08]">
        <a href={`#${s.id}`} className="text-ink no-underline hover:text-gold-text">
          {s.title}
        </a>
      </h2>

      {s.where || s.roles ? (
        <dl className="grid gap-2.5 rounded-card border border-line bg-surface px-5 py-4 text-[14px]">
          {s.where ? (
            <div className="grid gap-1 sm:grid-cols-[110px_1fr] sm:gap-3">
              <dt className="text-[11px] font-extrabold uppercase tracking-[.12em] text-ink-soft sm:pt-0.5">In the app</dt>
              <dd className="m-0 font-mono text-[13px] text-ink">
                {s.where.map((step, i) => (
                  <span key={step}>
                    {i > 0 ? <span className="px-1.5 text-gold-text" aria-hidden="true">›</span> : null}
                    {i > 0 ? <span className="sr-only">, then </span> : null}
                    {step}
                  </span>
                ))}
              </dd>
            </div>
          ) : null}
          {s.roles ? (
            <div className="grid gap-1.5 sm:grid-cols-[110px_1fr] sm:gap-3">
              <dt className="text-[11px] font-extrabold uppercase tracking-[.12em] text-ink-soft sm:pt-1.5">Who</dt>
              <dd className="m-0">
                <ul className="flex flex-wrap gap-1.5" aria-label="Roles">
                  {s.roles.map((r) => (
                    <li key={r}>
                      <Chip className="text-[12.5px]">{ROLE_LABEL[r]}</Chip>
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
          ) : null}
        </dl>
      ) : null}

      {s.intro ? (
        <p className="max-w-[68ch] text-[16px] text-ink-2">
          <DocText>{s.intro}</DocText>
        </p>
      ) : null}

      {s.steps ? (
        <ol className="grid max-w-[72ch] gap-3">
          {s.steps.map((step, i) => (
            <li key={step} className="grid grid-cols-[30px_1fr] items-start gap-3 text-[15.5px] text-ink-2">
              <span
                className="grid size-[30px] place-items-center rounded-full border border-gold font-mono text-[13px] font-medium text-gold-text"
                aria-hidden="true"
              >
                {i + 1}
              </span>
              <span className="pt-[3px]">
                <DocText>{step}</DocText>
              </span>
            </li>
          ))}
        </ol>
      ) : null}

      {s.points ? (
        <ul className="gold-list max-w-[72ch] text-[15px] text-ink-2">
          {s.points.map((p) => (
            <li key={p}>
              <span>
                <DocText>{p}</DocText>
              </span>
            </li>
          ))}
        </ul>
      ) : null}

      {s.note ? (
        <p className="max-w-[72ch] rounded-card border border-line border-l-[3px] border-l-gold bg-sunk px-5 py-3.5 text-[14.5px] text-ink-2">
          <DocText>{s.note}</DocText>
        </p>
      ) : null}

      {s.shots?.map((shot, i) => <DocFigure key={shot.src} shot={shot} priority={first && i === 0} />)}
    </section>
  );
}
