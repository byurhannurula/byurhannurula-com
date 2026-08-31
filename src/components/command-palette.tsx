"use client";

import {
  ArrowUpRight,
  Copy,
  FileText,
  Hash,
  Home,
  Keyboard,
  Link2,
  Moon,
  Rss,
  Sun,
  User,
  Wrench,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { type ReactNode, useCallback, useEffect, useState } from "react";

import { GithubIcon, LinkedinIcon, TwitterIcon } from "@/components/icons";
import { OPEN_SHORTCUTS_EVENT } from "@/components/shortcuts-dialog";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui";
import { SITE_CONFIG } from "@/config/site";
import {
  copyEmail,
  copyPageLink,
  openExternal,
  SHORTCUTS,
} from "@/lib/shortcuts";

export const OPEN_COMMAND_PALETTE_EVENT = "command-palette:open";

interface PaletteNote {
  slug: string;
  title: string;
}

interface CommandPaletteProps {
  notes: PaletteNote[];
  tags: string[];
}

/** `:q` and friends: typed by people who live in vim and reach for it everywhere. */
const VIM_QUIT = new Set([":q", ":q!", ":wq", ":x", ":qa", ":quit"]);

export function CommandPalette({ notes, tags }: CommandPaletteProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const router = useRouter();
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "k" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        setIsOpen((open) => !open);
      }
    }
    function onOpen() {
      setIsOpen(true);
    }
    document.addEventListener("keydown", onKeyDown);
    window.addEventListener(OPEN_COMMAND_PALETTE_EVENT, onOpen);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      window.removeEventListener(OPEN_COMMAND_PALETTE_EVENT, onOpen);
    };
  }, []);

  // Reset the query on close so the palette never reopens mid-search.
  useEffect(() => {
    if (!isOpen) setSearch("");
  }, [isOpen]);

  const run = useCallback((action: () => void) => {
    setIsOpen(false);
    action();
  }, []);

  const go = (href: string) => run(() => router.push(href));

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent
        className="data-[state=closed]:slide-out-to-top-[2%] data-[state=open]:slide-in-from-top-[2%] top-[18%] max-w-[640px] translate-y-0 gap-0 overflow-hidden border-border p-0 shadow-2xl outline-none [&>button]:hidden"
        aria-describedby={undefined}
      >
        <DialogTitle className="sr-only">Command palette</DialogTitle>
        <DialogDescription className="sr-only">
          Search pages, notes, and actions
        </DialogDescription>
        <Command
          label="Command palette"
          loop
          className="rounded-lg bg-background font-mono text-[13px]"
        >
          <CommandInput
            value={search}
            onValueChange={setSearch}
            placeholder="type a command or search"
            className="h-12 font-mono text-[13px] placeholder:text-faint"
          />

          <CommandList className="max-h-[360px] p-1 [&_[cmdk-group-heading]]:pt-2 [&_[cmdk-group-heading]]:text-[11px] [&_[cmdk-group-heading]]:text-faint [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-[0.08em]">
            <CommandEmpty className="flex flex-col items-center justify-center gap-1.5 px-6 py-14 text-center font-mono">
              {VIM_QUIT.has(search.trim().toLowerCase()) ? (
                <>
                  <span className="text-[15px] text-primary">
                    {search.trim().toLowerCase()}
                  </span>
                  <span className="text-[12px] text-muted-foreground">
                    esc works here. no swap file, i promise.
                  </span>
                </>
              ) : (
                <>
                  <span className="text-[13px] text-muted-foreground">
                    nothing found
                  </span>
                  <span className="text-[11.5px] text-faint">
                    try a note title, a tag, or an action like{" "}
                    <span className="text-muted-foreground">theme</span>
                  </span>
                </>
              )}
            </CommandEmpty>

            <CommandGroup heading="pages">
              {PAGES.map((page) => (
                <PaletteItem
                  key={page.href}
                  icon={page.icon}
                  onSelect={() => go(page.href)}
                  hint={<Key>{page.shortcut}</Key>}
                >
                  {page.name}
                </PaletteItem>
              ))}
            </CommandGroup>

            <CommandGroup heading="actions">
              <PaletteItem
                icon={<Copy />}
                keywords={["mail", "contact"]}
                onSelect={() => run(copyEmail)}
                hint={<Key>{SHORTCUTS.copyEmail}</Key>}
              >
                copy email
              </PaletteItem>
              <PaletteItem
                icon={<Link2 />}
                keywords={["share", "url"]}
                onSelect={() => run(copyPageLink)}
                hint={<Key>{SHORTCUTS.copyLink}</Key>}
              >
                copy page link
              </PaletteItem>
              <PaletteItem
                icon={resolvedTheme === "dark" ? <Sun /> : <Moon />}
                keywords={["dark", "light", "mode"]}
                onSelect={() =>
                  run(() =>
                    setTheme(resolvedTheme === "dark" ? "light" : "dark")
                  )
                }
                hint={<Key>{SHORTCUTS.theme}</Key>}
              >
                toggle theme
              </PaletteItem>
              <PaletteItem
                icon={<Keyboard />}
                keywords={["help", "keys", "hotkeys"]}
                onSelect={() =>
                  run(() =>
                    window.dispatchEvent(new Event(OPEN_SHORTCUTS_EVENT))
                  )
                }
                hint={<Key>{SHORTCUTS.help}</Key>}
              >
                keyboard shortcuts
              </PaletteItem>
              <PaletteItem
                icon={<Rss />}
                onSelect={() => go("/rss.xml")}
                hint="/rss.xml"
              >
                rss feed
              </PaletteItem>
            </CommandGroup>

            <CommandGroup heading="elsewhere">
              {EXTERNAL_LINKS.map((link) => (
                <PaletteItem
                  key={link.href}
                  icon={link.icon}
                  onSelect={() => run(() => openExternal(link.href))}
                  hint={
                    <span className="flex items-center gap-2">
                      <Key>{link.shortcut}</Key>
                      <ArrowUpRight className="size-3.5" />
                    </span>
                  }
                >
                  {link.name}
                </PaletteItem>
              ))}
            </CommandGroup>

            {notes.length > 0 ? (
              <CommandGroup heading="notes">
                {notes.map((note) => (
                  <PaletteItem
                    key={note.slug}
                    icon={<FileText />}
                    onSelect={() => go(`/notes/${note.slug}`)}
                  >
                    {note.title}
                  </PaletteItem>
                ))}
              </CommandGroup>
            ) : null}

            {tags.length > 0 ? (
              <CommandGroup heading="tags">
                {tags.map((tag) => (
                  <PaletteItem
                    key={tag}
                    icon={<Hash />}
                    onSelect={() => go(`/notes/tag/${tag}`)}
                  >
                    {tag}
                  </PaletteItem>
                ))}
              </CommandGroup>
            ) : null}
          </CommandList>

          <div className="hairline-t flex items-center gap-4 px-4 py-2 text-[11px] text-faint">
            <span>
              <kbd>↑↓</kbd> navigate
            </span>
            <span>
              <kbd>↵</kbd> select
            </span>
            <span className="ml-auto">
              <kbd>{SHORTCUTS.palette}</kbd> toggle
            </span>
          </div>
        </Command>
      </DialogContent>
    </Dialog>
  );
}

interface PaletteItemProps {
  icon: ReactNode;
  children: string;
  hint?: ReactNode;
  keywords?: string[];
  onSelect: () => void;
}

function PaletteItem({
  icon,
  children,
  hint,
  keywords,
  onSelect,
}: PaletteItemProps) {
  return (
    <CommandItem
      value={children}
      keywords={keywords}
      onSelect={onSelect}
      className="gap-3 py-2 text-muted-foreground data-[selected=true]:bg-background-soft data-[selected=true]:text-foreground [&_svg]:text-faint data-[selected=true]:[&_svg]:text-primary"
    >
      {icon}
      <span className="truncate">{children}</span>
      {hint ? (
        <span className="ml-auto shrink-0 text-[11px] text-faint">{hint}</span>
      ) : null}
    </CommandItem>
  );
}

function Key({ children }: { children: string }) {
  return (
    <kbd className="rounded-sm border border-border px-1.5 py-0.5 text-[10px] text-faint">
      {children}
    </kbd>
  );
}

const PAGES = [
  { name: "home", href: "/", icon: <Home />, shortcut: SHORTCUTS.home },
  {
    name: "notes",
    href: "/notes",
    icon: <FileText />,
    shortcut: SHORTCUTS.notes,
  },
  { name: "uses", href: "/uses", icon: <Wrench />, shortcut: SHORTCUTS.uses },
  { name: "about", href: "/about", icon: <User />, shortcut: SHORTCUTS.about },
] as const;

const EXTERNAL_LINKS = [
  {
    name: "github",
    href: SITE_CONFIG.social.github,
    icon: <GithubIcon />,
    shortcut: SHORTCUTS.github,
  },
  {
    name: "linkedin",
    href: SITE_CONFIG.social.linkedin,
    icon: <LinkedinIcon />,
    shortcut: SHORTCUTS.linkedin,
  },
  {
    name: "twitter",
    href: SITE_CONFIG.social.twitter,
    icon: <TwitterIcon />,
    shortcut: SHORTCUTS.twitter,
  },
] as const;
