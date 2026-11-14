import Image from 'next/image';
import type { CSSProperties } from 'react';

import type { GearItem } from '@/content/uses';
import { cn } from '@/lib/utils';

interface GearTilesProps {
  items: GearItem[];
}

/**
 * Hardware as photo tiles. A retired item has its name struck through and a
 * grey photo; a screen reader gets the word "Retired" before the name.
 */
export function GearTiles({ items }: GearTilesProps) {
  return (
    <ul className="grid grid-cols-2 gap-x-6 gap-y-8 md:grid-cols-3">
      {items.map((item, index) => (
        <li
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
              // The name is the next line, so a text here would say it twice.
              alt=""
              width={item.image.width}
              height={item.image.height}
              // The photo is 82% of its tile: two tiles in a row on a
              // phone, three from 768 px, and the page column from 1024 px.
              sizes="(min-width: 64rem) 17rem, (min-width: 48rem) 24vw, 34vw"
              className={cn(
                'size-full object-contain p-[9%] transition-[scale] duration-600 ease-soft group-hover/gear:scale-[1.06]',
                item.retired && 'opacity-60 grayscale',
              )}
            />
          </div>
          <h3
            className={cn(
              'mt-[0.85rem] text-lg leading-[1.3] font-semibold tracking-[-0.015em]',
              item.retired && 'text-faint',
            )}
          >
            {item.retired ? (
              <>
                {/* A line through text is not read aloud. */}
                <span className="sr-only">Retired: </span>
                <span className="line-through">{item.name}</span>
              </>
            ) : (
              item.name
            )}
          </h3>
          <p className="mt-[0.15rem] text-[0.9375rem] text-soft">{item.text}</p>
        </li>
      ))}
    </ul>
  );
}
