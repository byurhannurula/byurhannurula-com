"use client"

import { useEffect, useState, useCallback } from "react"
import { useRouter } from "next/navigation"
import {
  Search,
  FileText,
  Tag,
  Home,
  User,
  Wrench,
  FolderKanban,
  Link2,
  BarChart3,
  Code2,
  Github,
  Mail,
  Rss,
  Sun,
  Moon,
  Keyboard,
  Phone,
  ArrowUp,
} from "lucide-react"
import { useTheme } from "next-themes"

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui"
import { MastodonIcon } from "@/components/icons"
import { SITE_CONFIG } from "@/lib/constants"

const shortcuts = [
  {
    key: "H",
    description: "Go to Home",
    detail: "Navigate to the homepage",
    category: "Navigation",
  },
  { key: "N", description: "Go to Notes", detail: "Browse all blog posts", category: "Navigation" },
  {
    key: "P",
    description: "Go to Projects",
    detail: "View all projects and portfolio work",
    category: "Navigation",
  },
  { key: "A", description: "Go to About", detail: "Learn more about me", category: "Navigation" },
  {
    key: "U",
    description: "Go to Uses",
    detail: "View development setup and tools",
    category: "Navigation",
  },
  {
    key: "S",
    description: "Go to Statistics",
    detail: "View site analytics and metrics",
    category: "Navigation",
  },
  {
    key: "L",
    description: "Go to Links",
    detail: "Quick access to social links",
    category: "Navigation",
  },
  {
    key: "C",
    description: "Go to Contact",
    detail: "Get in touch and send a message",
    category: "Navigation",
  },
  {
    key: "T / D",
    description: "Toggle Theme",
    detail: "Switch between light and dark mode",
    category: "Features",
  },
  {
    key: "⌘K",
    description: "Command Palette",
    detail: "Open the command palette",
    category: "Features",
  },
  {
    key: "?",
    description: "Show Keyboard Shortcuts",
    detail: "View all available keyboard shortcuts",
    category: "Features",
  },
  {
    key: "⇧↑",
    description: "Scroll to Top",
    detail: "Scroll to the top of the page",
    category: "Features",
  },
]

interface Post {
  slug: string
  frontmatter: {
    title: string
    excerpt: string
    date: string
    tags: string[]
  }
  readingTime: string
}

interface Short {
  slug: string
  frontmatter: {
    title: string
    description: string
    tags: string[]
  }
}

interface GlobalSearchProps {
  posts?: Post[]
  shorts?: Short[]
  allTags?: string[]
}

const pages = [
  { name: "Home", href: "/", icon: Home },
  { name: "Notes", href: "/notes", icon: FileText },
  { name: "Projects", href: "/projects", icon: FolderKanban },
  { name: "Uses", href: "/uses", icon: Wrench },
  { name: "About", href: "/about", icon: User },
  { name: "Shorts", href: "/shorts", icon: Code2 },
  { name: "Links", href: "/links", icon: Link2 },
  { name: "Statistics", href: "/statistics", icon: BarChart3 },
]

const socialLinks = [
  { name: "GitHub", href: SITE_CONFIG.social.github, icon: Github },
  { name: "Mastodon", href: SITE_CONFIG.social.mastodon, icon: MastodonIcon },
  { name: "Email", href: SITE_CONFIG.social.email, icon: Mail },
  { name: "RSS Feed", href: "/rss.xml", icon: Rss },
]

export function GlobalSearch({ posts = [], shorts = [], allTags = [] }: GlobalSearchProps) {
  const [open, setOpen] = useState(false)
  const [shortcutsOpen, setShortcutsOpen] = useState(false)
  const router = useRouter()
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
      // ? key to open shortcuts
      if (e.key === "?" && !e.metaKey && !e.ctrlKey) {
        const target = e.target as HTMLElement
        if (target.tagName !== "INPUT" && target.tagName !== "TEXTAREA") {
          e.preventDefault()
          setShortcutsOpen(true)
        }
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  const runCommand = useCallback((command: () => void) => {
    setOpen(false)
    command()
  }, [])

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-1.5 rounded-md border border-border/50 bg-muted/30 px-2 py-1.5 text-muted-foreground transition-colors hover:border-border hover:bg-muted/50"
        aria-label="Search"
      >
        <Search className="size-4" />
        <kbd className="pointer-events-none select-none rounded bg-muted px-1.5 py-0.5 text-[10px] font-medium">
          ⌘K
        </kbd>
      </button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type to search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>

          {/* Pages */}
          <CommandGroup heading="Pages">
            {pages.map((page) => (
              <CommandItem
                key={page.href}
                value={`page:${page.name}`}
                onSelect={() => runCommand(() => router.push(page.href))}
              >
                <page.icon className="mr-2 h-4 w-4" />
                <span>{page.name}</span>
              </CommandItem>
            ))}
          </CommandGroup>

          <CommandSeparator />

          {/* Actions */}
          <CommandGroup heading="Actions">
            <CommandItem value="theme:light" onSelect={() => runCommand(() => setTheme("light"))}>
              <Sun className="mr-2 h-4 w-4" />
              <span>Light Mode</span>
            </CommandItem>
            <CommandItem value="theme:dark" onSelect={() => runCommand(() => setTheme("dark"))}>
              <Moon className="mr-2 h-4 w-4" />
              <span>Dark Mode</span>
            </CommandItem>
            <CommandItem
              value="shortcuts:view"
              onSelect={() => runCommand(() => setShortcutsOpen(true))}
            >
              <Keyboard className="mr-2 h-4 w-4" />
              <div className="flex flex-1 items-center justify-between">
                <span>Keyboard Shortcuts</span>
                <kbd className="ml-auto rounded bg-muted px-1.5 py-0.5 text-[10px] font-medium">
                  ?
                </kbd>
              </div>
            </CommandItem>
            <CommandItem
              value="contact:page"
              onSelect={() => runCommand(() => router.push("/contact"))}
            >
              <Phone className="mr-2 h-4 w-4" />
              <span>Contact</span>
            </CommandItem>
          </CommandGroup>

          <CommandSeparator />

          {/* Social Links */}
          <CommandGroup heading="Connect">
            {socialLinks.map((link) => (
              <CommandItem
                key={link.href}
                value={`social:${link.name}`}
                onSelect={() => runCommand(() => window.open(link.href, "_blank"))}
              >
                <link.icon className="mr-2 h-4 w-4" />
                <span>{link.name}</span>
              </CommandItem>
            ))}
          </CommandGroup>

          {/* Tags */}
          {allTags.length > 0 && (
            <>
              <CommandSeparator />
              <CommandGroup heading="Tags">
                {allTags.map((tag) => (
                  <CommandItem
                    key={tag}
                    value={`tag:${tag}`}
                    onSelect={() => runCommand(() => router.push(`/notes?tag=${tag}`))}
                  >
                    <Tag className="mr-2 h-4 w-4" />
                    <span>{tag}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
            </>
          )}

          {/* Posts */}
          {posts.length > 0 && (
            <>
              <CommandSeparator />
              <CommandGroup heading="Notes">
                {posts.slice(0, 10).map((post) => (
                  <CommandItem
                    key={post.slug}
                    value={`post:${post.frontmatter.title} ${post.frontmatter.excerpt}`}
                    onSelect={() => runCommand(() => router.push(`/notes/${post.slug}`))}
                  >
                    <FileText className="mr-2 h-4 w-4" />
                    <div className="flex flex-col">
                      <span>{post.frontmatter.title}</span>
                      <span className="text-xs text-muted-foreground">
                        {post.frontmatter.date} • {post.readingTime}
                      </span>
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            </>
          )}

          {/* Shorts */}
          {shorts.length > 0 && (
            <>
              <CommandSeparator />
              <CommandGroup heading="Shorts">
                {shorts.slice(0, 5).map((short) => (
                  <CommandItem
                    key={short.slug}
                    value={`short:${short.frontmatter.title} ${short.frontmatter.description}`}
                    onSelect={() => runCommand(() => router.push(`/shorts/${short.slug}`))}
                  >
                    <Code2 className="mr-2 h-4 w-4" />
                    <div className="flex flex-col">
                      <span>{short.frontmatter.title}</span>
                      <span className="text-xs text-muted-foreground">
                        {short.frontmatter.description}
                      </span>
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            </>
          )}
        </CommandList>
      </CommandDialog>

      {/* Shortcuts Dialog */}
      <Dialog open={shortcutsOpen} onOpenChange={setShortcutsOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Keyboard className="size-5" />
              Keyboard Shortcuts
            </DialogTitle>
          </DialogHeader>
          <div className="max-h-[60vh] space-y-4 overflow-y-auto">
            {/* Navigation */}
            <div>
              <h3 className="mb-2 text-sm font-medium text-muted-foreground">Navigation</h3>
              <div className="space-y-1">
                {shortcuts
                  .filter((s) => s.category === "Navigation")
                  .map((shortcut) => (
                    <div
                      key={shortcut.key}
                      className="flex items-start justify-between gap-4 rounded-md px-2 py-2 hover:bg-muted/50"
                    >
                      <div className="flex-1">
                        <div className="text-sm font-medium">{shortcut.description}</div>
                        <div className="text-xs text-muted-foreground">{shortcut.detail}</div>
                      </div>
                      <kbd className="shrink-0 rounded bg-muted px-2 py-1 font-mono text-xs">
                        {shortcut.key}
                      </kbd>
                    </div>
                  ))}
              </div>
            </div>
            {/* Features */}
            <div>
              <h3 className="mb-2 text-sm font-medium text-muted-foreground">Features</h3>
              <div className="space-y-1">
                {shortcuts
                  .filter((s) => s.category === "Features")
                  .map((shortcut) => (
                    <div
                      key={shortcut.key}
                      className="flex items-start justify-between gap-4 rounded-md px-2 py-2 hover:bg-muted/50"
                    >
                      <div className="flex-1">
                        <div className="text-sm font-medium">{shortcut.description}</div>
                        <div className="text-xs text-muted-foreground">{shortcut.detail}</div>
                      </div>
                      <kbd className="shrink-0 rounded bg-muted px-2 py-1 font-mono text-xs">
                        {shortcut.key}
                      </kbd>
                    </div>
                  ))}
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              Press <kbd className="rounded bg-muted px-1.5 py-0.5 font-mono text-[10px]">?</kbd>{" "}
              anytime to view shortcuts
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
