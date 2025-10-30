"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

import { ThemeToggle } from "@/components/theme-toggle"
import { NAVIGATION_ITEMS, SITE_CONFIG } from "@/lib/constants"
import { cn } from "@/lib"

export function Navigation() {
  const pathname = usePathname()

  const [isOpen, setIsOpen] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      // Set scrolled state for backdrop blur
      setScrolled(currentScrollY > 10)

      // Hide/show navbar logic
      if (currentScrollY <= 10) {
        // Always show navbar when near the top
        setHidden(false)
      } else if (currentScrollY > lastScrollY && currentScrollY > 70) {
        // Scrolling down and past 70px - hide navbar
        setHidden(true)
      } else if (currentScrollY < lastScrollY - 10) {
        // Scrolling up by at least 10px - show navbar
        setHidden(false)
      }

      setLastScrollY(currentScrollY)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY])

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        scrolled ? "border-b bg-background/60 backdrop-blur-md" : ""
      } ${hidden ? "-translate-y-full" : "translate-y-0"}`}
    >
      <div className="mx-auto flex h-16 max-w-screen-md items-center justify-between px-6">
        <Link href="/" className="text-lg font-bold text-foreground">
          {SITE_CONFIG.logo}
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          <ul className="flex gap-8">
            {NAVIGATION_ITEMS.map((item) => (
              <li key={item.path}>
                <Link
                  href={item.path}
                  className={cn(
                    "relative text-xs font-semibold uppercase tracking-wider transition-colors hover:text-primary",
                    pathname === item.path ? "text-primary" : "text-muted-foreground"
                  )}
                >
                  {item.name}
                  {pathname === item.path && (
                    <span className="absolute -bottom-1 left-1/2 block h-[3px] w-[3px] -translate-x-1/2 rounded-full bg-primary" />
                  )}
                </Link>
              </li>
            ))}
          </ul>
          <ThemeToggle />
        </nav>

        {/* Mobile Navigation Toggle */}
        <div className="flex items-center gap-4 md:hidden">
          <ThemeToggle />
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-xs font-medium uppercase tracking-wider text-muted-foreground"
            aria-label="Toggle Menu"
          >
            {isOpen ? "close" : "menu"}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <div className="animate-fade-in border-b bg-background md:hidden">
          <nav className="mx-auto flex max-w-screen-md flex-col px-6 py-6">
            <ul className="flex flex-col gap-6">
              {NAVIGATION_ITEMS.map((item) => (
                <li key={item.path}>
                  <Link
                    href={item.path}
                    onClick={() => setIsOpen(false)}
                    className={`block text-xs font-medium uppercase tracking-wider transition-colors hover:text-primary ${
                      pathname === item.path ? "text-primary" : "text-muted-foreground"
                    }`}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </header>
  )
}
