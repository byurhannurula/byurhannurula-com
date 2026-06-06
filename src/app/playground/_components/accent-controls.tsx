"use client";

import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";
import { ACCENT_PRESETS } from "../_data/showcase";
import { usePlayground } from "../_lib/playground-context";

function parseHsl(value: string): { h: number; s: number; l: number } | null {
  const m = value.match(/hsl\(\s*([\d.]+)\s+([\d.]+)%\s+([\d.]+)%/i);
  if (!m) return null;
  return { h: Number(m[1]), s: Number(m[2]), l: Number(m[3]) };
}

const SLIDERS = [
  { key: "h", label: "Hue", max: 360 },
  { key: "s", label: "Saturation", max: 100 },
  { key: "l", label: "Lightness", max: 100 },
] as const;

export function AccentControls() {
  const { setTokenValue, readValue, mounted } = usePlayground();
  const [hsl, setHsl] = useState({ h: 15, s: 100, l: 50 });

  useEffect(() => {
    if (!mounted) return;
    const parsed = parseHsl(readValue("--primary"));
    if (parsed) setHsl(parsed);
  }, [mounted, readValue]);

  const apply = (next: { h: number; s: number; l: number }) => {
    setHsl(next);
    const value = `hsl(${next.h} ${next.s}% ${next.l}%)`;
    setTokenValue("--primary", value);
    setTokenValue("--ring", value);
  };

  return (
    <div className="space-y-4">
      <div
        className="h-10 rounded-md border border-border"
        style={{ background: `hsl(${hsl.h} ${hsl.s}% ${hsl.l}%)` }}
      />

      {SLIDERS.map(({ key, label, max }) => (
        <div key={key} className="space-y-1">
          <div className="flex items-center justify-between">
            <span className="pg-mono text-[0.65rem] text-muted-foreground/70 uppercase tracking-wider">
              {label}
            </span>
            <span className="pg-mono text-muted-foreground text-xs">
              {hsl[key]}
              {key === "h" ? "" : "%"}
            </span>
          </div>
          <input
            type="range"
            min={0}
            max={max}
            value={hsl[key]}
            onChange={(e) => apply({ ...hsl, [key]: Number(e.target.value) })}
            className="w-full accent-primary"
          />
        </div>
      ))}

      <div className="flex flex-wrap gap-2 pt-1">
        {ACCENT_PRESETS.map((preset) => (
          <button
            key={preset.label}
            type="button"
            onClick={() => apply({ h: preset.h, s: preset.s, l: preset.l })}
            className={cn(
              "flex items-center gap-1.5 rounded-full border border-border px-2.5 py-1 text-xs transition-colors hover:bg-muted"
            )}
          >
            <span
              className="size-3 rounded-full"
              style={{
                background: `hsl(${preset.h} ${preset.s}% ${preset.l}%)`,
              }}
            />
            {preset.label}
          </button>
        ))}
      </div>
    </div>
  );
}
