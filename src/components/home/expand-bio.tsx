'use client';

import { useId, type ReactNode } from 'react';

import type { ExpandKey, ExpandPart } from '@/content/home';
import { useExpandable } from '@/hooks/use-expandable';
import { playSound } from '@/hooks/use-sound';

interface ExpandBioProps {
  sentences: ExpandPart[][];
  /** What opens under a sentence for each marked word. */
  panels: Record<ExpandKey, ReactNode>;
  hint: string;
}

/** Sentences with marked words. A click opens a panel under the sentence. */
export function ExpandBio({ sentences, panels, hint }: ExpandBioProps) {
  const id = useId();
  const { isOpen, toggle } = useExpandable<ExpandKey>();

  return (
    <div className="hidden max-w-[24em] text-[clamp(1.5rem,3vw,2.25rem)] leading-[1.35] font-medium tracking-[-0.025em] in-data-[hero=expand]:block">
      {sentences.map((parts) => {
        const keys = parts.flatMap((part) =>
          typeof part === 'string' ? [] : [part.key],
        );
        return (
          <div key={keys.join('-')}>
            <p className="mb-[0.8em]">
              {parts.map((part) =>
                typeof part === 'string' ? (
                  part
                ) : (
                  <button
                    key={part.key}
                    type="button"
                    aria-expanded={isOpen(part.key)}
                    aria-controls={`${id}-${part.key}`}
                    onClick={() =>
                      playSound(toggle(part.key) ? 'open' : 'close')
                    }
                    className="rounded-[0.4em] bg-sunk px-[0.35em] py-[0.02em] transition-[background-color,color,box-shadow] duration-200 hover:bg-accent-soft hover:text-accent aria-expanded:bg-transparent aria-expanded:shadow-[inset_0_-2px_0_var(--accent-bright)] aria-expanded:hover:bg-transparent"
                  >
                    {part.text}
                  </button>
                ),
              )}
            </p>
            {keys.map((key) => (
              <div
                key={key}
                id={`${id}-${key}`}
                // A closed panel keeps its links out of the tab order.
                inert={!isOpen(key)}
                data-open={isOpen(key) ? '' : undefined}
                className="group/x grid grid-rows-[0fr] transition-[grid-template-rows] duration-500 ease-soft data-open:grid-rows-[1fr]"
              >
                <div className="min-h-0 overflow-hidden">
                  <p className="mb-[1.2em] max-w-[36em] -translate-y-1.5 border-l-2 border-accent-bright pl-4 text-[0.7em] leading-[1.55] font-normal tracking-[-0.012em] text-soft opacity-0 blur-[6px] transition-[opacity,filter,translate] duration-400 ease-soft group-data-open/x:translate-y-0 group-data-open/x:opacity-100 group-data-open/x:blur-none group-data-open/x:delay-120">
                    {panels[key]}
                  </p>
                </div>
              </div>
            ))}
          </div>
        );
      })}
      <span className="mt-2 block font-mono text-xs leading-none tracking-normal text-faint">
        {hint}
      </span>
    </div>
  );
}
