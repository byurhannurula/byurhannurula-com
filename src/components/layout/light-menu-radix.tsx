'use client';

import { useEffect, useState, type ReactNode } from 'react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useOption } from '@/hooks/use-options';
import { LIGHT_MODES, type LightPreference } from '@/lib/light';
import { setOption } from '@/lib/options-store';
import { cn } from '@/lib/utils';

import { LIGHT_MENU_LABEL } from './footer-content';

// Each swatch shows the page colour of its mode, so these do not follow the
// theme. Keep them equal to --bg in src/styles/tokens.css.
const SWATCH: Record<LightPreference, string> = {
  auto: 'bg-[linear-gradient(90deg,#fafafa_50%,#0a0a0a_50%)]',
  morning: 'bg-[#faf6f0]',
  day: 'bg-[#ffffff]',
  evening: 'bg-[#1c1815]',
  night: 'bg-[#0a0a0a]',
};

export interface LightMenuProps {
  /** The button that opens the menu. It must take a ref and props. */
  children: ReactNode;
  /** Open on mount: the first click came before this code loaded. */
  defaultOpen?: boolean;
}

/** Menu that sets the `light` option: auto, or one pinned mode. */
export function LightMenuRadix({
  children,
  defaultOpen = false,
}: LightMenuProps) {
  const light = useOption('light');
  const [open, setOpen] = useState(defaultOpen);

  useEffect(() => {
    if (!open) return;
    // The page scrolls under the menu, and the nav bar can hide. Close it.
    const close = () => setOpen(false);
    window.addEventListener('scroll', close, { passive: true });
    return () => window.removeEventListener('scroll', close);
  }, [open]);

  return (
    <DropdownMenu open={open} onOpenChange={setOpen} modal={false}>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent align="end" aria-label={LIGHT_MENU_LABEL}>
        <DropdownMenuLabel>{LIGHT_MENU_LABEL.toLowerCase()}</DropdownMenuLabel>
        <DropdownMenuRadioGroup
          value={light}
          onValueChange={(value) => {
            setOption('light', value);
          }}
        >
          {(['auto', ...LIGHT_MODES] as LightPreference[]).map((choice) => (
            <DropdownMenuRadioItem key={choice} value={choice}>
              <span
                aria-hidden
                className={cn(
                  'size-[0.85rem] shrink-0 rounded-full shadow-[0_0_0_1px_var(--line-strong)]',
                  SWATCH[choice],
                )}
              />
              {choice}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
