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
import { playSound } from '@/hooks/use-sound';
import { LIGHT_MODES, type LightPreference } from '@/lib/light';
import { setOption } from '@/lib/options-store';
import { cn } from '@/lib/utils';

import { LIGHT_MENU_LABEL } from './footer-content';

export const LIGHT_CHOICES: LightPreference[] = ['auto', ...LIGHT_MODES];

// Each swatch shows the page colour of its mode, so these do not follow the
// theme. Keep them equal to --bg in src/styles/tokens.css.
const SWATCH: Record<LightPreference, string> = {
  auto: 'bg-[linear-gradient(90deg,#fafafa_50%,#0a0a0a_50%)]',
  morning: 'bg-[#faf6f0]',
  day: 'bg-[#ffffff]',
  evening: 'bg-[#1c1815]',
  night: 'bg-[#0a0a0a]',
};

interface LightMenuProps {
  /** The button that opens the menu. It must take a ref and props. */
  children: ReactNode;
}

/** Menu that sets the `light` option: auto, or one pinned mode. */
export function LightMenu({ children }: LightMenuProps) {
  const light = useOption('light');
  const [open, setOpen] = useState(false);

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
            playSound('click');
          }}
        >
          {LIGHT_CHOICES.map((choice) => (
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
