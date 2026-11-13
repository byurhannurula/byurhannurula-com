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
  /** Words to match in the command menu, on top of title and tags. */
  keywords: string[];
  readingMinutes: number;
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
    keywords: list(data.keywords),
    readingMinutes: Math.max(1, Math.round(words / WORDS_PER_MINUTE)),
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

const dateFormat = new Intl.DateTimeFormat('en-GB', {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
});

export const formatNoteDate = (date: string) =>
  date ? dateFormat.format(new Date(date)) : '';
