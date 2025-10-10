import Image from "next/image"
import { motion } from "framer-motion"
import { UseItem } from "@/data/uses"
import { pageAnimations } from "@/lib/animations"

interface UsesCardProps {
  item: UseItem
  index: number
}

export function UsesCard({ item, index }: UsesCardProps) {
  return (
    <motion.div
      key={item.name}
      {...pageAnimations.fastItem(index, 0.3)}
      className="flex items-start gap-4"
    >
      {item.image && (
        <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-md bg-muted">
          <Image
            src={item.image}
            alt={item.name}
            width={48}
            height={48}
            className="h-full w-full object-cover"
          />
        </div>
      )}
      <div className="flex flex-col gap-1">
        <h3 className="text-base font-medium">{item.name}</h3>
        <p className="text-sm leading-relaxed text-muted-foreground">{item.description}</p>
      </div>
    </motion.div>
  )
}
