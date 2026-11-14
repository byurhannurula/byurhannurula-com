import type { CSSProperties, ReactNode } from 'react';

import { OPTION_VARS } from '@/config/design-system';
import type { OptionKey } from '@/config/options';
import { cn } from '@/lib/utils';

interface GroupProps {
  title: string;
  note?: ReactNode;
  children: ReactNode;
}

/** A block inside a section, under a small mono title. */
export function Group({ title, note, children }: GroupProps) {
  return (
    <div className="mt-16 first:mt-0">
      <h3 className="label-mono text-faint">{title}</h3>
      {note ? (
        <p className="mt-2 max-w-[38rem] text-[0.9375rem] text-soft">{note}</p>
      ) : null}
      <div className="mt-8">{children}</div>
    </div>
  );
}

interface SpecimenProps {
  name: ReactNode;
  /** One line: when to use it. */
  use?: ReactNode;
  /** Small mono lines under the text: a source, a value, the options. */
  meta?: ReactNode;
  /** Name above the example, for an example that needs the full width. */
  wide?: boolean;
  children: ReactNode;
}

/** One thing: its name and use at the left, a live example at the right. */
export function Specimen({ name, use, meta, wide, children }: SpecimenProps) {
  return (
    <div
      className={cn(
        'grid gap-x-10 gap-y-4',
        !wide && 'md:grid-cols-[13rem_1fr]',
      )}
    >
      <div className={cn(wide && 'max-w-[38rem]')}>
        <h4 className="label-mono text-ink">{name}</h4>
        {use ? (
          <p className="mt-1 text-[0.875rem] leading-snug text-soft">{use}</p>
        ) : null}
        {meta ? (
          <p className="mt-1.5 flex flex-wrap gap-x-3 font-mono text-xs leading-normal text-faint">
            {meta}
          </p>
        ) : null}
      </div>
      <div className="min-w-0">{children}</div>
    </div>
  );
}

interface OptionScopeProps {
  optionKey: OptionKey;
  value: string;
  className?: string;
  children: ReactNode;
}

/**
 * Shows its children with one option set to one value. The attribute serves
 * `in-data-[key=value]:` classes; the inline variables serve the options
 * that are CSS variables, because their default lives on `:root` only.
 */
export function OptionScope({
  optionKey,
  value,
  className,
  children,
}: OptionScopeProps) {
  return (
    <div
      {...{ [`data-${optionKey}`]: value }}
      style={OPTION_VARS[optionKey]?.[value] as CSSProperties | undefined}
      className={className}
    >
      {children}
    </div>
  );
}
