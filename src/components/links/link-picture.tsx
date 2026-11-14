'use client';

import { useState } from 'react';

import { cn } from '@/lib/utils';

interface LinkPictureProps {
  src: string;
  /** Classes for the box that holds the picture. */
  className?: string;
}

/**
 * The preview picture of a link card. The picture comes from another host
 * and can fail (a moved file, a rate limit). A failed picture leaves no
 * broken box: the card shows as text only.
 */
export function LinkPicture({ src, className }: LinkPictureProps) {
  const [failed, setFailed] = useState(false);
  if (failed) return null;

  return (
    <span className={cn('relative block overflow-hidden bg-sunk', className)}>
      {/* A preview from any host, in a fixed box, so it is not routed
          through the image optimiser (that would be an open image proxy). */}
      {/* oxlint-disable-next-line nextjs/no-img-element */}
      <img
        src={src}
        alt=""
        loading="lazy"
        decoding="async"
        referrerPolicy="no-referrer"
        onError={() => setFailed(true)}
        className="absolute inset-0 size-full object-cover"
      />
    </span>
  );
}
