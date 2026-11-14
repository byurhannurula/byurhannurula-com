import type { ComponentProps } from 'react';

import { BaseLink } from '@/components/links/base-link';
import { ExternalMark } from '@/components/links/external-mark';
import {
  isExternal,
  isInternal,
  LINK_IN,
  LINK_OUT,
  UNDERLINE,
} from '@/components/links/link-styles';
import { cn } from '@/lib/utils';

/**
 * A link in running text. A dashed rule becomes solid on hover and focus.
 * A link that stays on the site is violet; a link that leaves is green and
 * has an arrow.
 */
export function TextLink({
  href = '',
  children,
  className,
  ...rest
}: ComponentProps<'a'>) {
  return (
    <BaseLink
      {...rest}
      href={href}
      className={cn(
        'group/link',
        isInternal(href) ? LINK_IN : LINK_OUT,
        UNDERLINE,
        className,
      )}
    >
      {children}
      {isExternal(href) ? <ExternalMark /> : null}
    </BaseLink>
  );
}
