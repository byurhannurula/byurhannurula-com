'use client';

import './image-zoom.css';

import { ChevronLeft, ChevronRight } from 'lucide-react';

import { useImageZoom } from '@/hooks/use-image-zoom';

const navButton =
  'absolute top-1/2 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-black/55 text-white backdrop-blur-sm transition-colors hover:bg-black/75 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white [&_svg]:size-5';

/**
 * The large view for pictures in a note. Mount it once on the page; every
 * <Figure> and <GridImage> opens it. Escape or a click closes it.
 */
export function ImageZoom() {
  const { dialogRef, picture, close, step, place } = useImageZoom();
  const browse = place.count > 1;
  return (
    <dialog
      ref={dialogRef}
      data-zoom
      aria-label="Picture, large"
      className="size-full max-h-none max-w-none bg-transparent p-0 backdrop:bg-black/78 backdrop:backdrop-blur-[6px]"
    >
      <button
        type="button"
        onClick={close}
        aria-label="Close picture"
        className="grid size-full cursor-zoom-out place-items-center"
      >
        {picture ? (
          // The original file at full size, from any host.
          // oxlint-disable-next-line nextjs/no-img-element
          <img
            key={picture.src}
            src={picture.src}
            alt={picture.alt}
            // The box has its final size before the file loads, and shows the
            // small file meanwhile: the travel needs both from the first frame.
            style={{
              aspectRatio: `${picture.width} / ${picture.height}`,
              width: `min(94vw, 94vh * ${picture.width / picture.height}, ${picture.width}px)`,
              backgroundImage: picture.thumb
                ? `url("${picture.thumb}")`
                : undefined,
            }}
            className="rounded-md bg-cover bg-center [view-transition-name:zoom-picture]"
          />
        ) : null}
      </button>
      {browse ? (
        <>
          <button
            type="button"
            onClick={() => step(-1)}
            aria-label="Last picture"
            className={`${navButton} left-3 md:left-6`}
          >
            <ChevronLeft aria-hidden />
          </button>
          <button
            type="button"
            onClick={() => step(1)}
            aria-label="Next picture"
            className={`${navButton} right-3 md:right-6`}
          >
            <ChevronRight aria-hidden />
          </button>
          <p
            aria-live="polite"
            className="pointer-events-none absolute bottom-5 left-1/2 -translate-x-1/2 rounded-full bg-black/55 px-3 py-1 font-mono text-xs text-white"
          >
            {place.index + 1} / {place.count}
          </p>
        </>
      ) : null}
    </dialog>
  );
}
