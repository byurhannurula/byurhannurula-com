import { UseItem } from "@/data/uses"
import { UsesListItem, UsesCard } from "@/components/uses"

interface UsesCategoryProps {
  title: string
  items: UseItem[]
  index: number
  type: "list" | "grid"
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
      <h2 className="mb-6 text-xs font-medium uppercase tracking-wider text-muted-foreground">
        {title}
      </h2>

      {type === "list" ? (
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
  )
}
