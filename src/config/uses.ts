export interface UseItem {
  name: string;
  description: string;
  image?: string;
  url?: string;
}

export interface UseCategory {
  title: string;
  type?: "list" | "grid" | "gear";
  items: UseItem[];
}

export const usesData: UseCategory[] = [
  {
    title: "Workstation",
    type: "gear",
    items: [
      {
        name: 'MacBook Pro 14" M1 Pro',
        description:
          "Base model 16GB RAM, 512GB SSD - My daily driver for development still going strong",
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
        name: "Wireless Keyboard 84 Keys",
        description:
          "84-key wireless low-profile mechanical keyboard for daily use",
        image: "/assets/images/keyboard.jpg",
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
        description:
          "Currently not in active use but was a great start to 3D printing",
        image: "/assets/images/creality-ender-3-v2.jpg",
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
        description: "Primary code editor",
        url: "https://code.visualstudio.com/",
      },
      {
        name: "Windsurf",
        description: "Primary AI agentic code editor",
        url: "https://windsurf.com/",
      },
      {
        name: "Cursor",
        description: "Secondary AI code editor",
        url: "https://www.cursor.com/",
      },
      {
        name: "iTerm2 w/ ZSH & Oh My Zsh",
        description: "Main terminal with ZSH and Oh My Zsh",
        url: "https://iterm2.com/",
      },
      {
        name: "Orbstack",
        description:
          "Docker Desktop alternative with better performance and integration",
        url: "https://www.orbstack.dev/",
      },
      {
        name: "Docker Desktop",
        description: "Containerization platform",
        url: "https://www.docker.com/products/docker-desktop/",
      },
      {
        name: "TablePlus",
        description: "Database management tool",
        url: "https://tableplus.com/",
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
        description:
          "Adjusts the color temperature of your screen based on the time of day",
      },
      // {
      //   name: "MonitorControl",
      //   description: "Adjusts the brightness of your screens",
      //   url: "https://github.com/MonitorControl/MonitorControl#readme",
      // },
      {
        name: "Hidden Bar",
        description: "Hide the menu bar icons",
        url: "https://github.com/dwarvesf/hidden",
      },
      {
        name: "Stats",
        description: "Monitor your system resources",
        url: "https://github.com/exelban/stats",
      },
      {
        name: "Raycast",
        description: "Productivity launcher and workflow automation",
        url: "https://www.raycast.com/",
      },
      {
        name: "Brave Browser",
        description: "Privacy-focused web browser for daily browsing",
        url: "https://www.brave.com/",
      },
      // {
      //   name: "Zen Browser",
      //   description: "Another privacy-focused web browser currently testing",
      //   url: "https://www.zen.com/",
      // },
      {
        name: "Bitwarden",
        description: "Password manager for secure credential storage",
        url: "https://www.bitwarden.com/",
      },
      {
        name: "Discord",
        description: "Communication platform for daily interactions",
        url: "https://www.discord.com/",
      },
      {
        name: "Notion",
        description: "Productivity notes, tasks, and knowledge base",
        url: "https://www.notion.com/",
      },
      {
        name: "Obsidian",
        description: "Another productivity notes, tasks, and knowledge base",
        url: "https://www.obsidian.md/",
      },
      {
        name: "AppCleaner",
        description: "Uninstall applications and their associated files easily",
        url: "https://freemacsoft.net/appcleaner/",
      },
      {
        name: "Tiles",
        description: "MacOS missing window management",
        url: "https://www.sempliva.com/tiles/",
      },
      {
        name: "Flameshot",
        description: "Screenshot utility",
        url: "https://flameshot.org/",
      },
    ],
  },
  {
    title: "Self-Hosted Services - Infrastructure",
    type: "list",
    items: [
      {
        name: "Proxmox",
        description:
          "Virtualization platform for running virtual machines and containers",
        url: "https://www.proxmox.com/",
      },
      {
        name: "Nginx Proxy Manager",
        description: "Reverse proxy with SSL certificate management",
        url: "https://nginxproxymanager.com/",
      },
      {
        name: "AdGuard Home",
        description: "Network-wide ad and tracker blocking",
        url: "https://adguard.com/en/adguard-home/overview.html",
      },
      {
        name: "Cloudflare Tunnel",
        description: "Secure remote access without port forwarding",
        url: "https://developers.cloudflare.com/cloudflare-one/connections/connect-apps/install-and-setup/tunnel-guide/",
      },
      {
        name: "Tailscale",
        description: "Secure VPN for remote access to homelab",
        url: "https://tailscale.com/",
      },
      {
        name: "PocketID",
        description:
          "Self-hosted simple and easy-to-use OIDC provider that allows to authenticate with passkeys",
        url: "https://pocket-id.org/",
      },
    ],
  },
  {
    title: "Self-Hosted Services - Core",
    type: "list",
    items: [
      {
        name: "Home Assistant",
        description: "Home automation and IoT device management",
        url: "https://www.home-assistant.io/",
      },
      {
        name: "Immich",
        description: "Self-hosted photo and video backup solution",
        url: "https://immich.app/",
      },
      {
        name: "Vaultwarden",
        description: "Self-hosted Bitwarden-compatible password manager",
        url: "https://vaultwarden.org/",
      },
      {
        name: "Navidrome",
        description: "Personal music streaming server",
        url: "https://navidrome.org/",
      },
      {
        name: "FreshRSS",
        description: "Self-hosted RSS reader to escape social media algorithms",
        url: "https://freshrss.org/",
      },
      {
        name: "Baikal",
        description: "CalDAV and CardDAV server for calendars and contacts",
        url: "https://sabre.io/baikal/",
      },
      {
        name: "Papra",
        description:
          "Open Source simple and lightweight document management platform",
        url: "https://papra.app/",
      },
    ],
  },
  {
    title: "Self-Hosted Services - Monitoring",
    type: "list",
    items: [
      {
        name: "Glance Dashboard",
        description: "Personal dashboard for monitoring services",
        url: "https://github.com/glanceapp/glance",
      },
      {
        name: "Uptime Kuma",
        description: "Self-hosted monitoring tool for service uptime",
        url: "https://github.com/louislam/uptime-kuma",
      },
      {
        name: "Beszel",
        description: "Self-hosted simple, lightweight server monitoring",
        url: "https://www.beszel.dev/",
      },
    ],
  },
];

export const USES_LAST_UPDATED = "December 2025";
