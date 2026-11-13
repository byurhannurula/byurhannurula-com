import Image from 'next/image';

import { publicImageSize } from '@/components/mdx/image-size';
import { cn } from '@/lib/utils';

const UNSPLASH = 'https://images.unsplash.com/';
const WIDTHS = [180, 280, 400, 640, 768, 960, 1280, 1600, 2048, 2560];

/**
 * Unsplash resizes by URL, so its pictures get a real `srcset`. A picture
 * from any other host has one file only: undefined.
 */
export function remoteSrcSet(src: string): string | undefined {
  if (!src.startsWith(UNSPLASH)) return undefined;
  return WIDTHS.map((width) => {
    const url = new URL(src);
    // A fixed height would keep the crop of the first size.
    url.searchParams.delete('h');
    url.searchParams.set('w', String(width));
    url.searchParams.set('q', '75');
    url.searchParams.set('auto', 'format');
    return `${url.href} ${width}w`;
  }).join(', ');
}

interface NoteCoverProps {
  src: string;
  /** The shown width, as for an img `sizes`. It picks the file to load. */
  sizes: string;
  className?: string;
}

/**
 * A note's cover picture, cropped to the box that the class gives it.
 * Decorative: the title next to it names the note.
 */
export async function NoteCover({ src, sizes, className }: NoteCoverProps) {
  const classes = cn('object-cover', className);
  const size = await publicImageSize(src);
  if (size) {
    return (
      <Image
        src={src}
        alt=""
        width={size.width}
        height={size.height}
        sizes={sizes}
        className={classes}
      />
    );
  }
  const srcSet = remoteSrcSet(src);
  return (
    // A remote cover can come from any host and next/image only allows the
    // hosts in next.config.ts, so this is a plain img with a fixed box.
    // oxlint-disable-next-line nextjs/no-img-element
    <img
      src={src}
      srcSet={srcSet}
      sizes={srcSet ? sizes : undefined}
      alt=""
      loading="lazy"
      decoding="async"
      className={classes}
    />
  );
}
