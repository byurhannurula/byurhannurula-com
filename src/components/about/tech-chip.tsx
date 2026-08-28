import * as TechLogos from "@/components/icons";
import type { StackItem } from "@/config/about";

/** Icon-only chip that reveals its label on hover or keyboard focus. */
export function TechChip({ name, logo }: StackItem) {
  const Logo = logo ? TechLogos[logo] : null;

  if (!Logo) {
    return (
      <span className="inline-flex h-8 items-center rounded-md border border-border border-dashed bg-background-soft px-2.5 font-mono text-[12px] text-foreground">
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
      <span className="max-w-0 overflow-hidden whitespace-nowrap font-mono text-[12px] text-foreground opacity-0 transition-[max-width,margin,opacity] duration-200 group-hover:ml-2 group-hover:max-w-32 group-hover:opacity-100 group-focus-visible:ml-2 group-focus-visible:max-w-32 group-focus-visible:opacity-100">
        {name}
      </span>
    </span>
  );
}
