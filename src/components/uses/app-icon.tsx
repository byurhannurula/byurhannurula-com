import Image from 'next/image';

import { cn } from '@/lib/utils';

interface AppIconProps {
  src: string;
  /** Rendered size in px, for the image request. Set the box with a class. */
  size?: number;
  className?: string;
}

// The optimizer does not resize these formats, so it would only add a hop.
const isPassThrough = (src: string) => /\.(svg|ico)$/.test(src);

/**
 * An app or service icon on a white tile. The tile stays white in the dark
 * theme, because many of the icons are drawn for a light background.
 */
export function AppIcon({ src, size = 32, className }: AppIconProps) {
  return (
    <Image
      src={src}
      alt=""
      width={size}
      height={size}
      unoptimized={isPassThrough(src)}
      className={cn(
        'size-8 flex-none rounded-[0.55rem] bg-white object-contain p-0.5 shadow-[0_0_0_1px_var(--line)]',
        className,
      )}
    />
  );
}
