export interface Social {
  name: string;
  href: string;
  handle: string;
}

/** Order is the display order. RSS is a feed, not a profile, so it is apart. */
export const SOCIALS: Social[] = [
  {
    name: 'GitHub',
    href: 'https://github.com/byurhannurula',
    handle: 'byurhannurula',
  },
  {
    name: 'LinkedIn',
    href: 'https://linkedin.com/in/byurhannurula',
    handle: 'byurhannurula',
  },
  {
    name: 'X',
    href: 'https://twitter.com/byurhannurula',
    handle: '@byurhannurula',
  },
  {
    name: 'Mastodon',
    href: 'https://mastodon.social/@byurhannurula',
    handle: '@byurhannurula',
  },
];

export const RSS_PATH = '/rss.xml';
