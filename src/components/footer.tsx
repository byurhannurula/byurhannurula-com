'use client'

import Link from "next/link"
import { ArrowUp } from "lucide-react"
import { SocialLinks } from "@/components/social-links"
import { SITE_CONFIG } from "@/lib/constants"

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  return (
    <footer className="border-t bg-background">
      <div className="container flex flex-col md:flex-row items-center justify-between gap-4 p-6 max-w-screen-md mx-auto">
        <div className="flex flex-col items-center md:items-start">
          <Link href="/" className="text-md font-bold text-foreground">
            {SITE_CONFIG.name}
          </Link>
          <p className="mt-2 text-xs text-muted-foreground">Building digital experiences with privacy in mind</p>
        </div>
        
        <div className="flex items-center gap-4">
          <SocialLinks />
          <button
            onClick={scrollToTop}
            className="flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
            aria-label="Scroll to top"
          >
            <ArrowUp className="h-4 w-4" />
          </button>
        </div>
      </div>
    </footer>
  )
}
