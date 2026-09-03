import "server-only";

export interface LinkMetadata {
  url: string;
  domain: string;
  /** Path with the leading slash, empty for a bare domain. */
  path: string;
  title?: string;
  description?: string;
  image?: string;
  favicon?: string;
}

/** A slow origin must not hold a page render open. */
const TIMEOUT_MS = 4000;
/** Only the head is needed, and some pages are megabytes. */
const MAX_BYTES = 128 * 1024;
/** Link targets change rarely; a day keeps builds cheap without going stale. */
const REVALIDATE_SECONDS = 60 * 60 * 24;

/**
 * Hosts that must never be fetched.
 *
 * Embeds render whatever a post links to, so without this a link is a request
 * this server makes on an author's behalf -- the shape of an SSRF. Literal
 * addresses are covered here; a hostname that *resolves* to a private address
 * is not, since Workers has no DNS resolution. Content is authored by one
 * person, so that residual risk is accepted rather than unnoticed.
 */
function isBlockedHost(hostname: string) {
  const host = hostname.toLowerCase();
  if (host === "localhost" || host.endsWith(".localhost")) return true;
  if (host === "[::1]" || host.startsWith("[fd") || host.startsWith("[fe80"))
    return true;
  if (host.endsWith(".internal") || host.endsWith(".local")) return true;

  const v4 = host.match(/^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/);
  if (!v4) return false;
  const [a, b] = [Number(v4[1]), Number(v4[2])];
  return (
    a === 0 ||
    a === 10 ||
    a === 127 ||
    (a === 169 && b === 254) ||
    (a === 172 && b >= 16 && b <= 31) ||
    (a === 192 && b === 168) ||
    (a === 100 && b >= 64 && b <= 127)
  );
}

function decodeEntities(value: string) {
  return value
    .replace(/&(#\d+|#x[0-9a-f]+|[a-z]+);/gi, (whole, code: string) => {
      if (code.startsWith("#x") || code.startsWith("#X")) {
        return String.fromCodePoint(Number.parseInt(code.slice(2), 16));
      }
      if (code.startsWith("#")) {
        return String.fromCodePoint(Number(code.slice(1)));
      }
      const named: Record<string, string> = {
        amp: "&",
        lt: "<",
        gt: ">",
        quot: '"',
        apos: "'",
        nbsp: " ",
      };
      return named[code.toLowerCase()] ?? whole;
    })
    .trim();
}

/** Reads one meta tag, accepting `property` or `name` in either attribute order. */
function readMeta(html: string, key: string) {
  const attr = key.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const patterns = [
    new RegExp(
      `<meta[^>]+(?:property|name)=["']${attr}["'][^>]*content=["']([^"']*)["']`,
      "i"
    ),
    new RegExp(
      `<meta[^>]+content=["']([^"']*)["'][^>]*(?:property|name)=["']${attr}["']`,
      "i"
    ),
  ];
  for (const pattern of patterns) {
    const match = html.match(pattern);
    if (match?.[1]) return decodeEntities(match[1]);
  }
  return undefined;
}

/**
 * The site's own icon, which is what a preview falls back to when there is no
 * image. Declared icons are preferred over /favicon.ico because many sites
 * serve only an SVG or a sized PNG.
 */
function readFavicon(html: string, base: URL) {
  const links = html.matchAll(/<link\b[^>]*>/gi);
  let best: string | undefined;
  let bestRank = -1;

  for (const [tag] of links) {
    const rel = tag.match(/rel=["']([^"']+)["']/i)?.[1]?.toLowerCase();
    if (!rel?.includes("icon")) continue;
    const href = tag.match(/href=["']([^"']+)["']/i)?.[1];
    if (!href) continue;

    // Prefer a touch icon: they are square, opaque and reliably sized.
    const rank = rel.includes("apple-touch") ? 2 : 1;
    if (rank > bestRank) {
      bestRank = rank;
      best = href;
    }
  }

  return safeAbsolute(best ?? "/favicon.ico", base);
}

/** Absolute, https-or-http, and not pointing back at our own network. */
function safeAbsolute(value: string | undefined, base: URL) {
  if (!value) return undefined;
  try {
    const resolved = new URL(value, base);
    if (resolved.protocol !== "https:" && resolved.protocol !== "http:") {
      return undefined;
    }
    return isBlockedHost(resolved.hostname) ? undefined : resolved.toString();
  } catch {
    return undefined;
  }
}

/**
 * Fetch a link's Open Graph metadata.
 *
 * Parsed here rather than through a metadata API: an embed would otherwise put
 * a third party in the render path of every post that links out, and inherit
 * whatever that service returns.
 *
 * Returns null when anything at all goes wrong, so the caller can fall back to
 * an ordinary link. An embed is an enhancement and must never fail a page.
 */
export async function getLinkMetadata(
  rawUrl: string
): Promise<LinkMetadata | null> {
  let target: URL;
  try {
    target = new URL(rawUrl);
  } catch {
    return null;
  }

  if (target.protocol !== "https:" && target.protocol !== "http:") return null;
  if (isBlockedHost(target.hostname)) return null;

  try {
    const response = await fetch(target, {
      headers: {
        // Some origins serve a stub to unknown agents, and none of them need
        // anything but markup.
        accept: "text/html,application/xhtml+xml",
        "user-agent":
          "Mozilla/5.0 (compatible; byurhannurula.com link preview)",
      },
      redirect: "follow",
      signal: AbortSignal.timeout(TIMEOUT_MS),
      next: { revalidate: REVALIDATE_SECONDS },
    });

    if (!(response.ok && response.body)) return null;
    if (!response.headers.get("content-type")?.includes("html")) return null;

    const html = await readCapped(response.body);
    const base = new URL(response.url || target);

    const title =
      readMeta(html, "og:title") ??
      readMeta(html, "twitter:title") ??
      decodeEntities(html.match(/<title[^>]*>([^<]*)<\/title>/i)?.[1] ?? "") ??
      undefined;

    return {
      url: target.toString(),
      domain: base.hostname.replace(/^www\./, ""),
      path: target.pathname === "/" ? "" : target.pathname,
      title: title || undefined,
      description:
        readMeta(html, "og:description") ??
        readMeta(html, "twitter:description") ??
        readMeta(html, "description"),
      image: safeAbsolute(
        readMeta(html, "og:image") ?? readMeta(html, "twitter:image"),
        base
      ),
      favicon: readFavicon(html, base),
    };
  } catch {
    // Timeout, DNS failure, non-HTML, malformed markup: all the same to the
    // caller, which renders a plain link.
    return null;
  }
}

/** Reads at most MAX_BYTES, so one huge page cannot exhaust memory. */
async function readCapped(body: ReadableStream<Uint8Array>) {
  const reader = body.getReader();
  const decoder = new TextDecoder();
  let text = "";
  let read = 0;

  try {
    while (read < MAX_BYTES) {
      const { done, value } = await reader.read();
      if (done) break;
      read += value.length;
      text += decoder.decode(value, { stream: true });
      // Everything wanted lives in the head; stop as soon as it closes.
      if (text.includes("</head>")) break;
    }
  } finally {
    await reader.cancel().catch(() => {
      // Already closed by the origin; nothing to release.
    });
  }

  return text;
}
