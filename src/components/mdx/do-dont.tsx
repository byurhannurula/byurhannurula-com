import { Check, X } from "lucide-react";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface DoDontProps {
  /** Phrasing that follows the rule. */
  dos: string[];
  /** Phrasing that breaks it. Shown beside, not below, so the pair reads as one. */
  donts: string[];
  children?: ReactNode;
}

function Column({ kind, items }: { kind: "do" | "dont"; items: string[] }) {
  const isDo = kind === "do";
  const Icon = isDo ? Check : X;

  return (
    <div className="flex flex-col gap-2">
      <span
        className={cn(
          "flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.08em]",
          isDo ? "text-primary" : "text-faint"
        )}
      >
        <Icon aria-hidden className="size-3" />
        {isDo ? "do" : "don't"}
      </span>
      <ul className="flex list-none flex-col gap-2 p-0">
        {items.map((item) => (
          <li
            key={item}
            className={cn(
              "rounded-md border border-dashed px-3 py-2 text-[13px] leading-snug",
              isDo
                ? "border-border text-foreground"
                : "border-border text-faint line-through decoration-faint/40"
            )}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * A rule shown as the phrasing that follows it beside the phrasing that breaks
 * it. Examples carry a voice guideline far better than the guideline does.
 *
 * Registered for MDX, so a post can use it without importing anything.
 */
export function DoDont({ dos, donts, children }: DoDontProps) {
  return (
    <div className="not-prose my-6 flex flex-col gap-4">
      {children ? (
        <p className="text-[13.5px] text-muted-foreground">{children}</p>
      ) : null}
      <div className="grid gap-4 sm:grid-cols-2">
        <Column items={dos} kind="do" />
        <Column items={donts} kind="dont" />
      </div>
    </div>
  );
}
