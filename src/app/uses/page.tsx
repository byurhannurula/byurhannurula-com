"use client"

import { motion } from "framer-motion"

import { pageAnimations } from "@/lib"
import { usesData, USES_LAST_UPDATED } from "@/data"
import { PageWrapper } from "@/components/page-wrapper"
import { UsesCategory } from "@/components/uses-category"

export default function UsesPage() {
  return (
    <PageWrapper>
      <motion.div {...pageAnimations.container} className="mb-12">
        <div className="mb-4 flex items-center justify-between">
          <h1 className="text-2xl font-medium">USES</h1>
          <div className="text-xs text-muted-foreground">Last updated: {USES_LAST_UPDATED}</div>
        </div>
        <p className="text-base leading-relaxed text-muted-foreground">
          Tools, gear, and services I use for development, productivity, and my homelab setup.
        </p>
      </motion.div>

      <motion.div {...pageAnimations.staggerContainer} className="mb-12 space-y-12">
        {usesData.map((category, categoryIndex) => (
          <UsesCategory
            key={category.title}
            title={category.title}
            items={category.items}
            index={categoryIndex}
            type={category.type || "grid"}
          />
        ))}
      </motion.div>
    </PageWrapper>
  )
}
