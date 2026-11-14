import './shelf.css';

import {
  SHELF,
  SHELF_COPY,
  SHELF_KINDS,
  type ShelfItem,
} from '@/content/shelf';
import { cn } from '@/lib/utils';

import { Cover, Rating, statusLabel, tinted, toneStyle } from './shelf-parts';

const KIND_NAME = { book: 'Book', film: 'Film', show: 'Show' } as const;

/** Everything that is not open now, newest entry first. */
const ITEMS = SHELF.filter((item) => item.status !== 'now');

function Filter() {
  const chips = [
    { id: 'shelf-all', label: SHELF_COPY.all, count: ITEMS.length },
    ...SHELF_KINDS.map(({ kind, label }) => ({
      id: `shelf-${kind}`,
      label,
      count: ITEMS.filter((item) => item.kind === kind).length,
    })),
  ];
  return (
    <fieldset className="mb-8 flex flex-wrap gap-2">
      <legend className="sr-only">Show</legend>
      {chips.map((chip, index) => (
        <label
          key={chip.id}
          className="inline-flex h-9 cursor-pointer items-center gap-2 rounded-full border border-line-strong px-3.5 text-sm font-medium text-soft transition-colors duration-200 select-none hover:text-ink has-checked:border-ink has-checked:bg-ink has-checked:text-bg has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-accent"
        >
          <input
            type="radio"
            name="shelf-kind"
            id={chip.id}
            defaultChecked={index === 0}
            className="sr-only"
          />
          {chip.label}
          <span className="font-mono text-xs opacity-60">{chip.count}</span>
        </label>
      ))}
    </fieldset>
  );
}

function Tile({ item }: { item: ShelfItem }) {
  const status = statusLabel(item);
  return (
    <li data-kind={item.kind} style={toneStyle(item)} className="group/tile">
      <div
        className={cn(
          'relative aspect-[4/5] overflow-hidden rounded-xl border border-line',
          tinted,
        )}
      >
        <div className="absolute inset-[13%_16%] flex items-center justify-center transition-[translate,rotate] duration-500 ease-soft group-hover/tile:-translate-y-1.5 group-hover/tile:-rotate-1 motion-reduce:transition-none">
          <Cover item={item} sizes="(min-width: 1024px) 180px, 40vw" />
        </div>
        {status ? (
          <span className="absolute top-3 left-3 rounded-full bg-bg/80 px-2 py-1 font-mono text-[0.6875rem] leading-none text-soft backdrop-blur-sm">
            {status}
          </span>
        ) : null}
      </div>
      <div className="mt-3 px-0.5">
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="min-w-0 truncate font-medium" title={item.title}>
            {item.title}
          </h3>
          <Rating value={item.rating} />
        </div>
        <p className="mt-0.5 truncate text-sm text-soft">
          {item.by} · {item.year}
        </p>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-faint">
          {item.note}
        </p>
      </div>
    </li>
  );
}

function Row({ item }: { item: ShelfItem }) {
  const status = statusLabel(item);
  return (
    <li
      data-kind={item.kind}
      style={toneStyle(item)}
      className="flex items-center gap-4 rounded-xl px-2 py-3 transition-colors duration-200 hover:bg-card md:gap-5 md:px-3"
    >
      <div
        className={cn(
          'grid h-16 w-20 shrink-0 place-items-center rounded-lg p-1.5',
          tinted,
        )}
      >
        <Cover
          item={item}
          sizes="96px"
          className="max-h-13 max-w-17 shadow-soft"
        />
      </div>
      <div className="min-w-0 flex-1">
        <p className="flex items-baseline gap-2">
          <span className="truncate font-medium">{item.title}</span>
          {status ? (
            <span className="shrink-0 font-mono text-[0.6875rem] text-accent max-sm:hidden">
              {status}
            </span>
          ) : null}
        </p>
        <p className="truncate text-sm text-soft">{item.note}</p>
      </div>
      <div className="hidden w-48 shrink-0 text-sm text-soft md:block">
        <p className="truncate">{item.by}</p>
        <p className="font-mono text-xs text-faint">
          {KIND_NAME[item.kind]} · {item.year}
        </p>
      </div>
      <Rating value={item.rating} />
    </li>
  );
}

/** Every item, filtered by kind. Option `shelfview`: tiles or a list. */
export function ShelfGrid() {
  return (
    <div className="shelf pt-(--section-gap)">
      <Filter />
      <ul
        data-reveal
        className="grid grid-flow-dense grid-cols-2 gap-x-4 gap-y-8 in-data-[shelfview=list]:hidden sm:grid-cols-3 md:gap-x-5 lg:grid-cols-4"
      >
        {ITEMS.map((item) => (
          <Tile key={item.slug} item={item} />
        ))}
      </ul>
      <ul className="hidden in-data-[shelfview=list]:block">
        {ITEMS.map((item) => (
          <Row key={item.slug} item={item} />
        ))}
      </ul>
    </div>
  );
}
