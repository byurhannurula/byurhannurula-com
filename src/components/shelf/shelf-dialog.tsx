'use client';

import { ArrowUpRight, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';

import type { ShelfItem } from '@/content/shelf';
import { EVENTS, track, trackAttrs } from '@/lib/track';
import { cn } from '@/lib/utils';

import { HAS_AFFILIATE, shelfLinks } from './shelf-links';
import {
  Cover,
  KindMark,
  Rating,
  statusLabel,
  tinted,
  toneStyle,
} from './shelf-parts';

const KIND_NAME = { book: 'Book', film: 'Film', show: 'Show' } as const;

/** Slugs of the open buttons a reader can see now, in page order. */
function visibleSlugs() {
  const slugs = [...document.querySelectorAll<HTMLElement>('[data-shelf]')]
    .filter((el) => el.getClientRects().length > 0)
    .map((el) => el.dataset.shelf ?? '');
  return [...new Set(slugs)];
}

const iconButton =
  'grid size-9 cursor-pointer place-items-center rounded-full bg-bg/80 text-soft backdrop-blur-sm transition-colors hover:text-ink focus-visible:outline-2 focus-visible:outline-accent';

/**
 * One native dialog for the whole shelf. Any `[data-shelf]` button opens it
 * on its item, so the tiles stay server markup. The hash holds the item,
 * so a link can open it. Arrow keys move through the items in view.
 */
export function ShelfDialog({ items }: { items: ShelfItem[] }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [slug, setSlug] = useState<string | null>(null);
  const item = items.find((entry) => entry.slug === slug);

  const show = useCallback((next: string) => {
    setSlug(next);
    const el = dialog.current;
    if (el && !el.open) el.showModal();
    history.replaceState(null, '', `#${next}`);
    track(EVENTS.shelfOpen, { slug: next });
  }, []);

  const step = useCallback(
    (by: number) => {
      const slugs = visibleSlugs();
      if (!slug || slugs.length < 2) return;
      const at = slugs.indexOf(slug);
      show(slugs[(at + by + slugs.length) % slugs.length]);
    },
    [show, slug],
  );

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = event.target as Element | null;
      const button = target?.closest<HTMLElement>('[data-shelf]');
      if (button?.dataset.shelf) show(button.dataset.shelf);
    };
    document.addEventListener('click', onClick);
    const hash = decodeURIComponent(location.hash.slice(1));
    // A shared link: open the item once the page is in.
    const frame = items.some((entry) => entry.slug === hash)
      ? requestAnimationFrame(() => show(hash))
      : 0;
    return () => {
      document.removeEventListener('click', onClick);
      cancelAnimationFrame(frame);
    };
  }, [items, show]);

  const status = item ? statusLabel(item) : null;
  const links = item ? shelfLinks(item) : [];
  const percent = Math.round((item?.progress ?? 0) * 100);

  return (
    // A modal dialog takes focus and keys; the rule does not know <dialog>.
    // oxlint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
    <dialog
      ref={dialog}
      aria-labelledby="shelf-dialog-title"
      className="shelf-dialog m-auto max-h-[calc(100dvh-2rem)] w-[min(56rem,calc(100%-2rem))] overflow-hidden rounded-2xl border border-line bg-bg p-0 text-ink shadow-lift"
      onClose={() => {
        history.replaceState(null, '', location.pathname + location.search);
      }}
      onClick={(event) => {
        // A click on the dimmed area outside the box closes it.
        if (event.target === event.currentTarget) event.currentTarget.close();
      }}
      onKeyDown={(event) => {
        if (event.key === 'ArrowRight') step(1);
        if (event.key === 'ArrowLeft') step(-1);
      }}
    >
      {item ? (
        <div
          style={toneStyle(item)}
          className="grid max-h-[inherit] overflow-y-auto md:grid-cols-[0.9fr_1.1fr]"
        >
          <div
            className={cn(
              'grid min-h-60 place-items-center px-10 pt-14 pb-10 md:min-h-[30rem] md:p-12',
              tinted,
            )}
          >
            <Cover
              key={item.slug}
              item={item}
              sizes="(min-width: 768px) 340px, 60vw"
              className="shelf-dialog-cover max-h-60 md:max-h-[24rem]"
            />
          </div>
          <div className="flex flex-col p-6 md:p-9 md:pt-14">
            <p className="flex items-center gap-2.5 label-mono text-soft">
              <KindMark item={item} className="size-6 bg-card" />
              {KIND_NAME[item.kind]} · {item.year}
              {status ? <span className="text-accent">· {status}</span> : null}
            </p>
            <h2
              id="shelf-dialog-title"
              className="mt-4 text-[1.75rem] leading-[1.1] font-semibold tracking-[-0.025em] text-balance"
            >
              {item.title}
            </h2>
            <p className="mt-1.5 text-soft">{item.by}</p>
            <div className="mt-4 flex items-center gap-2.5">
              <Rating value={item.rating} />
              <span aria-hidden className="font-mono text-xs text-faint">
                {item.rating} / 5
              </span>
            </div>
            <p className="mt-5 leading-relaxed text-pretty text-soft">
              {item.note}
            </p>
            {item.status === 'now' ? (
              <div className="mt-5 flex items-center gap-3">
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
            ) : null}
            <div className="mt-auto pt-8">
              <p className="label-mono text-faint">
                {item.kind === 'book' ? 'Find it' : 'Watch it'}
              </p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel={
                        link.buy && HAS_AFFILIATE
                          ? 'sponsored noopener'
                          : 'noopener'
                      }
                      {...(link.buy
                        ? trackAttrs(EVENTS.shelfBuy, { slug: item.slug })
                        : {})}
                      className={cn(
                        'inline-flex h-9 items-center gap-1.5 rounded-full border px-3.5 text-sm font-medium transition-colors',
                        link.buy
                          ? 'border-ink bg-ink text-bg hover:opacity-90'
                          : 'border-line-strong text-soft hover:text-ink',
                      )}
                    >
                      {link.label}
                      <ArrowUpRight aria-hidden className="size-3.5" />
                    </a>
                  </li>
                ))}
              </ul>
              {HAS_AFFILIATE && links.some((link) => link.buy) ? (
                <p className="mt-3 text-xs leading-relaxed text-faint">
                  The Amazon link is an affiliate link: a purchase through it
                  gives me a small fee, at no extra cost to you.
                </p>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}
      <div className="absolute top-3 right-3 flex gap-1.5">
        <button
          type="button"
          className={iconButton}
          onClick={() => step(-1)}
          aria-label="Previous"
        >
          <ChevronLeft aria-hidden className="size-4" />
        </button>
        <button
          type="button"
          className={iconButton}
          onClick={() => step(1)}
          aria-label="Next"
        >
          <ChevronRight aria-hidden className="size-4" />
        </button>
        <button
          type="button"
          className={iconButton}
          onClick={() => dialog.current?.close()}
          aria-label="Close"
          // oxlint-disable-next-line jsx-a11y/no-autofocus -- a dialog must place focus
          autoFocus
        >
          <X aria-hidden className="size-4" />
        </button>
      </div>
    </dialog>
  );
}
