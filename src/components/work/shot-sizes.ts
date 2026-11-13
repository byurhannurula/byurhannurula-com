/**
 * Pixel sizes of the project screenshots, for next/image. Most are
 * 1280 x 800; only the exceptions are listed. Move this into
 * src/content/projects.ts when a shot gets its own width and height there.
 */
const DEFAULT_SIZE = { width: 1280, height: 800 };

const SIZES: Record<string, { width: number; height: number }> = {
  '/assets/projects/jotter/desktop.png': { width: 2000, height: 1128 },
  '/assets/projects/jotter/editor-dark.png': { width: 2000, height: 1406 },
  '/assets/projects/jotter/editor-light.png': { width: 2000, height: 1406 },
  '/assets/projects/jotter/markdown-preview.png': { width: 2000, height: 1406 },
  '/assets/projects/jotter/settings.png': { width: 2000, height: 1406 },
};

export const shotSize = (src: string) => SIZES[src] ?? DEFAULT_SIZE;
