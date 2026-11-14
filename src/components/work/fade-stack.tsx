'use client';

import Image from 'next/image';

import type { ImageSize } from '@/content/projects';
import { cn } from '@/lib/utils';

export interface FadePicture extends ImageSize {
  src: string;
  alt: string;
}

interface FadeStackProps {
  pictures: FadePicture[];
  /** From `useFadeStack`: the indexes to render. */
  seen: ReadonlySet<number>;
  /** From `useFadeStack`: the index in view. */
  shown: number;
  onLoaded: (index: number) => void;
  sizes: string;
  className?: string;
}

/**
 * Pictures in one 16:10 box, one in view. A new one fades in on top of the
 * old one. A picture that was never asked for is not in the page, so it
 * does not load.
 */
export function FadeStack({
  pictures,
  seen,
  shown,
  onLoaded,
  sizes,
  className,
}: FadeStackProps) {
  return (
    <div
      className={cn('relative aspect-16/10 overflow-hidden bg-sunk', className)}
    >
      {pictures.map((picture, index) =>
        seen.has(index) ? (
          <Image
            key={picture.src}
            src={picture.src}
            // Only the picture in view has a text: the others are covered.
            alt={index === shown ? picture.alt : ''}
            width={picture.width}
            height={picture.height}
            sizes={sizes}
            onLoad={() => onLoaded(index)}
            // A broken picture must not block the ones after it.
            onError={() => onLoaded(index)}
            className={cn(
              'absolute inset-0 size-full object-cover object-top transition-opacity ease-soft',
              // The old picture stays opaque under the new one for the
              // time of the fade. Two half-clear pictures would let the
              // background through.
              index === shown
                ? 'z-1 opacity-100 duration-500'
                : 'opacity-0 delay-500 duration-0',
            )}
          />
        ) : null,
      )}
    </div>
  );
}
