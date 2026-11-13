'use client';

import { useEffect } from 'react';

import { CommandDialog } from '@/components/ui/command';
import { toggleCommandMenu, useCommandMenu } from '@/hooks/use-command-menu';
import { useHotkey } from '@/hooks/use-hotkey';
import { playSound } from '@/hooks/use-sound';

import { COMMAND_COPY, type CommandNote } from './command-content';
import { CommandResults } from './command-results';
import { Toast } from './toast';

interface CommandPaletteProps {
  notes: CommandNote[];
}

/** The command menu dialog, its shortcuts and its toast. */
export function CommandPalette({ notes }: CommandPaletteProps) {
  const { open, setOpen } = useCommandMenu();

  useHotkey('k', toggleCommandMenu, { mod: true });
  useHotkey('/', toggleCommandMenu, { ignoreWhileTyping: true });

  useEffect(() => {
    if (open) playSound('open');
  }, [open]);

  return (
    <>
      <CommandDialog
        open={open}
        onOpenChange={setOpen}
        title={COMMAND_COPY.title}
      >
        <CommandResults notes={notes} />
      </CommandDialog>
      <Toast />
    </>
  );
}
