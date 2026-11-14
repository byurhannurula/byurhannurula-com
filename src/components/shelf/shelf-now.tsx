import { SHELF, SHELF_COPY } from '@/content/shelf';
import { Section } from '@/components/shared/section';
import { cn } from '@/lib/utils';

import { Cover, statusLabel, tinted, toneStyle } from './shelf-parts';

/** Large cards for what is open now, with how far in. */
export function ShelfNow() {
  const items = SHELF.filter((item) => item.status === 'now');
  if (items.length === 0) return null;

  return (
    <Section title={SHELF_COPY.now}>
      <ul data-reveal className="grid gap-4 md:grid-cols-2">
        {items.map((item) => {
          const percent = Math.round((item.progress ?? 0) * 100);
          return (
            <li
              key={item.slug}
              style={toneStyle(item)}
              className={cn(
                'relative flex items-center gap-6 overflow-hidden rounded-xl border border-line p-5 md:p-6',
                tinted,
              )}
            >
              {/* A soft light from the cover side. */}
              <span
                aria-hidden
                className="pointer-events-none absolute top-1/2 -left-16 size-64 -translate-y-1/2 rounded-full bg-[color-mix(in_oklab,var(--tone)_45%,transparent)] blur-3xl"
              />
              <div className="relative grid h-36 w-28 shrink-0 place-items-center sm:w-36">
                <Cover item={item} sizes="160px" className="max-h-36" />
              </div>
              <div className="relative min-w-0 flex-1">
                <p className="label-mono text-soft">{statusLabel(item)}</p>
                <h3 className="mt-1.5 text-lg leading-snug font-semibold tracking-[-0.015em] text-balance">
                  {item.title}
                </h3>
                <p className="mt-0.5 text-sm text-soft">
                  {item.by} · {item.year}
                </p>
                <div className="mt-4 flex items-center gap-3">
                  <span
                    aria-hidden
                    className="h-1.5 flex-1 overflow-hidden rounded-full bg-[color-mix(in_oklab,var(--ink)_10%,transparent)]"
                  >
                    <span
                      className="block h-full rounded-full bg-accent"
                      style={{ width: `${percent}%` }}
                    />
                  </span>
                  <span className="font-mono text-xs text-soft">
                    {percent}%<span className="sr-only"> done</span>
                  </span>
                </div>
                <p className="mt-3 hidden text-sm leading-relaxed text-soft sm:block">
                  {item.note}
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
