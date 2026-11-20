'use client';

import { Briefcase, Sparkles } from 'lucide-react';

import { useOption } from '@/hooks/use-options';
import { setOption } from '@/lib/options-store';
import { transition } from '@/lib/view-transition';

/**
 * Work or personal: the same site in two moods. Personal mode shows the
 * tinkerer copy, colour marks and a hello in the hero. The page fades
 * between the two with the `pagefx` transition.
 */
export function ModeSwitch() {
  const personal = useOption('mode') === 'personal';
  return (
    <button
      type="button"
      role="switch"
      aria-checked={personal}
      aria-label="Personal mode"
      title={personal ? 'Switch to work mode' : 'Switch to personal mode'}
      onClick={() =>
        transition('page', () =>
          setOption('mode', personal ? 'work' : 'personal'),
        )
      }
      className="group/mode relative mx-1 grid h-8 w-[3.75rem] shrink-0 grid-cols-2 place-items-center rounded-full bg-sunk text-faint shadow-[inset_0_0_0_1px_var(--line)] transition-colors duration-300 hover:text-soft aria-checked:bg-accent/15 [&_svg]:relative [&_svg]:z-1 [&_svg]:size-[0.95rem]"
    >
      <span
        aria-hidden
        className="absolute top-1 left-1 size-6 rounded-full bg-card shadow-[0_1px_3px_rgb(0_0_0/0.25)] transition-[translate,background-color] duration-400 ease-soft group-aria-checked/mode:translate-x-[1.75rem] group-aria-checked/mode:bg-accent motion-reduce:transition-none"
      />
      <Briefcase
        aria-hidden
        className="text-ink transition-colors duration-300 group-aria-checked/mode:text-faint"
      />
      <Sparkles
        aria-hidden
        className="transition-colors duration-300 group-aria-checked/mode:text-bg"
      />
    </button>
  );
}
