import Image from 'next/image';

import { publicImageSize } from '@/components/mdx/image-size';
import { remoteSrcSet } from '@/components/notes/note-cover';

// The same box as a `wide` <Figure> (src/components/mdx/figure.tsx). It uses
// `transform`, not `translate`: scroll reveal animates `translate`.
const WIDE =
  'my-11 ml-[50%] w-[min(64rem,100vw-2.5rem)] [transform:translateX(-50%)]';
const SIZES = '(min-width: 1064px) 64rem, 100vw';
const PICTURE = 'w-full rounded-lg shadow-[0_0_0_1px_var(--line)]';

interface NoteHeroCoverProps {
  src: string;
  alt?: string;
}

/**
 * The cover at the top of a note. A <Figure> loads lazily and a remote one
 * has no height until it loads. This one is the first picture of the page:
 * it loads at once and its box is reserved, so the text does not jump.
 * The button is the trigger that <ImageZoom /> listens for.
 */
export async function NoteHeroCover({ src, alt = '' }: NoteHeroCoverProps) {
  const size = await publicImageSize(src);
  return (
    <figure className={WIDE}>
      <button
        type="button"
        data-zoom-src={src}
        data-zoom-alt={alt}
        aria-label={alt ? `Enlarge picture: ${alt}` : 'Enlarge picture'}
        className="block w-full cursor-zoom-in [&[data-zoomed]>img]:invisible"
      >
        {size ? (
          <Image
            src={src}
            alt={alt}
            width={size.width}
            height={size.height}
            sizes={SIZES}
            loading="eager"
            fetchPriority="high"
            className={PICTURE}
          />
        ) : (
          // A remote file has no known size. Most photos are 3:2, so the box
          // takes that shape and the picture fills it.
          // oxlint-disable-next-line nextjs/no-img-element
          <img
            src={src}
            srcSet={remoteSrcSet(src)}
            sizes={SIZES}
            alt={alt}
            loading="eager"
            fetchPriority="high"
            decoding="async"
            className={`aspect-3/2 object-cover ${PICTURE}`}
          />
        )}
      </button>
    </figure>
  );
}
