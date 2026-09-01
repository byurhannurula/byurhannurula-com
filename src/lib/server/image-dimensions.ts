import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

export interface Dimensions {
  width: number;
  height: number;
}

/**
 * Intrinsic sizes for images referenced by content, keyed by src.
 *
 * A justified gallery has to know each image's aspect ratio before it can lay
 * a row out, and a remote URL carries none. Measuring in the browser is too
 * late: the row is already on screen at the wrong height. So sizes are
 * resolved once, at build time, and cached here.
 *
 * The file is committed, which keeps CI builds offline and deterministic. It
 * is only rewritten when content references an image that is not in it yet.
 */
const MANIFEST = path.join(process.cwd(), "content", ".image-sizes.json");

/** Enough for the header of every format we serve; JPEG markers sit well inside it. */
const PROBE_BYTES = 65_536;

let cache: Record<string, Dimensions> | null = null;
let pendingWrite = false;

async function load(): Promise<Record<string, Dimensions>> {
  if (cache) return cache;
  try {
    cache = JSON.parse(await readFile(MANIFEST, "utf8"));
  } catch {
    cache = {};
  }
  return cache as Record<string, Dimensions>;
}

async function persist(entries: Record<string, Dimensions>) {
  if (pendingWrite) return;
  pendingWrite = true;
  try {
    const sorted = Object.fromEntries(
      Object.entries(entries).sort(([a], [b]) => a.localeCompare(b))
    );
    await writeFile(MANIFEST, `${JSON.stringify(sorted, null, 2)}\n`);
  } catch {
    // Read-only filesystem (a deployed runtime, not a build). The manifest we
    // already loaded still serves every image it knows about.
  } finally {
    pendingWrite = false;
  }
}

/** Site-relative `src` resolves against `public/`, the way the browser sees it. */
function isLocal(src: string) {
  return src.startsWith("/");
}

async function probe(src: string): Promise<Dimensions | null> {
  // devDependency: present at build, absent from the deployed bundle. Without
  // it we fall back to the manifest, and the component to client measurement.
  let imageSize: (input: Uint8Array) => { width?: number; height?: number };
  try {
    ({ imageSize } = await import("image-size"));
  } catch {
    return null;
  }

  if (isLocal(src)) {
    try {
      const file = path.join(process.cwd(), "public", src);
      const { width, height } = imageSize(await readFile(file));
      return width && height ? { width, height } : null;
    } catch {
      return null;
    }
  }

  const read = async (range: boolean) => {
    const res = await fetch(src, {
      headers: range ? { Range: `bytes=0-${PROBE_BYTES - 1}` } : {},
    });
    if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
    return new Uint8Array(await res.arrayBuffer());
  };

  for (const range of [true, false]) {
    try {
      const { width, height } = imageSize(await read(range));
      if (width && height) return { width, height };
    } catch {
      // A server that ignores Range, or a format whose header sits past the
      // probe window: retry once unranged before giving up.
    }
  }
  return null;
}

/**
 * Resolve intrinsic sizes for `sources`, filling and persisting the manifest.
 * Unresolvable images are omitted rather than guessed, so callers can tell
 * "unknown" apart from a real ratio.
 */
export async function resolveDimensions(
  sources: string[]
): Promise<Map<string, Dimensions>> {
  const cached = await load();
  const resolved: Record<string, Dimensions> = { ...cached };

  // Our own files are read from disk every build. They are cheap to open, and
  // caching them would serve stale sizes the first time one is re-exported.
  // Only third-party URLs, which cost a network round trip, are remembered.
  const unique = [...new Set(sources)];
  const misses = unique.filter((src) => isLocal(src) || !cached[src]);

  const CONCURRENCY = 8;
  for (let i = 0; i < misses.length; i += CONCURRENCY) {
    const batch = misses.slice(i, i + CONCURRENCY);
    const probed = await Promise.all(batch.map(probe));
    batch.forEach((src, j) => {
      const found = probed[j];
      if (found) resolved[src] = found;
    });
  }

  if (misses.some((src) => !isLocal(src))) {
    await persist(
      Object.fromEntries(
        Object.entries(resolved).filter(([src]) => !isLocal(src))
      )
    );
  }

  return new Map(
    sources.flatMap((src) =>
      resolved[src] ? [[src, resolved[src]] as const] : []
    )
  );
}
