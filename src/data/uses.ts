export interface UseItem {
  name: string
  description: string
  image?: string
  url?: string
}

export interface UseCategory {
  title: string
  type?: "list" | "grid"
  items: UseItem[]
}

export const usesData: UseCategory[] = [
  {
    title: "Workstation",
    items: [
      {
        name: 'MacBook Pro M1 Pro 14"',
        description: "16GB RAM, 512GB SSD - My daily driver for development",
        image: "/placeholder.svg",
      },
      {
        name: "Sony WH-1000XM4",
        description: "Wireless noise-canceling headphones for focus",
        image: "/placeholder.svg",
      },
      {
        name: "iPhone 13",
        description: "Daily phone with focus on privacy and security",
        image: "/placeholder.svg",
      },
      {
        name: "Trust Ozaa Mouse",
        description: "Reliable wireless mouse for daily use",
        image: "/placeholder.svg",
      },
    ],
  },
  {
    title: "Homelab Hardware",
    items: [
      {
        name: "UniFi UCG Ultra",
        description: "Gateway router for network management and security",
        image: "/assets/images/ucg-ultra.png",
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
        image: "/assets/images/raspberry-pi-3b-plus.png",
      },
      {
        name: 'DeskPi T0 4U 10" Server Rack',
        description: "Compact server rack for organizing homelab equipment",
        image: "/assets/images/deskpi-t0-4u-10-server-rack.png",
      },
    ],
  },
  {
    title: "3D Printing",
    items: [
      {
        name: "Bambu Lab A1 Combo",
        description: "Reliable 3D printer with AMS for multi-color printing",
        image: "/assets/images/bambu-lab-a1-combo.png",
      },
    ],
  },

  {
    title: "Development",
    type: "list",
    items: [
      {
        name: "VS Code",
        description: "Primary code editor with privacy-focused extensions",
        url: "https://code.visualstudio.com/",
      },
      {
        name: "Cursor",
        description: "Primary code editor with privacy-focused extensions",
        url: "https://www.cursor.com/",
      },
      {
        name: "iTerm2",
        description: "Terminal emulator with Oh My Zsh configuration",
        url: "https://iterm2.com/",
      },
      {
        name: "ZSH",
        description: "Terminal emulator with Oh My Zsh configuration",
        url: "https://zsh.sourceforge.io/",
      },
      {
        name: "Oh My Zsh",
        description: "Terminal emulator with Oh My Zsh configuration",
        url: "https://ohmyz.sh/",
      },
      {
        name: "Orbstack",
        description: "Productivity launcher and workflow automation",
        url: "https://www.orbstack.dev/",
      },
      {
        name: "Docker Desktop",
        description: "Productivity launcher and workflow automation",
        url: "https://www.docker.com/products/docker-desktop/",
      },
      {
        name: "TablePlus",
        description: "Package manager for macOS",
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
        description: "Adjusts the color temperature of your screen based on the time of day",
      },
      {
        name: "MonitorControl",
        description: "Adjusts the color temperature of your screen based on the time of day",
        url: "https://github.com/MonitorControl/MonitorControl#readme",
      },
      {
        name: "Hidden Bar",
        description: "Adjusts the color temperature of your screen based on the time of day",
        url: "https://github.com/dwarvesf/hidden",
      },
      {
        name: "Stats",
        description: "Adjusts the color temperature of your screen based on the time of day",
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
      {
        name: "Zen Browser",
        description: "Privacy-focused web browser for daily browsing",
        url: "https://www.zen.com/",
      },
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
        description: "Productivity launcher and workflow automation",
        url: "https://www.notion.com/",
      },
      {
        name: "Obsidian",
        description: "Productivity launcher and workflow automation",
        url: "https://www.obsidian.md/",
      },
      {
        name: "AppCleaner",
        description: "Productivity launcher and workflow automation",
        url: "https://freemacsoft.net/appcleaner/",
      },
      {
        name: "Tiles",
        description: "Productivity launcher and workflow automation",
        url: "https://www.sempliva.com/tiles/",
      },
      {
        name: "Shottr",
        description: "Screenshot utility",
        url: "https://shottr.cc/",
      },
    ],
  },
  {
    title: "Other Apps or Self-Hosted Services",
    type: "list",
    items: [
      {
        name: "Home Assistant",
        description: "Home automation and IoT device management",
        url: "https://www.home-assistant.io/",
      },
      {
        name: "FreshRSS",
        description: "Self-hosted RSS reader - remove social media algorithms",
        url: "https://freshrss.org/",
      },
      {
        name: "Immich",
        description: "Self-hosted photo and video backup solution",
        url: "https://immich.app/",
      },
      {
        name: "Vaultwarden",
        description: "Self-hosted password manager - backup to Bitwarden",
        url: "https://vaultwarden.org/",
      },
      {
        name: "Cloudflare Tunnel",
        description: "Secure remote access without port forwarding",
        url: "https://developers.cloudflare.com/cloudflare-one/connections/connect-apps/install-and-setup/tunnel-guide/",
      },
      {
        name: "Navidrome",
        description: "Personal music streaming server",
        url: "https://navidrome.org/",
      },
      {
        name: "AdGuard Home",
        description: "Network-wide ad and tracker blocking",
        url: "https://adguard.com/en/adguard-home/overview.html",
      },
      {
        name: "Nginx Proxy Manager",
        description: "Reverse proxy with SSL certificate management",
        url: "https://nginxproxymanager.com/",
      },
      {
        name: "Tailscale",
        description: "Secure VPN for remote access to homelab",
        url: "https://tailscale.com/",
      },
      {
        name: "Baikal",
        description: "CalDAV and CardDAV server for calendar/contacts",
        url: "https://sabre.io/baikal/",
      },
      {
        name: "Paperless-ngx",
        description: "Document management and OCR system",
        url: "https://docs.paperless-ngx.com/",
      },
      {
        name: "Glance Dashboard",
        description: "Personal dashboard for monitoring services",
        url: "https://github.com/look-at-the-glance/dashboard",
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
      {
        name: "Scrutiny",
        description: "Self-hosted monitoring tool for HDD/SSD disk health",
        url: "https://github.com/AnalogJ/scrutiny",
      },
    ],
  },
]

export const USES_LAST_UPDATED = "October 2024"
