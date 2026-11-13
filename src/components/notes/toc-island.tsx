'use client';

import {
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
import { playSound } from '@/hooks/use-sound';
import type { NoteHeading } from '@/lib/mdx';
import { getOptions } from '@/lib/options-store';
import { cn } from '@/lib/utils';

/** 2 * pi * r for the ring's r = 9. */
const RING = 56.55;

interface TocIslandProps {
  headings: NoteHeading[];
  /** Shown in the pill before the first heading. */
  title: string;
  /** Selector of the element whose reading progress the ring shows. */
  target: string;
}

/**
 * Contents of a note. `toc: island` is a dark pill at the bottom centre with
 * a progress ring, the current heading and a percent; a click opens the
 * list. `toc: side` turns the same list into a side column on wide screens
 * (the `toc-side:` variant, src/styles/notes.css). `toc: off` hides it.
 */
export function TocIsland({ headings, title, target }: TocIslandProps) {
  const [open, setOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const barRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLOListElement>(null);
  const listId = useId();

  const ids = useMemo(() => headings.map((h) => h.id), [headings]);
  const active = useActiveHeading(ids);
  const progress = useReadingProgress(target);
  const current = headings.find((h) => h.id === active);

  const toggle = (next: boolean) => {
    setOpen(next);
    playSound(next ? 'open' : 'close');
  };

  useDismiss(
    navRef,
    open,
    useCallback((reason) => {
      setOpen(false);
      playSound('close');
      // Escape came from the keyboard, so the focus goes back to the pill.
      if (reason === 'escape') barRef.current?.focus();
    }, []),
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
    setOpen(false);
  };

  if (headings.length === 0) return null;

  return (
    <nav
      ref={navRef}
      aria-label="On this page"
      data-open={open}
      // Dark in both themes, like the mockup: the pill floats over any page.
      className="group/island fixed bottom-5 left-1/2 z-35 w-[min(21rem,calc(100vw-1.5rem))] -translate-x-1/2 overflow-hidden rounded-3xl bg-[#17171a] text-white/95 shadow-[0_16px_40px_-12px_rgb(0_0_0/0.55),0_0_0_1px_rgb(255_255_255/0.08)] in-data-[toc=off]:hidden print:hidden toc-side:top-32 toc-side:bottom-auto toc-side:left-[calc(50%+26rem)] toc-side:w-52 toc-side:translate-x-0 toc-side:overflow-visible toc-side:rounded-none toc-side:bg-transparent toc-side:text-ink toc-side:shadow-none"
    >
      {/* 0fr to 1fr eases to the real height of the list. */}
      <div
        id={listId}
        className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-data-[open=true]/island:grid-rows-[1fr] toc-side:grid-rows-[1fr]"
      >
        <div className="min-h-0 overflow-hidden toc-side:overflow-visible">
          <ol
            ref={listRef}
            // Hidden from the keyboard while shut; the delay lets it fade first.
            className="invisible relative max-h-[min(22rem,55vh)] translate-y-2 overflow-y-auto overscroll-contain px-2 pt-[0.6rem] pb-1 opacity-0 [transition:opacity_.25s,translate_.4s_var(--ease-out-soft),visibility_0s_.5s] group-data-[open=true]/island:visible group-data-[open=true]/island:translate-y-0 group-data-[open=true]/island:opacity-100 group-data-[open=true]/island:[transition:opacity_.25s_.12s,translate_.4s_var(--ease-out-soft)_.12s,visibility_0s] toc-side:visible toc-side:max-h-[calc(100vh-12rem)] toc-side:translate-y-0 toc-side:p-0 toc-side:opacity-100"
          >
            {headings.map((heading) => (
              <li key={heading.id}>
                <a
                  href={`#${heading.id}`}
                  aria-current={heading.id === active ? 'location' : undefined}
                  onClick={(event) => goTo(event, heading.id)}
                  className={cn(
                    'flex items-center gap-[0.7rem] rounded-[0.8rem] px-3 py-[0.55rem] text-[0.9375rem] leading-[1.35] text-white/60 no-underline transition-colors -outline-offset-2 before:size-[0.35rem] before:flex-none before:rounded-full before:bg-current before:opacity-50 hover:bg-white/7 hover:text-white aria-[current]:text-white aria-[current]:before:scale-140 aria-[current]:before:bg-green-400 aria-[current]:before:opacity-100',
                    // Inset shadows draw the side line: a border would be cut by the
                    // list's own scroll box.
                    'toc-side:rounded-none toc-side:py-[0.3rem] toc-side:shadow-[inset_1px_0_0_var(--line)] toc-side:pr-0 toc-side:pl-4 toc-side:text-sm toc-side:text-faint toc-side:before:hidden toc-side:hover:bg-transparent toc-side:hover:text-ink toc-side:aria-[current]:shadow-[inset_2px_0_0_var(--accent-bright)] toc-side:aria-[current]:text-ink',
                    heading.level === 3 &&
                      'py-[0.4rem] pl-7 text-[0.875rem] toc-side:pl-7 toc-side:text-[0.8125rem]',
                  )}
                >
                  <span className="min-w-0 truncate toc-side:whitespace-normal">
                    {heading.text}
                  </span>
                </a>
              </li>
            ))}
          </ol>
        </div>
      </div>

      <button
        ref={barRef}
        type="button"
        aria-expanded={open}
        aria-controls={listId}
        onClick={() => toggle(!open)}
        className="flex h-12 w-full items-center gap-[0.7rem] rounded-3xl pr-4 pl-[0.8rem] text-[0.9375rem] font-medium -outline-offset-2 toc-side:hidden"
      >
        <svg
          viewBox="0 0 24 24"
          aria-hidden
          className="size-6 flex-none -rotate-90 fill-none stroke-[2.5]"
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
        <span
          // The key restarts the small rise each time the heading changes.
          key={active ?? 'start'}
          className="min-w-0 flex-1 truncate text-left motion-safe:animate-island-swap"
        >
          {current?.text ?? title}
        </span>
        <span className="font-mono text-xs leading-none text-white/50">
          <span className="sr-only">Read: </span>
          {Math.round(progress * 100)}%
        </span>
        <svg
          viewBox="0 0 16 16"
          aria-hidden
          className="size-4 flex-none fill-none stroke-current stroke-[1.8] transition-[rotate] duration-400 ease-soft group-data-[open=true]/island:rotate-180"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m4 10 4-4 4 4" />
        </svg>
      </button>
    </nav>
  );
}
