"use client";

import { TYPE_BASES, TYPE_RATIOS } from "../_data/showcase";
import { usePlayground } from "../_lib/playground-context";

export function TypeScaleControl() {
  const { typeBase, typeRatio, setTypeBase, setTypeRatio } = usePlayground();

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <span className="pg-mono text-[0.65rem] text-muted-foreground/70 uppercase tracking-wider">
          Base size
        </span>
        <div className="flex flex-wrap gap-2">
          {TYPE_BASES.map((base) => (
            <button
              key={base}
              type="button"
              onClick={() => setTypeBase(base)}
              className={`rounded-md border px-2.5 py-1 text-xs transition-colors ${
                typeBase === base
                  ? "border-primary bg-primary/10 text-foreground"
                  : "border-border text-muted-foreground hover:bg-muted"
              }`}
            >
              {base}px
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <span className="pg-mono text-[0.65rem] text-muted-foreground/70 uppercase tracking-wider">
          Scale ratio
        </span>
        <div className="flex flex-col gap-1.5">
          {TYPE_RATIOS.map((r) => (
            <button
              key={r.ratio}
              type="button"
              onClick={() => setTypeRatio(r.ratio)}
              className={`rounded-md border px-2.5 py-1 text-left text-xs transition-colors ${
                Math.abs(typeRatio - r.ratio) < 0.001
                  ? "border-primary bg-primary/10 text-foreground"
                  : "border-border text-muted-foreground hover:bg-muted"
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
