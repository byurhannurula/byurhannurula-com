export interface Role {
  period: string;
  /** Start year, for compact views. */
  year: string;
  title: string;
  text: string;
  current?: boolean;
}

/** One job, four roles. Views must show it as one job with a progression. */
export const EMPLOYER = {
  name: 'ReCheck',
  href: 'https://recheck.io/',
  logo: '/assets/icons/recheck.png',
  period: '2020 to now',
  duration: 'six years',
} as const;

export const ROLES: Role[] = [
  {
    period: 'Jan to Jun 2020',
    year: '2020',
    title: 'Intern',
    text: "Joined during my Master's degree.",
  },
  {
    period: '2020 to 2022',
    year: '2020',
    title: 'Software Developer',
    text: 'Web apps, landing pages, marketing sites.',
  },
  {
    period: '2022 to 2024',
    year: '2022',
    title: 'Full-Stack Engineer',
    text: 'Front-end architecture, Node services, deployments.',
  },
  {
    period: '2024 to now',
    year: '2024',
    title: 'Team Lead',
    text: 'Planning, reviews, mentoring. Still a lot of code.',
    current: true,
  },
];

export const ACHIEVEMENTS = [
  'Built and released web apps, landing pages and marketing sites for the company.',
  'Look after the front-end architecture and the Node services behind it.',
  'Built a Capacitor and Ionic hybrid app when the product needed one.',
  'Took on the DevOps work while the team had no DevOps engineer: virtual machines, deployments, CI and monitoring.',
  'Tidied up the brand while the team had no designer: logos, colours, favicons and a shared Figma file.',
  'Onboarded and mentored interns, reviewed code and helped improve how the team works.',
];

/** Work next to the day job. The client work itself lives on the studio site. */
export const ALONGSIDE = [
  {
    period: '2026 to now',
    title: 'Waaza Studio, freelance',
    href: 'https://waaza.studio',
    text: 'My small web studio in Ruse, next to the day job. Websites and online stores for local businesses, in Bulgarian and English.',
  },
];

export const EARLIER = [
  {
    period: '2018 to 2020',
    title: 'Front-end developer, freelance',
    text: 'Gatsby and GitLab years. Published gatsby-source-gitlab and built small tools.',
  },
  {
    period: '2015 to 2020',
    title: 'M.Sc. Computer Engineering, University of Ruse',
    text: 'Department of Computer Systems and Technologies.',
  },
];
