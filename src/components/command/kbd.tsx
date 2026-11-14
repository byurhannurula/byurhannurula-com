import type { ComponentProps } from 'react';

import { cn } from '@/lib/utils';

/**
 * A key cap, for shortcut hints. The same look as `Kbd` in ui/command, but
 * that file imports cmdk, and the nav bar must not pull cmdk into first load.
 */
export function Kbd({ className, ...props }: ComponentProps<'kbd'>) {
  return (
    <kbd
      className={cn(
        'rounded-[0.35rem] border border-line-strong px-[0.35rem] py-[0.2rem] font-mono text-[0.6875rem] leading-none font-normal text-faint',
        className,
      )}
      {...props}
    />
  );
}
