"use client";

import { COLOR_TOKEN_GROUPS } from "../_data/showcase";
import { Swatch } from "./swatch";

export function PaletteSwatches() {
  return (
    <div className="space-y-5">
      {COLOR_TOKEN_GROUPS.map((group) => (
        <div key={group.label} className="space-y-2">
          <p className="pg-mono text-[0.65rem] text-muted-foreground/50 uppercase tracking-wider">
            {group.label}
          </p>
          <div className="space-y-2">
            {group.tokens.map((token) => (
              <Swatch key={token.name} name={token.name} label={token.label} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
