import type { Metadata } from 'next';
import Link from 'next/link';

import { PageTitle } from '@/components/shared/page-hero';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Page not found',
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="pt-(--hero-gap) pb-8">
      <p className="mb-6 label-mono font-medium text-soft">404</p>
      <PageTitle
        title="This page is not here."
        titleEnd="It moved, or it never existed."
        className="max-w-[18ch] text-(length:--page-title-size)"
      />
      <p className="mt-6 max-w-[34rem] text-[1.1875rem] leading-[1.55] text-pretty text-soft">
        The address may be old or have a typing error. The home page has links
        to everything on the site.
      </p>
      <div className="mt-7 flex flex-wrap gap-2.5">
        <Button asChild>
          <Link href="/">Go to the home page</Link>
        </Button>
      </div>
    </section>
  );
}
