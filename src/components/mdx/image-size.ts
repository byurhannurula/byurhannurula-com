import 'server-only';

import { open, readFile } from 'node:fs/promises';
import path from 'node:path';
import { cache } from 'react';

export interface ImageSize {
  width: number;
  height: number;
}

const HEAD_BYTES = 256 * 1024;

function pngSize(head: Buffer): ImageSize | null {
  if (head.toString('ascii', 1, 4) !== 'PNG') return null;
  return { width: head.readUInt32BE(16), height: head.readUInt32BE(20) };
}

function jpegSize(head: Buffer): ImageSize | null {
  if (head[0] !== 0xff || head[1] !== 0xd8) return null;
  let at = 2;
  while (at + 9 < head.length && head[at] === 0xff) {
    const marker = head[at + 1];
    // SOF0 to SOF15 hold the size; C4, C8 and CC are other tables.
    const isFrame =
      marker >= 0xc0 && marker <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(marker);
    if (isFrame) {
      return {
        height: head.readUInt16BE(at + 5),
        width: head.readUInt16BE(at + 7),
      };
    }
    at += 2 + head.readUInt16BE(at + 2);
  }
  return null;
}

/**
 * Pixel size of a PNG or JPEG in /public, or null (remote, other format,
 * missing file). next/image needs the size; notes should not have to state it.
 */
export const publicImageSize = cache(
  async (src: string): Promise<ImageSize | null> => {
    if (!src.startsWith('/') || src.startsWith('//')) return null;
    const publicDir = path.join(process.cwd(), 'public');
    const file = path.join(publicDir, src);
    if (!file.startsWith(publicDir + path.sep)) return null;
    try {
      const handle = await open(file, 'r');
      try {
        const head = Buffer.alloc(HEAD_BYTES);
        const { bytesRead } = await handle.read(head, 0, HEAD_BYTES, 0);
        const bytes = head.subarray(0, bytesRead);
        return pngSize(bytes) ?? jpegSize(bytes);
      } finally {
        await handle.close();
      }
    } catch {
      return null;
    }
  },
);

const MANIFEST = path.join(process.cwd(), 'content', '.image-sizes.json');
const PROBE_BYTES = 64 * 1024;

/**
 * Sizes of remote pictures, committed so builds stay offline. A grid must
 * know each shape before it lays out a row; the browser learns it too late.
 */
const remoteManifest = cache(async (): Promise<Record<string, ImageSize>> => {
  try {
    return JSON.parse(await readFile(MANIFEST, 'utf8'));
  } catch {
    return {};
  }
});

async function probeRemote(src: string): Promise<ImageSize | null> {
  try {
    const res = await fetch(src, {
      headers: { Range: `bytes=0-${PROBE_BYTES - 1}` },
      cache: 'force-cache',
    });
    if (!res.ok) return null;
    const head = Buffer.from(await res.arrayBuffer());
    return pngSize(head) ?? jpegSize(head);
  } catch {
    return null;
  }
}

/**
 * Pixel size of any picture a note links: files in /public are measured,
 * remote ones come from content/.image-sizes.json, else from their first
 * bytes. Null when nothing works; callers then pick a fixed shape.
 */
export const imageSize = cache(
  async (src: string): Promise<ImageSize | null> => {
    if (!/^https?:\/\//.test(src)) return publicImageSize(src);
    return (await remoteManifest())[src] ?? probeRemote(src);
  },
);
