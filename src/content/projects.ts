/** Pixel size of a picture file, for next/image. */
export interface ImageSize {
  width: number;
  height: number;
}

export interface ProjectShot extends ImageSize {
  src: string;
  caption: string;
}

export interface Project {
  slug: string;
  name: string;
  /** For example "desktop app" or "extension". */
  kind: string;
  icon: string;
  iconSize: ImageSize;
  cover: string;
  coverSize: ImageSize;
  /** One or two sentences for lists. */
  short: string;
  /** The full paragraph for the work page. */
  text: string;
  tags: string[];
  shots: ProjectShot[];
  links: { label: string; href: string }[];
}

/** Side projects. Small tools, so they stay low on the page, never in a hero. */
export const PROJECTS: Project[] = [
  {
    slug: 'jotter',
    name: 'Jotter',
    kind: 'desktop app',
    icon: '/assets/icons/jotter.png',
    iconSize: { width: 128, height: 128 },
    cover: '/assets/projects/jotter/desktop.png',
    coverSize: { width: 2000, height: 1128 },
    short:
      'A fast notepad for macOS, Windows and Linux. Open it and type. No account, no save dialog, about 9 MB.',
    text: 'A fast, minimal notepad. Every note is kept in a local drafts store, so you cannot lose one. Sync is optional and off by default: you deploy a small Cloudflare Worker to your own account, or Jotter never touches the network.',
    tags: ['tauri 2', 'rust', 'javascript', 'workers', 'R2', 'D1', 'AGPL-3.0'],
    shots: [
      {
        src: '/assets/projects/jotter/desktop.png',
        width: 2000,
        height: 1128,
        caption: 'A fresh page at every launch.',
      },
      {
        src: '/assets/projects/jotter/editor-light.png',
        width: 2000,
        height: 1406,
        caption: 'Light mode.',
      },
      {
        src: '/assets/projects/jotter/editor-dark.png',
        width: 2000,
        height: 1406,
        caption: 'Dark mode. Both follow the system.',
      },
      {
        src: '/assets/projects/jotter/markdown-preview.png',
        width: 2000,
        height: 1406,
        caption: 'Markdown preview for each tab.',
      },
      {
        src: '/assets/projects/jotter/settings.png',
        width: 2000,
        height: 1406,
        caption: 'Settings: appearance, editor, cloud, shortcuts.',
      },
    ],
    links: [
      {
        label: 'Website',
        href: 'https://jotter.byurhannurula.com',
      },
      {
        label: 'Source',
        href: 'https://github.com/byurhannurula/jotter',
      },
    ],
  },
  {
    slug: 'ogee',
    name: 'OGee',
    kind: 'extension',
    icon: '/assets/projects/ogee/icon.png',
    iconSize: { width: 128, height: 128 },
    cover: '/assets/projects/ogee/og-preview.png',
    coverSize: { width: 1280, height: 800 },
    short: 'Shows the meta tags a crawler sees on any page, without DevTools.',
    text: 'Press Ctrl+E on any page and see what a crawler sees: Open Graph, Twitter Cards, JSON-LD and meta tags. I made it to debug generated share images and to find a missing tag before release.',
    tags: ['preact', 'typescript', 'esbuild', 'manifest v3', 'MIT'],
    shots: [
      {
        src: '/assets/projects/ogee/overlay.png',
        width: 1280,
        height: 800,
        caption: 'The overlay, pinned to a corner of the page.',
      },
      {
        src: '/assets/projects/ogee/og-preview.png',
        width: 1280,
        height: 800,
        caption: 'The share image as a crawler resolves it.',
      },
      {
        src: '/assets/projects/ogee/twitter-card.png',
        width: 1280,
        height: 800,
        caption: 'Tabs for OG, Twitter, meta, links and JSON-LD.',
      },
      {
        src: '/assets/projects/ogee/popup.png',
        width: 1280,
        height: 800,
        caption: 'Control for each site from the toolbar.',
      },
    ],
    links: [
      {
        label: 'Chrome Web Store',
        href: 'https://chromewebstore.google.com/detail/ogee/bagbiednbahjcnnaphfikhbdpfpbmdbg',
      },
      {
        label: 'Source',
        href: 'https://github.com/byurhannurula/ogee',
      },
    ],
  },
  {
    slug: 'fullshot',
    name: 'FullShot',
    kind: 'extension',
    icon: '/assets/projects/fullshot/icon.png',
    iconSize: { width: 128, height: 128 },
    cover: '/assets/projects/fullshot/crop.png',
    coverSize: { width: 1280, height: 800 },
    short:
      'Full-page screenshots with an editor. Captures stay on your machine.',
    text: 'Full page, visible area and region screenshots, with an editor and a local library. It asks for the minimum permissions, so it cannot read a page you did not capture. No telemetry and no remote requests.',
    tags: ['vanilla javascript', 'indexeddb', 'zero dependencies', 'MIT'],
    shots: [
      {
        src: '/assets/projects/fullshot/editor.png',
        width: 1280,
        height: 800,
        caption: 'The editor opens on an overview of the capture.',
      },
      {
        src: '/assets/projects/fullshot/crop.png',
        width: 1280,
        height: 800,
        caption: 'Crop with pull handles and a size badge.',
      },
      {
        src: '/assets/projects/fullshot/library.png',
        width: 1280,
        height: 800,
        caption: 'Captures stay in a local library.',
      },
    ],
    links: [
      {
        label: 'Chrome Web Store',
        href: 'https://chromewebstore.google.com/detail/fullshot/colcpclifogjdhjdbkhbmiemplefmbpg',
      },
      {
        label: 'Source',
        href: 'https://github.com/byurhannurula/fullshot',
      },
    ],
  },
];

/** A tool shown only as one line: icon, name, one sentence, kind. */
export interface ListProject {
  name: string;
  /** For example "desktop app" or "shell". */
  kind: string;
  icon: string;
  short: string;
  /** The site if it has one, else the repository. */
  href: string;
}

/** Tools for the one-line list, after PROJECTS. */
export const MORE_TOOLS: ListProject[] = [
  {
    name: 'Whisper Lite',
    kind: 'desktop app',
    icon: '/assets/icons/whisper-lite.svg',
    short:
      'Hold a key, talk, let go. Local dictation for macOS. Nothing leaves your Mac.',
    href: 'https://github.com/byurhannurula/whisper-lite',
  },
  {
    name: 'dotfiles',
    kind: 'shell',
    icon: '/assets/icons/ghostty.svg',
    short: 'One script that sets up a new Mac with my apps and settings.',
    href: 'https://github.com/byurhannurula/dotfiles',
  },
];

/** The "Also" list on the work page. */
export const SMALL_PROJECTS: ListProject[] = [
  {
    name: 'byurhannurula.com',
    kind: 'this site',
    icon: '/icon.svg',
    short: 'The fourth rebuild. The wordmark survived all of them.',
    href: 'https://github.com/byurhannurula/byurhannurula-com',
  },
];
