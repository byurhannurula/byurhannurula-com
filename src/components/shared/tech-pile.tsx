'use client';

import { useState } from 'react';

import { techIconUrl } from '@/components/shared/tech';
import { useSound } from '@/hooks/use-sound';
import { cn } from '@/lib/utils';

interface TechPileProps {
  names: string[];
  className?: string;
}

/**
 * Overlapping icon circles that spread and show their names on click.
 * It keeps a long stack to one line until the reader asks for it.
 */
export function TechPile({ names, className }: TechPileProps) {
  const [open, setOpen] = useState(false);
  const play = useSound();

  return (
    <button
      type="button"
      aria-expanded={open}
      aria-label={`${names.length} tools: ${names.join(', ')}`}
      onClick={() => {
        setOpen(!open);
        play(open ? 'close' : 'open');
      }}
      className={cn(
        'group/pile inline-flex flex-wrap items-center gap-y-2 pl-2 text-left',
        className,
      )}
    >
      {names.map((name, index) => {
        const icon = techIconUrl(name);
        return (
          <span
            key={name}
            style={{ transitionDelay: `${index * 18}ms` }}
            className={cn(
              'inline-flex h-8.5 min-w-8.5 items-center justify-center rounded-full bg-card px-2 shadow-[0_0_0_1px_var(--line-strong)] transition-[margin,padding] duration-450 ease-soft',
              open ? 'mr-1.5 gap-1.5 px-3' : '-ml-2',
            )}
          >
            {icon ? (
              // oxlint-disable-next-line nextjs/no-img-element
              <img src={icon} alt="" loading="lazy" className="size-4" />
            ) : (
              <span className="font-mono text-[0.625rem]">
                {name.slice(0, 2)}
              </span>
            )}
            <span
              className={cn(
                'overflow-hidden text-sm font-medium whitespace-nowrap transition-[max-width,opacity] duration-450 ease-soft',
                open ? 'max-w-40 opacity-100' : 'max-w-0 opacity-0',
              )}
            >
              {name}
            </span>
          </span>
        );
      })}
      <span
        className={cn(
          'label-mono ml-3 text-faint transition-opacity group-hover/pile:text-ink',
          open && 'opacity-0',
        )}
      >
        {names.length} tools
      </span>
    </button>
  );
}
