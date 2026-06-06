"use client";

import { FONT_OPTIONS, FONT_PAIRINGS } from "../_lib/fonts";
import { usePlayground } from "../_lib/playground-context";

const ROLES = [
  { key: "sans", label: "Sans (body)" },
  { key: "serif", label: "Serif (headings)" },
  { key: "mono", label: "Mono (metadata)" },
] as const;

export function FontSwitcher() {
  const { fonts, setFont } = usePlayground();

  const applyPairing = (p: (typeof FONT_PAIRINGS)[number]) => {
    setFont("sans", p.sans);
    setFont("serif", p.serif);
    setFont("mono", p.mono);
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <span className="pg-mono text-[0.65rem] text-muted-foreground/70 uppercase tracking-wider">
          Curated pairings
        </span>
        <div className="flex flex-wrap gap-2">
          {FONT_PAIRINGS.map((p) => (
            <button
              key={p.label}
              type="button"
              title={p.note}
              onClick={() => applyPairing(p)}
              className="rounded-full border border-border px-2.5 py-1 text-xs transition-colors hover:bg-muted"
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {ROLES.map(({ key, label }) => (
        <label key={key} className="block space-y-1">
          <span className="pg-mono text-[0.65rem] text-muted-foreground/70 uppercase tracking-wider">
            {label}
          </span>
          <select
            value={fonts[key]}
            onChange={(e) => setFont(key, e.target.value)}
            className="w-full rounded-md border border-input bg-background px-2 py-1.5 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            {FONT_OPTIONS[key].map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </label>
      ))}
    </div>
  );
}
