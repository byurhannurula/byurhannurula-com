"use client"

import { useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"
import { useTheme } from "next-themes"

export function GlobalShortcuts() {
  const { theme, setTheme } = useTheme()
  const router = useRouter()

  const isTyping = useCallback((e: KeyboardEvent) => {
    return (
      e.target instanceof HTMLInputElement ||
      e.target instanceof HTMLTextAreaElement ||
      (e.target as HTMLElement)?.isContentEditable
    )
  }, [])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Skip if typing in input fields
      if (isTyping(e)) return

      // Skip if modifier keys are pressed (except for specific combos)
      const hasModifier = e.metaKey || e.ctrlKey || e.altKey

      // Theme toggle: T or D
      if (!hasModifier && e.key === "t") {
        e.preventDefault()
        setTheme(theme === "dark" ? "light" : "dark")
        return
      }

      // Navigation shortcuts (single key)
      if (!hasModifier) {
        switch (e.key.toLowerCase()) {
          case "h":
            e.preventDefault()
            router.push("/")
            break
          case "n":
            e.preventDefault()
            router.push("/notes")
            break
          case "p":
            e.preventDefault()
            router.push("/projects")
            break
          case "a":
            e.preventDefault()
            router.push("/about")
            break
          case "u":
            e.preventDefault()
            router.push("/uses")
            break
          case "s":
            e.preventDefault()
            router.push("/statistics")
            break
          case "l":
            e.preventDefault()
            router.push("/links")
            break
          case "c":
            e.preventDefault()
            router.push("/contact")
            break
        }
      }

      // Scroll to top: Shift + ArrowUp
      if (e.shiftKey && e.key === "ArrowUp") {
        e.preventDefault()
        window.scrollTo({ top: 0, behavior: "smooth" })
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [theme, setTheme, router, isTyping])

  return null
}
