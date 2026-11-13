'use client';

import { Fragment, type ReactNode } from 'react';

import { BIO_EXPAND, BIO_EXPAND_HINT, type BioPanelKey } from '@/content/about';
import { useOpenSet } from '@/hooks/use-open-set';
import { playSound } from '@/hooks/use-sound';

interface ExpandBioProps {
  /** What each marked word opens. Rendered on the server. */
  panels: Record<BioPanelKey, ReactNode>;
}

/** Two sentences. A marked word opens a short paragraph under its sentence. */
export function ExpandBio({ panels }: ExpandBioProps) {
  const { isOpen, toggle } = useOpenSet<BioPanelKey>();

  return (
    <div className="max-w-[24em] text-[clamp(1.5rem,3vw,2.25rem)] leading-[1.35] font-medium tracking-[-0.025em]">
      {BIO_EXPAND.map((sentence) => (
        <Fragment key={sentence.panels.join()}>
          <p className="mb-[0.8em]">
            {sentence.parts.map((part) =>
              typeof part === 'string' ? (
                part
              ) : (
                <button
                  key={part.key}
                  type="button"
                  aria-expanded={isOpen(part.key)}
                  aria-controls={`bio-panel-${part.key}`}
                  onClick={() => playSound(toggle(part.key) ? 'open' : 'close')}
                  className="rounded-[0.4em] bg-sunk px-[0.35em] py-[0.02em] transition-[background-color,color,box-shadow] duration-200 hover:bg-accent-soft hover:text-accent aria-expanded:bg-transparent aria-expanded:shadow-[inset_0_-2px_0_var(--accent-bright)] aria-expanded:hover:bg-transparent"
                >
                  {part.text}
                </button>
              ),
            )}
          </p>
          {sentence.panels.map((key) => (
            <div
              key={key}
              id={`bio-panel-${key}`}
              data-open={isOpen(key) ? '' : undefined}
              className="group/panel grid grid-rows-[0fr] transition-[grid-template-rows] duration-500 ease-soft data-open:grid-rows-[1fr]"
            >
              {/* inert: a closed panel must not take focus through its links. */}
              <div className="min-h-0 overflow-hidden" inert={!isOpen(key)}>
                <p className="mb-[1.2em] max-w-[36em] -translate-y-1.5 border-l-2 border-accent-bright pl-4 text-[0.7em] leading-[1.55] font-normal tracking-[-0.012em] text-soft opacity-0 blur-[6px] transition-[opacity,filter,translate] duration-400 ease-soft group-data-open/panel:translate-y-0 group-data-open/panel:opacity-100 group-data-open/panel:blur-none group-data-open/panel:delay-120">
                  {panels[key]}
                </p>
              </div>
            </div>
          ))}
        </Fragment>
      ))}
      <span className="mt-2 block font-mono text-xs leading-none tracking-normal text-faint">
        {BIO_EXPAND_HINT}
      </span>
    </div>
  );
}
