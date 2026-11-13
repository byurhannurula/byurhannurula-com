import 'server-only';

import { compileMDX } from 'next-mdx-remote/rsc';
import type { ReactElement } from 'react';
import {
  type Options as PrettyCodeOptions,
  rehypePrettyCode,
} from 'rehype-pretty-code';
import remarkGfm from 'remark-gfm';

import { mdxComponents } from '@/components/mdx/mdx-components';

export interface NoteHeading {
  id: string;
  text: string;
  level: 2 | 3;
}

interface RenderedNote {
  content: ReactElement;
  /** The h2 and h3 headings in page order, for the contents list. */
  headings: NoteHeading[];
}

// The few fields of a hast node this file reads. The `hast` types are not a
// direct dependency, and pnpm does not expose transitive ones.
interface HastNode {
  type: string;
  tagName?: string;
  properties?: Record<string, unknown>;
  children?: HastNode[];
  value?: string;
}

const textOf = (node: HastNode): string =>
  node.value ?? node.children?.map(textOf).join('') ?? '';

const slugify = (text: string) =>
  text
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/[\s-]+/g, '-');

const isBlank = (node: HastNode) => node.type === 'text' && !node.value?.trim();

/** A quote that ends with a `-- Name` line: the name becomes a <cite>. */
function citeQuoteSource(quote: HastNode) {
  const paragraph = quote.children?.findLast((c) => c.tagName === 'p');
  const last = paragraph?.children?.at(-1);
  if (!paragraph?.children || last?.type !== 'text' || !last.value) return;
  const match = /\n\s*--\s*(.+)$/.exec(last.value);
  if (!match) return;
  last.value = last.value.slice(0, match.index);
  paragraph.children.push({
    type: 'element',
    tagName: 'cite',
    properties: {},
    children: [{ type: 'text', value: match[1] }],
  });
}

/**
 * One pass over the tree: stable ids on headings (and the list of them),
 * pictures lifted out of their paragraph (a figure cannot sit inside a p),
 * and quote sources marked up.
 */
function rehypeNoteStructure(headings: NoteHeading[]) {
  return () => (tree: HastNode) => {
    const seen = new Map<string, number>();

    const visit = (node: HastNode) => {
      if (!node.children) return;
      node.children = node.children.flatMap((child) => {
        const pictures = child.children?.filter((c) => !isBlank(c)) ?? [];
        const onlyPictures =
          child.tagName === 'p' &&
          pictures.length > 0 &&
          pictures.every((c) => c.tagName === 'img');
        return onlyPictures ? pictures : [child];
      });

      for (const child of node.children) {
        if (child.tagName === 'h2' || child.tagName === 'h3') {
          const text = textOf(child).trim();
          const base = slugify(text) || 'section';
          const count = seen.get(base) ?? 0;
          seen.set(base, count + 1);
          const id = count === 0 ? base : `${base}-${count}`;
          child.properties = { ...child.properties, id };
          headings.push({ id, text, level: child.tagName === 'h2' ? 2 : 3 });
        }
        if (child.tagName === 'blockquote') citeQuoteSource(child);
        visit(child);
      }
    };

    visit(tree);
  };
}

const prettyCodeOptions: PrettyCodeOptions = {
  // Each token carries both colours as CSS variables; notes.css picks the
  // side from data-theme. The block surface comes from our own tokens.
  theme: { light: 'github-light', dark: 'github-dark-dimmed' },
  keepBackground: false,
  // Blocks only: inline code keeps its own small box.
  defaultLang: { block: 'plaintext' },
};

/** Compile a note body to React, and collect its headings. */
export async function renderNote(source: string): Promise<RenderedNote> {
  const headings: NoteHeading[] = [];
  const { content } = await compileMDX({
    source,
    components: mdxComponents,
    options: {
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [
          rehypeNoteStructure(headings),
          [rehypePrettyCode, prettyCodeOptions],
        ],
      },
    },
  });
  return { content, headings };
}
