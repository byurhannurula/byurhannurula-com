'use client';

import { useState, type ReactNode } from 'react';

import { FadeStack, type FadePicture } from '@/components/work/fade-stack';
import { WindowFrame } from '@/components/work/window-frame';
import { useFadeStack } from '@/hooks/use-fade-stack';

export interface PreviewRow {
  id: string;
  /** The row, rendered on the server. */
  row: ReactNode;
  /** The picture for the preview area. Its `alt` is also the caption. */
  picture: FadePicture;
}

interface PreviewRowsProps {
  items: PreviewRow[];
}

/**
 * Rows at the left and, on a wide screen, one preview window at the right
 * that shows the picture of the row with the pointer or the focus. The row
 * keeps its mark when the pointer leaves, so the window is never empty.
 */
export function PreviewRows({ items }: PreviewRowsProps) {
  const [active, setActive] = useState(0);
  const { seen, shown, markLoaded } = useFadeStack(active);

  return (
    <div className="grid items-start gap-x-12 md:grid-cols-[minmax(0,1fr)_minmax(0,27rem)] md:in-data-[shots=small]:grid-cols-[minmax(0,1fr)_minmax(0,19rem)]">
      <ul className="grid gap-10 md:gap-1">
        {items.map((item, index) => (
          // oxlint-disable-next-line jsx-a11y/no-noninteractive-element-interactions -- the handlers only pick the preview picture; the links in the row are the controls
          <li
            key={item.id}
            data-active={index === active ? '' : undefined}
            onPointerEnter={() => setActive(index)}
            onFocus={() => setActive(index)}
            className="rounded-xl transition-colors duration-300 ease-soft md:-ml-4 md:px-4 md:py-5 md:data-active:bg-sunk"
          >
            {item.row}
          </li>
        ))}
      </ul>
      {/* Hidden on a phone, so its picture does not load there: each row
          has its own cover in that layout. */}
      <figure className="sticky top-24 hidden md:block">
        <WindowFrame>
          <FadeStack
            pictures={items.map((item) => item.picture)}
            seen={seen}
            shown={shown}
            onLoaded={markLoaded}
            sizes="auto, 27rem"
          />
        </WindowFrame>
        <figcaption className="mt-3 label-mono text-faint">
          {items[shown]?.picture.alt}
        </figcaption>
      </figure>
    </div>
  );
}
