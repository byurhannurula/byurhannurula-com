'use client';

import { useImageZoom } from '@/hooks/use-image-zoom';

/**
 * The large view for pictures in a note. Mount it once on the page; every
 * <Figure> and <GridImage> opens it. Escape or a click closes it.
 */
export function ImageZoom() {
  const { dialogRef, picture, close } = useImageZoom();
  return (
    <dialog
      ref={dialogRef}
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
            src={picture.src}
            alt={picture.alt}
            className="max-h-[94vh] max-w-[94vw] rounded-md"
          />
        ) : null}
      </button>
    </dialog>
  );
}
