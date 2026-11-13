import Image from 'next/image';

import { cn } from '@/lib/utils';

interface AppIconProps {
  src: string;
  className?: string;
}

const base =
  'size-8 flex-none rounded-[0.55rem] bg-white object-contain p-0.5 shadow-[0_0_0_1px_var(--line)]';

/** An app or company icon on a white tile. Decorative: the name is next to it. */
export function AppIcon({ src, className }: AppIconProps) {
  if (src.endsWith('.svg')) {
    return (
      // next/image does not optimise SVG, so a plain img is the same result.
      // oxlint-disable-next-line nextjs/no-img-element
      <img src={src} alt="" loading="lazy" className={cn(base, className)} />
    );
  }
  return (
    <Image
      src={src}
      alt=""
      width={64}
      height={64}
      className={cn(base, className)}
    />
  );
}
