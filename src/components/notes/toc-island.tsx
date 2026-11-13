'use client';

import { X } from 'lucide-react';
import {
  type CSSProperties,
  type MouseEvent,
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from 'react';

import { useActiveHeading } from '@/hooks/use-active-heading';
import { useDismiss } from '@/hooks/use-dismiss';
import { useReadingProgress } from '@/hooks/use-reading-progress';
import { useScrolledPast } from '@/hooks/use-scrolled-past';
import { playSound } from '@/hooks/use-sound';
import type { NoteHeading } from '@/lib/mdx';
import { getOptions } from '@/lib/options-store';
import { cn } from '@/lib/utils';

/** 2 * pi * r for the ring's r = 9. */
const RING = 56.55;
/** The island stays away until the reader is this far into the page. */
const SHOW_AFTER_PX = 300;
/** Height of one label in the pill, in rem. The reel moves in these steps. */
const LABEL_REM = 1.25;

/** Rows arrive 40ms apart, capped so a long list is not still arriving late. */
const rowDelay = (index: number) =>
  ({ '--row-delay': `${Math.min(90 + index * 40, 300)}ms` }) as CSSProperties;

interface TocIslandProps {
  headings: NoteHeading[];
  /** Shown in the pill before the first heading. */
  title: string;
  /** Selector of the element whose reading progress the ring shows. */
  target: string;
}

/**
 * Contents of a note. `toc: island` is a dark pill at the bottom centre with
 * a progress ring, the current heading and a percent. It rises in after the
 * first scroll; a click makes it wider and taller to show the list.
 * `toc: side` turns the same list into a side column on wide screens (the
 * `toc-side:` variant, src/styles/notes.css). `toc: off` hides it.
 */
export function TocIsland({ headings, title, target }: TocIslandProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLOListElement>(null);
  const panelId = useId();

  const ids = useMemo(() => headings.map((h) => h.id), [headings]);
  const active = useActiveHeading(ids);
  const progress = useReadingProgress(target);
  const scrolled = useScrolledPast(SHOW_AFTER_PX);
  const activeIndex = headings.findIndex((h) => h.id === active);
  const current = headings[activeIndex];

  const close = useCallback((refocus: boolean) => {
    setOpen(false);
    playSound('close');
    if (refocus) barRef.current?.focus({ preventScroll: true });
  }, []);

  useDismiss(
    rootRef,
    open,
    // A press outside keeps the focus where the reader put it.
    useCallback((reason) => close(reason === 'escape'), [close]),
  );

  // A long note has more headings than the list shows: keep the current one
  // in view inside the list, without moving the page.
  useEffect(() => {
    const list = listRef.current;
    const link = list?.querySelector<HTMLElement>('[aria-current]');
    if (!list || !link) return;
    const top = link.offsetTop - list.clientHeight / 2 + link.clientHeight / 2;
    list.scrollTo({ top });
    // `active` and `open` are not read here, but each changes which link is
    // current or whether the list has a height to scroll.
    // oxlint-disable-next-line react/exhaustive-effect-dependencies
  }, [active, open]);

  const goTo = (event: MouseEvent<HTMLAnchorElement>, id: string) => {
    event.preventDefault();
    const calm =
      getOptions().motion === 'off' ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: calm ? 'auto' : 'smooth' });
    history.replaceState(null, '', `#${id}`);
    if (open) close(true);
  };

  if (headings.length === 0) return null;

  return (
    <>
      {/* Dims the page while the list is open. It stays a click target while
          it fades, so the click that closes the island cannot reach a link
          under it. */}
      <div
        aria-hidden
        data-open={open}
        className="invisible fixed inset-0 z-34 bg-bg/40 opacity-0 backdrop-blur-[2px] [transition:opacity_.46s_var(--ease-island),visibility_0s_.46s] in-data-[toc=off]:hidden data-[open=true]:visible data-[open=true]:opacity-100 data-[open=true]:[transition:opacity_.46s_var(--ease-island),visibility_0s] print:hidden toc-side:hidden"
      />

      <div
        ref={rootRef}
        data-island
        data-open={open}
        data-shown={scrolled || open}
        className="group/island fixed bottom-5 left-1/2 z-35 -translate-x-1/2 [transition:translate_.46s_var(--ease-island),opacity_.24s_ease-out,visibility_.46s] in-data-[toc=off]:hidden data-[shown=false]:invisible data-[shown=false]:translate-y-16 data-[shown=false]:opacity-0 print:hidden toc-side:visible! toc-side:top-32 toc-side:bottom-auto toc-side:left-[calc(50%+26rem)] toc-side:translate-x-0 toc-side:translate-y-0! toc-side:opacity-100!"
      >
        {/* Explicit widths, so the width can ease: `auto` has nothing to ease
            from. One fixed radius, half the closed height: a pill while
            short, a panel once tall. `contain` keeps the two layout
            transitions (width, rows) inside the island.
            Dark in both themes, like the mockup: it floats over any page. */}
        <nav
          aria-label="On this page"
          className="w-[min(18.75rem,calc(100vw-1.5rem))] overflow-hidden rounded-3xl bg-[#17171a] text-white/95 shadow-[0_16px_40px_-12px_rgb(0_0_0/0.55),0_0_0_1px_rgb(255_255_255/0.08)] transition-[width] duration-460 ease-island contain-[layout_paint] group-data-[open=true]/island:w-[min(26.25rem,calc(100vw-1.5rem))] toc-side:w-52! toc-side:overflow-visible toc-side:rounded-none toc-side:bg-transparent toc-side:text-ink toc-side:shadow-none toc-side:contain-none"
        >
          {/* 0fr to 1fr eases to the real height of the list. */}
          <div
            id={panelId}
            className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-460 ease-island group-data-[open=true]/island:grid-rows-[1fr] toc-side:grid-rows-[1fr]"
          >
            <div className="min-h-0 overflow-hidden toc-side:overflow-visible">
              <div
                // Hidden from the keyboard while shut; the delay lets it fade first.
                className="invisible p-2.5 pb-0 opacity-0 [transition:opacity_.2s,visibility_0s_.46s] group-data-[open=true]/island:visible group-data-[open=true]/island:opacity-100 group-data-[open=true]/island:[transition:opacity_.2s_.1s,visibility_0s] toc-side:visible toc-side:p-0 toc-side:opacity-100"
              >
                <div className="mb-1.5 flex items-center justify-between pr-1 pl-3 toc-side:hidden">
                  <span className="label-mono text-white/50">on this page</span>
                  <button
                    type="button"
                    onClick={() => close(true)}
                    aria-label="Close contents"
                    className="grid size-7 place-items-center rounded-full text-white/50 transition-[color,background-color,rotate] duration-300 ease-island hover:rotate-90 hover:bg-white/7 hover:text-white"
                  >
                    <X aria-hidden className="size-3.5" />
                  </button>
                </div>

                <ol
                  ref={listRef}
                  // The mask fades rows out at the scroll edges.
                  className="relative max-h-[min(22.5rem,50vh)] overflow-y-auto overscroll-contain [mask-image:linear-gradient(to_bottom,transparent,black_12px,black_calc(100%-12px),transparent)] py-1.5 toc-side:max-h-[calc(100vh-12rem)] toc-side:[mask-image:none] toc-side:py-0"
                >
                  {headings.map((heading, index) => (
                    <li
                      key={heading.id}
                      style={rowDelay(index)}
                      // The delay is on the open state only: on close all
                      // rows leave together.
                      className="translate-y-1.5 opacity-0 transition-[opacity,translate] duration-260 ease-island group-data-[open=true]/island:translate-y-0 group-data-[open=true]/island:opacity-100 group-data-[open=true]/island:delay-(--row-delay) toc-side:translate-y-0 toc-side:opacity-100"
                    >
                      <a
                        href={`#${heading.id}`}
                        aria-current={
                          heading.id === active ? 'location' : undefined
                        }
                        onClick={(event) => goTo(event, heading.id)}
                        className={cn(
                          'group/row flex items-center gap-[0.7rem] rounded-[0.8rem] px-3 py-[0.55rem] text-[0.9375rem] leading-[1.35] text-white/60 no-underline transition-colors duration-200 -outline-offset-2 before:size-[0.35rem] before:flex-none before:rounded-full before:bg-current before:opacity-50 before:transition-[scale,opacity,background-color] before:duration-300 hover:bg-white/7 hover:text-white aria-[current]:bg-white/10 aria-[current]:text-white aria-[current]:before:scale-140 aria-[current]:before:bg-green-400 aria-[current]:before:opacity-100',
                          // Inset shadows draw the side line: a border would be cut by the
                          // list's own scroll box.
                          'toc-side:rounded-none toc-side:py-[0.3rem] toc-side:shadow-[inset_1px_0_0_var(--line)] toc-side:pr-0 toc-side:pl-4 toc-side:text-sm toc-side:text-faint toc-side:before:hidden toc-side:hover:bg-transparent toc-side:hover:text-ink toc-side:aria-[current]:bg-transparent toc-side:aria-[current]:shadow-[inset_2px_0_0_var(--accent-bright)] toc-side:aria-[current]:text-ink',
                          heading.level === 3 &&
                            'py-[0.4rem] pl-7 text-[0.875rem] toc-side:pl-7 toc-side:text-[0.8125rem]',
                        )}
                      >
                        <span className="min-w-0 truncate transition-[translate] duration-300 ease-island group-hover/row:translate-x-1 toc-side:whitespace-normal">
                          {heading.text}
                        </span>
                      </a>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>

          <button
            ref={barRef}
            type="button"
            aria-expanded={open}
            aria-controls={panelId}
            onClick={() => {
              if (open) close(false);
              else {
                setOpen(true);
                playSound('open');
              }
            }}
            className="group/bar flex h-12 w-full items-center gap-[0.7rem] rounded-3xl border-t border-dashed border-transparent pr-4 pl-[0.8rem] text-left text-[0.9375rem] font-medium -outline-offset-2 transition-[border-color] duration-460 group-data-[open=true]/island:rounded-t-none group-data-[open=true]/island:border-white/14 toc-side:hidden"
          >
            <svg
              viewBox="0 0 24 24"
              aria-hidden
              className="size-6 flex-none -rotate-90 fill-none stroke-[2.5] transition-[scale] duration-300 ease-island group-hover/bar:scale-110"
            >
              <circle cx="12" cy="12" r="9" className="stroke-white/16" />
              <circle
                cx="12"
                cy="12"
                r="9"
                strokeLinecap="round"
                strokeDasharray={RING}
                strokeDashoffset={RING * (1 - progress)}
                className="stroke-green-400 transition-[stroke-dashoffset] duration-150 ease-out"
              />
            </svg>
            <span className="sr-only">Contents: {current?.text ?? title}</span>
            {/* A reel of every label, one line tall. It moves up one line per
                heading, so the old label leaves at the top while the next
                one comes from below. */}
            <span
              aria-hidden
              className="relative h-5 min-w-0 flex-1 overflow-hidden"
            >
              <span
                className="absolute inset-x-0 top-0 block transition-[translate] duration-460 ease-island"
                style={{ translate: `0 ${-(activeIndex + 1) * LABEL_REM}rem` }}
              >
                <span className="block h-5 truncate leading-5">{title}</span>
                {headings.map((heading) => (
                  <span
                    key={heading.id}
                    className="block h-5 truncate leading-5"
                  >
                    {heading.text}
                  </span>
                ))}
              </span>
            </span>
            <span className="font-mono text-xs leading-none text-white/50">
              <span className="sr-only">Read: </span>
              {Math.round(progress * 100)}%
            </span>
            <svg
              viewBox="0 0 16 16"
              aria-hidden
              className="size-4 flex-none fill-none stroke-current stroke-[1.8] transition-[rotate] duration-460 ease-island group-data-[open=true]/island:rotate-180"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m4 10 4-4 4 4" />
            </svg>
          </button>
        </nav>
      </div>
    </>
  );
}
