export type ProjectStatus =
  | "open source"
  | "published"
  | "tool"
  | "ongoing"
  | "this site"
  | "student era";

export interface ProjectShot {
  src: string;
  alt: string;
  caption?: string;
}

export interface ProjectAside {
  heading: string;
  body: string;
  link?: { label: string; href: string };
}

export interface Project {
  slug: string;
  title: string;
  /** One line, used on the index card. */
  tagline: string;
  /** Two or three sentences, used at the top of the detail page. */
  description?: string;
  status: ProjectStatus;
  /** Where it runs, when that is the interesting part. */
  platforms?: string[];
  tags: string[];
  features?: string[];
  shots?: ProjectShot[];
  icon?: string;
  /** Overrides the first screenshot on the index card, for a framed crop. */
  cardImage?: string;
  github?: string;
  url?: string;
  chromeStore?: string;
  firefoxAddon?: string;
  license?: string;
  /** A companion piece worth explaining, but not worth its own page. */
  aside?: ProjectAside;
  featured?: boolean;
}

export const PROJECTS: Project[] = [
  {
    slug: "jotter",
    title: "Jotter",
    tagline: "A fast, minimal notepad: a quiet place for quick thoughts.",
    description:
      "Open it and start typing. No save dialog, no account, no cloud by default. Every scratch is auto-kept in a local drafts store, so a note is never lost by starting a new one. When a draft graduates into a real file, Cmd+S gives it a home, and that is the only time a save dialog appears.",
    status: "published",
    platforms: ["macOS", "Windows", "Linux"],
    tags: ["tauri 2", "rust", "javascript", "vitest", "cloudflare"],
    features: [
      "Type instantly on launch; past notes live in the sidebar",
      "Autosaved drafts, searchable, with soft-delete and undo",
      "VS Code style tabs and a Cmd+P quick switcher",
      "Per-tab markdown preview, find and replace, focus mode",
      "Opens real .txt and .md files, and asks before overwriting an outside edit",
      "Movable drafts folder, so Syncthing or iCloud can keep two Macs in step",
      "Optional cloud sync via a self-hostable Worker plus R2, off by default",
      "Local-first: no account, no telemetry, around 9 MB",
    ],
    shots: [
      {
        src: "/assets/projects/jotter/desktop.png",
        alt: "Jotter open on a macOS desktop with two tabs and the quick-action bar below",
        caption:
          "A fresh page every launch. The status bar counts words and characters.",
      },
      {
        src: "/assets/projects/jotter/editor-light.png",
        alt: "Jotter in light mode with a long note open and the tab bar above it",
        caption: "Light mode.",
      },
      {
        src: "/assets/projects/jotter/editor-dark.png",
        alt: "The same note in Jotter's dark mode",
        caption: "Dark mode. Both follow the system by default.",
      },
      {
        src: "/assets/projects/jotter/markdown-preview.png",
        alt: "Jotter rendering a markdown file in preview mode, with headings and a code block",
        caption: "Per-tab markdown preview, with syntax-highlighted code.",
      },
      {
        src: "/assets/projects/jotter/settings.png",
        alt: "Jotter's settings dialog open on the General section",
        caption: "Settings: appearance, editor, cloud, shortcuts.",
      },
    ],
    aside: {
      heading: "the optional cloud",
      body: "Sync and sharing come from jotter-cloud, a Cloudflare Worker you deploy to your own account. Drafts sync through R2, and a shared note gets a read-only page backed by a D1 registry, so it can be revoked or reshared from any device. Single-user and opt-in: you set a token only you know, paste it into Jotter's sync settings, and nothing reaches anyone else. Leave it off and Jotter never touches the network.",
      link: {
        label: "jotter-cloud",
        href: "https://github.com/byurhannurula/jotter-cloud",
      },
    },
    github: "https://github.com/byurhannurula/jotter",
    url: "https://jotter.byurhannurula.com",
    license: "AGPL-3.0",
    featured: true,
  },
  {
    slug: "ogee",
    title: "OGee",
    tagline:
      "Inspect Open Graph, Twitter Cards and meta tags on any page, without opening DevTools.",
    description:
      "A browser extension for developers. OGee reveals the metadata a crawler sees on any page, in an overlay: Open Graph, Twitter Cards, JSON-LD and general meta tags. Built for debugging dynamically generated OG images and catching a missing tag before it ships.",
    status: "open source",
    platforms: ["Chrome", "Brave", "Edge", "Firefox"],
    tags: ["preact", "typescript", "esbuild", "manifest v3"],
    features: [
      "Ctrl+E opens an overlay of every meta and link tag on the page",
      "Previews the OG image as crawlers resolve it, including generated ones",
      "Covers Open Graph, Twitter Cards, general meta, JSON-LD and page links",
      "Re-extracts automatically on SPA route changes and head mutations",
      "Warns on missing required fields such as og:image and twitter:card",
      "Per-site enable and disable with Ctrl+Shift+E",
      "Copies or downloads the metadata as JSON, or opens it in a social debugger",
    ],
    shots: [
      {
        src: "/assets/projects/ogee/overlay.png",
        alt: "The OGee overlay open on a GitHub page, listing its meta tags",
        caption: "The overlay, pinned to a corner of the page.",
      },
      {
        src: "/assets/projects/ogee/og-preview.png",
        alt: "OGee showing an Open Graph image preview alongside its tags",
        caption: "The OG image rendered as a crawler would resolve it.",
      },
      {
        src: "/assets/projects/ogee/twitter-card.png",
        alt: "OGee's Twitter Card tab showing card metadata",
        caption: "Tabs for OG, Twitter, meta, links and JSON-LD.",
      },
      {
        src: "/assets/projects/ogee/popup.png",
        alt: "The OGee toolbar popup with per-site controls",
        caption: "Per-site control from the toolbar popup.",
      },
    ],
    icon: "/assets/projects/ogee/icon.png",
    github: "https://github.com/byurhannurula/ogee",
    chromeStore:
      "https://chromewebstore.google.com/detail/ogee/bagbiednbahjcnnaphfikhbdpfpbmdbg",
    license: "MIT",
    featured: true,
  },
  {
    slug: "fullshot",
    title: "FullShot",
    tagline:
      "Full page, visible area and region screenshots, with an editor and a local library.",
    description:
      "A lean alternative to the full-page screenshot extensions that keep asking for new permissions. FullShot needs only activeTab, scripting, storage, unlimitedStorage and contextMenus, so it can never read a page you did not explicitly capture. No telemetry, no remote requests, and captures never leave the machine.",
    status: "open source",
    platforms: ["Chrome", "Brave", "Edge", "Firefox"],
    tags: ["javascript", "indexeddb", "manifest v3", "zero dependencies"],
    features: [
      "Full page capture by scroll and stitch, with overlapping slices so seams never show",
      "A pre-scroll pass triggers lazy loading, and animations are force-finished before the shot",
      "Fixed and sticky bars appear once instead of repeating on every slice",
      "Visible area and drag-a-rectangle region capture",
      "Editor with crop handles, pen, box, arrow, inline text, undo, and copy to clipboard",
      "Captures stored locally in IndexedDB until deleted: rename, reopen, clear",
      "Captures taller than the canvas limit split automatically",
    ],
    shots: [
      {
        src: "/assets/projects/fullshot/editor.png",
        alt: "The FullShot editor showing a zoomed-out full page capture",
        caption: "The editor opens on a zoomed-out overview of the capture.",
      },
      {
        src: "/assets/projects/fullshot/crop.png",
        alt: "Cropping a capture in FullShot with pull handles and a size badge",
        caption: "Crop with pull handles and a live size badge.",
      },
      {
        src: "/assets/projects/fullshot/library.png",
        alt: "The FullShot files library listing stored captures",
        caption: "Captures stay in a local library until you delete them.",
      },
    ],
    icon: "/assets/projects/fullshot/icon.png",
    cardImage: "/assets/projects/fullshot/crop.png",
    github: "https://github.com/byurhannurula/fullshot",
    chromeStore:
      "https://chromewebstore.google.com/detail/fullshot/colcpclifogjdhjdbkhbmiemplefmbpg",
    license: "MIT",
    featured: true,
  },
  {
    slug: "dotfiles",
    title: "dotfiles",
    tagline:
      "Reproducible macOS setup. One script from blank machine to fully configured.",
    status: "ongoing",
    tags: ["shell", "macos"],
    github: "https://github.com/byurhannurula/dotfiles",
  },
  {
    slug: "byurhannurula-com",
    title: "byurhannurula-com",
    tagline:
      "The site you are on. Fourth rebuild; the byurhan. wordmark survived all of them.",
    status: "this site",
    tags: ["next.js", "typescript", "tailwind"],
    github: "https://github.com/byurhannurula/byurhannurula-com",
  },
];

export function getFeaturedProjects(): Project[] {
  return PROJECTS.filter((project) => project.featured);
}

export function getProject(slug: string): Project | undefined {
  return PROJECTS.find((project) => project.slug === slug);
}

/** Detail pages only exist for entries with screenshots to show. */
export function hasDetailPage(project: Project): boolean {
  return Boolean(project.shots?.length);
}
