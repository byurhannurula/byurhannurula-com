import {
  DEFAULT_OPTIONS,
  isValidChoice,
  OPTION_KEYS,
  OPTIONS_STORAGE_KEY,
  PRESET_KEEPS,
  PRESETS,
  type OptionKey,
  type Options,
} from '@/config/options';
import { isDarkMode, resolveLight } from '@/lib/light';

/**
 * Client store for the options. It is a module, not a context, so a server
 * page needs no provider: `useSyncExternalStore` reads it where needed.
 * The attributes on `<html>` are the output; CSS reads those.
 */

type Listener = () => void;

let options: Options = DEFAULT_OPTIONS;
let loaded = false;
const listeners = new Set<Listener>();

function read(): Options {
  const next = { ...DEFAULT_OPTIONS };
  try {
    const saved: unknown = JSON.parse(
      localStorage.getItem(OPTIONS_STORAGE_KEY) ?? '{}',
    );
    if (saved && typeof saved === 'object') {
      for (const key of OPTION_KEYS) {
        const value = (saved as Record<string, unknown>)[key];
        if (isValidChoice(key, value)) next[key] = value;
      }
    }
  } catch {
    // Private mode or a broken value: the defaults are correct.
  }
  return next;
}

function write(next: Options) {
  try {
    localStorage.setItem(OPTIONS_STORAGE_KEY, JSON.stringify(next));
  } catch {
    // The choice lasts for this page view only.
  }
}

function paint(next: Options) {
  const root = document.documentElement;
  for (const key of OPTION_KEYS) {
    if (key !== 'light') root.dataset[key] = next[key];
  }
  // `light` holds the resolved mode, not the preference: CSS has no clock.
  const mode = resolveLight(next.light);
  root.dataset.light = mode;
  root.dataset.theme = isDarkMode(mode) ? 'dark' : 'light';
}

function commit(next: Options) {
  options = next;
  write(next);
  paint(next);
  for (const listener of listeners) listener();
}

export function subscribe(listener: Listener) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function getOptions(): Options {
  if (!loaded && typeof window !== 'undefined') {
    options = read();
    loaded = true;
  }
  return options;
}

export const getServerOptions = (): Options => DEFAULT_OPTIONS;

export function setOption(key: OptionKey, value: string) {
  if (!isValidChoice(key, value)) return;
  commit({ ...getOptions(), [key]: value });
}

export function resetOptions() {
  commit({ ...DEFAULT_OPTIONS });
}

export function applyPreset(name: string) {
  const preset = PRESETS[name];
  if (!preset) return;
  const current = getOptions();
  const kept = Object.fromEntries(
    PRESET_KEEPS.map((key) => [key, current[key]]),
  );
  commit({ ...DEFAULT_OPTIONS, ...preset, ...kept });
}

/** Under `auto` the mode changes with the hour; call this on a timer. */
export function repaintLight() {
  paint(getOptions());
}

export function changedKeys(current: Options): OptionKey[] {
  return OPTION_KEYS.filter((key) => current[key] !== DEFAULT_OPTIONS[key]);
}
