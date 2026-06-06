"use client";

import { TYPE_SPECIMEN } from "../_data/showcase";
import { usePlayground } from "../_lib/playground-context";
import { stepPx } from "../_lib/tokens";

export function TypeSpecimen() {
  const { typeBase, typeRatio } = usePlayground();

  return (
    <div className="space-y-4">
      {TYPE_SPECIMEN.map(({ varName, label }) => (
        <div key={varName} className="flex items-baseline gap-6">
          <span className="pg-mono w-24 shrink-0 text-muted-foreground/50 text-xs">
            {label} / {stepPx(typeBase, typeRatio, varName)}px
          </span>
          <span
            className="pg-serif font-medium tracking-tight"
            style={{ fontSize: `var(${varName})` }}
          >
            The spectacle before us was indeed sublime
          </span>
        </div>
      ))}
    </div>
  );
}
