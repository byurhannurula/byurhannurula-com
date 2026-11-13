import { ArrowUpRight } from 'lucide-react';

const hostOf = (href: string) => {
  try {
    return new URL(href).host.replace(/^www\./, '');
  } catch {
    return href;
  }
};

interface LinkEmbedProps {
  href: string;
  title?: string;
  description?: string;
  /** Preview picture. Hidden on narrow screens. */
  image?: string;
}

/**
 * A link as a card. The note states the title and text: nothing is fetched
 * from the target at build time.
 */
export function LinkEmbed({ href, title, description, image }: LinkEmbedProps) {
  const host = hostOf(href);
  return (
    <a
      href={href}
      rel="noopener noreferrer"
      data-reveal
      className="my-9 grid grid-cols-1 items-center gap-4 rounded-lg border border-line py-[0.6rem] pr-[0.6rem] pl-5 text-base leading-[1.5] no-underline transition-[border-color,transform] duration-300 ease-soft hover:[transform:translateY(-2px)] hover:border-line-strong md:grid-cols-[1fr_9rem]"
    >
      <span className="block py-2 md:py-0">
        <b className="block font-semibold">{title ?? host}</b>
        {description ? (
          <span className="block text-[0.9375rem] text-soft">
            {description}
          </span>
        ) : null}
        <small className="font-mono text-xs leading-none text-faint">
          {host}
        </small>
      </span>
      {image ? (
        // A preview from any host, in a fixed box: see figure.tsx.
        // oxlint-disable-next-line nextjs/no-img-element
        <img
          src={image}
          alt=""
          loading="lazy"
          decoding="async"
          className="hidden aspect-16/10 w-full rounded-md object-cover object-top md:block"
        />
      ) : null}
    </a>
  );
}

/** A link inside a sentence that shows where it goes. */
export function LinkChip({ href, title }: { href: string; title?: string }) {
  return (
    <a
      href={href}
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1 rounded-full bg-sunk px-[0.6em] py-[0.1em] text-[0.875em] font-medium no-underline transition-colors hover:text-accent"
    >
      {title ?? hostOf(href)}
      <ArrowUpRight aria-hidden className="size-[0.9em]" />
    </a>
  );
}
