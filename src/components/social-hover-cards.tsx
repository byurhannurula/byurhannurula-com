"use client";

import {
  type ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import { cn } from "@/lib/utils";

export interface SocialCardItem {
  label: string;
  href: string;
  icon: ReactNode;
  /** Card body. Must declare its own width; the card measures it. */
  content: ReactNode;
}

/** Matches the enter and leave keyframes in globals.css. */
const SWAP_MS = 300;
/** Breathing room between a clamped card and the viewport edge. */
const EDGE_MARGIN = 16;

/**
 * Keeps a card that is wider than the space beside its icon on screen.
 *
 * The card is centred on whichever icon is hovered, so the first icon in a row
 * puts half a 320px card past the left edge of a phone. Clamping the centre is
 * enough -- the card never needs to point at anything, so nothing has to move
 * with it.
 *
 * `left` is relative to the row; the limits are in viewport coordinates, hence
 * the container offset on both sides.
 */
function clampLeft(left: number, width: number, container: HTMLElement | null) {
  if (!(container && width)) return left;

  const { left: rowLeft } = container.getBoundingClientRect();
  const min = EDGE_MARGIN - rowLeft + width / 2;
  const max = window.innerWidth - EDGE_MARGIN - rowLeft - width / 2;

  // Wider than the viewport allows: centre it and let overflow-hidden crop.
  if (min > max) return window.innerWidth / 2 - rowLeft;
  return Math.min(Math.max(left, min), max);
}

/**
 * A row of social links sharing one preview card that moves between them.
 *
 * Interaction ported from Colin Lienard's Contacts component (MIT):
 * github.com/colinlienard/colinlienard.com. One card that travels and resizes
 * reads as a single object being pointed at different things, where a card per
 * icon reads as four things appearing and disappearing.
 *
 * Position and size are driven from the hovered anchor's own box rather than a
 * popover library: everything lives in one relatively positioned row, so the
 * numbers are already in the right coordinate space and there is nothing to
 * collide with.
 *
 * The card is aria-hidden and holds no focusable content. It repeats where the
 * link already goes, so exposing it twice would only add tab stops.
 */
export function SocialHoverCards({
  items,
  className,
}: {
  items: SocialCardItem[];
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const [swap, setSwap] = useState<{ id: number; from: number; dir: number }>();
  const [box, setBox] = useState({ left: 0, width: 0, height: 0 });
  const [animate, setAnimate] = useState(false);
  const idRef = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);
  /** Set before the card is measured, so the clamp has a centre to work from. */
  const rawLeftRef = useRef(0);

  // Measured on every swap, because each body is keyed and so remounts.
  const measure = useCallback((node: HTMLDivElement | null) => {
    if (!node) return;
    const width = node.offsetWidth;
    setBox({
      left: clampLeft(rawLeftRef.current, width, containerRef.current),
      width,
      height: node.offsetHeight,
    });
  }, []);

  /*
   * The first card of a hover appears at its final size. Transitioning into it
   * would mean growing out of a zero-sized box in the corner, which reads as
   * the card being born rather than arriving.
   */
  useEffect(() => {
    if (!open) {
      setAnimate(false);
      return;
    }
    const frame = requestAnimationFrame(() => setAnimate(true));
    return () => cancelAnimationFrame(frame);
  }, [open]);

  useEffect(() => {
    if (!swap) return;
    const timer = setTimeout(() => setSwap(undefined), SWAP_MS);
    return () => clearTimeout(timer);
  }, [swap]);

  const point = (next: number, anchor: HTMLElement) => {
    const left = anchor.offsetLeft + anchor.offsetWidth / 2;
    rawLeftRef.current = left;

    setBox((current) => ({
      ...current,
      left: clampLeft(left, current.width, containerRef.current),
    }));
    setOpen((wasOpen) => {
      if (wasOpen && next !== index) {
        idRef.current += 1;
        setSwap({
          id: idRef.current,
          from: index,
          dir: Math.sign(next - index),
        });
      }
      return true;
    });
    setIndex(next);
  };

  const active = items[index];

  return (
    /* The handler only dismisses a decorative card, and the keyboard path is
       covered by onBlur below, so no role would make this more operable.
       biome-ignore lint/a11y/noStaticElementInteractions: see above */
    <div
      className={cn("relative flex items-center", className)}
      ref={containerRef}
      onBlur={(event) => {
        // Only when focus has actually left the row, not moved along it.
        if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false);
      }}
      onMouseLeave={() => setOpen(false)}
    >
      {items.map((item, itemIndex) => (
        <a
          aria-label={item.label}
          className="group z-10 inline-flex size-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground focus-visible:text-foreground"
          href={item.href}
          key={item.label}
          onFocus={(event) => point(itemIndex, event.currentTarget)}
          onPointerEnter={(event) => {
            // Touch would open a card the same tap is trying to follow.
            if (event.pointerType !== "mouse") return;
            point(itemIndex, event.currentTarget);
          }}
          rel="noopener noreferrer"
          target="_blank"
        >
          {item.icon}
        </a>
      ))}

      {open ? (
        <div
          aria-hidden="true"
          className={cn(
            "absolute bottom-[calc(100%+0.5rem)] overflow-hidden rounded-xl border border-border bg-surface-raised shadow-xl",
            "animate-fade-in",
            animate &&
              "transition-[left,width,height] duration-300 ease-out motion-reduce:transition-none"
          )}
          style={{
            left: box.left,
            width: box.width || undefined,
            height: box.height || undefined,
            transform: "translateX(-50%)",
          }}
        >
          {swap ? (
            <div
              className="card-body-out absolute bottom-0 left-0"
              key={`out-${swap.id}`}
              style={{ "--dir": swap.dir } as React.CSSProperties}
            >
              {items[swap.from]?.content}
            </div>
          ) : null}
          <div
            className={cn("absolute bottom-0 left-0", swap && "card-body-in")}
            key={`in-${swap?.id ?? "first"}`}
            ref={measure}
            style={{ "--dir": swap?.dir ?? 0 } as React.CSSProperties}
          >
            {active?.content}
          </div>
        </div>
      ) : null}

      {/*
       * Bridges the 8px between the icons and the card. Without it the pointer
       * leaves the row on the way up and the card closes under the cursor.
       * Sits below the links, which carry z-10.
       */}
      <div className="absolute inset-0 -top-2" />
    </div>
  );
}
