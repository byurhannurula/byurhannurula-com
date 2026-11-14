export interface GearImage {
  src: string;
  width: number;
  height: number;
}

export interface GearItem {
  image: GearImage;
  name: string;
  text: string;
  /** No longer in use. The name is struck through and read as "Retired". */
  retired?: boolean;
}

export interface AppItem {
  icon: string;
  name: string;
  text: string;
  /** Command line tools that belong to the app, as one mono line. */
  cli?: string;
}

interface UsesSectionBase {
  title: string;
  sub?: string;
}

export type UsesSection =
  | (UsesSectionBase & { kind: 'gear'; items: GearItem[] })
  | (UsesSectionBase & { kind: 'apps'; items: AppItem[] });

/** The anchor of a section, for the jump row at the top of the page. */
export const usesSectionId = (section: UsesSection) =>
  section.title.toLowerCase().replaceAll(' ', '-');

export const gearImage = (
  file: string,
  width: number,
  height: number,
): GearImage => ({ src: `/assets/images/${file}`, width, height });

export const appIcon = (file: string) => `/assets/icons/${file}`;

export const USES_UPDATED = 'September 2026';

export const USES: UsesSection[] = [
  {
    title: 'Desk',
    kind: 'gear',
    items: [
      {
        image: gearImage('macbook-pro-14.jpg', 1500, 1500),
        name: 'MacBook Pro 14" M1 Pro',
        text: '16 GB and 512 GB. Still fast enough for everything.',
      },
      {
        image: gearImage('keyboard1.jpg', 1000, 1000),
        name: 'Keychron B1 Pro',
        text: 'Low-profile, 84 keys, wireless.',
      },
      {
        image: gearImage('trust-ozaa.jpg', 1600, 1280),
        name: 'Trust Ozaa',
        text: 'It works, so I do not think about it.',
      },
      {
        image: gearImage('sony-wh1000xm4.jpg', 2500, 2500),
        name: 'Sony WH-1000XM4',
        text: 'Noise cancelling for focus.',
      },
      {
        image: gearImage('iphone-13.jpg', 1024, 1024),
        name: 'iPhone 13',
        text: 'Set up for privacy first.',
      },
    ],
  },
  {
    title: 'Development',
    kind: 'apps',
    items: [
      { icon: appIcon('vscode.svg'), name: 'VS Code', text: 'Daily editor.' },
      {
        icon: appIcon('claude.svg'),
        name: 'Claude Code',
        text: 'In the terminal, where most code starts now.',
      },
      {
        icon: appIcon('ghostty.svg'),
        name: 'Ghostty',
        text: 'Fast, native terminal.',
        cli: 'eza, bat, ripgrep, fzf, jq, btop, gh',
      },
      {
        icon: appIcon('orbstack.png'),
        name: 'OrbStack',
        text: 'Container runtime. Replaced Docker Desktop.',
      },
      {
        icon: appIcon('podman.svg'),
        name: 'Podman',
        text: 'Runs without a daemon, kept next to OrbStack.',
      },
      {
        icon: appIcon('tableplus.png'),
        name: 'TablePlus',
        text: 'SQL databases.',
      },
      {
        icon: appIcon('mongodb-compass.png'),
        name: 'MongoDB Compass',
        text: 'MongoDB collections.',
      },
      {
        icon: appIcon('cyberduck.png'),
        name: 'Cyberduck',
        text: 'SFTP and S3 browser.',
      },
      {
        icon: appIcon('pnpm.svg'),
        name: 'pnpm',
        text: 'With a release-age cooldown on every project.',
      },
      {
        icon: appIcon('homebrew.svg'),
        name: 'Homebrew',
        text: 'Everything else on macOS.',
      },
    ],
  },
  {
    title: 'Apps',
    kind: 'apps',
    items: [
      {
        icon: appIcon('jotter.png'),
        name: 'Jotter',
        text: 'My own app for quick notes.',
      },
      {
        icon: appIcon('raycast.svg'),
        name: 'Raycast',
        text: 'Launcher and small automations.',
      },
      {
        icon: appIcon('brave.svg'),
        name: 'Brave',
        text: 'Privacy by default.',
      },
      {
        icon: appIcon('bitwarden.svg'),
        name: 'Bitwarden',
        text: 'One vault on every device.',
      },
      {
        icon: appIcon('obsidian.svg'),
        name: 'Obsidian',
        text: 'Private notes in local markdown.',
      },
      {
        icon: appIcon('notion.svg'),
        name: 'Notion',
        text: 'Shared docs and tasks.',
      },
      {
        icon: appIcon('raindrop.png'),
        name: 'Raindrop.io',
        text: 'Bookmarks, synced across browsers.',
      },
      { icon: appIcon('tiles.png'), name: 'Tiles', text: 'Window snapping.' },
      {
        icon: appIcon('alttab.png'),
        name: 'AltTab',
        text: 'Switches windows, not full apps.',
      },
      {
        icon: appIcon('stats.ico'),
        name: 'Stats',
        text: 'System monitor in the menu bar.',
      },
      {
        icon: appIcon('hidden-bar.png'),
        name: 'Hidden Bar',
        text: 'Fewer menu bar icons.',
      },
      {
        icon: appIcon('flux.ico'),
        name: 'f.lux',
        text: 'Warm screen after dark.',
      },
      {
        icon: appIcon('monitorcontrol.png'),
        name: 'MonitorControl',
        text: 'Brightness keys for external monitors.',
      },
      {
        icon: appIcon('screendrop.png'),
        name: 'Screendrop',
        text: 'Screenshots with instant links.',
      },
      {
        icon: appIcon('appcleaner.png'),
        name: 'AppCleaner',
        text: 'Clean uninstalls.',
      },
      {
        icon: appIcon('unarchiver.png'),
        name: 'The Unarchiver',
        text: 'Opens every archive format.',
      },
    ],
  },
  {
    title: 'Workshop',
    sub: 'A hobby.',
    kind: 'gear',
    items: [
      {
        image: gearImage('bambu-lab-a1-combo.png', 1265, 1024),
        name: 'Bambu Lab A1 Combo',
        text: 'Multi-colour 3D printer.',
      },
      {
        image: gearImage('creality-spacepi-plus.jpg', 1000, 1000),
        name: 'Creality SpacePi Plus',
        text: 'Keeps two rolls of filament dry.',
      },
      {
        image: gearImage('creality-ender-3-v2.jpg', 750, 750),
        name: 'Creality Ender 3 V2',
        text: 'Retired. It taught me patience.',
        retired: true,
      },
    ],
  },
];
