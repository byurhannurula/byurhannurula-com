import { brand } from '@/lib/brand';
import { absoluteUrl } from '@/lib/site';

type Thing = Record<string, unknown>;

// `<` is escaped so a value can never close the script tag.
export function JsonLd({ data }: { data: Thing | Thing[] }) {
  return (
    <script
      type="application/ld+json"
      // oxlint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, '\\u003c'),
      }}
    />
  );
}

export function person(sameAs: string[]): Thing {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: brand.name,
    jobTitle: brand.role,
    url: absoluteUrl('/'),
    email: brand.email,
    description: brand.description,
    sameAs,
  };
}

export function website(): Thing {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: brand.name,
    url: absoluteUrl('/'),
    inLanguage: 'en',
  };
}
