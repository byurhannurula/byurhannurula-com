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
    // Extract headings from the page
    const headings = document.querySelectorAll("h2, h3, h4")
    const items: TOCItem[] = []

    headings.forEach((heading) => {
      const id = heading.id || heading.textContent?.toLowerCase().replace(/\s+/g, "-") || ""
      if (!heading.id) {
        heading.id = id
      }

      items.push({
        id,
        text: heading.textContent || "",
        level: parseInt(heading.tagName.charAt(1)),
      })
    })

    setTocItems(items)

    // Intersection Observer for active heading
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      { rootMargin: "-80px 0px -80% 0px" }
    )

    headings.forEach((heading) => observer.observe(heading))

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
