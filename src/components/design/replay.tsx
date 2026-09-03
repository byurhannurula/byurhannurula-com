"use client";

import { RotateCcw } from "lucide-react";
import { type ReactNode, useState } from "react";

/**
 * Re-runs a one-shot entry animation on demand.
 *
 * Entry animations play once on mount, so anything below the fold has already
 * finished by the time it is scrolled to — the demo looks like nothing
 * happens. Remounting on a changing key replays it.
 */
export function Replay({
  label = "replay",
  children,
}: {
  label?: string;
  children: ReactNode;
}) {
  const [run, setRun] = useState(0);

  return (
    <div className="flex flex-col gap-2">
      <div key={run}>{children}</div>
      <button
        className="inline-flex w-fit items-center gap-1.5 rounded-sm border border-border bg-transparent px-2 py-1 font-mono text-[11px] text-muted-foreground transition-colors hover:border-muted-foreground hover:text-foreground"
        onClick={() => setRun((n) => n + 1)}
        type="button"
      >
        <RotateCcw aria-hidden className="size-3" />
        {label}
      </button>
    </div>
  );
}
