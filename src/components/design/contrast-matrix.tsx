"use client";

import { useEffect, useRef, useState } from "react";

import { LIGHT_MODES, type LightMode } from "@/config/light-modes";
import { cn } from "@/lib/utils";

/** WCAG AA for body text. Large text (18pt+) would be 3. */
const AA = 4.5;

/** Text tokens, in the order they read as a hierarchy. */
const TEXT_TOKENS = [
  { token: "--foreground", label: "foreground" },
  { token: "--muted-foreground", label: "muted-foreground" },
  { token: "--faint", label: "faint" },
  { token: "--primary", label: "primary" },
  { token: "--link-inbound", label: "link-inbound" },
] as const;

const GROUNDS = [
  { token: "--background", label: "background" },
  { token: "--background-soft", label: "background-soft" },
] as const;

function channels(color: string): [number, number, number] | null {
  const hex = color.trim().match(/^#([0-9a-f]{3}|[0-9a-f]{6})$/i);
  if (hex) {
    const h =
      hex[1].length === 3
        ? hex[1]
            .split("")
            .map((c) => c + c)
            .join("")
        : hex[1];
    return [0, 2, 4].map((i) => Number.parseInt(h.slice(i, i + 2), 16)) as [
      number,
      number,
      number,
    ];
  }
  // getComputedStyle normalises most colours to rgb() anyway.
  const rgb = color.match(/-?[\d.]+/g);
  return rgb && rgb.length >= 3
    ? [Number(rgb[0]), Number(rgb[1]), Number(rgb[2])]
    : null;
}

function luminance([r, g, b]: [number, number, number]) {
  const f = (v: number) => {
    const s = v / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
}

function contrast(a: string, b: string): number | null {
  const [x, y] = [channels(a), channels(b)];
  if (!(x && y)) return null;
  const [hi, lo] = [luminance(x), luminance(y)].sort((p, q) => q - p);
  return (hi + 0.05) / (lo + 0.05);
}

type Row = { label: string; ground: string; ratio: number | null };

/**
 * Contrast readout for one palette.
 *
 * The palettes are attribute selectors, not `:root`-only rules, so a scoped
 * `data-light` wrapper redefines every token for its own subtree. That is what
 * lets this page show all four modes at once without touching the site's own
 * light, and why the numbers are measured off the DOM rather than transcribed:
 * a token edited in globals.css cannot leave this table stale.
 */
function ModePanel({ mode }: { mode: LightMode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [rows, setRows] = useState<Row[]>([]);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const read = () => {
      const style = getComputedStyle(node);
      const value = (t: string) => style.getPropertyValue(t).trim();
      const next: Row[] = [];
      for (const text of TEXT_TOKENS) {
        for (const ground of GROUNDS) {
          next.push({
            label: text.label,
            ground: ground.label,
            ratio: contrast(value(text.token), value(ground.token)),
          });
        }
      }
      setRows(next);
    };
    read();
    const observer = new MutationObserver(read);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-light", "style"],
    });
    return () => observer.disconnect();
  }, []);

  const failing = rows.filter((r) => r.ratio !== null && r.ratio < AA).length;

  return (
    <div
      ref={ref}
      data-light={mode}
      className="overflow-hidden rounded-md border border-border"
      style={{ background: "var(--background)", color: "var(--foreground)" }}
    >
      <div className="hairline flex items-baseline justify-between px-3.5 py-2">
        <span className="font-mono font-semibold text-[11.5px] lowercase">
          {mode}
        </span>
        <span
          className={cn(
            "font-mono text-[11px]",
            failing ? "text-destructive" : "text-primary"
          )}
        >
          {failing ? `${failing} below AA` : "all pass AA"}
        </span>
      </div>

      {/* The specimens, so a number can be checked against how it reads. */}
      <div className="flex flex-col gap-1 px-3.5 py-3">
        <p className="text-[15px]">Foreground, the thing you came to read.</p>
        <p className="text-[13px] text-muted-foreground">
          Muted foreground, for the sentence under it.
        </p>
        <p className="font-mono text-[12px] text-faint">
          Faint, for notes and stamps.
        </p>
        <p className="text-[13px]">
          <span className="text-primary">Primary</span> and{" "}
          <span style={{ color: "var(--link-inbound)" }}>an inbound link</span>.
        </p>
        <p
          className="mt-1 inline-flex w-fit items-center rounded-sm border border-border px-2 py-[3px] font-mono text-[11px] text-muted-foreground"
          style={{ background: "var(--background-soft)" }}
        >
          chip on background-soft
        </p>
      </div>

      <table className="w-full border-collapse font-mono text-[11px]">
        <thead>
          <tr className="hairline hairline-t">
            <th scope="col" className="px-3.5 py-1.5 text-left font-normal">
              token
            </th>
            <th scope="col" className="py-1.5 text-left font-normal">
              ground
            </th>
            <th scope="col" className="px-3.5 py-1.5 text-right font-normal">
              ratio
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={`${row.label}:${row.ground}`} className="hairline">
              <td className="px-3.5 py-1">{row.label}</td>
              <td className="py-1" style={{ color: "var(--faint)" }}>
                {row.ground}
              </td>
              <td
                className={cn(
                  "px-3.5 py-1 text-right tabular-nums",
                  row.ratio !== null && row.ratio < AA
                    ? "text-destructive"
                    : "text-muted-foreground"
                )}
              >
                {row.ratio === null ? "--" : row.ratio.toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function ContrastMatrix() {
  const [mode, setMode] = useState<LightMode | "all">("all");
  const shown = mode === "all" ? LIGHT_MODES : [mode];

  return (
    <div>
      <fieldset className="mb-4 flex flex-wrap gap-1.5 border-0 p-0">
        <legend className="sr-only">Preview a light mode</legend>
        {(["all", ...LIGHT_MODES] as const).map((option) => (
          <button
            key={option}
            type="button"
            aria-pressed={mode === option}
            onClick={() => setMode(option)}
            className={cn(
              "rounded-sm border px-2.5 py-1 font-mono text-[11px] transition-colors duration-150",
              mode === option
                ? "border-primary border-dashed bg-primary-soft text-foreground"
                : "border-border bg-background-soft text-muted-foreground hover:text-foreground"
            )}
          >
            {option}
          </button>
        ))}
      </fieldset>

      <div
        className={cn(
          "grid gap-3",
          shown.length > 1 ? "sm:grid-cols-2" : "grid-cols-1"
        )}
      >
        {shown.map((m) => (
          <ModePanel key={m} mode={m} />
        ))}
      </div>
    </div>
  );
}
