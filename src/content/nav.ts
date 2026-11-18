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

/** Pages that are built but not linked yet. Remove a path to show it again. */
export const UNLISTED = new Set(['/shelf', '/stats', '/design-system']);

/** In the footer and the command menu, but not in the nav bar. */
export const FOOTER_ITEMS: NavItem[] = (
  [
    {
      label: 'Shelf',
      href: '/shelf',
      keywords: 'books films movies shows reading watching',
    },
    {
      label: 'Stats',
      href: '/stats',
      keywords: 'numbers views likes analytics statistics',
    },
    {
      label: 'Design system',
      href: '/design-system',
      keywords: 'tokens colours type components styleguide changes',
    },
    {
      label: 'Colophon',
      href: '/colophon',
      keywords: 'how this site is made stack fonts colours credits',
    },
  ] satisfies NavItem[]
).filter((item) => !UNLISTED.has(item.href));
