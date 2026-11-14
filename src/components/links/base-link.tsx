import Link from 'next/link';
import type { ComponentProps } from 'react';

import { isExternal } from '@/components/links/link-styles';

/**
 * The anchor under every link component: `next/link` for a path on this
 * site, a plain anchor with `rel` for another site. It has no style.
 */
export function BaseLink({
  href = '',
  children,
  ...rest
}: ComponentProps<'a'>) {
  if (href.startsWith('/')) {
    return (
      <Link {...rest} href={href}>
        {children}
      </Link>
    );
  }
  return (
    <a
      {...rest}
      href={href}
      rel={isExternal(href) ? 'noopener noreferrer' : rest.rel}
    >
      {children}
    </a>
  );
}
