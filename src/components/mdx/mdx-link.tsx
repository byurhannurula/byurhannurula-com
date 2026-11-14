import type { ComponentProps } from 'react';

import { TextLink } from '@/components/links/text-link';

/** A link in note text: violet when it stays here, green with an arrow when it leaves. */
export function MdxLink(props: ComponentProps<'a'>) {
  return <TextLink {...props} className="font-medium" />;
}
