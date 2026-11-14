'use client';

import { ArrowUp, Volume1 } from 'lucide-react';

import { CommandIcon } from '@/components/command/command-icon';
import { useLightMode } from '@/hooks/use-light-mode';
import { useOption } from '@/hooks/use-options';
import { setOption } from '@/lib/options-store';
import { scrollToTop } from '@/lib/scroll-to-top';

import { FOOTER_COPY } from './footer-content';
import { LightMenu } from './light-menu';

const tool =
  'hidden h-10 items-center md:h-8 gap-[0.4rem] rounded-full whitespace-nowrap border border-line-strong bg-card px-[0.7rem] text-soft [transition:color_.2s,translate_.3s_var(--ease-out-soft)] hover:text-ink [&_svg]:size-3.5';

/** Footer buttons: light, sound and back to top. Options show or hide each. */
export function FooterTools() {
  const light = useOption('light');
  const sound = useOption('sound');
  const mode = useLightMode();
  // A pinned mode names itself: "good evening" at 11:00 would be wrong.
  const lightLabel = !mode
    ? FOOTER_COPY.lightFallback
    : light === 'auto'
      ? `good ${mode}`
      : mode;
  const soundOn = sound !== 'off';

  return (
    <div className="ml-auto flex flex-wrap gap-[0.4rem] in-data-[footer=centre]:ml-0 in-data-[footer=centre]:justify-center">
      <LightMenu>
        <button
          type="button"
          className={`${tool} in-data-[fctl=on]:inline-flex`}
        >
          <CommandIcon name="light" />
          <span>{lightLabel}</span>
        </button>
      </LightMenu>
      <button
        type="button"
        aria-pressed={soundOn}
        onClick={() => setOption('sound', soundOn ? 'off' : 'on')}
        className={`${tool} in-data-[fctl=on]:inline-flex`}
      >
        <Volume1 aria-hidden />
        {FOOTER_COPY.sound} <span>{soundOn ? 'on' : 'off'}</span>
      </button>
      <button
        type="button"
        onClick={scrollToTop}
        className={`${tool} hover:-translate-y-0.5 in-data-[ftop=on]:inline-flex`}
      >
        <ArrowUp aria-hidden />
        {FOOTER_COPY.top}
      </button>
    </div>
  );
}
