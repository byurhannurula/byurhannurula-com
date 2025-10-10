import { motion } from "framer-motion"
import { UseItem } from "@/data/uses"
import { pageAnimations } from "@/lib/animations"

interface UsesListItemProps {
  item: UseItem
  index: number
}

export function UsesListItem({ item, index }: UsesListItemProps) {
  return (
    <motion.div
      key={item.name}
      {...pageAnimations.fastItem(index, 0.3)}
      className="flex items-center gap-2"
    >
      <a
        href={item.url}
        className="text-sm font-medium transition-colors duration-200 ease-in-out hover:cursor-pointer hover:text-primary hover:underline"
        target="_blank"
        rel="noopener noreferrer"
      >
        {item.name}
      </a>
      <span className="h-1 w-1 rounded-full bg-muted-foreground" />
      <p className="text-xs leading-relaxed text-muted-foreground">{item.description}</p>
    </motion.div>
  )
}
