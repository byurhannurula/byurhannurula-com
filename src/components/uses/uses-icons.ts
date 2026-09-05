// Brand icons for items that have no photo. All vendored under
// public/assets/icons so the page has a single origin: it drops
// cdn.simpleicons.org and cdn.jsdelivr.net from img-src and saves two
// handshakes on a page that is otherwise fully static.
// Marks stay in their brand colour: the row greys them with CSS
// grayscale() so hover reveals the colour. A baked grey made that hover a
// no-op on an already-achromatic fill.
// Plain <img> URLs on purpose: tiny decorative marks that must not go
// through /_next/image (see the Avatar in social-cards.tsx). A miss falls
// back to a letter tile via onError, so entries are safe to extend.
//
// Refresh a mark by re-downloading it:
//   curl -sfL https://cdn.simpleicons.org/<slug>        -o public/assets/icons/<slug>.svg
//   curl -sfL https://cdn.jsdelivr.net/gh/selfhst/icons/svg/<slug>.svg -o public/assets/icons/<slug>.svg

const LOCAL = "/assets/icons";

const ICONS: Record<string, string> = {
  // development
  "VS Code": `${LOCAL}/vscode.svg`,
  "Claude Code CLI": `${LOCAL}/claude.svg`,
  Ghostty: `${LOCAL}/ghostty.svg`,
  "iTerm2 w/ ZSH & Oh My Zsh": `${LOCAL}/iterm2.svg`,
  OrbStack: `${LOCAL}/orbstack.png`,
  "Docker Desktop": `${LOCAL}/docker.svg`,
  Podman: `${LOCAL}/podman.svg`,
  TablePlus: `${LOCAL}/tableplus.png`,
  "MongoDB Compass": `${LOCAL}/mongodb-compass.png`,
  Cyberduck: `${LOCAL}/cyberduck.png`,
  pnpm: `${LOCAL}/pnpm.svg`,
  Homebrew: `${LOCAL}/homebrew.svg`,
  // productivity
  "f.lux": `${LOCAL}/flux.ico`,
  MonitorControl: `${LOCAL}/monitorcontrol.png`,
  "Hidden Bar": `${LOCAL}/hidden-bar.png`,
  Stats: `${LOCAL}/stats.ico`,
  Raycast: `${LOCAL}/raycast.svg`,
  "Brave Browser": `${LOCAL}/brave.svg`,
  Bitwarden: `${LOCAL}/bitwarden.svg`,
  Discord: `${LOCAL}/discord.svg`,
  Notion: `${LOCAL}/notion.svg`,
  Obsidian: `${LOCAL}/obsidian.svg`,
  AppCleaner: `${LOCAL}/appcleaner.png`,
  Tiles: `${LOCAL}/tiles.png`,
  Screendrop: `${LOCAL}/screendrop.png`,
  AltTab: `${LOCAL}/alttab.png`,
  "Raindrop.io": `${LOCAL}/raindrop.png`,
  "The Unarchiver": `${LOCAL}/unarchiver.png`,
  Jotter: `${LOCAL}/jotter.png`,
  // self-hosted: infrastructure
  Proxmox: `${LOCAL}/proxmox.svg`,
  "Nginx Proxy Manager": `${LOCAL}/nginx-proxy-manager.svg`,
  "AdGuard Home": `${LOCAL}/adguard-home.svg`,
  "Cloudflare Tunnel": `${LOCAL}/cloudflare.svg`,
  Tailscale: `${LOCAL}/tailscale.svg`,
  PocketID: `${LOCAL}/pocket-id.svg`,
  // self-hosted: core
  "Home Assistant": `${LOCAL}/home-assistant.svg`,
  Immich: `${LOCAL}/immich.svg`,
  Vaultwarden: `${LOCAL}/vaultwarden.svg`,
  Navidrome: `${LOCAL}/navidrome.svg`,
  FreshRSS: `${LOCAL}/freshrss.svg`,
  Baikal: `${LOCAL}/baikal.svg`,
  Papra: `${LOCAL}/papra.svg`,
  // self-hosted: monitoring
  "Glance Dashboard": `${LOCAL}/glance.svg`,
  "Uptime Kuma": `${LOCAL}/uptime-kuma.svg`,
  Beszel: `${LOCAL}/beszel.svg`,
};

// Brands whose mark is pure black. grayscale() cannot reveal a colour that
// is not there, and #000 disappears on the evening/night tiles, so these get
// inverted in dark themes instead.
const MONO_BLACK = new Set(["Notion", "iTerm2 w/ ZSH & Oh My Zsh"]);

export function iconFor(name: string): string | null {
  return ICONS[name] ?? null;
}

export function isMonoBlack(name: string): boolean {
  return MONO_BLACK.has(name);
}
