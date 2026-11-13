'use client';

import { useRouter } from 'next/navigation';
import { useMemo } from 'react';

import {
  COMMAND_COPY,
  type CommandGroupName,
  type CommandNote,
} from '@/components/command/command-content';
import type { CommandIconName } from '@/components/command/command-icon';
import { EXTRA_PAGES, NAV_ITEMS } from '@/content/nav';
import { SOCIALS } from '@/content/socials';
import { useOptions } from '@/hooks/use-options';
import { showToast } from '@/hooks/use-toast';
import { brand } from '@/lib/brand';
import { LIGHT_MODES } from '@/lib/light';
import { setOption } from '@/lib/options-store';

export interface CommandEntry {
  group: CommandGroupName;
  name: string;
  /** Matched by the search, not shown. */
  keywords: string;
  icon: CommandIconName;
  hint: string;
  run: () => void;
}

const copy = (text: string, message: string) => async () => {
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    // No clipboard permission. The toast still names what was tried.
  }
  showToast(message);
};

/** Every row of the command menu, in display order. */
export function useCommandItems(notes: CommandNote[]): CommandEntry[] {
  const router = useRouter();
  const { homelab, sound, light } = useOptions();

  return useMemo(() => {
    const pages = [...NAV_ITEMS, ...EXTRA_PAGES].filter(
      ({ when }) => when !== 'homelab:on' || homelab === 'on',
    );
    const soundOff = sound === 'off';

    return [
      ...pages.map(({ label, href, keywords = '' }): CommandEntry => ({
        group: 'Pages',
        name: label,
        keywords,
        icon: 'page',
        hint: 'page',
        run: () => router.push(href),
      })),
      ...notes.map(({ slug, title, date, keywords }): CommandEntry => ({
        group: 'Notes',
        name: title,
        keywords,
        icon: 'note',
        hint: date,
        run: () => router.push(`/notes/${slug}`),
      })),
      {
        group: 'Actions',
        name: COMMAND_COPY.copyLink,
        keywords: 'url share',
        icon: 'link',
        hint: 'copy',
        // Read at run time: the menu stays mounted across page changes.
        run: () => copy(window.location.href, COMMAND_COPY.linkCopied)(),
      },
      {
        group: 'Actions',
        name: COMMAND_COPY.copyEmail,
        keywords: 'contact mail hello',
        icon: 'copy',
        hint: 'copy',
        run: copy(brand.email, COMMAND_COPY.emailCopied),
      },
      {
        group: 'Actions',
        name: soundOff ? COMMAND_COPY.soundOn : COMMAND_COPY.soundOff,
        keywords: 'audio click mute',
        icon: 'gear',
        hint: '',
        run: () => setOption('sound', soundOff ? 'click' : 'off'),
      },
      ...(['auto', ...LIGHT_MODES] as const).map((mode): CommandEntry => ({
        group: 'Light',
        name: `Light: ${mode}`,
        keywords: 'theme dark mode colour',
        icon: 'light',
        hint: light === mode ? COMMAND_COPY.current : '',
        run: () => setOption('light', mode),
      })),
      ...SOCIALS.flatMap(({ name, href }): CommandEntry[] => [
        {
          group: 'Elsewhere',
          name: `Open ${name}`,
          keywords: 'social profile',
          icon: 'out',
          hint: 'open',
          run: () => window.open(href, '_blank', 'noopener'),
        },
        {
          group: 'Elsewhere',
          name: `Copy ${name} link`,
          keywords: 'social profile url',
          icon: 'copy',
          hint: 'copy',
          run: copy(href, `${name} link copied`),
        },
      ]),
    ];
  }, [router, notes, homelab, sound, light]);
}
