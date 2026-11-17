export const CV_COPY = {
  summary:
    'Full-stack engineer and team lead. Six years at ReCheck, from intern to team lead. Mostly React and Node, with some design and DevOps work when the team needed it.',
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
