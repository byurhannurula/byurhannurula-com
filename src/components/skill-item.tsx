"use client"

import { motion } from "framer-motion"

interface SkillItemProps {
  name: string
  delay?: number
}

export function SkillItem({ name, delay = 0 }: SkillItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="flex items-center gap-3"
    >
      <span className="text-sm text-muted-foreground">{name}</span>
    </motion.div>
  )
}
