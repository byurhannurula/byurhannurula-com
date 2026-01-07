import type { UseItem } from "@/config";

interface UsesListItemProps {
  item: UseItem;
  index: number;
}

export function UsesListItem({ item, index }: UsesListItemProps) {
  return (
    <div
      className="flex animate-fade-in-item items-center gap-2 opacity-0"
      style={{
        animationDelay: `${0.3 + index * 0.05}s`,
        animationFillMode: "forwards",
      }}
    >
      <a
        href={item.url}
        className="font-medium text-sm transition-colors duration-200 ease-in-out hover:cursor-pointer hover:text-primary hover:underline"
        target="_blank"
        rel="noopener noreferrer"
      >
        {item.name}
      </a>
      <span className="h-1 w-1 rounded-full bg-muted-foreground" />
      <p className="text-muted-foreground text-xs leading-relaxed">
        {item.description}
      </p>
    </div>
  );
}
