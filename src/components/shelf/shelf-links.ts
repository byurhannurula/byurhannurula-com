import type { ShelfItem } from '@/content/shelf';

export interface ShelfLink {
  label: string;
  href: string;
  /** A shop link. With an affiliate tag it gets a note in the popup. */
  buy?: boolean;
}

const TAG = process.env.NEXT_PUBLIC_AMAZON_TAG;

/** True when shop links carry an affiliate tag, so the popup must say so. */
export const HAS_AFFILIATE = Boolean(TAG);

const q = (text: string) => encodeURIComponent(text);

function amazon(item: ShelfItem) {
  const url = new URL(
    item.asin
      ? `https://www.amazon.com/dp/${item.asin}`
      : `https://www.amazon.com/s?k=${q(`${item.title} ${item.by}`)}&i=stripbooks`,
  );
  if (TAG) url.searchParams.set('tag', TAG);
  return url.toString();
}

/**
 * Where to read more, or get it. Search links, so an item needs no ids to
 * get useful links; an `asin` makes the shop link direct.
 */
export function shelfLinks(item: ShelfItem): ShelfLink[] {
  const own = item.links ?? [];
  const named = `${item.title} ${item.year}`;
  if (item.kind === 'book') {
    return [
      ...own,
      { label: 'Amazon', href: amazon(item), buy: true },
      {
        label: 'Open Library',
        href: `https://openlibrary.org/search?q=${q(item.title)}&author=${q(item.by)}`,
      },
      {
        label: 'Goodreads',
        href: `https://www.goodreads.com/search?q=${q(`${item.title} ${item.by}`)}`,
      },
    ];
  }
  return [
    ...own,
    {
      label: 'Where to watch',
      href: `https://www.justwatch.com/us/search?q=${q(item.title)}`,
    },
    { label: 'IMDb', href: `https://www.imdb.com/find/?q=${q(named)}` },
    ...(item.kind === 'film'
      ? [
          {
            label: 'Letterboxd',
            href: `https://letterboxd.com/search/${q(named)}/`,
          },
        ]
      : []),
  ];
}
