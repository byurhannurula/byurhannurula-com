"use client"

import { useTheme } from "next-themes"
import { motion } from "framer-motion"
import { Sun, Moon } from "lucide-react"

export function ThemeToggle() {
  const { setTheme, theme } = useTheme()

  return (
    <button
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="flex h-8 w-8 items-center justify-center rounded-md bg-muted text-muted-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
      aria-label={theme === "light" ? "Switch to dark theme" : "Switch to light theme"}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ duration: 0.2 }}
        key={theme}
      >
        {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
      </motion.div>
    </button>
  )
}
