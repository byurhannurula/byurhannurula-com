import { Cpu, Mail, Server } from 'lucide-react';
import type { ReactNode } from 'react';

import { SocialIcon } from '@/components/layout/social-icon';
import { Annotated } from '@/components/links/annotated';
import { IconLink, TagLink } from '@/components/links/icon-link';
import { LinkCard } from '@/components/links/link-card';
import { LinkBar, LinkChip } from '@/components/links/link-chip';
import { ListLink } from '@/components/links/list-link';
import { PreviewLink } from '@/components/links/preview-link';
import { RowLink } from '@/components/links/row-link';
import { SiteLink } from '@/components/links/site-link';
import { TextLink } from '@/components/links/text-link';
import { TraceLink } from '@/components/links/trace-link';
import { BackLink } from '@/components/notes/back-link';
import { ArrowLink } from '@/components/shared/arrow-link';
import { Section } from '@/components/shared/section';

const JOTTER = 'https://jotter.byurhannurula.com';
const DOTFILES = 'https://github.com/byurhannurula/dotfiles';

// Only services from the self-hosted list: the card says "running at home".
const HOME_SERVICES = ['immich', 'home-assistant', 'navidrome', 'adguard-home'];

interface SpecimenProps {
  name: string;
  /** One line: when to use it. */
  use: string;
  children: ReactNode;
}

/** One component: its name and use at the left, a live example at the right. */
function Specimen({ name, use, children }: SpecimenProps) {
  return (
    <div className="grid gap-x-10 gap-y-3 md:grid-cols-[13rem_1fr]">
      <div>
        <h4 className="label-mono text-ink">{name}</h4>
        <p className="mt-1 text-[0.875rem] leading-snug text-soft">{use}</p>
      </div>
      <div className="min-w-0 text-lg leading-[1.7]">{children}</div>
    </div>
  );
}

function Group({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="mt-16 first:mt-0">
      <h3 className="mb-8 label-mono text-faint">{title}</h3>
      <div className="grid gap-12">{children}</div>
    </div>
  );
}

/** Every link component, with its name, its use and a live example. */
export function LinksSection() {
  return (
    <Section
      id="links"
      title="Links"
      sub="A link says where it goes before you press it: violet stays on this site, green with an arrow leaves it."
    >
      <Group title="in a sentence">
        <Specimen
          name="TextLink"
          use="Every link in running text. The dashed rule becomes solid on hover and focus."
        >
          Read <TextLink href="/notes">the notes</TextLink>, which stay on this
          site, or go to <TextLink href={JOTTER}>the Jotter site</TextLink>,
          which does not.
        </Specimen>

        <Specimen
          name="SiteLink"
          use="A link to a product or a company, when its mark helps the reader find it in the line."
        >
          Grey until you point at it:{' '}
          <SiteLink href="https://recheck.io/" icon="/assets/icons/recheck.png">
            ReCheck
          </SiteLink>
          . Tilted until you point at it:{' '}
          <SiteLink href={JOTTER} icon="/assets/icons/jotter.png" effect="tilt">
            Jotter
          </SiteLink>
          . No icon: <SiteLink href="/uses">Uses</SiteLink>.
        </Specimen>

        <Specimen
          name="LinkChip"
          use="A source or a profile named in a sentence, when the place matters more than the words."
        >
          The code is on{' '}
          <LinkChip
            href="https://github.com/byurhannurula"
            title="GitHub"
            icon="https://cdn.simpleicons.org/github/888888"
          />{' '}
          and the app is at <LinkChip href={JOTTER} />.
        </Specimen>

        <Specimen
          name="PreviewLink"
          use="One link in a paragraph that earns a look ahead. The card opens on hover and on keyboard focus; Esc closes it."
        >
          I do{' '}
          <PreviewLink
            href="/homelab"
            glyph={<Server strokeWidth={1.7} />}
            preview={
              <span className="flex items-center gap-[0.6rem] font-mono text-xs whitespace-nowrap">
                <span className="size-1.5 shrink-0 rounded-full bg-accent-bright" />
                running at home
                {HOME_SERVICES.map((icon) => (
                  // oxlint-disable-next-line nextjs/no-img-element
                  <img
                    key={icon}
                    src={`/assets/icons/${icon}.svg`}
                    alt=""
                    className="size-[18px] shrink-0"
                  />
                ))}
              </span>
            }
          >
            self-hosting
          </PreviewLink>{' '}
          and I made{' '}
          <PreviewLink
            href={JOTTER}
            title="Jotter"
            description="A fast, minimal notepad: a quiet place for quick thoughts."
            image="/assets/projects/jotter/editor-dark.png"
          >
            Jotter
          </PreviewLink>
          .
        </Specimen>

        <Specimen
          name="Annotated"
          use="A phrase with a number or a source behind it. Not a link: it goes nowhere."
        >
          The dashed line says that{' '}
          <Annotated note="A note holds the detail that would break the sentence: a number, a source or a date.">
            there is more here
          </Annotated>
          .
        </Specimen>

        <Specimen
          name="TraceLink"
          use="One word in a headline. A circuit trace runs out under it. Without href it is decoration only."
        >
          <span className="text-2xl font-semibold tracking-[-0.02em]">
            Software by day,{' '}
            <TraceLink href="/homelab" glyph={<Cpu strokeWidth={1.7} />}>
              electronics
            </TraceLink>{' '}
            by night.
          </span>
        </Specimen>
      </Group>

      <Group title="on their own line">
        <Specimen
          name="LinkCard, side"
          use="The default card in a note. The path shows after the domain on hover."
        >
          <LinkCard
            href={JOTTER}
            title="Jotter"
            description="A fast, minimal notepad: a quiet place for quick thoughts."
            image="/assets/projects/jotter/editor-dark.png"
            className="my-0"
          />
        </Specimen>

        <Specimen
          name="LinkCard, top"
          use="When the picture is the reason for the link."
        >
          <LinkCard
            href="https://github.com/byurhannurula/jotter"
            title="Jotter on GitHub"
            description="The source, the releases and the issues."
            image="/assets/projects/jotter/desktop.png"
            layout="top"
            className="my-0 max-w-md"
          />
        </Specimen>

        <Specimen
          name="LinkCard, no picture"
          use="When the target has no picture. The icon of the site takes its place."
        >
          <LinkCard
            href={DOTFILES}
            title="Dotfiles"
            description="My macOS configuration."
            className="my-0"
          />
        </Specimen>

        <Specimen
          name="LinkBar"
          use="A link between two paragraphs that needs no title: icon, domain and path."
        >
          <LinkBar href={DOTFILES} className="my-0" />
        </Specimen>
      </Group>

      <Group title="lists and navigation">
        <Specimen
          name="RowLink"
          use="A list of things to read. No lines between rows: the row lifts onto a surface."
        >
          <div className="text-base">
            <RowLink
              href="/notes/third-time-is-the-charm"
              title="Third time is the charm"
              meta="note"
            />
            <RowLink
              href="/notes/post-components"
              title="Post components"
              subtitle="Every block a note can use, shown once."
              meta="sample"
            />
            <RowLink href={DOTFILES} title="Dotfiles" meta="github" />
          </div>
        </Specimen>

        <Specimen
          name="ListLink"
          use="A page that is a list of places to go. The arrow shows on hover and focus."
        >
          <div className="grid max-w-sm gap-3 text-base">
            <ListLink
              href="https://github.com/byurhannurula"
              title="GitHub"
              description="Code, projects, and contributions"
              icon={<SocialIcon name="GitHub" />}
            />
            <ListLink
              href="/rss.xml"
              title="RSS Feed"
              description="Subscribe to updates"
              icon={<SocialIcon name="RSS" />}
            />
            <ListLink href="/uses" title="Uses" description="Tools and gear" />
          </div>
        </Specimen>

        <Specimen
          name="IconLink"
          use="A row of profiles where the icons are known. The edge becomes dashed on hover."
        >
          <div className="flex gap-2">
            <IconLink href="https://github.com/byurhannurula" label="GitHub">
              <SocialIcon name="GitHub" />
            </IconLink>
            <IconLink href="/rss.xml" label="RSS feed">
              <SocialIcon name="RSS" />
            </IconLink>
            <IconLink href="/about" label="Contact">
              <Mail aria-hidden />
            </IconLink>
          </div>
        </Specimen>

        <Specimen
          name="TagLink"
          use="A tag or a filter under a note. Small, mono, same dashed edge."
        >
          <div className="flex flex-wrap gap-2">
            <TagLink href="/notes">meta</TagLink>
            <TagLink href="/notes">homelab</TagLink>
            <TagLink href="/notes">reference</TagLink>
          </div>
        </Specimen>

        <Specimen
          name="ArrowLink"
          use="The way to a full list, at the right of a section title. The arrow moves forward."
        >
          <ArrowLink href="/notes">All notes</ArrowLink>
        </Specimen>

        <Specimen
          name="BackLink"
          use="The way out of a detail page. The arrow moves back."
        >
          <BackLink href="/notes">All notes</BackLink>
        </Specimen>
      </Group>
    </Section>
  );
}
