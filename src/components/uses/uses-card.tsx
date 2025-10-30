import Image from "next/image"
import { UseItem } from "@/data/uses"

interface UsesCardProps {
  item: UseItem
  index: number
}

export function UsesCard({ item, index }: UsesCardProps) {
  return (
    <div
      className="animate-fade-in-item flex w-full flex-col items-center gap-4 opacity-0"
      style={{
        animationDelay: `${0.3 + index * 0.05}s`,
        animationFillMode: "forwards",
      }}
    >
      {item.image && (
        <div className="relative flex aspect-square w-full shrink-0 items-center justify-center overflow-hidden rounded-md bg-white">
          <Image src={item.image} alt={item.name} fill className="object-contain" />
        </div>
      )}
      <div className="flex flex-col gap-1">
        <h3 className="text-base font-medium">{item.name}</h3>
        <p className="text-sm leading-relaxed text-muted-foreground">{item.description}</p>
      </div>
    </div>
  )
}
