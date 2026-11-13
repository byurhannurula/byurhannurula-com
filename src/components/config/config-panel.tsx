'use client';

import { SlidersHorizontal, X } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useRef, useState, useSyncExternalStore } from 'react';

import {
  DEFAULT_OPTIONS,
  OPTION_GROUPS,
  PRESETS,
  type OptionDef,
  type OptionGroup,
  type OptionKey,
} from '@/config/options';
import { useOptions } from '@/hooks/use-options';
import {
  applyPreset,
  changedKeys,
  resetOptions,
  setOption,
} from '@/lib/options-store';
import { cn } from '@/lib/utils';

const GROUPS = Object.keys(OPTION_GROUPS) as OptionGroup[];
const OPEN_KEY = 'site-options-panel';

/** Opens the panel from outside it, for example from the command menu. */
export function openConfigPanel() {
  writeOpen(true);
}

/** The group that matches the page, so the useful settings are in front. */
function groupForPath(pathname: string): OptionGroup {
  if (pathname.startsWith('/about')) return 'About';
  if (pathname.startsWith('/work')) return 'Work';
  if (pathname.startsWith('/notes/')) return 'Post';
  return 'Home';
}

// Open state lives in storage so it survives a reload. A tiny store lets
// React read it without an effect.
const openListeners = new Set<() => void>();
const subscribeOpen = (listener: () => void) => {
  openListeners.add(listener);
  return () => {
    openListeners.delete(listener);
  };
};
function readOpen() {
  try {
    return localStorage.getItem(OPEN_KEY) !== '0';
  } catch {
    return true;
  }
}
function writeOpen(open: boolean) {
  try {
    localStorage.setItem(OPEN_KEY, open ? '1' : '0');
  } catch {
    // The state lasts for this page view only.
  }
  for (const listener of openListeners) listener();
}

const pill =
  'rounded-full px-3 py-2 whitespace-nowrap transition-colors hover:bg-white/10';

/**
 * Floating panel that edits the options. It is a design tool, not a site
 * feature: its colours are fixed, so it reads the same in every light mode.
 */
export function ConfigPanel() {
  const options = useOptions();
  const pathname = usePathname();
  const open = useSyncExternalStore(subscribeOpen, readOpen, () => false);
  // A picked tab holds for the page it was picked on; a new page shows its
  // own group again.
  const [picked, setPicked] = useState<{ path: string; group: OptionGroup }>();
  const group =
    picked?.path === pathname ? picked.group : groupForPath(pathname);
  const [preset, setPreset] = useState('');
  const closeRef = useRef<HTMLButtonElement>(null);
  const pillRef = useRef<HTMLButtonElement>(null);

  const toggle = (next: boolean) => {
    writeOpen(next);
    requestAnimationFrame(() =>
      (next ? closeRef.current : pillRef.current)?.focus(),
    );
  };

  // On a note the contents island owns the bottom of a small screen.
  const lift = pathname.startsWith('/notes/') && 'max-md:bottom-20';
  const changed = changedKeys(options);
  const rows = Object.entries(OPTION_GROUPS[group]) as [OptionKey, OptionDef][];

  if (!open) {
    return (
      <button
        ref={pillRef}
        type="button"
        aria-expanded={false}
        onClick={() => toggle(true)}
        className={cn(
          lift,
          'fixed bottom-4 left-4 z-60 inline-flex h-10.5 items-center gap-2.5 rounded-full bg-[#17171a] px-4 font-mono text-[0.8125rem] text-[#e9e9ec] shadow-[0_18px_44px_-10px_rgb(0_0_0/0.6),0_0_0_1px_rgb(255_255_255/0.09)] transition-transform duration-200 hover:-translate-y-0.5',
        )}
      >
        <SlidersHorizontal aria-hidden className="size-4" />
        Config
        {changed.length > 0 ? (
          <span className="rounded-full bg-[#4ade80] px-1.5 py-0.5 text-[0.6875rem] text-[#0b0b0c]">
            {changed.length}
          </span>
        ) : null}
      </button>
    );
  }

  return (
    <dialog
      open
      aria-label="Design config"
      onKeyDown={(event) => {
        if (event.key === 'Escape') toggle(false);
      }}
      className={cn(
        lift,
        'fixed inset-auto bottom-4 left-4 z-60 m-0 w-132 max-w-[calc(100vw-2rem)] origin-bottom-left animate-pop-in overflow-hidden rounded-[1.25rem] border-0 bg-[#17171a] p-0 font-mono text-[0.8125rem] leading-tight text-[#e9e9ec] shadow-[0_18px_44px_-10px_rgb(0_0_0/0.6),0_0_0_1px_rgb(255_255_255/0.09)]',
      )}
    >
      <div className="flex items-center gap-2.5 py-2.5 pr-2.5 pl-4">
        <b className="text-[0.9375rem] font-medium">Config</b>
        <span className="mr-auto text-[#8f8f98]">
          {changed.length > 0 ? `${changed.length} changed` : 'all defaults'}
        </span>
        <button
          type="button"
          onClick={() => {
            setPreset('');
            resetOptions();
          }}
          className={cn(pill, 'bg-white/8')}
        >
          reset all
        </button>
        <button
          ref={closeRef}
          type="button"
          aria-label="Close config"
          onClick={() => toggle(false)}
          className="grid size-8.5 place-items-center rounded-full bg-white/8 hover:bg-white/16"
        >
          <X aria-hidden className="size-3.5" />
        </button>
      </div>

      <div className="flex flex-wrap items-center gap-1 border-b border-white/8 px-2.5 pb-3">
        <span className="px-2 text-[#8f8f98]">preset</span>
        {Object.keys(PRESETS).map((name) => (
          <button
            key={name}
            type="button"
            aria-pressed={preset === name}
            onClick={() => {
              setPreset(name);
              applyPreset(name);
            }}
            className={cn(
              pill,
              'bg-white/8 aria-pressed:bg-white aria-pressed:text-[#0b0b0c]',
            )}
          >
            {name}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-[8.25rem_1fr]">
        <div
          role="tablist"
          aria-label="Option groups"
          className="flex gap-0.5 overflow-x-auto border-b border-white/8 p-2 sm:flex-col sm:border-r sm:border-b-0"
        >
          {GROUPS.map((name) => {
            const count = Object.keys(OPTION_GROUPS[name]).filter((key) =>
              changed.includes(key as OptionKey),
            ).length;
            return (
              <button
                key={name}
                type="button"
                role="tab"
                aria-selected={group === name}
                onClick={() => setPicked({ path: pathname, group: name })}
                className="flex items-center justify-between gap-2 rounded-[0.65rem] px-3 py-2 text-left text-[#8f8f98] hover:text-[#e9e9ec] aria-selected:bg-white/10 aria-selected:text-white"
              >
                {name}
                <span className="text-xs text-[#4ade80]">{count || ''}</span>
              </button>
            );
          })}
        </div>

        <div className="flex h-[min(25rem,56vh)] flex-col gap-3 overflow-y-auto px-3 pt-3 pb-4">
          {rows.map(([key, option]) => {
            const isChanged = options[key] !== DEFAULT_OPTIONS[key];
            return (
              <div key={key}>
                <div className="flex items-center gap-2 px-1.5 pb-1.5 text-[#8f8f98]">
                  <span className={cn(isChanged && 'text-[#e9e9ec]')}>
                    {option.label}
                  </span>
                  {isChanged ? (
                    <button
                      type="button"
                      onClick={() => setOption(key, DEFAULT_OPTIONS[key])}
                      className="text-[#4ade80] hover:underline"
                    >
                      reset
                    </button>
                  ) : null}
                </div>
                <div className="flex w-fit max-w-full flex-wrap gap-0.5 rounded-[1.1rem] bg-white/5 p-1">
                  {option.choices.map(([value, label]) => (
                    <button
                      key={value}
                      type="button"
                      aria-pressed={options[key] === value}
                      onClick={() => {
                        setPreset('');
                        setOption(key, value);
                      }}
                      className={cn(
                        pill,
                        'aria-pressed:bg-[#4ade80] aria-pressed:text-[#0b0b0c]',
                      )}
                    >
                      {label ?? value}
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </dialog>
  );
}
