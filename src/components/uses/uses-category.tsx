import { UsesCard, UsesGearItem, UsesListItem } from "@/components/uses";
import type { UseItem } from "@/config";

interface UsesCategoryProps {
  title: string;
  items: UseItem[];
  index: number;
  type: "list" | "grid" | "gear";
}

export function UsesCategory({ title, items, index, type }: UsesCategoryProps) {
  return (
    <div
      className="animate-fade-in-item opacity-0"
      style={{
        animationDelay: `${0.1 + index * 0.05}s`,
        animationFillMode: "forwards",
      }}
    >
      <h2 className="mb-6 font-medium text-muted-foreground text-xs uppercase tracking-wider">
        {title}
      </h2>

      {type === "gear" ? (
        <div className="grid grid-cols-1 gap-4">
          {items.map((item, itemIndex) => (
            <UsesGearItem key={item.name} item={item} index={itemIndex} />
          ))}
        </div>
      ) : type === "list" ? (
        <div className="grid grid-cols-1 gap-4">
          {items.map((item, itemIndex) => (
            <UsesListItem key={item.name} item={item} index={itemIndex} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {items.map((item, itemIndex) => (
            <UsesCard key={item.name} item={item} index={itemIndex} />
          ))}
        </div>
      )}
    </div>
  );
}
