'use client';

import { ChevronUp } from 'lucide-react';
import type { ReactNode } from 'react';

import { useSingleOpen } from '@/hooks/use-single-open';
import { playSound } from '@/hooks/use-sound';
import { cn } from '@/lib/utils';

export interface AccordionEntry {
  id: string;
  /** Content of the row button. Phrasing content only. */
  head: ReactNode;
  body: ReactNode;
}

interface AccordionGroupProps {
  items: AccordionEntry[];
  /** Open at first. */
  defaultOpen?: string;
}

/**
 * Rows that expand, one at a time. Only the open state lives here: heads
 * and bodies are rendered on the server and passed in.
 */
export function AccordionGroup({ items, defaultOpen }: AccordionGroupProps) {
  const [openId, toggle] = useSingleOpen(defaultOpen);

  return (
    <>
      {items.map(({ id, head, body }) => {
        const open = openId === id;
        return (
          <article key={id} className="border-t border-line last:border-b">
            <h3>
              <button
                type="button"
                id={`acc-head-${id}`}
                aria-expanded={open}
                aria-controls={`acc-body-${id}`}
                onClick={() => {
                  toggle(id);
                  playSound(open ? 'close' : 'open');
                }}
                className="group/head flex w-full items-center gap-4 py-[1.2rem] text-left"
              >
                {head}
                <ChevronUp
                  aria-hidden
                  strokeWidth={1.8}
                  className="size-4 flex-none rotate-180 transition-[rotate] duration-400 ease-soft group-aria-expanded/head:rotate-0"
                />
              </button>
            </h3>
            {/* 0fr to 1fr animates to the content height with no measuring. */}
            <div
              id={`acc-body-${id}`}
              // Closed content must not take focus or be read.
              inert={!open}
              className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-550 ease-soft data-open:grid-rows-[1fr]"
              data-open={open ? '' : undefined}
            >
              {/* Closed content is not rendered at all, so its lazy pictures
                  do not load. The discrete transition keeps it rendered
                  until the row has closed. */}
              <div
                className={cn(
                  'min-h-0 overflow-hidden transition-[content-visibility] duration-550 transition-discrete',
                  !open && '[content-visibility:hidden]',
                )}
              >
                {body}
              </div>
            </div>
          </article>
        );
      })}
    </>
  );
}
