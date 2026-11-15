import { execFileSync } from 'node:child_process';
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

/** The files that make up the design system. A commit here is a change. */
const DESIGN_PATHS = [
  'src/styles',
  'src/app/globals.css',
  'src/components/ui',
  'src/components/shared',
  'src/config/options.ts',
  'src/config/design-system.ts',
];

export interface DesignChange {
  hash: string;
  /** YYYY-MM-DD */
  date: string;
  /** The commit prefix: feat, fix, perf, style, refactor, content. */
  type: string;
  text: string;
}

/**
 * Commits that touched the design files, newest first. Read from git at
 * build time (the page is static), so each deploy brings the list up to
 * date. Without git (a bare upload) the list is empty.
 */
export function getDesignLog(limit = 40): DesignChange[] {
  try {
    const out = execFileSync(
      'git',
      [
        'log',
        `-n${limit}`,
        '--date=short',
        '--pretty=format:%h%x09%ad%x09%s',
        '--',
        ...DESIGN_PATHS,
      ],
      { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] },
    );
    return out
      .split('\n')
      .filter(Boolean)
      .map((line) => {
        const [hash, date, subject] = line.split('\t');
        const match = /^(\w+)(?:\([^)]*\))?:\s*(.*)$/.exec(subject);
        return {
          hash,
          date,
          type: match ? match[1] : 'change',
          text: match ? match[2] : subject,
        };
      });
  } catch {
    return [];
  }
}

/** Custom properties set in the token stylesheet. */
export function countTokens() {
  const css = readFileSync(
    join(process.cwd(), 'src/styles/tokens.css'),
    'utf8',
  );
  return new Set(css.match(/--[\w-]+(?=\s*:)/g)).size;
}

/** Component files under src/components. */
export function countComponents() {
  const files = readdirSync(join(process.cwd(), 'src/components'), {
    recursive: true,
  }) as string[];
  return files.filter((file) => file.endsWith('.tsx')).length;
}

/** Commits in the site's history, at build time. 0 without git. */
export function countCommits() {
  try {
    return Number(
      execFileSync('git', ['rev-list', '--count', 'HEAD'], {
        encoding: 'utf8',
        stdio: ['ignore', 'pipe', 'ignore'],
      }).trim(),
    );
  } catch {
    return 0;
  }
}
