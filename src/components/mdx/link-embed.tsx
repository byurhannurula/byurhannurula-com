import { ArrowUpRight } from "lucide-react";

import { getLinkMetadata, type LinkMetadata } from "@/lib/server/link-metadata";
import { cn } from "@/lib/utils";

interface LinkEmbedProps {
  href: string;
  /** Media beside the text rather than above it. Better inside a dense post. */
  compact?: boolean;
  /** Drop the preview image; the card falls back to the site's own icon. */
  noImage?: boolean;
  className?: string;
}

/**
 * Remote media, deliberately not through next/image.
 *
 * Optimising these would mean routing arbitrary third-party URLs through
 * /_next/image, which is the open image proxy that remotePatterns exists to
 * prevent. Every use sits in a fixed-size box, so skipping the optimiser costs
 * no layout stability.
 */
function RemoteImage({ src, className }: { src: string; className?: string }) {
  return (
    // biome-ignore lint/performance/noImgElement: see RemoteImage doc comment
    <img
      alt=""
      className={className}
      decoding="async"
      loading="lazy"
      referrerPolicy="no-referrer"
      src={src}
    />
  );
}

/**
 * Domain at rest, full path on hover.
 *
 * The domain answers "where does this go" at a glance; the path only matters
 * once someone is deciding to click, so it stays out of the way until then.
 * Expanded with a 0fr -> 1fr grid because `width: auto` cannot be animated.
 */
function Origin({ meta }: { meta: LinkMetadata }) {
  return (
    <span className="mt-0.5 flex min-w-0 font-mono text-[11px] uppercase tracking-[0.06em]">
      <span className="shrink-0 text-primary">{meta.domain}</span>
      {meta.path ? (
        <span className="grid grid-cols-[0fr] transition-[grid-template-columns] duration-300 ease-out group-hover:grid-cols-[1fr] group-focus-visible:grid-cols-[1fr] motion-reduce:transition-none">
          <span className="min-w-0 overflow-hidden">
            <span className="block truncate text-faint">{meta.path}</span>
          </span>
        </span>
      ) : null}
    </span>
  );
}

function Body({ meta }: { meta: LinkMetadata }) {
  return (
    <div className="flex min-w-0 flex-col gap-1 p-3.5">
      {meta.title ? (
        <span className="font-medium text-[14.5px] text-foreground leading-snug">
          {meta.title}
        </span>
      ) : null}
      {meta.description ? (
        <span className="line-clamp-2 text-[13px] text-muted-foreground leading-snug">
          {meta.description}
        </span>
      ) : null}
      <Origin meta={meta} />
    </div>
  );
}

/**
 * A link rendered as a card, from the target's own Open Graph metadata.
 *
 * Degrades in one direction as the props allow less: image beside the text
 * when compact, image above it otherwise, and the site's own icon when there
 * is no image at all -- so the card never collapses into bare text.
 *
 * A server component on purpose: the fetch happens at build time and is cached
 * for a day, so a reader pays nothing and no client JavaScript is involved.
 * Any failure falls back to an ordinary link, because a preview is an
 * enhancement and a link that does not render is a broken post.
 */
export async function LinkEmbed({
  href,
  compact,
  noImage,
  className = "",
}: LinkEmbedProps) {
  const meta = await getLinkMetadata(href);

  if (!meta?.title) return <BareLink href={href} meta={meta} />;

  const image = noImage ? undefined : meta.image;
  const shell = cn(
    "not-prose group my-6 block overflow-hidden rounded-md border border-border no-underline transition-colors hover:border-primary",
    className
  );

  // No image: lead with the site's icon so the card still has an anchor.
  if (!image) {
    return (
      <a className={shell} href={meta.url} rel="noopener" target="_blank">
        <div className="flex flex-col gap-1 p-3.5">
          {meta.favicon ? (
            <RemoteImage
              className="mb-1.5 size-7 rounded-sm bg-background-soft object-contain"
              src={meta.favicon}
            />
          ) : null}
          {meta.title ? (
            <span className="font-medium text-[14.5px] text-foreground leading-snug">
              {meta.title}
            </span>
          ) : null}
          {meta.description ? (
            <span className="text-[13px] text-muted-foreground leading-snug">
              {meta.description}
            </span>
          ) : null}
          <Origin meta={meta} />
        </div>
      </a>
    );
  }

  return (
    <a className={shell} href={meta.url} rel="noopener" target="_blank">
      <div className={cn(compact && "sm:flex sm:items-stretch")}>
        <div
          className={cn(
            "relative overflow-hidden bg-background-soft",
            compact
              ? "aspect-[16/9] sm:aspect-auto sm:w-40 sm:shrink-0 sm:border-border sm:border-r"
              : "aspect-[16/9] border-border border-b"
          )}
        >
          <RemoteImage
            className="absolute inset-0 size-full object-cover"
            src={image}
          />
        </div>
        <Body meta={meta} />
      </div>
    </a>
  );
}

/**
 * The last rung: a full-width bar of icon, domain and path.
 *
 * Full width rather than inline, because it is a block-level object in the
 * column -- an inline pill in the middle of a paragraph would break the line
 * rhythm, which is what `link-inline` is for.
 */
function BareLink({ href, meta }: { href: string; meta: LinkMetadata | null }) {
  const fallback = (() => {
    try {
      const url = new URL(href);
      return {
        domain: url.hostname.replace(/^www\./, ""),
        path: url.pathname === "/" ? "" : url.pathname,
      };
    } catch {
      return { domain: href, path: "" };
    }
  })();

  const domain = meta?.domain ?? fallback.domain;
  const path = meta?.path ?? fallback.path;

  return (
    <a
      className="not-prose group my-6 flex items-center gap-3 rounded-md border border-border p-3 no-underline transition-colors hover:border-primary"
      href={href}
      rel="noopener"
      target="_blank"
    >
      {meta?.favicon ? (
        <RemoteImage
          className="size-8 shrink-0 rounded-sm bg-background-soft object-contain p-1"
          src={meta.favicon}
        />
      ) : null}
      <span className="min-w-0 flex-1 truncate font-mono text-[12.5px] uppercase tracking-[0.06em]">
        <span className="text-foreground transition-colors group-hover:text-primary">
          {domain}
        </span>
        {path ? <span className="text-faint">{path}</span> : null}
      </span>
      <ArrowUpRight
        aria-hidden
        className="size-4 shrink-0 text-faint transition-colors group-hover:text-primary"
      />
    </a>
  );
}

/** Bare bar on its own, for a link that needs no preview. */
export async function LinkChip({ href }: { href: string }) {
  return <BareLink href={href} meta={await getLinkMetadata(href)} />;
}
