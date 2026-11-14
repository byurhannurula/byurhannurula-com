import { LinkCard, type LinkCardProps } from '@/components/links/link-card';
import { LinkBar as PlainLinkBar } from '@/components/links/link-chip';
import { getLinkMetadata } from '@/lib/link-metadata';

export { LinkChip } from '@/components/links/link-chip';

const isRemote = (href: string) => /^https?:\/\//.test(href);

/**
 * A link card in a note, from the target's own Open Graph data.
 *
 * `<LinkEmbed href="..." />` is enough: the title, text, picture and icon
 * are fetched one time at build, so a reader pays nothing
 * and no client JavaScript is involved. A prop (title, description, image)
 * wins over the fetched value. Any failure falls back to the plain bar,
 * because a preview is an enhancement and a link that does not render is a
 * broken post.
 */
export async function LinkEmbed(props: Omit<LinkCardProps, 'className'>) {
  const { href } = props;
  const meta = isRemote(href) ? await getLinkMetadata(href) : null;
  const title = props.title ?? meta?.title;

  if (!title) {
    return <PlainLinkBar href={href} icon={props.icon ?? meta?.favicon} />;
  }

  return (
    <LinkCard
      {...props}
      title={title}
      description={props.description ?? meta?.description}
      image={props.image ?? meta?.image}
      icon={props.icon ?? meta?.favicon}
    />
  );
}

/** The bar of icon, domain and path, with the real icon of the site. */
export async function LinkBar({ href, icon }: { href: string; icon?: string }) {
  const meta = !icon && isRemote(href) ? await getLinkMetadata(href) : null;
  return <PlainLinkBar href={href} icon={icon ?? meta?.favicon} />;
}
