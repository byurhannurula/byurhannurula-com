import Image from 'next/image';
import type { CSSProperties } from 'react';

import type { ShelfItem } from '@/content/shelf';
import { cn } from '@/lib/utils';

/** Sets `--tone` for the tinted surfaces of one item. */
export const toneStyle = (item: ShelfItem) =>
  ({ '--tone': item.tone }) as CSSProperties;

/** A surface with a little of the cover's colour in it. */
export const tinted =
  'bg-[color-mix(in_oklab,var(--tone)_14%,var(--card))] dark:bg-[color-mix(in_oklab,var(--tone)_22%,var(--card))]';

const isWide = (item: ShelfItem) => item.cover.width > item.cover.height;

/** The cover at its own shape, never cropped. */
export function Cover({
  item,
  sizes,
  className,
}: {
  item: ShelfItem;
  sizes: string;
  className?: string;
}) {
  return (
    <Image
      src={item.cover.src}
      alt=""
      width={item.cover.width}
      height={item.cover.height}
      sizes={sizes}
      className={cn(
        'h-auto max-h-full w-auto max-w-full shadow-lift',
        // A jacket has a spine, a show card is a screen.
        isWide(item) ? 'rounded-md' : 'rounded-[0.25rem_0.4rem_0.4rem_0.25rem]',
        className,
      )}
    />
  );
}

const VERB = {
  book: { now: 'Reading', again: 'Read twice' },
  film: { now: 'Watching', again: 'Seen twice' },
  show: { now: 'Watching', again: 'Seen twice' },
} as const;

export const statusLabel = (item: ShelfItem) =>
  item.status === 'done' ? null : VERB[item.kind][item.status];

/** Five small dots, filled up to the rating. */
export function Rating({ value }: { value: number }) {
  return (
    <span className="inline-flex shrink-0 items-center gap-[3px]">
      <span className="sr-only">{`Rated ${value} of 5`}</span>
      {[1, 2, 3, 4, 5].map((dot) => (
        <span
          key={dot}
          aria-hidden
          className={cn(
            'size-[5px] rounded-full',
            dot <= value ? 'bg-accent' : 'bg-line-strong',
          )}
        />
      ))}
    </span>
  );
}
