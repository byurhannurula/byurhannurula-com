export const CV_COPY = {
  summary:
    'Full-stack engineer and team lead. Six years at ReCheck, from intern to lead, on every layer of the product: the Figma file, the React front end, the Node services, and the servers they run on.',
  experience: 'Experience',
  earlier: 'Earlier',
  education: 'Education',
  stack: 'Stack',
  projects: 'Side projects',
  print: 'Download PDF',
  printHint: 'Opens the print window. Pick "Save as PDF".',
  live: 'Live version',
} as const;

/** Side projects on the CV, by slug from projects.ts. */
export const CV_PROJECTS = ['jotter', 'ogee', 'fullshot'];
