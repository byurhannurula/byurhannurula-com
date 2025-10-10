"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { usesData, USES_LAST_UPDATED, type UseItem } from "@/data/uses"

export default function UsesPage() {
  return (
    <div className="pt-24 pb-16">
      <div className="mx-auto max-w-screen-md px-6">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }} className="mb-12">
          <div className="mb-4 flex items-center justify-between">
            <h1 className="text-2xl font-medium">USES</h1>
            <div className="text-xs text-muted-foreground">
              Last updated: {USES_LAST_UPDATED}
            </div>
          </div>
          <p className="text-base leading-relaxed text-muted-foreground">
            Tools, gear, and services I use for development, productivity, and my homelab setup.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-12 space-y-12"
        >
          {usesData.map((category, categoryIndex) => (
            <Category
              key={category.title}
              title={category.title}
              items={category.items}
              index={categoryIndex}
              type={category.type || "grid"}
            />
          ))}
        </motion.div>
      </div>
    </div>
  )
}

interface CategoryProps {
  title: string
  items: UseItem[]
  index: number
  type: "list" | "grid"
}

function Category({ title, items, index, type }: CategoryProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
    >
      <h2 className="mb-6 text-xs font-medium uppercase tracking-wider text-muted-foreground">{title}</h2>

      {type === "list" ? (
        // Compact grid layout for services
        <div className="grid grid-cols-1 gap-4">
          {items.map((item, itemIndex) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: itemIndex * 0.05 + 0.4 }}
              className="flex gap-2 items-center"
            >
              <a href={item.url} className="text-sm font-medium hover:text-primary hover:underline transition-colors duration-200 hover:cursor-pointer ease-in-out" target="_blank" rel="noopener noreferrer">{item.name}</a>
              <span className="w-1 h-1 bg-muted-foreground rounded-full" />
              <p className="text-xs text-muted-foreground leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </div>
      ) : (
        // Standard layout for hardware/software
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {items.map((item, itemIndex) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: itemIndex * 0.1 + 0.4 }}
              className="flex gap-4 items-start"
            >
              {item.image && (
                <div className="h-12 w-12 shrink-0 overflow-hidden rounded-md bg-muted flex items-center justify-center">
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
          ))}
        </div>
      )}
    </motion.div>
  )
}