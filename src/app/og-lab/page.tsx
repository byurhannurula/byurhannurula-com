import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { PAGES } from '@/config/seo';
import { OG_STYLE, OG_STYLES } from '@/lib/og';

export const metadata: Metadata = {
  title: 'Share image lab',
  robots: { index: false },
};

const SAMPLES = ['home', 'notes', 'shelf', 'about'] as const;

/**
 * Every share image style on a few pages, side by side. Dev only: pick one,
 * set OG_STYLE in src/lib/og.tsx, then delete this folder.
 */
export default function OgLab() {
  if (process.env.NODE_ENV === 'production') notFound();
  return (
    <div className="py-16">
      <h1 className="text-3xl font-semibold tracking-tight">Share images</h1>
      <p className="mt-2 text-soft">
        Live style: <code className="font-mono text-ink">{OG_STYLE}</code>. Set
        it in src/lib/og.tsx.
      </p>
      <div className="mt-12 grid gap-14">
        {OG_STYLES.map((style) => (
          <section key={style}>
            <h2 className="label-mono text-soft">{style}</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {SAMPLES.map((page) => (
                // oxlint-disable-next-line nextjs/no-img-element -- dev tool, raw PNGs
                <img
                  key={page}
                  src={`/og-lab/image?style=${style}&page=${page}`}
                  alt={`${style} style, ${PAGES[page].path}`}
                  width={1200}
                  height={630}
                  loading="lazy"
                  className="h-auto w-full rounded-xl border border-line"
                />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
