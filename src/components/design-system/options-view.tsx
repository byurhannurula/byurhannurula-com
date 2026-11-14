'use client';

import { Button } from '@/components/ui/button';
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

import { Group } from './bits';

const GROUPS = Object.keys(OPTION_GROUPS) as OptionGroup[];

/**
 * Every option of src/config/options.ts on one page, with its current value.
 * A click on a choice sets it; the presets set many at once. It is a second,
 * larger view of the config panel.
 */
export function OptionsView() {
  const options = useOptions();
  const changed = changedKeys(options);

  return (
    <>
      <Group
        title="presets"
        note="A preset is the defaults plus a few changes. Light mode, copy and the homelab page stay as you set them."
      >
        <div className="flex flex-wrap items-center gap-2">
          {Object.keys(PRESETS).map((name) => (
            <Button
              key={name}
              variant="outline"
              size="sm"
              onClick={() => applyPreset(name)}
            >
              {name}
            </Button>
          ))}
          <Button
            variant="ghost"
            size="sm"
            disabled={changed.length === 0}
            onClick={resetOptions}
          >
            reset all
          </Button>
          <span aria-live="polite" className="ml-1 label-mono text-faint">
            {changed.length > 0 ? `${changed.length} changed` : 'all defaults'}
          </span>
        </div>
      </Group>

      {GROUPS.map((group) => {
        const entries = Object.entries(OPTION_GROUPS[group]) as [
          OptionKey,
          OptionDef,
        ][];
        return (
          <Group key={group} title={group.toLowerCase()}>
            <ul className="grid gap-x-10 gap-y-7 sm:grid-cols-2">
              {entries.map(([key, option]) => {
                const isChanged = options[key] !== DEFAULT_OPTIONS[key];
                return (
                  <li key={key} className="min-w-0">
                    <p className="flex flex-wrap items-baseline gap-x-2.5">
                      <span className="text-[0.9375rem] font-medium">
                        {option.label}
                      </span>
                      <code className="font-mono text-xs text-faint">
                        {key}
                      </code>
                      {isChanged ? (
                        <button
                          type="button"
                          onClick={() => setOption(key, DEFAULT_OPTIONS[key])}
                          className="font-mono text-xs text-accent hover:underline"
                        >
                          reset
                        </button>
                      ) : null}
                    </p>
                    <fieldset
                      aria-label={option.label}
                      className="mt-2 flex min-w-0 flex-wrap gap-1.5"
                    >
                      {option.choices.map(([value, label]) => (
                        <button
                          key={value}
                          type="button"
                          aria-pressed={options[key] === value}
                          onClick={() => setOption(key, value)}
                          className="min-h-9 rounded-full bg-sunk px-3.5 text-[0.875rem] whitespace-nowrap text-soft transition-colors duration-200 hover:text-ink aria-pressed:bg-ink aria-pressed:text-bg"
                        >
                          {label ?? value}
                        </button>
                      ))}
                    </fieldset>
                  </li>
                );
              })}
            </ul>
          </Group>
        );
      })}
    </>
  );
}
