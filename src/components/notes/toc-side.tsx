import type { NoteHeading } from '@/lib/mdx';
import { cn } from '@/lib/utils';

import { jumpToHeading } from './toc-jump';

interface TocSideProps {
  headings: NoteHeading[];
  /** Id of the heading the reader is in, or null above the first. */
  active: string | null;
}

/**
 * `toc: side`: the contents as a quiet column beside the text. Only on
 * screens wide enough (the `toc-side:` variant, src/styles/notes.css);
 * below that the island takes over.
 */
export function TocSide({ headings, active }: TocSideProps) {
  return (
    <nav
      aria-label="On this page"
      className="fixed top-32 left-[calc(50%+26rem)] z-35 hidden w-52 print:hidden toc-side:block"
    >
      <ol className="max-h-[calc(100vh-12rem)] overflow-y-auto overscroll-contain">
        {headings.map((heading) => (
          <li key={heading.id}>
            <a
              href={`#${heading.id}`}
              aria-current={heading.id === active ? 'location' : undefined}
              onClick={(event) => {
                event.preventDefault();
                jumpToHeading(heading.id);
              }}
              className={cn(
                // Inset shadows draw the side line: a border would be cut by
                // the list's own scroll box.
                'block py-[0.3rem] pl-4 text-sm leading-[1.35] text-faint no-underline shadow-[inset_1px_0_0_var(--line)] transition-colors duration-200 -outline-offset-2 hover:text-ink aria-[current]:text-ink aria-[current]:shadow-[inset_2px_0_0_var(--accent-bright)]',
                heading.level === 3 && 'pl-7 text-[0.8125rem]',
              )}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
