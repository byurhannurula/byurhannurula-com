export interface ProjectShot {
  src: string;
  caption: string;
}

export interface Project {
  slug: string;
  name: string;
  /** For example "desktop app" or "extension". */
  kind: string;
  icon: string;
  cover: string;
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
    cover: '/assets/projects/jotter/desktop.png',
    short:
      'A fast notepad for macOS, Windows and Linux. Open it and type. No account, no save dialog, about 9 MB.',
    text: 'A fast, minimal notepad. Every note is kept in a local drafts store, so you cannot lose one. Sync is optional and off by default: you deploy a small Cloudflare Worker to your own account, or Jotter never touches the network.',
    tags: ['tauri 2', 'rust', 'javascript', 'workers', 'R2', 'D1', 'AGPL-3.0'],
    shots: [
      {
        src: '/assets/projects/jotter/desktop.png',
        caption: 'A fresh page at every launch.',
      },
      {
        src: '/assets/projects/jotter/editor-light.png',
        caption: 'Light mode.',
      },
      {
        src: '/assets/projects/jotter/editor-dark.png',
        caption: 'Dark mode. Both follow the system.',
      },
      {
        src: '/assets/projects/jotter/markdown-preview.png',
        caption: 'Markdown preview for each tab.',
      },
      {
        src: '/assets/projects/jotter/settings.png',
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
    cover: '/assets/projects/ogee/og-preview.png',
    short: 'Shows the meta tags a crawler sees on any page, without DevTools.',
    text: 'Press Ctrl+E on any page and see what a crawler sees: Open Graph, Twitter Cards, JSON-LD and meta tags. I made it to debug generated share images and to find a missing tag before release.',
    tags: ['preact', 'typescript', 'esbuild', 'manifest v3', 'MIT'],
    shots: [
      {
        src: '/assets/projects/ogee/overlay.png',
        caption: 'The overlay, pinned to a corner of the page.',
      },
      {
        src: '/assets/projects/ogee/og-preview.png',
        caption: 'The share image as a crawler resolves it.',
      },
      {
        src: '/assets/projects/ogee/twitter-card.png',
        caption: 'Tabs for OG, Twitter, meta, links and JSON-LD.',
      },
      {
        src: '/assets/projects/ogee/popup.png',
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
    cover: '/assets/projects/fullshot/crop.png',
    short:
      'Full-page screenshots with an editor. Captures stay on your machine.',
    text: 'Full page, visible area and region screenshots, with an editor and a local library. It asks for the minimum permissions, so it cannot read a page you did not capture. No telemetry and no remote requests.',
    tags: ['vanilla javascript', 'indexeddb', 'zero dependencies', 'MIT'],
    shots: [
      {
        src: '/assets/projects/fullshot/editor.png',
        caption: 'The editor opens on an overview of the capture.',
      },
      {
        src: '/assets/projects/fullshot/crop.png',
        caption: 'Crop with pull handles and a size badge.',
      },
      {
        src: '/assets/projects/fullshot/library.png',
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

export interface SmallProject {
  tag: string;
  name: string;
  text: string;
  href?: string;
}

export const SMALL_PROJECTS: SmallProject[] = [
  {
    tag: 'ongoing',
    name: 'dotfiles',
    text: 'One script takes a blank Mac to a fully configured machine.',
    href: 'https://github.com/byurhannurula/dotfiles',
  },
  {
    tag: 'this site',
    name: 'byurhannurula.com',
    text: 'The fourth rebuild. The wordmark survived all of them.',
    href: 'https://github.com/byurhannurula/byurhannurula-com',
  },
  {
    tag: '2019',
    name: 'gatsby-source-gitlab',
    text: 'A Gatsby source plugin for GitLab data. My first published package.',
  },
];
