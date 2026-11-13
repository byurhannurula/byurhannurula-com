'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

interface ZoomedPicture {
  src: string;
  alt: string;
}

/** Open a native dialog with the picture of any clicked `[data-zoom-src]`. */
export function useImageZoom() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [picture, setPicture] = useState<ZoomedPicture | null>(null);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const trigger = (event.target as Element).closest<HTMLElement>(
        '[data-zoom-src]',
      );
      const src = trigger?.dataset.zoomSrc;
      if (!src) return;
      setPicture({ src, alt: trigger.dataset.zoomAlt ?? '' });
      dialogRef.current?.showModal();
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  const close = useCallback(() => dialogRef.current?.close(), []);

  return { dialogRef, picture, close };
}
