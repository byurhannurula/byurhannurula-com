'use client';

import type { CSSProperties, ReactNode } from 'react';

import { modeVars, OPTION_VARS } from '@/config/design-system';
import { useOptions } from '@/hooks/use-options';
import { isDarkMode, type LightMode } from '@/lib/light';

interface ModeScopeProps {
  mode: LightMode;
  className?: string;
  children: ReactNode;
}

/**
 * Shows its children in one light mode, whatever the page is in. The heading
 * and lines options stay live: their variables are set again here,
 * because a variable made from another one is fixed where it is declared.
 */
export function ModeScope({ mode, className, children }: ModeScopeProps) {
  const options = useOptions();
  const dark = isDarkMode(mode);
  const style = {
    ...modeVars(mode),
    ...OPTION_VARS.heading?.[options.heading],
    ...OPTION_VARS.lines?.[options.lines],
    colorScheme: dark ? 'dark' : 'light',
  } as CSSProperties;

  return (
    <div
      data-light={mode}
      data-theme={dark ? 'dark' : 'light'}
      style={style}
      className={className}
    >
      {children}
    </div>
  );
}
