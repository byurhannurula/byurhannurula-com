import { LinkCard, type LinkCardProps } from '@/components/links/link-card';

export { LinkBar, LinkChip } from '@/components/links/link-chip';

/**
 * A link card in a note. The reveal is on a box around the card: the reveal
 * and the hover lift both set `translate` and `transition`, and on one
 * element the reveal would win and the lift would not move.
 */
export function LinkEmbed(props: Omit<LinkCardProps, 'className'>) {
  return (
    <div data-reveal className="my-9">
      <LinkCard {...props} className="my-0" />
    </div>
  );
}
