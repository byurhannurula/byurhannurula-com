'use client';

import { useId, useState, type ReactNode } from 'react';

import { CopyButton } from '@/components/shared/copy-button';
import { BIO_SWITCH, type BioLength } from '@/content/about';
import { cn } from '@/lib/utils';

interface BioSwitchProps {
  /** Markup for each length. Rendered on the server. */
  panels: Record<BioLength, ReactNode>;
  /** The same text as plain text, for the copy button. */
  texts: Record<BioLength, string>;
}

const LENGTHS = Object.keys(BIO_SWITCH.labels) as BioLength[];

/** A short and a long bio with a two-way switch and a copy button. Option: `bio=switch`. */
export function BioSwitch({ panels, texts }: BioSwitchProps) {
  const name = useId();
  const [length, setLength] = useState<BioLength>('short');

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center gap-3">
        {/* Native radios: the arrow keys and the group semantics come free. */}
        <fieldset className="inline-flex rounded-full bg-sunk p-1">
          <legend className="sr-only">{BIO_SWITCH.legend}</legend>
          {LENGTHS.map((value) => (
            <label
              key={value}
              className="cursor-pointer rounded-full px-4 py-2 font-mono text-xs leading-none text-soft transition-[background-color,color,box-shadow] duration-250 ease-soft hover:text-ink has-checked:bg-card has-checked:text-ink has-checked:shadow-soft has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-accent-bright max-md:py-3.5"
            >
              <input
                type="radio"
                name={name}
                value={value}
                checked={length === value}
                onChange={() => setLength(value)}
                className="sr-only"
              />
              {BIO_SWITCH.labels[value]}
            </label>
          ))}
        </fieldset>
        <CopyButton
          text={texts[length]}
          className="rounded-full px-3 py-2 font-mono text-xs leading-none text-faint transition-colors duration-200 hover:text-ink max-md:py-3.5"
        >
          {BIO_SWITCH.copy}
        </CopyButton>
      </div>

      {LENGTHS.map((value) => (
        // Both panels stay in the page. One row grows while the other
        // shrinks, so the height moves in one calm step.
        <div
          key={value}
          data-open={length === value ? '' : undefined}
          className="group/bio grid grid-rows-[0fr] transition-[grid-template-rows] duration-500 ease-soft data-open:grid-rows-[1fr]"
        >
          <div
            inert={length !== value}
            className={cn(
              'min-h-0 overflow-hidden opacity-0 transition-opacity duration-300 ease-soft',
              'group-data-open/bio:opacity-100 group-data-open/bio:delay-150',
            )}
          >
            {panels[value]}
          </div>
        </div>
      ))}
    </div>
  );
}
