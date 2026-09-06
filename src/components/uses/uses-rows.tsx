import { ArrowUpRight } from "lucide-react";

import type { UseItem } from "@/config";
import { cn } from "@/lib/utils";

import { ItemIcon } from "./uses-item-icon";

/* No rule between rows. A stack of them read as a table rather than a list;
   the hover surface is what tells one row from the next. Pulled out past the
   column and padded back in so that surface is wider than the text it holds. */
const ROW_CLASS =
  "group -mx-2.5 flex items-center gap-3 rounded-lg px-2.5 py-3 no-underline transition-colors duration-150 ease-out motion-reduce:transition-none";

export function UsesRowItem({ item }: { item: UseItem }) {
  const inner = (
    <>
      <ItemIcon item={item} dimmed />
      <span className="min-w-0 flex-1">
        <span
          className={cn(
            "block truncate font-medium text-[15px] text-foreground transition-colors duration-150 ease-out motion-reduce:transition-none",
            item.url && "group-hover:text-primary",
            item.deprecated && "text-muted-foreground line-through"
          )}
        >
          {item.name}
        </span>
        <span
          className={cn(
            "mt-0.5 block text-[13px] text-muted-foreground",
            item.deprecated && "text-faint"
          )}
        >
          {item.description}
        </span>
        {item.stack && (
          <span className="mt-1 block truncate font-mono text-[11.5px] text-faint">
            {item.stack.join(" · ")}
          </span>
        )}
      </span>
      {item.deprecated && (
        <span className="shrink-0 rounded-sm border border-border px-1.5 py-[2px] font-mono text-[10px] text-faint">
          retired
        </span>
      )}
      {item.url && (
        <ArrowUpRight
          aria-hidden="true"
          className="size-4 shrink-0 -translate-x-1.5 text-primary opacity-0 transition-[opacity,translate] duration-200 ease-out group-hover:translate-x-0 group-hover:opacity-100 motion-reduce:translate-x-0 motion-reduce:transition-none"
        />
      )}
    </>
  );

  // The hardware rows take the same surface as the linked ones. With the rule
  // between rows gone, hover is what separates one row from the next, and a
  // shelf where only half the entries respond reads as half of it being
  // broken. The cursor still says which ones go somewhere.
  return item.url ? (
    <a
      className={cn(ROW_CLASS, "hover:bg-background-soft")}
      href={item.url}
      rel="noopener noreferrer"
      target="_blank"
    >
      {inner}
    </a>
  ) : (
    <div className={cn(ROW_CLASS, "cursor-default hover:bg-background-soft")}>
      {inner}
    </div>
  );
}
