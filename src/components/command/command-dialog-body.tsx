'use client';

import { CommandDialog } from '@/components/ui/command';
import { useCommandMenu } from '@/hooks/use-command-menu';

import { COMMAND_COPY, type CommandNote } from './command-content';
import { CommandResults } from './command-results';

interface CommandDialogBodyProps {
  notes: CommandNote[];
}

/** The dialog and its rows: the part that needs cmdk. Loaded on demand. */
export function CommandDialogBody({ notes }: CommandDialogBodyProps) {
  const { open, setOpen } = useCommandMenu();
  return (
    <CommandDialog
      open={open}
      onOpenChange={setOpen}
      title={COMMAND_COPY.title}
    >
      <CommandResults notes={notes} />
    </CommandDialog>
  );
}
