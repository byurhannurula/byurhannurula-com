import type { ReactNode } from 'react';

import { cn } from '@/lib/utils';

/**
 * Marks content that is not real yet: sample data, draft copy, a missing
 * answer. Search for <SampleTag to find everything to replace before launch.
 */
export function SampleTag({
  children = 'sample',
  className,
}: {
  children?: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        'inline-block rounded-full bg-amber/12 px-2.5 py-1.5 font-mono text-xs leading-none font-medium text-amber',
        className,
      )}
    >
      {children}
    </span>
  );
}
