import Image from 'next/image';
import type { ReactNode } from 'react';

import { publicImageSize } from '@/components/mdx/image-size';
import { cn } from '@/lib/utils';

export type FigureWidth = 'default' | 'wide' | 'full';

// Breakouts use `transform`, not `translate`: scroll reveal animates
// `translate` and would undo the centring.
const BREAKOUT = 'ml-[50%] [transform:translateX(-50%)]';
const FIGURE_WIDTH: Record<FigureWidth, string> = {
  default: '',
  wide: cn(BREAKOUT, 'w-[min(64rem,100vw-2.5rem)]'),
  full: cn(BREAKOUT, 'w-screen'),
};
const SIZES: Record<FigureWidth, string> = {
  default: '(min-width: 768px) 44rem, 100vw',
  wide: '(min-width: 1064px) 64rem, 100vw',
  full: '100vw',
};

const asWidth = (value: string | undefined): FigureWidth =>
  value === 'wide' || value === 'full' ? value : 'default';

interface PictureProps {
  src: string;
  alt: string;
  sizes: string;
  className?: string;
}

/**
 * A picture that opens large on click (<ImageZoom /> on the page handles
 * it). Local files go through next/image; remote ones stay a plain img.
 */
async function Picture({ src, alt, sizes, className }: PictureProps) {
  const size = await publicImageSize(src);
  return (
    <button
      type="button"
      data-zoom-src={src}
      data-zoom-alt={alt}
      aria-label={alt ? `Enlarge picture: ${alt}` : 'Enlarge picture'}
      // While it is open large, the picture here hides: one picture that moved.
      className="block w-full cursor-zoom-in [&[data-zoomed]>img]:invisible"
    >
      {size ? (
        <Image
          src={src}
          alt={alt}
          width={size.width}
          height={size.height}
          sizes={sizes}
          className={className}
        />
      ) : (
        // Remote hosts are not in next.config.ts, so the optimiser would
        // refuse them. Notes may link any picture.
        // oxlint-disable-next-line nextjs/no-img-element
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          className={className}
        />
      )}
    </button>
  );
}

interface CaptionProps {
  label?: string;
  children?: ReactNode;
  className?: string;
}

function Caption({ label, children, className }: CaptionProps) {
  if (!label && !children) return null;
  return (
    <figcaption
      className={cn('mt-[0.8rem] text-center label-mono text-faint', className)}
    >
      {label ? <b className="font-medium text-accent">{label} </b> : null}
      {children}
    </figcaption>
  );
}

export interface FigureProps {
  src: string;
  alt?: string;
  caption?: string;
  /** A short word before the caption, in the accent colour. */
  label?: string;
  /** `default` stays in the column, `wide` breaks out, `full` is edge to edge. */
  width?: string;
}

/** A picture in a note, with an optional caption. Click to zoom. */
export function Figure({ src, alt = '', caption, label, width }: FigureProps) {
  const w = asWidth(width);
  return (
    <figure data-reveal className={cn('my-11', FIGURE_WIDTH[w])}>
      <Picture
        src={src}
        alt={alt}
        sizes={SIZES[w]}
        className={cn(
          'w-full',
          w === 'full'
            ? 'max-h-[34rem] object-cover'
            : 'rounded-lg shadow-[0_0_0_1px_var(--line)]',
        )}
      />
      <Caption label={label}>{caption}</Caption>
    </figure>
  );
}

const GRID_COLUMNS: Record<string, string> = {
  '2': 'grid-cols-2',
  '3': 'grid-cols-3',
};

interface ImageGridProps {
  /** "2" or "3". A string, because note files cannot pass numbers. */
  columns?: string;
  width?: string;
  caption?: string;
  label?: string;
  /** <GridImage> items. */
  children: ReactNode;
}

/** Two or three pictures side by side, cropped to the same shape. */
export function ImageGrid({
  columns = '2',
  width,
  caption,
  label,
  children,
}: ImageGridProps) {
  return (
    <figure
      data-reveal
      className={cn(
        'my-11 grid gap-3',
        GRID_COLUMNS[columns] ?? GRID_COLUMNS['2'],
        FIGURE_WIDTH[asWidth(width)],
      )}
    >
      {children}
      <Caption label={label} className="col-span-full mt-[0.05rem]">
        {caption}
      </Caption>
    </figure>
  );
}

/** One picture inside an <ImageGrid>. */
export function GridImage({ src, alt = '' }: { src: string; alt?: string }) {
  return (
    <Picture
      src={src}
      alt={alt}
      sizes="(min-width: 768px) 32rem, 50vw"
      className="aspect-4/3 w-full rounded-lg object-cover object-top shadow-[0_0_0_1px_var(--line)]"
    />
  );
}
