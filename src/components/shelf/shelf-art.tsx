import Image from 'next/image';

import { SHELF } from '@/content/shelf';

const PICKS = ['design-of-everyday-things', 'arrival', 'spirited-away'];
const PLACES = [
  'left-[8%] top-[14%] -rotate-8',
  'left-[34%] top-[4%] z-10 rotate-1',
  'left-[60%] top-[16%] rotate-7',
];

/** Hero drawing for the shelf page: three covers fanned out. */
export function ShelfArt() {
  const items = PICKS.map((slug) => SHELF.find((item) => item.slug === slug));
  return (
    <div className="relative aspect-[4/3] w-full">
      {items.map((item, index) =>
        item ? (
          <Image
            key={item.slug}
            src={item.cover.src}
            alt=""
            width={item.cover.width}
            height={item.cover.height}
            sizes="160px"
            className={`absolute h-[72%] w-auto rounded-[0.3rem] shadow-lift ${PLACES[index]}`}
          />
        ) : null,
      )}
    </div>
  );
}
