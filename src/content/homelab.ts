import { appIcon, gearImage, type GearItem } from '@/content/uses';

export interface HomelabService {
  /** Also the name that a status monitor must have to match. */
  name: string;
  icon: string;
  /** A few words, for the rack panel. */
  short: string;
  /** One sentence, for the services list. */
  text: string;
}

export const SERVICES = [
  {
    name: 'Proxmox',
    icon: appIcon('proxmox.svg'),
    short: 'Virtual machines and containers',
    text: 'Virtual machines and containers.',
  },
  {
    name: 'Nginx Proxy Manager',
    icon: appIcon('nginx-proxy-manager.svg'),
    short: 'Reverse proxy with certificates',
    text: 'Reverse proxy with certificates.',
  },
  {
    name: 'AdGuard Home',
    icon: appIcon('adguard-home.svg'),
    short: 'DNS with ad blocking',
    text: 'DNS with ad blocking for the full network.',
  },
  {
    name: 'Cloudflare Tunnel',
    icon: appIcon('cloudflare.svg'),
    short: 'Remote access, no open ports',
    text: 'Remote access with no open ports.',
  },
  {
    name: 'Pocket ID',
    icon: appIcon('pocket-id.svg'),
    short: 'One login with passkeys',
    text: 'One login with passkeys.',
  },
  {
    name: 'Vaultwarden',
    icon: appIcon('vaultwarden.svg'),
    short: 'Password vault',
    text: 'My own password vault.',
  },
  {
    name: 'Home Assistant',
    icon: appIcon('home-assistant.svg'),
    short: 'Home automation',
    text: 'Automation, with ESPHome sensors I flash myself.',
  },
  {
    name: 'Immich',
    icon: appIcon('immich.svg'),
    short: 'Photo and video backup',
    text: 'Photo and video backup.',
  },
  {
    name: 'Navidrome',
    icon: appIcon('navidrome.svg'),
    short: 'Music',
    text: 'My music, from my hardware.',
  },
  {
    name: 'FreshRSS',
    icon: appIcon('freshrss.svg'),
    short: 'Feeds',
    text: 'Feeds without an algorithm.',
  },
  {
    name: 'Baikal',
    icon: appIcon('baikal.svg'),
    short: 'Calendars and contacts',
    text: 'Calendars and contacts.',
  },
  {
    name: 'Papra',
    icon: appIcon('papra.svg'),
    short: 'Documents',
    text: 'Documents.',
  },
  {
    name: 'Uptime Kuma',
    icon: appIcon('uptime-kuma.svg'),
    short: 'Uptime checks',
    text: 'Uptime checks.',
  },
  {
    name: 'Beszel',
    icon: appIcon('beszel.svg'),
    short: 'Server metrics',
    text: 'Server metrics.',
  },
] as const satisfies readonly HomelabService[];

export type ServiceName = (typeof SERVICES)[number]['name'];

export const serviceByName = (name: ServiceName): HomelabService =>
  SERVICES.find((service) => service.name === name)!;

export type DeviceId = 'router' | 'pi' | 'server' | 'free' | 'ap' | 'zigbee';

export interface Device {
  id: DeviceId;
  tag: string;
  name: string;
  text: string;
  /** Draft: which service runs where is an assumption, not checked. */
  runs: ServiceName[];
}

/** In the order of the drawing, which is also the tab order. */
export const DEVICES: Device[] = [
  {
    id: 'router',
    tag: 'network',
    name: 'UniFi UCG Ultra',
    text: 'Router and firewall. Each type of device gets its own network, so a cheap sensor cannot see my laptop.',
    runs: [],
  },
  {
    id: 'pi',
    tag: 'always on',
    name: 'Raspberry Pi 3B+',
    text: 'DNS and monitoring. It must stay up when the server is down, so it does not run on the server.',
    runs: ['AdGuard Home', 'Uptime Kuma', 'Beszel'],
  },
  {
    id: 'server',
    tag: 'main server',
    name: 'HP EliteDesk 800 G3 Mini',
    text: 'A used office PC. It runs Proxmox, and Proxmox runs all the other services.',
    runs: [
      'Proxmox',
      'Nginx Proxy Manager',
      'Cloudflare Tunnel',
      'Pocket ID',
      'Vaultwarden',
      'Home Assistant',
      'Immich',
      'Navidrome',
      'FreshRSS',
      'Baikal',
      'Papra',
    ],
  },
  {
    id: 'free',
    tag: '1U free',
    name: 'Room for one more',
    text: 'One unit of the DeskPi T0 rack is empty. I will find a reason to fill it.',
    runs: [],
  },
  {
    id: 'ap',
    tag: 'wi-fi',
    name: 'UniFi U6+',
    text: 'One access point. For this home, one is sufficient.',
    runs: [],
  },
  {
    id: 'zigbee',
    tag: 'radio',
    name: 'Sonoff Zigbee Dongle',
    text: 'The radio for the home automation sensors. Home Assistant talks to them through it.',
    runs: ['Home Assistant'],
  },
];

export const DEFAULT_DEVICE: DeviceId = 'server';

export const MACHINES: GearItem[] = [
  {
    image: gearImage('hp-elitedesk-800-g3-mini.jpg', 1280, 653),
    name: 'HP EliteDesk 800 G3 Mini',
    text: 'Used office PC. Runs Proxmox.',
  },
  {
    image: gearImage('raspberry-pi-3b.jpg', 1500, 965),
    name: 'Raspberry Pi 3B+',
    text: 'DNS and monitoring. Must stay up when the server is down.',
  },
  {
    image: gearImage('unifi-ucg-ultra.jpg', 1200, 921),
    name: 'UniFi UCG Ultra',
    text: 'Router and firewall, one network for each type of device.',
  },
  {
    image: gearImage('unifi-u6-plus.png', 1200, 1200),
    name: 'UniFi U6+',
    text: 'One access point is sufficient.',
  },
  {
    image: gearImage('sonoff-zigbee-dongle.jpg', 1100, 1100),
    name: 'Sonoff Zigbee Dongle',
    text: 'Radio for the home automation sensors.',
  },
  {
    image: gearImage('deskpi-rackmate-t0.jpg', 1066, 1066),
    name: 'DeskPi T0, 4U, 10"',
    text: 'Small rack that keeps the cables in order.',
  },
];

export interface Hop {
  /** A service, or the reader's own device at the start. */
  from: ServiceName | 'phone';
  name: string;
  text: string;
}

export const HOPS: Hop[] = [
  {
    from: 'phone',
    name: 'My phone',
    text: 'Outside my home, on any network.',
  },
  {
    from: 'Cloudflare Tunnel',
    name: 'Cloudflare Tunnel',
    text: 'The server calls out. Nothing calls in.',
  },
  {
    from: 'Nginx Proxy Manager',
    name: 'Nginx Proxy Manager',
    text: 'Finds the right service and adds the certificate.',
  },
  {
    from: 'Pocket ID',
    name: 'Pocket ID',
    text: 'Asks for a passkey. There is no password.',
  },
  {
    from: 'Immich',
    name: 'Immich',
    text: 'Shows the photo, from a disk that I own.',
  },
];

export const RULES = [
  'No open ports. Public access goes out through a tunnel.',
  'IoT devices get their own network.',
  'The monitor does not run on the machine that it monitors.',
  'A backup is not a backup until I restore from it.',
  'If I do something twice, I write a script for it.',
];
