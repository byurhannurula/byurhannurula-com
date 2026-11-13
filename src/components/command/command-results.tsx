'use client';

import { Search } from 'lucide-react';

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  Kbd,
} from '@/components/ui/command';
import { setCommandMenuOpen } from '@/hooks/use-command-menu';
import { useCommandItems } from '@/hooks/use-command-items';

import {
  COMMAND_COPY,
  COMMAND_GROUPS,
  type CommandNote,
} from './command-content';
import { CommandIcon } from './command-icon';

/** A row matches when it holds every word of the search, in any order. */
function matchAllWords(value: string, search: string, keywords?: string[]) {
  const haystack = `${value} ${keywords?.join(' ') ?? ''}`.toLowerCase();
  const words = search.toLowerCase().split(/\s+/).filter(Boolean);
  return words.every((word) => haystack.includes(word)) ? 1 : 0;
}

interface CommandResultsProps {
  notes: CommandNote[];
}

/** The search field and the grouped rows. It mounts when the menu opens. */
export function CommandResults({ notes }: CommandResultsProps) {
  const items = useCommandItems(notes);

  return (
    <Command filter={matchAllWords} label={COMMAND_COPY.title} loop>
      <div className="flex items-center gap-3 border-b border-line px-[1.1rem] py-[0.95rem]">
        <Search aria-hidden className="size-[1.1rem] shrink-0 text-faint" />
        <CommandInput
          placeholder={COMMAND_COPY.placeholder}
          aria-label={COMMAND_COPY.placeholder}
          autoComplete="off"
          spellCheck={false}
        />
        <Kbd>esc</Kbd>
      </div>
      <CommandList aria-label={COMMAND_COPY.results}>
        <CommandEmpty>{COMMAND_COPY.empty}</CommandEmpty>
        {COMMAND_GROUPS.map((group) => {
          const rows = items.filter((item) => item.group === group);
          if (rows.length === 0) return null;
          return (
            <CommandGroup key={group} heading={group}>
              {rows.map(({ name, keywords, icon, hint, run }) => (
                <CommandItem
                  key={name}
                  // The group name is part of the value, so "light" or
                  // "pages" finds the whole group.
                  value={`${name} ${group}`}
                  keywords={[keywords]}
                  onSelect={() => {
                    setCommandMenuOpen(false);
                    run();
                  }}
                >
                  <CommandIcon name={icon} />
                  {name}
                  <small className="ml-auto font-mono text-xs leading-none text-faint">
                    {hint}
                  </small>
                </CommandItem>
              ))}
            </CommandGroup>
          );
        })}
      </CommandList>
      <div className="flex gap-5 border-t border-line px-[1.1rem] py-[0.6rem] font-mono text-xs leading-[1.6] text-faint">
        <span>
          <Kbd>&uarr;</Kbd> <Kbd>&darr;</Kbd> {COMMAND_COPY.move}
        </span>
        <span>
          <Kbd>&crarr;</Kbd> {COMMAND_COPY.select}
        </span>
      </div>
    </Command>
  );
}
