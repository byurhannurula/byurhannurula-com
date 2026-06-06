// Single source of truth for the design tokens the playground can edit, plus
// helpers to read/set them on an element and serialize them to a copyable
// :root{}/.dark{} CSS block. Mirrors the variables defined in app/globals.css.

export const COLOR_TOKEN_KEYS = [
  "--background",
  "--foreground",
  "--card",
  "--card-foreground",
  "--popover",
  "--popover-foreground",
  "--primary",
  "--primary-foreground",
  "--secondary",
  "--secondary-foreground",
  "--muted",
  "--muted-foreground",
  "--accent",
  "--accent-foreground",
  "--destructive",
  "--destructive-foreground",
  "--border",
  "--input",
  "--ring",
] as const;

// Every token the panel manages (colors + radius).
export const TOKEN_KEYS = [...COLOR_TOKEN_KEYS, "--radius"] as const;

export type TokenKey = (typeof TOKEN_KEYS)[number];
export type TokenMap = Partial<Record<string, string>>;

export function readToken(el: Element | null, name: string): string {
  if (!el) return "";
  return getComputedStyle(el).getPropertyValue(name).trim();
}

export function setToken(
  el: HTMLElement | null,
  name: string,
  value: string
): void {
  el?.style.setProperty(name, value);
}

export function clearToken(el: HTMLElement | null, name: string): void {
  el?.style.removeProperty(name);
}

function block(selector: string, values: TokenMap): string {
  const lines = TOKEN_KEYS.filter((key) => values[key]).map(
    (key) => `  ${key}: ${values[key]};`
  );
  if (lines.length === 0) return "";
  return `${selector} {\n${lines.join("\n")}\n}`;
}

// Build a complete, copyable token block from baseline + overrides for each mode.
export function serializeTokens(light: TokenMap, dark: TokenMap): string {
  return [block(":root", light), block(".dark", dark)]
    .filter(Boolean)
    .join("\n\n");
}

// --- Type scale (modular scale) ---
// Each step is an exponent applied to the ratio relative to the base size.
export const TYPE_STEPS: Record<string, number> = {
  "--pg-text-xs": -2,
  "--pg-text-sm": -1,
  "--pg-text-base": 0,
  "--pg-text-lg": 1,
  "--pg-text-xl": 2,
  "--pg-text-2xl": 3,
  "--pg-text-3xl": 4,
  "--pg-text-4xl": 5,
};

export const DEFAULT_TYPE = { base: 18, ratio: 1.2 };

// Compute rem font-size values for every step from a base px + ratio.
export function computeTypeVars(base: number, ratio: number): TokenMap {
  const out: TokenMap = {};
  for (const [varName, step] of Object.entries(TYPE_STEPS)) {
    out[varName] = `${((base * ratio ** step) / 16).toFixed(4)}rem`;
  }
  return out;
}

// px size for a given step (for live labels).
export function stepPx(base: number, ratio: number, varName: string): number {
  return Math.round(base * ratio ** (TYPE_STEPS[varName] ?? 0));
}
