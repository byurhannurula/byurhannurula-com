"use client"

import { useEffect, useState } from "react"

interface TOCItem {
  id: string
  text: string
  level: number
}

interface TOCProps {
  className?: string
}

export function TOC({ className = "" }: TOCProps) {
  const [tocItems, setTocItems] = useState<TOCItem[]>([])
  const [activeId, setActiveId] = useState<string>("")

  useEffect(() => {
    // Only get h2 headings within article element with data-mdx-content attribute
    const articleContent = document.querySelector("[data-mdx-content]")
    if (!articleContent) return

    // Only select direct h2 children or h2 within the prose content
    const headings = articleContent.querySelectorAll("h2[id], h3[id]")
    const items: TOCItem[] = []

    headings.forEach((heading) => {
      // Skip if heading is inside footer or navigation
      if (heading.closest("footer") || heading.closest("nav")) return

      const id = heading.id
      if (!id) return

      // Get the text content from the span inside the anchor (our heading structure)
      const textSpan = heading.querySelector("span")
      const text = textSpan?.textContent.trim() || ""
      const level = Number(heading.tagName.replace("H", ""))

      items.push({
        id,
        text,
        level,
      })
    })

    setTocItems(items)

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      { rootMargin: "-100px 0px -70% 0px" }
    )

    headings.forEach((heading) => {
      if (!heading.closest("footer") && !heading.closest("nav")) {
        observer.observe(heading)
      }
    })

    return () => observer.disconnect()
  }, [])

  if (tocItems.length === 0) return null

  return (
    <nav className={`not-prose ${className}`}>
      <div className="rounded-lg border border-border bg-muted/30 p-4">
        <h3 className="mb-3 text-sm font-semibold">Table of Contents</h3>
        <ul className="space-y-2 text-sm">
          {tocItems.map((item) => (
            <li key={item.id} style={{ paddingLeft: `${(item.level - 2) * 0.75}rem` }}>
              <a
                href={`#${item.id}`}
                className={`block transition-colors hover:text-primary ${
                  activeId === item.id ? "font-medium text-primary" : "text-muted-foreground"
                }`}
                onClick={(e) => {
                  e.preventDefault()
                  document.getElementById(item.id)?.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                  })
                }}
              >
                {item.text}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}
