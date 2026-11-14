import type { ComponentProps } from 'react';

import { isExternal } from '@/components/links/link-styles';
import { TextLink } from '@/components/links/text-link';
import { linkPreview } from '@/lib/link-preview';

/**
 * A link in note text: violet when it stays here, green with an arrow when
 * it leaves. With `linkcard: on`, an outside link shows a card of the page
 * on hover and focus. The card data is read at build time.
 */
export async function MdxLink(props: ComponentProps<'a'>) {
  const href = props.href ?? '';
  const link = <TextLink {...props} className="font-medium" />;
  const preview = isExternal(href) ? await linkPreview(href) : null;
  if (!preview) return link;

  return (
    <span className="group/card relative">
      {link}
      <span
        aria-hidden
        className="pointer-events-none absolute bottom-full left-0 z-40 mb-2 hidden w-[min(18rem,80vw)] overflow-hidden rounded-xl border border-line bg-card text-left text-sm leading-snug font-normal shadow-lift in-data-[linkcard=on]:group-focus-within/card:block in-data-[linkcard=on]:group-hover/card:block motion-safe:animate-pop-in"
      >
        {preview.image ? (
          // A remote picture of any host; not fetched while the card is hidden.
          // oxlint-disable-next-line nextjs/no-img-element
          <img
            src={preview.image}
            alt=""
            loading="lazy"
            className="block aspect-[1.91] w-full bg-sunk object-cover"
          />
        ) : null}
        <span className="block p-3">
          <span className="block font-mono text-xs text-faint">
            {preview.site}
          </span>
          <span className="mt-1 line-clamp-2 block font-medium text-ink">
            {preview.title}
          </span>
          {preview.description ? (
            <span className="mt-1 line-clamp-2 block text-soft">
              {preview.description}
            </span>
          ) : null}
        </span>
      </span>
    </span>
  );
}
