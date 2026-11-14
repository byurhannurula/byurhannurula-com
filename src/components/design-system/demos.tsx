import { ArrowRight, Copy, Mail, Search } from 'lucide-react';
import type { ReactNode } from 'react';

import { NOTE_LIST, NoteItem } from '@/components/notes/note-item';
import { ArrowLink } from '@/components/shared/arrow-link';
import { CopyButton } from '@/components/shared/copy-button';
import { NowBlock } from '@/components/shared/now-block';
import { PageHero } from '@/components/shared/page-hero';
import { SampleTag } from '@/components/shared/sample-tag';
import { Section } from '@/components/shared/section';
import { Tech, TechList } from '@/components/shared/tech';
import { TechPile } from '@/components/shared/tech-pile';
import { Button, buttonVariants } from '@/components/ui/button';
import { UsesArt } from '@/components/uses/uses-art';
import type { NoteMeta } from '@/lib/notes';

/** What a demo may need from the server. */
export interface DemoContext {
  notes: NoteMeta[];
}

const STACK = ['TypeScript', 'React', 'Next.js', 'Tailwind', 'PostgreSQL'];
const MARKS = ['Selected work', 'Day job', 'Notes', 'Now', 'Stack'];

const row = 'flex flex-wrap items-center gap-3';

/**
 * The live example for each entry of DEMOS (src/config/design-system.ts),
 * by id. An entry with `variants` is drawn once per option value, inside a
 * wrapper that sets the option.
 */
export const DEMO_RENDERERS: Record<string, (ctx: DemoContext) => ReactNode> = {
  button: () => (
    <div className="grid gap-4">
      <div className={row}>
        <Button>Get in touch</Button>
        <Button variant="outline">See the work</Button>
        <Button variant="ghost">Skip</Button>
        <Button disabled>Disabled</Button>
      </div>
      <div className={row}>
        <Button size="sm">Small</Button>
        <Button size="sm" variant="outline">
          <Mail aria-hidden />
          With an icon
        </Button>
        <Button size="sm" variant="outline">
          Read on
          <ArrowRight aria-hidden />
        </Button>
        <Button size="icon" variant="outline" aria-label="Search">
          <Search aria-hidden />
        </Button>
        <Button size="icon" variant="ghost" aria-label="Copy">
          <Copy aria-hidden />
        </Button>
      </div>
    </div>
  ),

  'arrow-link': () => (
    <div className="flex flex-wrap items-center gap-8">
      <ArrowLink href="/work">All work</ArrowLink>
      <ArrowLink href="https://github.com/byurhannurula">GitHub</ArrowLink>
    </div>
  ),

  'copy-button': () => (
    <div className={row}>
      <CopyButton
        text="pnpm add next-mdx-remote"
        className={buttonVariants({ variant: 'outline', size: 'sm' })}
      >
        Copy the command
      </CopyButton>
      <CopyButton
        text="pnpm add next-mdx-remote"
        copiedLabel="In your clipboard"
        className="label-mono text-soft underline decoration-line-strong underline-offset-[0.3em] hover:text-ink"
      >
        or as a text link
      </CopyButton>
    </div>
  ),

  'sample-tag': () => (
    <div className={row}>
      <SampleTag />
      <SampleTag>draft copy</SampleTag>
      <SampleTag>number to check</SampleTag>
    </div>
  ),

  tech: () => (
    <p className="text-soft">
      Built with <Tech name="TypeScript" className="text-ink" /> and{' '}
      <Tech name="React" className="text-ink" />. Icon only:{' '}
      <Tech name="Docker" iconOnly /> <Tech name="Cloudflare" iconOnly />
    </p>
  ),

  'tech-list': () => <TechList names={STACK} />,

  'tech-pile': () => <TechPile names={STACK} />,

  'now-block': () => <NowBlock />,

  'section-title': () => (
    <div className="[--section-gap:0rem]">
      <Section
        title="Selected work"
        sub="Three projects, newest first."
        action={<ArrowLink href="/work">All work</ArrowLink>}
      >
        <p className="text-soft">The body of the section starts here.</p>
      </Section>
    </div>
  ),

  'section-marks': () => (
    <div className="[--section-gap:1.25rem] [&_[data-section]>div]:mb-0">
      {MARKS.map((title) => (
        <Section key={title} title={title}>
          {null}
        </Section>
      ))}
    </div>
  ),

  'page-hero': () => (
    // A picture of the component, not a second page top: it is out of the
    // tab order and the accessibility tree, so the page keeps one h1.
    <div
      inert
      className="overflow-hidden rounded-xl bg-bg shadow-[0_0_0_1px_var(--line)]"
    >
      <div className="w-[56rem] [zoom:0.34] px-10 pb-12 [--hero-gap:3rem] md:[zoom:0.6]">
        <PageHero
          eyebrow="Uses"
          title="What I use"
          titleEnd="every day."
          lead="Hardware and software on my desk. I change it slowly."
          actions={
            <>
              <Button>The main action</Button>
              <Button variant="outline">A second one</Button>
            </>
          }
          art={<UsesArt />}
        />
      </div>
    </div>
  ),

  'note-item': ({ notes }) => (
    <div className={NOTE_LIST}>
      {notes.map((note) => (
        <NoteItem key={note.slug} note={note} />
      ))}
    </div>
  ),
};
