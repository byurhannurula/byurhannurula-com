import { cn } from '@/lib/utils';

interface NoteCoverProps {
  src: string;
  className?: string;
}

/** A note's cover picture. Decorative: the title next to it names the note. */
export function NoteCover({ src, className }: NoteCoverProps) {
  return (
    // Covers can be remote (Unsplash) and next/image only allows hosts listed
    // in next.config.ts, so this is a plain img with a fixed box.
    // oxlint-disable-next-line nextjs/no-img-element
    <img
      src={src}
      alt=""
      loading="lazy"
      decoding="async"
      className={cn('object-cover', className)}
    />
  );
}
