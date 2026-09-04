"use client";

import { type ReactNode, useLayoutEffect, useRef, useState } from "react";

interface Hovered {
  count: number;
  date: string;
  left: number;
  top: number;
}

const formatter = new Intl.DateTimeFormat("en", {
  day: "numeric",
  month: "long",
  timeZone: "UTC",
});

/**
 * Day readout for the contribution grid.
 *
 * One delegated handler on the container rather than a listener per square:
 * there are 371 of them, and every value the tooltip needs is already in the
 * markup as a data attribute. That also keeps the grid itself server-rendered,
 * so none of the year crosses the wire twice.
 */
export function GithubGraphHover({ children }: { children: ReactNode }) {
  const [hovered, setHovered] = useState<Hovered>();
  const [width, setWidth] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  const label = hovered
    ? `${hovered.count} contribution${hovered.count === 1 ? "" : "s"} · ${formatter.format(new Date(`${hovered.date}T00:00:00Z`))}`
    : "";

  /*
   * Measured after the tooltip exists, not while positioning it.
   *
   * Reading the ref during render gives the width of the *previous* label --
   * zero on the first hover -- so the clamp below ran on a stale number and the
   * first and last weeks pushed the tooltip out of the card, which crops it.
   * A layout effect runs before paint, so the corrected position is the only
   * one drawn.
   */
  useLayoutEffect(() => {
    if (!hovered) return;
    setWidth(tooltipRef.current?.offsetWidth ?? 0);
  }, [hovered]);

  // Held inside the graph, so the first and last weeks do not push it out.
  const bounds = containerRef.current?.offsetWidth ?? 0;
  const left = hovered
    ? Math.min(Math.max(hovered.left, width / 2), bounds - width / 2)
    : 0;

  return (
    <div
      className="relative"
      onPointerLeave={() => setHovered(undefined)}
      onPointerOver={(event) => {
        const target = event.target as HTMLElement;
        const { date, count } = target.dataset;
        if (!date) {
          setHovered(undefined);
          return;
        }
        setHovered({
          count: Number(count),
          date,
          left: target.offsetLeft + target.offsetWidth / 2,
          top: target.offsetTop,
        });
      }}
      ref={containerRef}
    >
      {children}

      {hovered ? (
        <div
          className="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-[calc(100%+0.3rem)] whitespace-nowrap rounded-md bg-foreground px-2 py-1 text-[11px] text-background shadow-lg"
          ref={tooltipRef}
          style={{ left, top: hovered.top }}
        >
          {label}
        </div>
      ) : null}
    </div>
  );
}
