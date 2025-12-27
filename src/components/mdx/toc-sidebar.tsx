"use client"

import { useEffect, useState } from "react"

interface TOCItem {
  id: string
  text: string
  level: number
}

interface TOCSidebarProps {
  className?: string
}

export function TOCSidebar({ className = "" }: TOCSidebarProps) {
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
    <nav className={`hidden xl:block ${className}`}>
      <div className="sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto">
        <div className="mb-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
          On this page
        </div>
        <ul className="space-y-1 text-sm">
          {tocItems.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={`block py-1.5 leading-tight transition-colors hover:text-foreground ${
                  activeId === item.id ? "font-medium text-foreground" : "text-muted-foreground"
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
