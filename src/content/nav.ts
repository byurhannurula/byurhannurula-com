export interface NavItem {
  label: string;
  href: string;
  /** Words the command menu matches on top of the label. */
  keywords?: string;
  /** Shown only while this option has this value, as `key:value`. */
  when?: 'homelab:on';
}

export const NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: '/', keywords: 'start' },
  {
    label: 'Work',
    href: '/work',
    keywords: 'projects side tools jotter ogee fullshot',
  },
  { label: 'Notes', href: '/notes', keywords: 'blog posts writing' },
  { label: 'About', href: '/about', keywords: 'cv career recheck stack job' },
  { label: 'Uses', href: '/uses', keywords: 'hardware software desk setup' },
  {
    label: 'Homelab',
    href: '/homelab',
    keywords: 'rack server self-hosting proxmox',
    when: 'homelab:on',
  },
];

/** In the footer and the command menu, but not in the nav bar. */
export const FOOTER_ITEMS: NavItem[] = [
  {
    label: 'Colophon',
    href: '/colophon',
    keywords: 'how this site is made stack fonts colours credits',
  },
];
