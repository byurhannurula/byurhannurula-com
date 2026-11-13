import type { Metadata } from 'next';

import { brand } from '@/lib/brand';

interface PageMeta {
  path: string;
  title: string;
  description: string;
  noindex?: boolean;
}

export function pageMetadata({
  path,
  title,
  description,
  noindex,
}: PageMeta): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: 'website',
      siteName: brand.name,
      url: path,
      title,
      description,
    },
    twitter: { card: 'summary_large_image', title, description },
    robots: noindex ? { index: false, follow: true } : undefined,
  };
}
