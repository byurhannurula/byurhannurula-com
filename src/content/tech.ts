/**
 * Brand icons come from cdn.simpleicons.org as `<slug>` or `<slug>/<hex>`.
 * A fixed hex is for marks that are black and would vanish on a dark page.
 */
export const TECH_ICON: Record<string, string> = {
  TypeScript: 'typescript',
  JavaScript: 'javascript',
  React: 'react',
  'Next.js': 'nextdotjs/888',
  Astro: 'astro',
  Tailwind: 'tailwindcss',
  Node: 'nodedotjs',
  Bun: 'bun/c9a27a',
  Express: 'express/888',
  Fastify: 'fastify/888',
  PostgreSQL: 'postgresql',
  MySQL: 'mysql',
  MongoDB: 'mongodb',
  Redis: 'redis',
  Prisma: 'prisma/5a67d8',
  GraphQL: 'graphql',
  Docker: 'docker',
  Nginx: 'nginx',
  Proxmox: 'proxmox',
  Git: 'git',
  Cloudflare: 'cloudflare',
  Vercel: 'vercel/888',
  'Google Cloud': 'googlecloud',
  Figma: 'figma',
};

export const STACK: Record<string, string[]> = {
  'front end': [
    'TypeScript',
    'JavaScript',
    'React',
    'Next.js',
    'Astro',
    'Tailwind',
  ],
  'back end': [
    'Node',
    'Bun',
    'Express',
    'Fastify',
    'PostgreSQL',
    'MySQL',
    'MongoDB',
    'Redis',
    'Prisma',
    'GraphQL',
  ],
  operations: [
    'Docker',
    'Nginx',
    'Proxmox',
    'Git',
    'Cloudflare',
    'Vercel',
    'Google Cloud',
    'AWS',
  ],
  design: ['Figma'],
};

/** What the day job runs on. */
export const WORK_STACK = [
  'TypeScript',
  'React',
  'Next.js',
  'Node',
  'Express',
  'Fastify',
  'PostgreSQL',
  'MongoDB',
  'Docker',
  'Tailwind',
  'Figma',
];

export const CORE_STACK = ['TypeScript', 'React', 'Next.js', 'Node'];
