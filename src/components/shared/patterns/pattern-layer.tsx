'use client';

import dynamic from 'next/dynamic';

import { useOption } from '@/hooks/use-options';
import { cn } from '@/lib/utils';

// Loaded only when an option asks for one: a plain page ships no canvas code.
const FlickerDots = dynamic(
  () => import('./flicker-dots').then((m) => m.FlickerDots),
  { ssr: false },
);
const ConnectDots = dynamic(
  () => import('./connect-dots').then((m) => m.ConnectDots),
  { ssr: false },
);

const CursorDots = dynamic(
  () => import('./cursor-dots').then((m) => m.CursorDots),
  { ssr: false },
);
const LAYERS = {
  flicker: FlickerDots,
  connect: ConnectDots,
  cursor: CursorDots,
} as const;

const PLACE = {
  // Same band as the CSS `dots` and `grid` backgrounds (options.css).
  top: {
    option: 'bg',
    className: 'top-0 h-[36rem] [mask-image:linear-gradient(#000,transparent)]',
  },
  bottom: {
    option: 'fbg',
    className:
      'bottom-0 h-56 [mask-image:linear-gradient(to_top,#000,transparent)]',
  },
} as const;

/**
 * An animated pattern behind the page top (`bg` option) or the footer
 * (`fbg` option). Body is `position: relative`, so both bands sit on the
 * document, not the screen.
 */
export function PatternLayer({ place }: { place: keyof typeof PLACE }) {
  const { option, className } = PLACE[place];
  const value = useOption(option);
  if (!(value in LAYERS)) return null;
  const Layer = LAYERS[value as keyof typeof LAYERS];

  return (
    <div
      aria-hidden
      className={cn(
        'pointer-events-none absolute inset-x-0 -z-1 overflow-hidden print:hidden',
        className,
      )}
    >
      <Layer />
    </div>
  );
}
