'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

import { toggleCommandMenu, useCommandMenu } from '@/hooks/use-command-menu';
import { useHotkey } from '@/hooks/use-hotkey';
import { playSound } from '@/hooks/use-sound';

import type { CommandNote } from './command-content';
import { Toast } from './toast';

// cmdk and the dialog stay out of first load. They come with the first open.
const CommandDialogBody = dynamic(
  () => import('./command-dialog-body').then((m) => m.CommandDialogBody),
  { ssr: false },
);

interface CommandPaletteProps {
  notes: CommandNote[];
}

/** The command menu: its shortcuts, its toast and the lazy dialog. */
export function CommandPalette({ notes }: CommandPaletteProps) {
  const { open } = useCommandMenu();
  // Stays true after the first open, so the dialog can animate out.
  const [wanted, setWanted] = useState(false);
  if (open && !wanted) setWanted(true);

  useHotkey('k', toggleCommandMenu, { mod: true });
  useHotkey('/', toggleCommandMenu, { ignoreWhileTyping: true });

  useEffect(() => {
    if (open) playSound('open');
  }, [open]);

  return (
    <>
      {wanted && <CommandDialogBody notes={notes} />}
      <Toast />
    </>
  );
}
