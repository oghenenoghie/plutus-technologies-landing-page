import Image from "next/image";
import type { DocShot } from "@/lib/docs";

/** A screenshot of the app, linked to the full-size file. */
export function DocFigure({ shot, priority }: { shot: DocShot; priority?: boolean }) {
  return (
    <figure className="grid gap-2.5">
      <a
        href={shot.src}
        target="_blank"
        rel="noopener"
        className="block overflow-hidden rounded-card border border-line-strong bg-sunk transition-colors hover:border-gold"
      >
        <Image
          src={shot.src}
          width={shot.width}
          height={shot.height}
          alt={shot.alt}
          sizes="(min-width: 1200px) 860px, (min-width: 1024px) 70vw, 100vw"
          priority={priority}
          className="block h-auto w-full"
        />
        <span className="sr-only">(opens full size in a new tab)</span>
      </a>
      <figcaption className="text-[13.5px] text-ink-soft">
        <span className="mr-2 font-mono text-[11px] uppercase tracking-[.08em] text-gold-text">Sample data</span>
        {shot.caption}
      </figcaption>
    </figure>
  );
}
