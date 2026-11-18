import Link from 'next/link';

import { SampleTag } from '@/components/shared/sample-tag';
import { FOOTER_ITEMS, NAV_ITEMS } from '@/content/nav';
import { SOCIALS } from '@/content/socials';
import { EVENTS, trackAttrs } from '@/lib/track';
import { brand } from '@/lib/brand';

import { EmailCopy } from './email-copy';
import {
  FOOTER_COPY,
  RSS_LINK,
  SOCIAL_CARDS,
  type SocialCard,
} from './footer-content';
import { FooterTools } from './footer-tools';
import { SocialCardBody } from './social-card';
import { getContributions } from './social-data';
import { SocialIcon } from './social-icon';
import { SocialRow } from './social-row';

const SITE_LINKS = [
  ...NAV_ITEMS.filter(({ href }) => href !== '/'),
  ...FOOTER_ITEMS,
];
const ELSEWHERE = [...SOCIALS, RSS_LINK];

const heading =
  'mb-[0.8rem] font-mono text-xs leading-none font-normal text-faint in-data-[footer=centre]:hidden in-data-[footer=line]:hidden in-data-[footer=sentence]:hidden';
// A column by default. The line, centre and sentence layouts lay it in a row.
const list =
  'in-data-[footer=centre]:flex in-data-[footer=centre]:flex-wrap in-data-[footer=centre]:justify-center in-data-[footer=centre]:gap-x-5 in-data-[footer=centre]:gap-y-1 in-data-[footer=line]:flex in-data-[footer=line]:gap-5 in-data-[footer=sentence]:flex in-data-[footer=sentence]:flex-wrap in-data-[footer=sentence]:gap-x-5 in-data-[footer=sentence]:gap-y-1';
const link =
  'inline-flex items-center text-soft max-md:min-h-10 md:py-[0.2rem] no-underline [transition:color_.2s,translate_.3s_var(--ease-out-soft)] hover:translate-x-[3px] hover:text-ink';

const fallbackCard = (name: string): SocialCard => ({
  kind: 'small',
  title: name,
  line: '',
});

/** The footer. `footer`, `fmark`, `socials`, `fmeta`, `fctl`, `ftop` shape it. */
export async function SiteFooter() {
  const contributions = await getContributions();

  return (
    <footer className="wrap">
      <div className="mt-24 mb-26 grid grid-cols-1 gap-8 border-t border-rule pt-9 in-data-[footer=big]:border-t-0 in-data-[footer=centre]:justify-items-center in-data-[footer=centre]:gap-[1.4rem] in-data-[footer=centre]:text-center in-data-[footer=line]:mt-20 in-data-[footer=line]:items-center in-data-[footer=sentence]:items-center in-data-[footer=sentence]:border-t-0 md:grid-cols-[1.4fr_1fr_1fr] md:in-data-[footer=centre]:grid-cols-1 md:in-data-[footer=line]:grid-cols-[1fr_auto] md:in-data-[footer=sentence]:grid-cols-[1fr_auto]">
        <div
          aria-hidden
          className="col-span-full -ml-[0.04em] hidden border-b border-line pb-5 text-[clamp(4rem,17.5vw,13.4rem)] leading-[0.82] font-bold tracking-[-0.065em] in-data-[fmark=fade]:bg-[linear-gradient(var(--ink)_20%,transparent_105%)] in-data-[fmark=fade]:bg-clip-text in-data-[fmark=fade]:text-transparent in-data-[fmark=outline]:text-transparent in-data-[fmark=outline]:[-webkit-text-stroke:1.5px_var(--line-strong)] in-data-[footer=big]:block"
        >
          {brand.wordmark}
          <span className="text-accent in-data-[fmark=outline]:text-transparent in-data-[fmark=outline]:[-webkit-text-stroke:1.5px_var(--accent-bright)]">
            .
          </span>
        </div>

        {/* Below 390 px the size follows the screen, so the email fits on one
            line at 320 px. */}
        <p className="col-span-full mb-6 hidden max-w-[26ch] text-[clamp(1.4rem,7vw,1.7rem)] leading-[1.18] font-semibold tracking-[-0.035em] text-ink in-data-[footer=sentence]:block md:text-[clamp(1.7rem,3.8vw,2.75rem)]">
          {FOOTER_COPY.sentenceStart}{' '}
          <span className="text-faint">{FOOTER_COPY.sentenceMid}</span>{' '}
          <EmailCopy variant="inline" />{' '}
          <span className="text-faint">{FOOTER_COPY.sentenceEnd}</span>
        </p>

        <div className="in-data-[footer=line]:flex in-data-[footer=line]:flex-wrap in-data-[footer=line]:items-baseline in-data-[footer=line]:gap-x-6 in-data-[footer=line]:gap-y-3 in-data-[footer=sentence]:hidden">
          <span className="text-xl font-bold tracking-[-0.02em] in-data-[footer=big]:hidden">
            {brand.wordmark}
            <span className="text-accent">.</span>
          </span>
          <p className="mt-[0.4rem] mb-4 max-w-88 text-[0.9375rem] text-soft in-data-[footer=centre]:mx-auto in-data-[footer=line]:hidden">
            {brand.tagline}
          </p>
          <EmailCopy variant="link" />
        </div>

        <nav
          aria-label={FOOTER_COPY.siteNavLabel}
          className="in-data-[footer=line]:hidden"
        >
          <h2 className={heading}>{FOOTER_COPY.siteHeading}</h2>
          <ul className={list}>
            {SITE_LINKS.map(({ label, href, when }) => (
              <li
                key={href}
                className={
                  when === 'homelab:on'
                    ? 'in-data-[homelab=off]:hidden'
                    : undefined
                }
              >
                <Link href={href} className={link}>
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className={heading}>{FOOTER_COPY.elsewhereHeading}</h2>
          <SocialRow
            items={ELSEWHERE.map(({ name, href }) => ({
              name,
              href,
              icon: <SocialIcon name={name} />,
              card: (
                <SocialCardBody
                  card={SOCIAL_CARDS[name] ?? fallbackCard(name)}
                  href={href}
                  contributions={contributions}
                />
              ),
            }))}
          />
          <div className="hidden in-data-[socials=text]:block">
            <ul className={list}>
              {ELSEWHERE.map(({ name, href }) => (
                <li key={name}>
                  <a
                    href={href}
                    className={link}
                    {...(href === RSS_LINK.href ? trackAttrs(EVENTS.rss) : {})}
                  >
                    {name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="col-span-full hidden flex-wrap items-center justify-between gap-x-6 gap-y-4 border-t border-rule pt-5 font-mono text-xs leading-[1.6] text-faint in-data-[fctl=on]:flex in-data-[fmeta=on]:flex in-data-[footer=centre]:w-full in-data-[footer=centre]:justify-center in-data-[ftop=on]:flex">
          <p className="hidden in-data-[fmeta=on]:block">
            {FOOTER_COPY.version} <SampleTag className="px-2 py-[0.2rem]" /> ·{' '}
            <a
              href={brand.repository}
              className="text-soft underline underline-offset-[0.25em]"
            >
              {FOOTER_COPY.source}
            </a>{' '}
            ·{' '}
            <a
              href={RSS_LINK.href}
              className="text-soft underline underline-offset-[0.25em]"
              {...trackAttrs(EVENTS.rss)}
            >
              {FOOTER_COPY.rss}
            </a>{' '}
            · {/* A static text file in public/, not a page. */}
            {/* oxlint-disable-next-line nextjs/no-html-link-for-pages */}
            <a
              href="/llms.txt"
              className="text-soft underline underline-offset-[0.25em]"
            >
              {FOOTER_COPY.llms}
            </a>
          </p>
          <FooterTools />
        </div>
      </div>
    </footer>
  );
}
