import { Minus, Plus } from "lucide-react";

import { cn } from "@/lib/utils";

interface ProsConsProps {
  pros: string[];
  cons: string[];
}

function Column({ items, kind }: { items: string[]; kind: "pro" | "con" }) {
  const isPro = kind === "pro";
  const Icon = isPro ? Plus : Minus;

  return (
    <div className="flex flex-col gap-3">
      <span className="font-mono text-[11px] text-faint uppercase tracking-[0.08em]">
        {isPro ? "pros" : "cons"}
      </span>
      <ul className="flex list-none flex-col gap-2.5 p-0">
        {items.map((item) => (
          <li className="flex items-start gap-2.5 text-[13.5px]" key={item}>
            <Icon
              aria-hidden
              className={cn(
                "mt-[3px] size-3.5 shrink-0",
                isPro ? "text-primary" : "text-destructive"
              )}
            />
            <span className="text-muted-foreground leading-snug">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * Two verdict columns side by side.
 *
 * The signs carry the polarity, so the list still reads correctly in
 * monochrome or to anyone who cannot separate the two greens from the reds.
 */
export function ProsCons({ pros, cons }: ProsConsProps) {
  return (
    <div className="not-prose my-6 grid gap-6 rounded-md border border-border p-5 sm:grid-cols-2 sm:gap-8">
      <Column items={pros} kind="pro" />
      <Column items={cons} kind="con" />
    </div>
  );
}
