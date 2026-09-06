import { getStackItem, type StackKey } from "@/config/stack";

interface TechChipProps {
  item: StackKey;
  /** Always show the label instead of revealing it on hover. */
  showLabel?: boolean;
}

/** Tech chip; icon-only by default, label revealed on hover or keyboard focus. */
export function TechChip({ item, showLabel = false }: TechChipProps) {
  const { name, icon: Logo } = getStackItem(item);

  if (showLabel) {
    return (
      <span className="inline-flex h-8 items-center gap-2 rounded-md border border-border border-dashed bg-background-soft px-2.5 font-mono text-[12px] text-foreground transition-colors hover:border-primary">
        <Logo className="size-4 shrink-0" aria-hidden="true" />
        {name}
      </span>
    );
  }

  return (
    <span
      tabIndex={-1}
      title={name}
      className="group inline-flex h-8 items-center rounded-md border border-border border-dashed bg-background-soft px-2 transition-colors hover:border-primary focus-visible:border-primary"
    >
      <Logo className="size-4 shrink-0" aria-hidden="true" />
      {/*
       * 0fr to 1fr, the same reveal ui/chip.tsx uses and for the same reason:
       * max-width eases toward a width the label may never reach, so the last
       * part of the animation is spent going nowhere.
       */}
      <span className="grid grid-cols-[0fr] transition-[grid-template-columns] duration-200 ease-out group-hover:grid-cols-[1fr] group-focus-visible:grid-cols-[1fr] motion-reduce:transition-none">
        <span className="min-w-0 overflow-hidden">
          <span className="whitespace-nowrap pl-2 font-mono text-[12px] text-foreground">
            {name}
          </span>
        </span>
      </span>
    </span>
  );
}
