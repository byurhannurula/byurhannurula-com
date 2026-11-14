'use client';

import './image-zoom.css';

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
    </dialog>
  );
}
