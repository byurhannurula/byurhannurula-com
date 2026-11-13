import type { ReactNode } from 'react';

import type { WayGlyph as WayGlyphName } from '@/content/about';
import { cn } from '@/lib/utils';

// Every shape needs pathLength={1}: the hover redraw animates the dash offset
// from 1 to 0 (keyframes `draw` in src/styles/motion.css).
const GLYPHS: Record<WayGlyphName, ReactNode> = {
  small: (
    <>
      <rect
        x="3"
        y="3"
        width="18"
        height="18"
        rx="5"
        opacity={0.4}
        pathLength={1}
      />
      <rect x="8" y="8" width="8" height="8" rx="2.5" pathLength={1} />
    </>
  ),
  restore: (
    <>
      <path d="M4 12a8 8 0 1 0 2.6-5.9" pathLength={1} />
      <path d="M4 4v4.5h4.5" pathLength={1} />
      <path d="M12 8v4l2.5 2" pathLength={1} />
    </>
  ),
  layer: (
    <>
      <path d="M12 3 3 8l9 5 9-5-9-5Z" pathLength={1} />
      <path d="m3 13 9 5 9-5" opacity={0.5} pathLength={1} />
      <path d="M12 14v7m-3-3 3 3 3-3" pathLength={1} />
    </>
  ),
  lead: (
    <>
      <path d="m8 8-4 4 4 4" pathLength={1} />
      <path d="m16 8 4 4-4 4" pathLength={1} />
      <circle cx="12" cy="12" r="1.6" pathLength={1} />
    </>
  ),
  data: (
    <>
      <path
        d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z"
        pathLength={1}
      />
      <circle cx="12" cy="12" r="2.6" pathLength={1} />
      <path d="M4 4l16 16" pathLength={1} />
    </>
  ),
  write: (
    <>
      <path
        d="M5 19l1-4L16.5 4.5a2.1 2.1 0 0 1 3 3L9 18l-4 1Z"
        pathLength={1}
      />
      <path d="M13 20h7" opacity={0.5} pathLength={1} />
    </>
  ),
};

interface WayGlyphProps {
  name: WayGlyphName;
  className?: string;
}

/** The hand-drawn mark of one habit. Decorative. */
export function WayGlyph({ name, className }: WayGlyphProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={cn(className)}
    >
      {GLYPHS[name]}
    </svg>
  );
}
