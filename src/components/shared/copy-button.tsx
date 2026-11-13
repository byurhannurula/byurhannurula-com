'use client';

import type { ReactNode } from 'react';

import { useCopy } from '@/hooks/use-copy';
import { cn } from '@/lib/utils';

interface CopyButtonProps {
  text: string;
  /** Shown after a copy. */
  copiedLabel?: ReactNode;
  className?: string;
  children: ReactNode;
}

/** A button that copies `text` and swaps its label for a moment. */
export function CopyButton({
  text,
  copiedLabel = 'Copied',
  className,
  children,
}: CopyButtonProps) {
  const { copied, copy } = useCopy();
  return (
    <button type="button" onClick={() => copy(text)} className={cn(className)}>
      <span aria-live="polite">{copied ? copiedLabel : children}</span>
    </button>
  );
}
