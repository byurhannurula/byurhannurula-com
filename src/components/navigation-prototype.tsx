"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronDown } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib"

const mainNavItems = [
  { name: "Home", path: "/" },
  { name: "Blog", path: "/notes" },
  { name: "Projects", path: "/projects" },
  { name: "Shorts", path: "/shorts" },
  { name: "About", path: "/about" },
]

const moreItems = [
  { name: "Guest Book", path: "/guestbook", description: "Leave me a message", icon: "📝" },
  { name: "Statistics", path: "/statistics", description: "Crunched up numbers", badge: "Current" },
  { name: "Attribution", path: "/attribution", description: "Journey to create this site" },
]

const featuredCards = [
  {
    title: "Uses",
    description: "A peek into my digital workspace",
    image: "/images/desk-setup.png",
    path: "/uses",
  },
  {
    title: "Bucket List",
    description: "Things to do at least once in life",
    image: "/images/bucket-list.jpg",
    path: "/bucket-list",
  },
  {
    title: "Side Quests",
    description: "New skills and adventures",
    image: "/images/side-quests.jpg",
    path: "/side-quests",
  },
]

export function NavigationPrototype() {
  const pathname = usePathname()
  const [moreOpen, setMoreOpen] = useState(false)

  return (
    <header className="fixed top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-screen-xl items-center justify-between px-6">
        {/* Logo */}
        <Link href="/" className="text-lg font-bold">
          Logo
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-1">
          {mainNavItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={cn(
                "rounded-md px-3 py-1.5 text-sm font-medium transition-colors hover:bg-accent",
                pathname === item.path ? "text-foreground" : "text-muted-foreground"
              )}
            >
              {item.name}
            </Link>
          ))}

          {/* More Dropdown */}
          <div className="relative">
            <button
              onMouseEnter={() => setMoreOpen(true)}
              onMouseLeave={() => setMoreOpen(false)}
              className={cn(
                "flex items-center gap-1 rounded-md px-3 py-1.5 text-sm font-medium transition-colors hover:bg-accent",
                moreOpen ? "text-foreground" : "text-muted-foreground"
              )}
            >
              More
              <ChevronDown
                className={cn("size-4 transition-transform", moreOpen && "rotate-180")}
              />
            </button>

            {/* Dropdown Menu */}
            {moreOpen && (
              <div
                onMouseEnter={() => setMoreOpen(true)}
                onMouseLeave={() => setMoreOpen(false)}
                className="absolute right-0 top-full mt-2 w-[720px] duration-200 animate-in fade-in slide-in-from-top-2"
              >
                <div className="rounded-lg border bg-background/95 p-6 shadow-lg backdrop-blur-md">
                  {/* Featured Cards */}
                  <div className="mb-6 grid grid-cols-3 gap-4">
                    {featuredCards.map((card) => (
                      <Link
                        key={card.path}
                        href={card.path}
                        className="group relative overflow-hidden rounded-lg border bg-muted/50 transition-all hover:border-primary/50 hover:shadow-md"
                      >
                        <div className="aspect-video overflow-hidden bg-gradient-to-br from-muted to-muted/50">
                          {card.image && (
                            <div className="h-full w-full bg-muted/80 transition-transform group-hover:scale-105" />
                          )}
                        </div>
                        <div className="p-4">
                          <h3 className="mb-1 font-semibold text-foreground">{card.title}</h3>
                          <p className="text-xs text-muted-foreground">{card.description}</p>
                        </div>
                      </Link>
                    ))}
                  </div>

                  {/* More Links */}
                  <div className="space-y-1 border-t pt-4">
                    {moreItems.map((item) => (
                      <Link
                        key={item.path}
                        href={item.path}
                        className="flex items-center gap-3 rounded-md px-3 py-2 transition-colors hover:bg-accent"
                      >
                        {item.icon && <span className="text-xl">{item.icon}</span>}
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium">{item.name}</span>
                            {item.badge && (
                              <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                                {item.badge}
                              </span>
                            )}
                          </div>
                          {item.description && (
                            <p className="text-xs text-muted-foreground">{item.description}</p>
                          )}
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </nav>
      </div>
    </header>
  )
}
