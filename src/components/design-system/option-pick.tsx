'use client';

import type { ReactNode } from 'react';

import type { OptionKey } from '@/config/options';
import { useOption } from '@/hooks/use-options';
import { setOption } from '@/lib/options-store';
import { cn } from '@/lib/utils';

interface OptionPickProps {
  optionKey: OptionKey;
  value: string;
  /** Replaces the default words, "use" and "current". */
  children?: ReactNode;
  className?: string;
}

/** A small button that sets one option to one value for the whole site. */
export function OptionPick({
  optionKey,
  value,
  children,
  className,
}: OptionPickProps) {
  const current = useOption(optionKey) === value;
  return (
    <button
      type="button"
      aria-pressed={current}
      aria-label={
        children ? undefined : `Set the ${optionKey} option to ${value}`
      }
      onClick={() => setOption(optionKey, value)}
      className={cn(
        'inline-flex min-h-8 items-center gap-1.5 rounded-full bg-sunk px-3 font-mono text-xs leading-none text-soft transition-colors duration-200 hover:text-ink aria-pressed:bg-ink aria-pressed:text-bg',
        className,
      )}
    >
      {children ?? (current ? 'current' : 'use')}
    </button>
  );
}
