import type { ComponentProps } from 'react';

import { Callout } from '@/components/mdx/callout';
import { CodeFigure, Mermaid } from '@/components/mdx/code-block';
import { Figure, GridImage, ImageGrid } from '@/components/mdx/figure';
import { LinkChip, LinkEmbed } from '@/components/mdx/link-embed';
import { MdxLink } from '@/components/mdx/mdx-link';
import { Cons, Do, DoDont, Dont, Pros, ProsCons } from '@/components/mdx/pair';
import { cn } from '@/lib/utils';

const HEADING = 'scroll-mt-24 font-semibold text-balance';

// Sizes are in em where the mockup follows the text size, so the `psize`
// option scales lists, quotes and inline code with the paragraph.
const LIST = 'mb-[1.5em] [&_ol]:mb-0 [&_ul]:mb-0';

/**
 * What a note can use. Lower-case keys restyle Markdown; the rest are the
 * components a note calls by name. Ids on h2 and h3 come from src/lib/mdx.tsx.
 */
export const mdxComponents = {
  p: (props: ComponentProps<'p'>) => <p {...props} className="mb-[1.5em]" />,
  h2: ({ children, ...props }: ComponentProps<'h2'>) => (
    <h2
      {...props}
      className={cn(
        HEADING,
        'mt-13 mb-4 text-[1.75rem] leading-[1.2] tracking-[-0.025em]',
      )}
    >
      {children}
    </h2>
  ),
  h3: ({ children, ...props }: ComponentProps<'h3'>) => (
    <h3
      {...props}
      className={cn(
        HEADING,
        'mt-9 mb-3 text-xl leading-[1.3] tracking-[-0.015em]',
      )}
    >
      {children}
    </h3>
  ),
  h4: ({ children, ...props }: ComponentProps<'h4'>) => (
    <h4 {...props} className={cn(HEADING, 'mt-7 mb-2 text-lg leading-[1.3]')}>
      {children}
    </h4>
  ),
  ul: (props: ComponentProps<'ul'>) => (
    <ul
      {...props}
      className={cn(
        LIST,
        '[&>li]:relative [&>li]:py-[0.3rem] [&>li]:pl-6 [&>li]:before:absolute [&>li]:before:top-[0.885em] [&>li]:before:left-[0.2rem] [&>li]:before:size-[0.4rem] [&>li]:before:rounded-full [&>li]:before:bg-accent-bright',
      )}
    />
  ),
  ol: (props: ComponentProps<'ol'>) => (
    <ol
      {...props}
      className={cn(
        LIST,
        'list-decimal pl-6 marker:font-mono marker:text-[0.875em] marker:text-faint [&>li]:py-[0.3rem] [&>li]:pl-1',
      )}
    />
  ),
  blockquote: (props: ComponentProps<'blockquote'>) => (
    <blockquote
      {...props}
      data-reveal
      className="my-10 border-l-[3px] border-accent-bright pl-6 text-[1.158em] leading-[1.45] tracking-[-0.015em] [&>p]:mb-0"
    />
  ),
  cite: (props: ComponentProps<'cite'>) => (
    <cite
      {...props}
      className="mt-3 block label-mono tracking-normal text-faint not-italic"
    />
  ),
  code: (props: ComponentProps<'code'>) =>
    // A highlighted block carries data-language; only inline code is boxed.
    'data-language' in props ? (
      <code {...props} />
    ) : (
      <code
        {...props}
        className="rounded-[0.4em] bg-sunk px-[0.4em] py-[0.15em] font-mono text-[0.875em]"
      />
    ),
  pre: (props: ComponentProps<'pre'>) => (
    <pre {...props} className="overflow-x-auto p-[1.1rem]" />
  ),
  figure: CodeFigure,
  a: MdxLink,
  hr: () => <hr className="mx-auto my-12 w-16 border-t border-line-strong" />,
  strong: (props: ComponentProps<'strong'>) => (
    <strong {...props} className="font-semibold" />
  ),
  img: ({ src, alt, title }: ComponentProps<'img'>) =>
    typeof src === 'string' ? (
      <Figure src={src} alt={alt} caption={title} />
    ) : null,
  // Tables stay plain: one line under the head, no cell borders. A wide
  // table scrolls inside its own box.
  table: (props: ComponentProps<'table'>) => (
    <div data-reveal className="my-9 overflow-x-auto">
      <table {...props} className="w-full border-collapse text-base" />
    </div>
  ),
  th: (props: ComponentProps<'th'>) => (
    <th
      {...props}
      className="border-b border-line-strong py-[0.6rem] pr-3 text-left font-mono text-xs leading-[1.5] font-medium whitespace-nowrap text-faint"
    />
  ),
  td: (props: ComponentProps<'td'>) => (
    <td {...props} className="py-3 pr-3 align-top" />
  ),
  tr: (props: ComponentProps<'tr'>) => (
    <tr {...props} className="transition-colors [tbody>&]:hover:bg-sunk" />
  ),

  Callout,
  Figure,
  MDXImage: Figure,
  ImageGrid,
  GridImage,
  LinkEmbed,
  LinkChip,
  DoDont,
  Do,
  Dont,
  ProsCons,
  Pros,
  Cons,
  Mermaid,
};
