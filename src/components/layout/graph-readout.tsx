'use client';

import type { ReactNode } from 'react';

import { useGraphReadout } from '@/hooks/use-graph-readout';

interface GraphReadoutProps {
  /** The grid. It stays server markup; this adds only the readout. */
  children: ReactNode;
}

/** Shows the day and count of the hovered square above it. */
export function GraphReadout({ children }: GraphReadoutProps) {
  const {
    containerRef,
    tooltipRef,
    hovered,
    label,
    onPointerOver,
    onPointerLeave,
  } = useGraphReadout();

  return (
    <div
      ref={containerRef}
      onPointerOver={onPointerOver}
      onPointerLeave={onPointerLeave}
      className="relative"
    >
      {children}
      {hovered ? (
        <div
          ref={tooltipRef}
          style={{ left: hovered.left, top: hovered.top }}
          className="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-[calc(100%+0.3rem)] rounded-[0.4rem] bg-ink px-2 py-1 text-[0.6875rem] leading-normal whitespace-nowrap text-bg shadow-lift"
        >
          {label}
        </div>
      ) : null}
    </div>
  );
}
