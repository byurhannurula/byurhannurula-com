import 'server-only';

import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import { cache } from 'react';

import matter from 'gray-matter';

const NOTES_DIR = path.join(process.cwd(), 'content', 'notes');
const WORDS_PER_MINUTE = 220;

export interface NoteMeta {
  slug: string;
  title: string;
  /** ISO date, for example 2026-09-11. */
  date: string;
  excerpt: string;
  tags: string[];
  cover?: string;
  /** Describes the cover on the note page. Empty: the cover is decorative. */
  coverAlt?: string;
  /** Words to match in the command menu, on top of title and tags. */
  keywords: string[];
  readingMinutes: number;
  /** Words in the source, markup included: close enough for metadata. */
  wordCount: number;
  /** Not real content: lists show a SampleTag for it. */
  sample?: boolean;
  /** The first plain paragraphs of the body, for the `file` note item. */
  intro: string[];
}

export interface Note extends NoteMeta {
  /** MDX source without the front matter. */
  body: string;
}

const text = (value: unknown, fallback = '') =>
  typeof value === 'string' ? value : fallback;

const list = (value: unknown) =>
  Array.isArray(value)
    ? value.filter((item): item is string => typeof item === 'string')
    : [];

const INTRO_PARAGRAPHS = 2;

/** Plain opening paragraphs: skips headings, lists, quotes, code and JSX. */
function introOf(body: string): string[] {
  return body
    .split(/\n{2,}/)
    .map((block) => block.trim())
    .filter((block) => block && !/^(#|>|<|-|\*|\d+\.|```|!\[|\|)/.test(block))
    .slice(0, INTRO_PARAGRAPHS)
    .map((block) =>
      block
        .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
        .replace(/[*_`]/g, '')
        .replace(/\s+/g, ' '),
    );
}

async function readNote(file: string): Promise<Note> {
  const source = await readFile(path.join(NOTES_DIR, file), 'utf8');
  const { data, content } = matter(source);
  const words = content.split(/\s+/).filter(Boolean).length;
  return {
    slug: file.replace(/\.mdx$/, ''),
    title: text(data.title, file),
    date: text(data.date),
    excerpt: text(data.excerpt),
    tags: list(data.tags),
    cover: text(data.cover) || undefined,
    coverAlt: text(data.coverAlt) || undefined,
    keywords: list(data.keywords),
    readingMinutes: Math.max(1, Math.round(words / WORDS_PER_MINUTE)),
    wordCount: words,
    sample: data.sample === true || undefined,
    intro: introOf(content),
    body: content,
  };
}

/** All notes, newest first. Cached for one render pass. */
export const getAllNotes = cache(async (): Promise<Note[]> => {
  const files = (await readdir(NOTES_DIR)).filter((f) => f.endsWith('.mdx'));
  const notes = await Promise.all(files.map(readNote));
  return notes.toSorted((a, b) => b.date.localeCompare(a.date));
});

export async function getNotes(): Promise<NoteMeta[]> {
  const notes = await getAllNotes();
  return notes.map(({ body: _body, ...meta }) => meta);
}

export async function getNote(slug: string): Promise<Note | undefined> {
  const notes = await getAllNotes();
  return notes.find((note) => note.slug === slug);
}

// Front matter dates have no time: they parse as UTC midnight. Formatting in
// UTC keeps the day the same on a server in any time zone.
const dateFormat = new Intl.DateTimeFormat('en-GB', {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
  timeZone: 'UTC',
});

export const formatNoteDate = (date: string) =>
  date ? dateFormat.format(new Date(date)) : '';

const longDateFormat = new Intl.DateTimeFormat('en-GB', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  timeZone: 'UTC',
});

/** For the note page, for example 11 September 2026. */
export const formatNoteDateLong = (date: string) =>
  date ? longDateFormat.format(new Date(date)) : '';

const shortDateFormat = new Intl.DateTimeFormat('en-GB', {
  day: 'numeric',
  month: 'short',
  year: '2-digit',
  timeZone: 'UTC',
});

/** For tight lists, for example 11 Sep, 26. */
export function formatNoteDateShort(date: string) {
  if (!date) return '';
  const parts = shortDateFormat.formatToParts(new Date(date));
  const part = (type: string) => parts.find((p) => p.type === type)?.value;
  return `${part('day')} ${part('month')}, ${part('year')}`;
}
