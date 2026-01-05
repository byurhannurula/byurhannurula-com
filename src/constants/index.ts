import {
  IconBrandGithub,
  IconBrandInstagram,
  IconBrandMastodon,
  IconBrandX,
  IconRss,
} from '@tabler/icons-react';

export const domain = 'https://byurhannurula.com';
export const email = 'hi@byurhannurula.com';
export const username = 'byurhannurula';

export const name = 'Byurhan';
export const fullName = 'Byurhan Nurula';
export const description =
  'Software engineer and IT enthusiast from Bulgaria, with a passion for front-end development';

export const SOCIALS = [
  {
    name: 'Instagram',
    label: 'Instagram',
    icon: IconBrandInstagram,
    href: `https://instagram.com/${username}`,
    showInLanding: true,
    showInFooter: true,
    showInAbout: true,
  },
  {
    name: 'X',
    label: 'X (Twitter)',
    icon: IconBrandX,
    href: `https://twitter.com/${username}`,
    showInLanding: true,
    showInFooter: true,
    showInAbout: true,
  },
  {
    name: 'Mastodon',
    label: 'Mastodon',
    icon: IconBrandMastodon,
    href: `https://mastodon.com`,
    showInLanding: false,
    showInFooter: false,
    showInAbout: true,
  },
  {
    name: 'Github',
    label: 'Github',
    icon: IconBrandGithub,
    href: `https://github.com/${username}`,
    showInLanding: true,
    showInFooter: true,
    showInAbout: true,
  },
  // {
  //   name: 'Linkedin',
  //   label: 'Linkedin',
  //   icon: IconBrandLinkedin,
  //   href: `https://linkedin.com/in/${username}`,
  //   showInLanding: false,
  //   showInFooter: true,
  //   showInAbout: true,
  // },
  {
    name: 'RSS',
    label: 'RSS',
    icon: IconRss,
    href: `${domain}/rss.xml`,
    showInLanding: false,
    showInFooter: true,
    showInAbout: false,
  },
];

export const LINKS = [
  { label: 'Home', href: '/', showInMainNav: true },
  { label: 'About', href: '/about', showInMainNav: true },
  { label: 'Thoughts', href: '/blog', showInMainNav: true },
  // { label: 'Uses', href: '/uses', showInMainNav: false },
  // { label: 'Bookshelf', href: '/books', showInMainNav: false },
];

export const ABOUT_CARDS = [
  { label: 'About', description: 'About me, what I do', href: '/about' },
  {
    label: 'Blog',
    description: 'Tutorials, tips & trick, code samples',
    href: '/blog',
  },
  {
    label: 'Bookshelf',
    description: 'Books I enjoyed reading',
    href: '/books',
  },
  {
    label: 'Uses',
    description: 'My complete setup, tools and apps that I use daily',
    href: '/uses',
  },
];

export const WORK = [
  // {
  //   companyName: 'ReCheck B.V',
  //   jobTitle: 'Software Engineer',
  //   // description: 'About me, what I do',
  //   href: 'https://recheck.io',
  //   date: 'Jun 2020 - Present',
  // },
  // {
  //   companyName: 'ReCheck B.V',
  //   // description: 'About me, what I do',
  //   href: 'https://recheck.io',
  //   jobTitle: 'Junior Front-End Developer',
  //   date: 'Feb 2020 - May 2020',
  // },
];
