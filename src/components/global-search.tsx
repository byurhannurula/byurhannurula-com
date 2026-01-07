"use client";

import {
  ArrowUp,
  Clock,
  Code2,
  ExternalLink,
  FileText,
  Home,
  Keyboard,
  type LucideIcon,
  Mail,
  Moon,
  Phone,
  Search,
  Share2,
  Sun,
  Tag,
  User,
  Wrench,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui";
import { SITE_CONFIG, SOCIAL_LINKS } from "@/config/site";

const shortcuts = [
  {
    key: "H",
    description: "Go to Home",
    detail: "Navigate to the homepage",
    category: "Navigation",
  },
  {
    key: "N",
    description: "Go to Notes",
    detail: "Browse all blog posts",
    category: "Navigation",
  },
  {
    key: "A",
    description: "Go to About",
    detail: "Learn more about me",
    category: "Navigation",
  },
  {
    key: "U",
    description: "Go to Uses",
    detail: "View development setup and tools",
    category: "Navigation",
  },
  {
    key: "C",
    description: "Go to Contact",
    detail: "Get in touch and send a message",
    category: "Navigation",
  },
  {
    key: "T",
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
];

interface Post {
  slug: string;
  frontmatter: {
    title: string;
    excerpt: string;
    date: string;
    tags: string[];
  };
  readingTime: string;
}

interface Short {
  slug: string;
  frontmatter: {
    title: string;
    description: string;
    tags: string[];
  };
}

interface GlobalSearchProps {
  posts?: Post[];
  shorts?: Short[];
  allTags?: string[];
}

const pages = [
  {
    id: "home",
    name: "Go to Home",
    description: "Navigate to the homepage",
    href: "/",
    icon: Home,
    shortcut: "H",
  },
  {
    id: "notes",
    name: "Go to Notes",
    description: "Browse all blog posts",
    href: "/notes",
    icon: FileText,
    shortcut: "N",
  },
  {
    id: "uses",
    name: "Go to Uses",
    description: "View development setup and tools",
    href: "/uses",
    icon: Wrench,
    shortcut: "U",
  },
  {
    id: "about",
    name: "Go to About",
    description: "Learn more about me",
    href: "/about",
    icon: User,
    shortcut: "A",
  },
  {
    id: "contact",
    name: "Go to Contact",
    description: "Get in touch and send a message",
    href: "/contact",
    icon: Phone,
    shortcut: "C",
  },
];

const actions = [
  {
    id: "theme",
    name: "Toggle Theme",
    description: "Switch between light and dark mode",
    shortcut: "T",
  },
  {
    id: "shortcuts",
    name: "Show Keyboard Shortcuts",
    description: "View all available keyboard shortcuts",
    shortcut: "?",
  },
  {
    id: "scroll-top",
    name: "Scroll to Top",
    description: "Scroll to the top of the page",
    shortcut: "⇧↑",
  },
  {
    id: "copy-email",
    name: "Copy Email",
    description: "Copy email address to clipboard",
    shortcut: "⇧E",
  },
  {
    id: "share-page",
    name: "Share Page",
    description: "Share the current page",
    shortcut: "⇧S",
  },
  {
    id: "view-source",
    name: "View Source Code",
    description: "View the source code of this website",
    shortcut: "⇧V",
  },
];

const RECENT_ACTIONS_KEY = "command-center-recent";
const MAX_RECENT_ACTIONS = 5;

interface RecentAction {
  id: string;
  name: string;
  description: string;
  type: "page" | "action";
  timestamp: number;
}

function getRecentActions(): RecentAction[] {
  if (typeof window === "undefined") return [];
  try {
    const stored = localStorage.getItem(RECENT_ACTIONS_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function saveRecentAction(action: Omit<RecentAction, "timestamp">) {
  if (typeof window === "undefined") return;
  try {
    const recent = getRecentActions().filter((a) => a.id !== action.id);
    const newRecent = [{ ...action, timestamp: Date.now() }, ...recent].slice(
      0,
      MAX_RECENT_ACTIONS
    );
    localStorage.setItem(RECENT_ACTIONS_KEY, JSON.stringify(newRecent));
  } catch {
    // Ignore localStorage errors
  }
}

export function GlobalSearch({
  posts = [],
  shorts = [],
  allTags = [],
}: GlobalSearchProps) {
  const [open, setOpen] = useState(false);
  const [shortcutsOpen, setShortcutsOpen] = useState(false);
  const [recentActions, setRecentActions] = useState<RecentAction[]>([]);
  const router = useRouter();
  const _pathname = usePathname();
  const { theme, setTheme } = useTheme();

  // Load recent actions on mount
  useEffect(() => {
    setRecentActions(getRecentActions());
  }, []);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
      // ? key to open shortcuts
      if (e.key === "?" && !e.metaKey && !e.ctrlKey) {
        const target = e.target as HTMLElement;
        if (target.tagName !== "INPUT" && target.tagName !== "TEXTAREA") {
          e.preventDefault();
          setShortcutsOpen(true);
        }
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const trackAndRun = useCallback(
    (action: Omit<RecentAction, "timestamp">, command: () => void) => {
      saveRecentAction(action);
      setRecentActions(getRecentActions());
      setOpen(false);
      command();
    },
    []
  );

  const runCommand = useCallback((command: () => void) => {
    setOpen(false);
    command();
  }, []);

  const copyEmail = useCallback(() => {
    navigator.clipboard.writeText(SITE_CONFIG.author.email);
    toast.success("Email copied to clipboard");
  }, []);

  const sharePage = useCallback(() => {
    if (navigator.share) {
      navigator.share({
        title: document.title,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard");
    }
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const executeAction = useCallback(
    (actionId: string) => {
      const action = actions.find((a) => a.id === actionId);
      if (!action) return;

      trackAndRun(
        {
          id: action.id,
          name: action.name,
          description: action.description,
          type: "action",
        },
        () => {
          switch (actionId) {
            case "theme":
              setTheme(theme === "dark" ? "light" : "dark");
              break;
            case "shortcuts":
              setShortcutsOpen(true);
              break;
            case "scroll-top":
              scrollToTop();
              break;
            case "copy-email":
              copyEmail();
              break;
            case "share-page":
              sharePage();
              break;
            case "view-source":
              window.open(SITE_CONFIG.social.github, "_blank");
              break;
          }
        }
      );
    },
    [trackAndRun, setTheme, theme, scrollToTop, copyEmail, sharePage]
  );

  const navigateToPage = useCallback(
    (page: (typeof pages)[0]) => {
      trackAndRun(
        {
          id: page.id,
          name: page.name,
          description: page.description,
          type: "page",
        },
        () => {
          router.push(page.href);
        }
      );
    },
    [trackAndRun, router]
  );

  const getActionIcon = (actionId: string): LucideIcon => {
    switch (actionId) {
      case "theme":
        return theme === "dark" ? Sun : Moon;
      case "shortcuts":
        return Keyboard;
      case "scroll-top":
        return ArrowUp;
      case "copy-email":
        return Mail;
      case "share-page":
        return Share2;
      case "view-source":
        return ExternalLink;
      default:
        return Clock;
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex items-center gap-1.5 rounded-md border border-border/50 bg-muted/30 px-2 py-1.5 text-muted-foreground transition-colors hover:border-border hover:bg-muted/50"
        aria-label="Search"
      >
        <Search className="size-4" />
        <kbd className="pointer-events-none select-none rounded bg-muted px-1.5 py-0.5 font-medium text-[10px]">
          ⌘K
        </kbd>
      </button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>

          {/* Recent Actions */}
          {recentActions.length > 0 && (
            <>
              <CommandGroup heading="Recent">
                {recentActions.map((recent) => {
                  const Icon =
                    recent.type === "page"
                      ? pages.find((p) => p.id === recent.id)?.icon || Clock
                      : getActionIcon(recent.id);
                  return (
                    <CommandItem
                      key={`recent-${recent.id}`}
                      value={`recent:${recent.name}`}
                      onSelect={() => {
                        if (recent.type === "page") {
                          const page = pages.find((p) => p.id === recent.id);
                          if (page) navigateToPage(page);
                        } else {
                          executeAction(recent.id);
                        }
                      }}
                    >
                      <Icon />
                      <div className="flex flex-col">
                        <span>{recent.name}</span>
                        <span className="text-muted-foreground text-xs">
                          {recent.description}
                        </span>
                      </div>
                    </CommandItem>
                  );
                })}
              </CommandGroup>
              <CommandSeparator />
            </>
          )}

          {/* Navigation */}
          <CommandGroup heading="Navigation">
            {pages.map((page) => (
              <CommandItem
                key={page.href}
                value={`page:${page.name} ${page.description}`}
                onSelect={() => navigateToPage(page)}
              >
                <page.icon />
                <div className="flex flex-col">
                  <span>{page.name}</span>
                  <span className="text-muted-foreground text-xs">
                    {page.description}
                  </span>
                </div>
                <CommandShortcut>{page.shortcut}</CommandShortcut>
              </CommandItem>
            ))}
          </CommandGroup>

          <CommandSeparator />

          {/* Features */}
          <CommandGroup heading="Features">
            {actions
              .filter((a) =>
                ["theme", "shortcuts", "scroll-top"].includes(a.id)
              )
              .map((action) => {
                const Icon = getActionIcon(action.id);
                return (
                  <CommandItem
                    key={action.id}
                    value={`action:${action.name} ${action.description}`}
                    onSelect={() => executeAction(action.id)}
                  >
                    <Icon />
                    <div className="flex flex-col">
                      <span>{action.name}</span>
                      <span className="text-muted-foreground text-xs">
                        {action.description}
                      </span>
                    </div>
                    <CommandShortcut>{action.shortcut}</CommandShortcut>
                  </CommandItem>
                );
              })}
          </CommandGroup>

          <CommandSeparator />

          {/* Actions */}
          <CommandGroup heading="Actions">
            {actions
              .filter((a) =>
                ["copy-email", "share-page", "view-source"].includes(a.id)
              )
              .map((action) => {
                const Icon = getActionIcon(action.id);
                return (
                  <CommandItem
                    key={action.id}
                    value={`action:${action.name} ${action.description}`}
                    onSelect={() => executeAction(action.id)}
                  >
                    <Icon />
                    <div className="flex flex-col">
                      <span>{action.name}</span>
                      <span className="text-muted-foreground text-xs">
                        {action.description}
                      </span>
                    </div>
                    <CommandShortcut>{action.shortcut}</CommandShortcut>
                  </CommandItem>
                );
              })}
          </CommandGroup>

          <CommandSeparator />

          {/* Social Links */}
          <CommandGroup heading="Connect">
            {SOCIAL_LINKS.filter((l) => l.name !== "Email").map((link) => (
              <CommandItem
                key={link.href}
                value={`social:${link.name}`}
                onSelect={() =>
                  runCommand(() => window.open(link.href, "_blank"))
                }
              >
                <link.icon />
                <span>{link.name}</span>
              </CommandItem>
            ))}
          </CommandGroup>

          <CommandSeparator />

          {/* Help */}
          <CommandGroup heading="Help">
            <CommandItem
              value="help:shortcuts"
              onSelect={() => runCommand(() => setShortcutsOpen(true))}
            >
              <Keyboard />
              <div className="flex flex-col">
                <span>Keyboard Shortcuts</span>
                <span className="text-muted-foreground text-xs">
                  View all available shortcuts
                </span>
              </div>
              <CommandShortcut>?</CommandShortcut>
            </CommandItem>
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
                    onSelect={() =>
                      runCommand(() => router.push(`/notes?tag=${tag}`))
                    }
                  >
                    <Tag />
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
                    onSelect={() =>
                      runCommand(() => router.push(`/notes/${post.slug}`))
                    }
                  >
                    <FileText />
                    <div className="flex flex-col">
                      <span>{post.frontmatter.title}</span>
                      <span className="text-muted-foreground text-xs">
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
                    onSelect={() =>
                      runCommand(() => router.push(`/shorts/${short.slug}`))
                    }
                  >
                    <Code2 />
                    <div className="flex flex-col">
                      <span>{short.frontmatter.title}</span>
                      <span className="text-muted-foreground text-xs">
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
              <h3 className="mb-2 font-medium text-muted-foreground text-sm">
                Navigation
              </h3>
              <div className="space-y-1">
                {shortcuts
                  .filter((s) => s.category === "Navigation")
                  .map((shortcut) => (
                    <div
                      key={shortcut.key}
                      className="flex items-start justify-between gap-4 rounded-md px-2 py-2 hover:bg-muted/50"
                    >
                      <div className="flex-1">
                        <div className="font-medium text-sm">
                          {shortcut.description}
                        </div>
                        <div className="text-muted-foreground text-xs">
                          {shortcut.detail}
                        </div>
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
              <h3 className="mb-2 font-medium text-muted-foreground text-sm">
                Features
              </h3>
              <div className="space-y-1">
                {shortcuts
                  .filter((s) => s.category === "Features")
                  .map((shortcut) => (
                    <div
                      key={shortcut.key}
                      className="flex items-start justify-between gap-4 rounded-md px-2 py-2 hover:bg-muted/50"
                    >
                      <div className="flex-1">
                        <div className="font-medium text-sm">
                          {shortcut.description}
                        </div>
                        <div className="text-muted-foreground text-xs">
                          {shortcut.detail}
                        </div>
                      </div>
                      <kbd className="shrink-0 rounded bg-muted px-2 py-1 font-mono text-xs">
                        {shortcut.key}
                      </kbd>
                    </div>
                  ))}
              </div>
            </div>
            <p className="text-muted-foreground text-xs">
              Press{" "}
              <kbd className="rounded bg-muted px-1.5 py-0.5 font-mono text-[10px]">
                ?
              </kbd>{" "}
              anytime to view shortcuts
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
