import Image from 'next/image';
import type { CSSProperties } from 'react';

import type { GearItem } from '@/content/uses';
import { cn } from '@/lib/utils';

interface GearTilesProps {
  items: GearItem[];
}

/** Hardware as photo tiles. A retired item has its name struck through. */
export function GearTiles({ items }: GearTilesProps) {
  return (
    <div className="grid grid-cols-2 gap-x-6 gap-y-8 md:grid-cols-3">
      {items.map((item, index) => (
        <div
          key={item.name}
          data-reveal
          style={
            { '--reveal-delay': `${(index % 3) * 0.06}s` } as CSSProperties
          }
          className="group/gear"
        >
          <div className="aspect-4/3 overflow-hidden rounded-xl bg-white shadow-[0_0_0_1px_var(--line)] transition-[translate,box-shadow] duration-450 ease-soft group-hover/gear:-translate-y-1 group-hover/gear:shadow-[0_0_0_1px_var(--line),var(--shadow-lift)]">
            <Image
              src={item.image.src}
              alt=""
              width={item.image.width}
              height={item.image.height}
              sizes="(min-width: 768px) 20rem, 50vw"
              className="size-full object-contain p-[9%] transition-[scale] duration-600 ease-soft group-hover/gear:scale-[1.06]"
            />
          </div>
          <h3
            className={cn(
              'mt-[0.85rem] text-lg leading-[1.3] font-semibold tracking-[-0.015em]',
              item.retired && 'text-faint line-through',
            )}
          >
            {item.name}
          </h3>
          <p className="mt-[0.15rem] text-[0.9375rem] text-soft">{item.text}</p>
        </div>
      ))}
    </div>
  );
}
