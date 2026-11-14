import Image from 'next/image';
import {
  Children,
  type CSSProperties,
  isValidElement,
  type ReactNode,
} from 'react';

import { imageSize, publicImageSize } from '@/components/mdx/image-size';
import { remoteSrcSet } from '@/components/notes/note-cover';
import { cn } from '@/lib/utils';

export type FigureWidth = 'default' | 'wide' | 'full';

// Breakouts use `transform`, not `translate`: scroll reveal animates
// `translate` and would undo the centring.
const BREAKOUT = 'ml-[50%] [transform:translateX(-50%)]';
const FIGURE_WIDTH: Record<FigureWidth, string> = {
  default: '',
  wide: cn(BREAKOUT, 'w-[min(64rem,100vw-2.5rem)]'),
  // 100vw counts the scrollbar, so the box can be wider than the page. The
  // page root clips sideways (globals.css), so this cannot scroll. `cqw`
  // falls back to the viewport today; it becomes the exact page width when
  // an ancestor is an inline-size container.
  full: cn(BREAKOUT, 'w-[100cqw] max-w-[100vw]'),
};
const SIZES: Record<FigureWidth, string> = {
  default: '(min-width: 768px) 44rem, 100vw',
  wide: '(min-width: 1064px) 64rem, 100vw',
  full: '100vw',
};

const asWidth = (value: string | undefined): FigureWidth =>
  value === 'wide' || value === 'full' ? value : 'default';

/** MDX attributes are strings; a note may also pass `{1200}`. */
const asPixels = (value: string | number | undefined) => {
  const pixels = Number(value);
  return Number.isFinite(pixels) && pixels > 0 ? pixels : undefined;
};

interface PictureProps {
  src: string;
  alt: string;
  sizes: string;
  /** Pixel size of a remote file. Local files are measured. */
  width?: number;
  height?: number;
  /** The first picture of a page: it loads at once, before the rest. */
  priority?: boolean;
  /** Round corners on the frame, to match a rounded picture. */
  round?: boolean;
  className?: string;
}

/**
 * A tiny file of the same picture, for the `imgload: blur` option. Scaled
 * up, the browser smooths it into a soft preview. Local files go through the
 * optimiser (32 px wide); Unsplash makes its own; other hosts get none.
 */
function previewUrl(src: string, local: boolean) {
  if (local) return `/_next/image?url=${encodeURIComponent(src)}&w=32&q=75`;
  const first = remoteSrcSet(src)?.split(' ')[0];
  return first ?? null;
}

/**
 * A picture that opens large on click (<ImageZoom /> on the page handles
 * it). Local files go through next/image; remote ones stay a plain img.
 * The box always has its shape before the file loads, so the text below
 * does not jump.
 */
async function Picture({
  src,
  alt,
  sizes,
  width,
  height,
  priority,
  round = true,
  className,
}: PictureProps) {
  const size = await publicImageSize(src);
  const preview = previewUrl(src, Boolean(size));
  const loading = priority
    ? ({ loading: 'eager', fetchPriority: 'high' } as const)
    : ({ loading: 'lazy' } as const);
  const srcSet = size ? undefined : remoteSrcSet(src);
  const remote = size || (width && height) ? null : await imageSize(src);
  const known = (width && height) || remote;
  const box = remote ?? { width, height };
  return (
    <button
      type="button"
      data-zoom-src={src}
      data-zoom-alt={alt}
      aria-label={alt ? `Enlarge picture: ${alt}` : 'Enlarge picture'}
      // While it is open large, the picture here hides: one picture that moved.
      className={cn(
        'block w-full cursor-zoom-in [&[data-zoomed]>img]:invisible',
        round && 'rounded-lg',
      )}
      // The frame shows a preview or a shimmer until the picture covers it.
      data-pic
      style={
        preview
          ? ({ '--pic-preview': `url("${preview}")` } as CSSProperties)
          : undefined
      }
    >
      {size ? (
        <Image
          src={src}
          alt={alt}
          width={size.width}
          height={size.height}
          sizes={sizes}
          {...loading}
          className={className}
        />
      ) : (
        // Remote hosts are not in next.config.ts, so the optimiser would
        // refuse them. Notes may link any picture. With a known size the
        // box takes that shape; without one it is 16 / 9 and the picture
        // fills it.
        // oxlint-disable-next-line nextjs/no-img-element
        <img
          src={src}
          srcSet={srcSet}
          sizes={srcSet ? sizes : undefined}
          alt={alt}
          width={known ? box.width : undefined}
          height={known ? box.height : undefined}
          {...loading}
          decoding="async"
          className={cn(
            known ? 'h-auto' : 'aspect-video object-cover',
            className,
          )}
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
  /**
   * `default` stays in the column, `wide` breaks out, `full` is edge to edge.
   * A number is the pixel width of a remote file instead (with `height`).
   */
  width?: string | number;
  /** Pixel height of a remote file. */
  height?: string | number;
  /** Pixel size of a remote file that also sets `width` to wide or full. */
  imgWidth?: string | number;
  imgHeight?: string | number;
  /** The cover of a note: loads at once and skips the scroll reveal. */
  priority?: boolean;
}

/** A picture in a note, with an optional caption. Click to zoom. */
export function Figure({
  src,
  alt = '',
  caption,
  label,
  width,
  height,
  imgWidth,
  imgHeight,
  priority,
}: FigureProps) {
  const w = asWidth(typeof width === 'string' ? width : undefined);
  return (
    <figure
      // A hidden first picture would delay the largest paint of the page.
      data-reveal={priority ? undefined : true}
      className={cn('my-11', FIGURE_WIDTH[w])}
    >
      <Picture
        src={src}
        alt={alt}
        sizes={SIZES[w]}
        width={asPixels(imgWidth) ?? asPixels(width)}
        height={asPixels(imgHeight) ?? asPixels(height)}
        priority={priority}
        round={w !== 'full'}
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

/** 3 / 2, only for a picture whose size nothing could find. */
const FALLBACK_RATIO = 1.5;

interface GridImageProps {
  src: string;
  alt?: string;
  /** Share of the row width, set by <ImageGrid> for the `sizes` hint. */
  share?: number;
}

/**
 * Split pictures into rows of at most `max`, from the count alone, so a
 * grid never ends on one lonely picture: 4 give 2 + 2, 7 give 3 + 2 + 2.
 */
function splitIntoRows<T>(items: readonly T[], max: number): T[][] {
  if (items.length === 0) return [];
  const rowCount = Math.ceil(items.length / max);
  const base = Math.floor(items.length / rowCount);
  const extra = items.length % rowCount;
  const rows: T[][] = [];
  let at = 0;
  for (let row = 0; row < rowCount; row++) {
    const size = base + (row < extra ? 1 : 0);
    rows.push(items.slice(at, at + size));
    at += size;
  }
  return rows;
}

interface ImageGridProps {
  /** Most pictures in one row: "2" or "3". A string, because note files cannot pass numbers. */
  columns?: string;
  width?: string;
  caption?: string;
  label?: string;
  /** <GridImage> items. */
  children: ReactNode;
}

/**
 * A justified gallery: each row shares one height and fills the width, and
 * no picture is cropped. Each item grows by its own width / height ratio,
 * so the row height falls out of the sum (the Ghost gallery card does this).
 */
export async function ImageGrid({
  columns = '2',
  width,
  caption,
  label,
  children,
}: ImageGridProps) {
  // MDX leaves whitespace text between the tags; only elements are pictures.
  const items = Children.toArray(children).filter(
    isValidElement<GridImageProps>,
  );
  const ratios = new Map(
    await Promise.all(
      items.map(async (item) => {
        const size = await imageSize(item.props.src);
        const ratio = size ? size.width / size.height : FALLBACK_RATIO;
        return [item.props.src, ratio] as const;
      }),
    ),
  );
  const rows = splitIntoRows(items, columns === '3' ? 3 : 2);

  return (
    <figure
      data-reveal
      className={cn('my-11 flex flex-col gap-2', FIGURE_WIDTH[asWidth(width)])}
    >
      {rows.map((row) => {
        const total = row.reduce(
          (sum, item) => sum + (ratios.get(item.props.src) ?? FALLBACK_RATIO),
          0,
        );
        return (
          <div
            key={row.map((item) => item.props.src).join('|')}
            className="flex items-start gap-2"
          >
            {row.map((item) => {
              const ratio = ratios.get(item.props.src) ?? FALLBACK_RATIO;
              return (
                <div
                  key={item.props.src}
                  className="min-w-0"
                  style={{ flex: `${ratio} 1 0%`, aspectRatio: ratio }}
                >
                  <GridImage {...item.props} share={ratio / total} />
                </div>
              );
            })}
          </div>
        );
      })}
      <Caption label={label} className="mt-[0.35rem]">
        {caption}
      </Caption>
    </figure>
  );
}

/** One picture inside an <ImageGrid>. */
export function GridImage({ src, alt = '', share = 0.5 }: GridImageProps) {
  const vw = Math.round(share * 100);
  return (
    <Picture
      src={src}
      alt={alt}
      sizes={`(min-width: 1064px) ${Math.round(64 * share)}rem, ${vw}vw`}
      className="size-full rounded-lg object-cover shadow-[0_0_0_1px_var(--line)]"
    />
  );
}
