'use client';

import {
  useLayoutEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from 'react';

interface HoveredDay {
  count: number;
  date: string;
  left: number;
  top: number;
}

const dayFormat = new Intl.DateTimeFormat('en', {
  day: 'numeric',
  month: 'long',
  timeZone: 'UTC',
});

/**
 * Day readout for a grid of squares that carry `data-date` and `data-count`.
 * One handler on the container serves every square.
 */
export function useGraphReadout() {
  const containerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState<HoveredDay>();

  // The label width is known only after it renders. Clamp before paint, so
  // the first and last weeks do not push the readout out of the card, which
  // crops it.
  useLayoutEffect(() => {
    const container = containerRef.current;
    const tooltip = tooltipRef.current;
    if (!hovered || !container || !tooltip) return;
    const half = tooltip.offsetWidth / 2;
    const left = Math.min(
      Math.max(hovered.left, half),
      container.offsetWidth - half,
    );
    tooltip.style.left = `${left}px`;
  }, [hovered]);

  const onPointerOver = (event: ReactPointerEvent) => {
    const square = event.target as HTMLElement;
    const { date, count } = square.dataset;
    if (!date) {
      setHovered(undefined);
      return;
    }
    setHovered({
      count: Number(count),
      date,
      left: square.offsetLeft + square.offsetWidth / 2,
      top: square.offsetTop,
    });
  };

  const label = hovered
    ? `${hovered.count} contribution${hovered.count === 1 ? '' : 's'} · ${dayFormat.format(new Date(`${hovered.date}T00:00:00Z`))}`
    : '';

  return {
    containerRef,
    tooltipRef,
    hovered,
    label,
    onPointerOver,
    onPointerLeave: () => setHovered(undefined),
  };
}
