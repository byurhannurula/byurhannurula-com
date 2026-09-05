export interface UseItem {
  name: string;
  description: string;
  image?: string;
  url?: string;
  /** Replaced but kept for reference, rendered struck through. */
  deprecated?: boolean;
  /**
   * Command-line tools that belong to this entry rather than to a shelf of
   * their own. Rendered as a plain mono line: the row is already a link, so
   * these cannot be links too.
   */
  stack?: string[];
}

export interface UseCategory {
  title: string;
  type?: "list" | "grid" | "gear";
  /** One-line notice under the heading, e.g. a planned move-out. */
  note?: string;
  items: UseItem[];
}

export const usesData: UseCategory[] = [
  {
    title: "Desk",
    type: "gear",
    items: [
      {
        name: 'MacBook Pro 14" M1 Pro',
        description:
          "Base model, 16GB RAM and 512GB SSD. Still the daily driver.",
        image: "/assets/images/macbook-pro-14.jpg",
      },
      {
        name: "Sony WH-1000XM4",
        description: "Wireless noise-canceling headphones for focus",
        image: "/assets/images/sony-wh1000xm4.jpg",
      },
      {
        name: "iPhone 13",
        description: "Daily phone with focus on privacy and security",
        image: "/assets/images/iphone-13.jpg",
      },
      {
        name: "Keychron B1 Pro",
        description: "84-key wireless low-profile keyboard for daily use",
        image: "/assets/images/keyboard.png",
      },
      {
        name: "Trust Ozaa Mouse",
        description: "Reliable wireless mouse for daily use",
        image: "/assets/images/trust-ozaa.jpg",
      },
    ],
  },
  {
    title: "Homelab Hardware",
    type: "gear",
    note: "Moving to its own /homelab page soon; listed here until then.",
    items: [
      {
        name: "UniFi UCG Ultra",
        description: "Gateway router for network management and security",
        image: "/assets/images/unifi-ucg-ultra.jpg",
      },
      {
        name: "UniFi U6+ Access Point",
        description: "Wi-Fi 6 access point for reliable wireless coverage",
        image: "/assets/images/unifi-u6-plus.png",
      },
      {
        name: "HP EliteDesk 800 G3 Mini PC",
        description: "Main server running Proxmox for virtualization",
        image: "/assets/images/hp-elitedesk-800-g3-mini.jpg",
      },
      {
        name: "Raspberry Pi 3B+",
        description: "Secondary server for monitoring services and DNS server",
        image: "/assets/images/raspberry-pi-3b.jpg",
      },
      {
        name: "Sonoff Zigbee Dongle",
        description: "Zigbee dongle for home automation",
        image: "/assets/images/sonoff-zigbee-dongle.jpg",
      },
      {
        name: 'DeskPi T0 4U 10" Server Rack',
        description: "Compact server rack for organizing homelab equipment",
        image: "/assets/images/deskpi-rackmate-t0.jpg",
      },
    ],
  },
  {
    title: "3D Printing",
    type: "gear",
    items: [
      {
        name: "Creality Ender 3 V2",
        description: "Retired, but a great start to 3D printing",
        image: "/assets/images/creality-ender-3-v2.jpg",
        deprecated: true,
      },
      {
        name: "Bambu Lab A1 Combo",
        description: "Reliable 3D printer with AMS for multi-color printing",
        image: "/assets/images/bambu-lab-a1-combo.png",
      },
      {
        name: "Creality SpacePi Plus",
        description: "Filament dryer for 2 rolls of filament",
        image: "/assets/images/creality-spacepi-plus.jpg",
      },
    ],
  },

  {
    title: "Development",
    type: "list",
    items: [
      {
        name: "VS Code",
        description: "Daily editor, paired with Claude Code CLI",
        url: "https://code.visualstudio.com/",
      },
      {
        name: "Claude Code CLI",
        description:
          "Agentic coding in the terminal, where most code gets written now",
        url: "https://docs.anthropic.com/en/docs/claude-code",
      },
      // Retired: replaced by VS Code + Claude Code CLI.
      // {
      //   name: "Windsurf",
      //   description: "Replaced by VS Code + Claude Code CLI",
      //   url: "https://windsurf.com/",
      //   deprecated: true,
      // },
      // {
      //   name: "Cursor",
      //   description: "Replaced by VS Code + Claude Code CLI",
      //   url: "https://www.cursor.com/",
      //   deprecated: true,
      // },
      {
        name: "Ghostty",
        description: "Daily terminal now: fast, native, calm",
        url: "https://ghostty.org/",
        stack: ["eza", "bat", "ripgrep", "fzf", "jq", "btop", "gh"],
      },
      // Retired: replaced by Ghostty.
      // {
      //   name: "iTerm2 w/ ZSH & Oh My Zsh",
      //   description: "Replaced by Ghostty, kept for reference",
      //   url: "https://iterm2.com/",
      //   deprecated: true,
      // },
      {
        name: "OrbStack",
        description: "Main container runtime now: faster and lighter",
        url: "https://orbstack.dev/",
      },
      // Retired: replaced by OrbStack.
      // {
      //   name: "Docker Desktop",
      //   description: "Replaced by OrbStack",
      //   url: "https://www.docker.com/products/docker-desktop/",
      //   deprecated: true,
      // },
      {
        name: "Podman",
        description: "Daemonless container runtime, kept alongside OrbStack",
        url: "https://podman.io/",
      },
      {
        name: "TablePlus",
        description: "Database management tool",
        url: "https://tableplus.com/",
      },
      {
        name: "MongoDB Compass",
        description: "GUI for reading and poking at MongoDB collections",
        url: "https://www.mongodb.com/products/tools/compass",
      },
      {
        name: "Cyberduck",
        description: "SFTP and S3 browser for servers and buckets",
        url: "https://cyberduck.io/",
      },
      {
        name: "pnpm",
        description:
          "Package manager for every JS project here, release-age cooldown on",
        url: "https://pnpm.io/",
      },
      {
        name: "Homebrew",
        description: "Package manager for macOS",
        url: "https://brew.sh/",
      },
    ],
  },
  {
    title: "Productivity",
    type: "list",
    items: [
      {
        name: "f.lux",
        description: "Warms the screen color temperature after dark",
        url: "https://justgetflux.com/",
      },
      {
        name: "MonitorControl",
        description: "Brightness and volume keys for external monitors",
        url: "https://github.com/MonitorControl/MonitorControl",
      },
      {
        name: "Hidden Bar",
        description: "Hides the menu bar icons that do not earn their space",
        url: "https://github.com/dwarvesf/hidden",
      },
      {
        name: "Stats",
        description: "System resource monitor that lives in the menu bar",
        url: "https://mac-stats.com/",
      },
      {
        name: "Raycast",
        description: "Productivity launcher and workflow automation",
        url: "https://www.raycast.com/",
      },
      {
        name: "Brave Browser",
        description: "Privacy-focused web browser for daily browsing",
        url: "https://brave.com/",
      },
      // {
      //   name: "Zen Browser",
      //   description: "Another privacy-focused web browser currently testing",
      //   url: "https://www.zen.com/",
      // },
      {
        name: "Bitwarden",
        description: "Password manager for secure credential storage",
        url: "https://bitwarden.com/",
      },
      {
        name: "Discord",
        description: "Communication platform for daily interactions",
        url: "https://discord.com/",
      },
      {
        name: "Notion",
        description: "Shared docs, tasks, and anything with a database in it",
        url: "https://www.notion.com/",
      },
      {
        name: "Obsidian",
        description: "Local markdown vault for notes that stay private",
        url: "https://obsidian.md/",
      },
      {
        name: "AppCleaner",
        description: "Uninstall applications and their associated files easily",
        url: "https://freemacsoft.net/appcleaner/",
      },
      {
        name: "Tiles",
        description: "Window snapping that macOS still does not do",
        url: "https://freemacsoft.net/tiles/",
      },
      {
        name: "Screendrop",
        description: "Screenshot sharing: fast captures, instant links",
        url: "https://github.com/fayazara/Screendrop",
      },
      {
        name: "AltTab",
        description: "Alt-tab that switches windows, not whole apps",
        url: "https://alt-tab.app/",
      },
      {
        name: "Raindrop.io",
        description: "Bookmark manager, synced across browsers and devices",
        url: "https://raindrop.io/",
      },
      {
        name: "The Unarchiver",
        description: "Opens the archive formats macOS will not",
        url: "https://theunarchiver.com/",
      },
      {
        name: "Jotter",
        description: "My own app: a fast, minimal notepad for quick thoughts",
        url: "https://jotter.byurhannurula.com/",
      },
    ],
  },
  // {
  //   title: "Self-Hosted Services - Infrastructure",
  //   type: "list",
  //   note: "Moving to its own /homelab page soon; listed here until then.",
  //   items: [
  //     {
  //       name: "Proxmox",
  //       description:
  //         "Virtualization platform for running virtual machines and containers",
  //       url: "https://www.proxmox.com/",
  //     },
  //     {
  //       name: "Nginx Proxy Manager",
  //       description: "Reverse proxy with SSL certificate management",
  //       url: "https://nginxproxymanager.com/",
  //     },
  //     {
  //       name: "AdGuard Home",
  //       description: "Network-wide ad and tracker blocking",
  //       url: "https://adguard.com/en/adguard-home/overview.html",
  //     },
  //     {
  //       name: "Cloudflare Tunnel",
  //       description: "Secure remote access without port forwarding",
  //       url: "https://developers.cloudflare.com/cloudflare-one/connections/connect-apps/install-and-setup/tunnel-guide/",
  //     },
  //     {
  //       name: "Tailscale",
  //       description: "Stepping back for now; Cloudflare Tunnel covers remote access",
  //       url: "https://tailscale.com/",
  //       deprecated: true,
  //     },
  //     {
  //       name: "PocketID",
  //       description:
  //         "Self-hosted simple and easy-to-use OIDC provider that allows to authenticate with passkeys",
  //       url: "https://pocket-id.org/",
  //     },
  //   ],
  // },
  // {
  //   title: "Self-Hosted Services - Core",
  //   type: "list",
  //   note: "Moving to its own /homelab page soon; listed here until then.",
  //   items: [
  //     {
  //       name: "Home Assistant",
  //       description: "Home automation and IoT device management",
  //       url: "https://www.home-assistant.io/",
  //     },
  //     {
  //       name: "Immich",
  //       description: "Self-hosted photo and video backup solution",
  //       url: "https://immich.app/",
  //     },
  //     {
  //       name: "Vaultwarden",
  //       description: "Self-hosted Bitwarden-compatible password manager",
  //       url: "https://vaultwarden.org/",
  //     },
  //     {
  //       name: "Navidrome",
  //       description: "Personal music streaming server",
  //       url: "https://navidrome.org/",
  //     },
  //     {
  //       name: "FreshRSS",
  //       description: "Self-hosted RSS reader to escape social media algorithms",
  //       url: "https://freshrss.org/",
  //     },
  //     {
  //       name: "Baikal",
  //       description: "CalDAV and CardDAV server for calendars and contacts",
  //       url: "https://sabre.io/baikal/",
  //     },
  //     {
  //       name: "Papra",
  //       description:
  //         "Open Source simple and lightweight document management platform",
  //       url: "https://papra.app/",
  //     },
  //   ],
  // },
  // {
  //   title: "Self-Hosted Services - Monitoring",
  //   type: "list",
  //   note: "Moving to its own /homelab page soon; listed here until then.",
  //   items: [
  //     {
  //       name: "Glance Dashboard",
  //       description: "Personal dashboard for monitoring services",
  //       url: "https://github.com/glanceapp/glance",
  //     },
  //     {
  //       name: "Uptime Kuma",
  //       description: "Self-hosted monitoring tool for service uptime",
  //       url: "https://github.com/louislam/uptime-kuma",
  //     },
  //     {
  //       name: "Beszel",
  //       description: "Self-hosted simple, lightweight server monitoring",
  //       url: "https://www.beszel.dev/",
  //     },
  //   ],
  // },
];

export const USES_LAST_UPDATED = "September 2026";
