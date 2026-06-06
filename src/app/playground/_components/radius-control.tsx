"use client";

import { useEffect, useState } from "react";

import { usePlayground } from "../_lib/playground-context";

export function RadiusControl() {
  const { setTokenValue, readValue, mounted } = usePlayground();
  const [radius, setRadius] = useState(0.5);

  useEffect(() => {
    if (!mounted) return;
    const value = Number.parseFloat(readValue("--radius"));
    if (!Number.isNaN(value)) setRadius(value);
  }, [mounted, readValue]);

  const apply = (value: number) => {
    setRadius(value);
    setTokenValue("--radius", `${value}rem`);
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="pg-mono text-[0.65rem] text-muted-foreground/70 uppercase tracking-wider">
          Radius
        </span>
        <span className="pg-mono text-muted-foreground text-xs">
          {radius}rem
        </span>
      </div>
      <input
        type="range"
        min={0}
        max={1.5}
        step={0.025}
        value={radius}
        onChange={(e) => apply(Number(e.target.value))}
        className="w-full accent-primary"
      />
      <div className="flex gap-2 pt-1">
        {[0, 0.25, 0.5, 0.75, 1].map((preset) => (
          <button
            key={preset}
            type="button"
            onClick={() => apply(preset)}
            className="pg-mono rounded-md border border-border px-2 py-1 text-muted-foreground text-xs transition-colors hover:bg-muted"
          >
            {preset}
          </button>
        ))}
      </div>
    </div>
  );
}
