'use client';

import './toc-island.css';

import { X } from 'lucide-react';
import {
  AnimatePresence,
  domAnimation,
  LazyMotion,
  type Transition,
  useReducedMotion,
} from 'motion/react';
import * as m from 'motion/react-m';
import { useCallback, useEffect, useId, useRef, useState } from 'react';

import { useDismiss } from '@/hooks/use-dismiss';
import { useReadingProgress } from '@/hooks/use-reading-progress';
import { useRootData } from '@/hooks/use-root-data';
import { useScrolledPast } from '@/hooks/use-scrolled-past';
import { playSound } from '@/hooks/use-sound';
import type { NoteHeading } from '@/lib/mdx';
import { cn } from '@/lib/utils';

import { jumpToHeading } from './toc-jump';

/** 2 * pi * r for the ring's r = 9. */
const RING = 56.55;
/** The island stays away until the reader is this far into the page. */
const SHOW_AFTER_PX = 300;

const CLOSED = { width: 300, height: 48 };
const OPEN_WIDTH = 420;
/** Space kept free at both sides on a narrow screen, in total. */
const SIDE_GAP = 24;

// Real pixel targets: a width that CSS clamps would stop early, mid curve.
// This file never renders on the server (see <Toc />), so `window` exists.
const fit = (width: number) => Math.min(width, window.innerWidth - SIDE_GAP);

// The values of the original island (TOC_PROMPT.md).
const ENTRANCE: Transition = { type: 'spring', stiffness: 300, damping: 25 };
const ISLAND: Transition = {
  type: 'tween',
  ease: [0.22, 1, 0.36, 1],
  duration: 0.5,
};
const LABEL: Transition = { duration: 0.35, ease: [0.16, 1, 0.3, 1] };
/** Reduced motion and `motion: off`: a plain show and hide. */
const INSTANT: Transition = { duration: 0 };

interface TocIslandProps {
  headings: NoteHeading[];
  /** Id of the heading the reader is in, or null above the first. */
  active: string | null;
  /** Shown in the pill before the first heading. */
  title: string;
  /** Selector of the element whose reading progress the ring shows. */
  target: string;
}

/**
 * `toc: island`: a dark pill at the bottom centre with a progress ring, the
 * current heading and a percent. It springs in after the first scroll. A
 * click makes it wider and taller, and the pill content swaps for the list.
 *
 * The only user of `motion`. Load this file through <Toc /> (next/dynamic),
 * never with a static import, so the library stays in its own chunk.
 */
export function TocIsland({ headings, active, title, target }: TocIslandProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const pillRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLOListElement>(null);
  const panelId = useId();

  const progress = useReadingProgress(target);
  const scrolled = useScrolledPast(SHOW_AFTER_PX);
  const motionOff = useRootData('motion') === 'off';
  const calm = Boolean(useReducedMotion()) || motionOff;
  const current = headings.find((h) => h.id === active);

  const entrance = calm ? INSTANT : ENTRANCE;
  const island = calm ? INSTANT : ISLAND;
  // The side that arrives waits a moment, so the two do not cross at full
  // strength.
  const arriving = calm ? INSTANT : { ...ISLAND, delay: 0.1 };

  const refocusRef = useRef(false);

  const close = useCallback((refocus: boolean) => {
    // The pill is inert until the next render: the effect below moves the
    // focus once it can take it.
    refocusRef.current = refocus;
    setOpen(false);
    playSound('close');
  }, []);

  useDismiss(
    rootRef,
    open,
    // A press outside keeps the focus where the reader put it.
    useCallback((reason) => close(reason === 'escape'), [close]),
  );

  // The pill is inert while the list shows, so the focus moves into the
  // list: to the current heading, or to Close above the first one. A long
  // note has more headings than the list shows: the current one is centred
  // inside the list, without moving the page.
  useEffect(() => {
    if (!open) {
      if (refocusRef.current) pillRef.current?.focus({ preventScroll: true });
      refocusRef.current = false;
      return;
    }
    const list = listRef.current;
    const link = list?.querySelector<HTMLElement>('[aria-current]');
    if (list && link) {
      list.scrollTop =
        link.offsetTop - list.clientHeight / 2 + link.clientHeight / 2;
    }
    (link ?? closeRef.current)?.focus({ preventScroll: true });
  }, [open]);

  return (
    <LazyMotion features={domAnimation} strict>
      <AnimatePresence>
        {open ? (
          // Dims the page while the list is open. It stays a click target
          // while it fades, so the click that closes the island cannot reach
          // a link under it.
          <m.div
            key="shade"
            aria-hidden
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={island}
            className="fixed inset-0 z-34 bg-bg/40 backdrop-blur-[2px] print:hidden toc-side:hidden"
          />
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {scrolled || open ? (
          // Centred with `translate`; motion animates `transform`, so the
          // two do not fight.
          <m.div
            key="island"
            ref={rootRef}
            data-island
            initial={calm ? { opacity: 0 } : { y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={calm ? { opacity: 0 } : { y: 50, opacity: 0 }}
            transition={entrance}
            className="fixed bottom-5 left-1/2 z-35 -translate-x-1/2 print:hidden toc-side:hidden"
          >
            {/* One fixed radius, half the closed height: a pill while short,
                a panel once tall. Width and height are animated values, not
                a layout animation: the text inside is never stretched, and
                the small `domAnimation` bundle is enough. `auto` is the real
                height of the list.
                Dark in both themes, like the mockup: it floats over any
                page. */}
            <m.nav
              aria-label="On this page"
              initial={false}
              animate={
                open
                  ? { width: fit(OPEN_WIDTH), height: 'auto' }
                  : { width: fit(CLOSED.width), height: CLOSED.height }
              }
              transition={island}
              className="relative max-w-[calc(100vw-1.5rem)] overflow-hidden rounded-3xl bg-[#17171a] text-white/95 shadow-[0_16px_40px_-12px_rgb(0_0_0/0.55),0_0_0_1px_rgb(255_255_255/0.08)]"
            >
              <AnimatePresence initial={false}>
                {open ? (
                  <m.div
                    key="list"
                    id={panelId}
                    initial={{ opacity: 0, scale: calm ? 1 : 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: calm ? 1 : 1.05 }}
                    transition={arriving}
                    // The list keeps the open width while the island
                    // narrows, so its rows do not reflow on the way out.
                    className="w-[min(420px,calc(100vw-1.5rem))] origin-bottom p-2.5"
                  >
                    <div className="mb-1.5 flex items-center justify-between pr-1 pl-3">
                      <span className="label-mono text-white/50">
                        on this page
                      </span>
                      <button
                        ref={closeRef}
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
                      className="relative max-h-[min(22.5rem,50vh)] overflow-y-auto overscroll-contain [mask-image:linear-gradient(to_bottom,transparent,black_12px,black_calc(100%-12px),transparent)] py-1.5"
                    >
                      {headings.map((heading) => (
                        <li key={heading.id}>
                          <a
                            href={`#${heading.id}`}
                            aria-current={
                              heading.id === active ? 'location' : undefined
                            }
                            onClick={(event) => {
                              event.preventDefault();
                              jumpToHeading(heading.id);
                              close(true);
                            }}
                            className={cn(
                              'group/row flex items-center gap-[0.7rem] rounded-[0.8rem] px-3 py-[0.55rem] text-[0.9375rem] leading-[1.35] text-white/60 no-underline transition-colors duration-200 -outline-offset-2 before:size-[0.35rem] before:flex-none before:rounded-full before:bg-current before:opacity-50 before:transition-[scale,opacity,background-color] before:duration-300 hover:bg-white/7 hover:text-white aria-[current]:bg-white/10 aria-[current]:text-white aria-[current]:before:scale-140 aria-[current]:before:bg-green-400 aria-[current]:before:opacity-100',
                              heading.level === 3 &&
                                'py-[0.4rem] pl-7 text-[0.875rem]',
                            )}
                          >
                            <span className="min-w-0 truncate transition-[translate] duration-300 ease-island group-hover/row:translate-x-1">
                              {heading.text}
                            </span>
                          </a>
                        </li>
                      ))}
                    </ol>
                  </m.div>
                ) : null}
              </AnimatePresence>

              <m.button
                ref={pillRef}
                type="button"
                aria-expanded={open}
                aria-controls={panelId}
                // Out of reach while the list shows; Close and Escape end it.
                inert={open}
                onClick={() => {
                  setOpen(true);
                  playSound('open');
                }}
                initial={false}
                animate={
                  open
                    ? {
                        opacity: 0,
                        scale: calm ? 1 : 0.95,
                        filter: calm ? 'blur(0px)' : 'blur(4px)',
                      }
                    : { opacity: 1, scale: 1, filter: 'blur(0px)' }
                }
                transition={open ? island : arriving}
                className="group/bar absolute inset-x-0 bottom-0 flex h-12 items-center gap-[0.7rem] rounded-3xl pr-4 pl-[0.8rem] text-left text-[0.9375rem] font-medium -outline-offset-2"
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
                <span className="sr-only">
                  Contents: {current?.text ?? title}
                </span>
                {/* The old label leaves at the top while the next one comes
                    from below. `popLayout` takes the old one out of the
                    flow, so both can show at once on one line. */}
                <span
                  aria-hidden
                  className="relative flex h-5 min-w-0 flex-1 items-center overflow-hidden"
                >
                  <AnimatePresence mode="popLayout" initial={false}>
                    <m.span
                      key={active ?? 'title'}
                      initial={{ opacity: 0, y: calm ? 0 : 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: calm ? 0 : -15 }}
                      transition={calm ? INSTANT : LABEL}
                      className="block w-full truncate leading-5"
                    >
                      {current?.text ?? title}
                    </m.span>
                  </AnimatePresence>
                </span>
                <span className="font-mono text-xs leading-none text-white/50">
                  <span className="sr-only">Read: </span>
                  {Math.round(progress * 100)}%
                </span>
                <svg
                  viewBox="0 0 16 16"
                  aria-hidden
                  className="size-4 flex-none fill-none stroke-current stroke-[1.8]"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m4 10 4-4 4 4" />
                </svg>
              </m.button>
            </m.nav>
          </m.div>
        ) : null}
      </AnimatePresence>
    </LazyMotion>
  );
}
