type Rgba = [red: number, green: number, blue: number, alpha: number];

/**
 * The colour a CSS variable has at `host`, as the browser computes it. A
 * short-lived probe does the work, so any CSS colour syntax is fine.
 */
export function readColour(host: HTMLElement, variable: string): Rgba | null {
  const probe = document.createElement('span');
  probe.style.color = `var(${variable})`;
  host.append(probe);
  const computed = getComputedStyle(probe).color;
  probe.remove();

  const parts = computed.match(/-?[\d.]+(?:e-?\d+)?/g)?.map(Number);
  if (!parts || parts.length < 3) return null;
  // `color(srgb r g b)` holds 0 to 1; `rgb()` holds 0 to 255.
  const scale = computed.startsWith('color(') ? 255 : 1;
  const [r = 0, g = 0, b = 0, a = 1] = parts;
  return [r * scale, g * scale, b * scale, a];
}

const over = (top: Rgba, base: Rgba): Rgba => {
  const [, , , alpha] = top;
  const mix = (i: 0 | 1 | 2) => top[i] * alpha + base[i] * (1 - alpha);
  return [mix(0), mix(1), mix(2), 1];
};

// WCAG 2 relative luminance: w3.org/TR/WCAG22/#dfn-relative-luminance
function luminance([r, g, b]: Rgba) {
  const linear = (channel: number) => {
    const c = channel / 255;
    return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * linear(r) + 0.7152 * linear(g) + 0.0722 * linear(b);
}

/** WCAG contrast ratio of a text colour on a surface, 1 to 21. */
export function contrastRatio(text: Rgba, surface: Rgba) {
  const a = luminance(over(text, surface));
  const b = luminance(surface);
  return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
}
