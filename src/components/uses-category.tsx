import { motion } from "framer-motion"
import { UseItem } from "@/data/uses"
import { UsesListItem } from "@/components/uses-list-item"
import { UsesCard } from "@/components/uses-card"
import { pageAnimations } from "@/lib/animations"

interface UsesCategoryProps {
  title: string
  items: UseItem[]
  index: number
  type: "list" | "grid"
}

export function UsesCategory({ title, items, index, type }: UsesCategoryProps) {
  return (
    <motion.div {...pageAnimations.fastItem(index, 0.2)}>
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
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {items.map((item, itemIndex) => (
            <UsesCard key={item.name} item={item} index={itemIndex} />
          ))}
        </div>
      )}
    </motion.div>
  )
}
