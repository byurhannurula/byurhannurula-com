import { BookOpen, Clapperboard, Tv } from 'lucide-react';
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

/**
 * A book shows its page edges at the right and bottom, a film is a flat
 * poster, a show has the round corners of a screen.
 */
const SHAPE = {
  book: 'rounded-[0.15rem_0.3rem_0.3rem_0.15rem] shadow-[1px_1px_0_#e9e4d8,2px_2px_0_#f7f4ee,3px_3px_0_#ddd7c9,4px_4px_0_#f7f4ee,5px_5px_0_#d3ccbc,var(--shadow-lift)]',
  film: 'rounded-[0.2rem] shadow-lift',
  show: 'rounded-lg shadow-lift',
} as const;

const KIND = {
  book: { icon: BookOpen, name: 'Book' },
  film: { icon: Clapperboard, name: 'Film' },
  show: { icon: Tv, name: 'Show' },
} as const;

/** A small round mark with the icon of the kind. */
export function KindMark({
  item,
  className,
}: {
  item: ShelfItem;
  className?: string;
}) {
  const { icon: Icon, name } = KIND[item.kind];
  return (
    <span
      title={name}
      className={cn(
        'grid size-7 place-items-center rounded-full bg-bg/80 text-soft backdrop-blur-sm',
        className,
      )}
    >
      <Icon aria-hidden className="size-3.5" />
      <span className="sr-only">{name}</span>
    </span>
  );
}

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
        'h-auto max-h-full w-auto max-w-full',
        SHAPE[item.kind],
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

/**
 * A button over the whole card that opens the popup (shelf-dialog.tsx).
 * The card itself is server markup; the dialog finds the item by slug.
 */
export function OpenButton({
  item,
  className,
}: {
  item: ShelfItem;
  className?: string;
}) {
  return (
    <button
      type="button"
      data-shelf-item={item.slug}
      aria-haspopup="dialog"
      className={cn(
        'absolute inset-0 z-1 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent',
        className,
      )}
    >
      <span className="sr-only">{`More about ${item.title}`}</span>
    </button>
  );
}
