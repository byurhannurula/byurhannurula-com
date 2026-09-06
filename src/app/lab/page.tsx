import { HeroLiving, HeroSpec, HeroText } from "@/components/lab/heroes";
import { PageWrapper } from "@/components/page-wrapper";
import { SectionHeading } from "@/components/section-heading";
import { SoundToggle } from "@/components/sound";
import { createMetadata } from "@/config";

export const metadata = createMetadata("/lab");

const OPTIONS = [
  {
    id: "living",
    title: "A. the living paragraph",
    note: "The homepage copy, unchanged, with four objects hidden in it. Brand marks wake up on hover, the hardware has a photo behind it, the number counts itself, and the key really opens the palette.",
    element: <HeroLiving />,
  },
  {
    id: "spec",
    title: "B. the spec sheet",
    note: "One switch inside the sentence turns the bio into a data sheet. The swap runs through a view transition, so the browser morphs between two unrelated trees for about five lines of code.",
    element: <HeroSpec />,
  },
  {
    id: "text",
    title: "c. four ways to change a word",
    note: "The split-flap, the slot reel, the scramble and the terminal, next to each other, because that is the only way to choose between them. None of them runs on its own: you have to find them.",
    element: <HeroText />,
  },
];

export default function LabPage() {
  return (
    <PageWrapper>
      {/*
       * Lab-only CSS. These keyframes stay out of globals.css until one of the
       * options is chosen, so deleting this route deletes the experiment whole.
       */}
      <style>{`
        .sf-board, .reel {
          display: inline-block;
          padding: 0;
          border: 0;
          background: none;
          color: inherit;
          cursor: pointer;
          vertical-align: baseline;
        }
        /*
         * It never moves on its own, so it has to look touchable. A ring around
         * every tile was too loud for a word inside a sentence; lifting the
         * whole board a hair reads as one object, which is what it is.
         */
        .sf-board, .reel {
          transition: translate 160ms ease-out;
        }
        .sf-board:hover, .sf-board:focus-visible,
        .reel:hover, .reel:focus-visible {
          translate: 0 -1px;
        }
        @media (prefers-reduced-motion: reduce) {
          .sf-board, .reel { transition: none; }
        }
        .sf {
          --sf-half: 39ms;
          display: inline-flex;
          gap: 3px;
          padding: 3px;
          border-radius: 7px;
          background: color-mix(in srgb, var(--foreground) 7%, transparent);
          vertical-align: baseline;
        }
        .sf-tile {
          --sf-h: 1.28em;
          position: relative;
          display: inline-block;
          width: 0.82em;
          height: var(--sf-h);
          border-radius: 4px;
          /* Shows through the 1px seam between the halves, which is the split. */
          background: var(--border);
          perspective: 280px;
        }
        .sf-half {
          position: absolute;
          left: 0;
          right: 0;
          height: calc(50% - 0.5px);
          overflow: hidden;
          background: var(--background-soft);
          backface-visibility: hidden;
        }
        .sf-top {
          top: 0;
          border-radius: 4px 4px 0 0;
          box-shadow: inset 0 -6px 8px -8px rgb(0 0 0 / 0.55);
        }
        .sf-bottom {
          bottom: 0;
          border-radius: 0 0 4px 4px;
          box-shadow: inset 0 6px 8px -8px rgb(255 255 255 / 0.06);
        }
        .sf-glyph {
          position: absolute;
          left: 0;
          width: 100%;
          height: var(--sf-h);
          line-height: var(--sf-h);
          text-align: center;
        }
        .sf-top .sf-glyph { top: 0; }
        .sf-bottom .sf-glyph { top: calc(var(--sf-h) / -2); }
        /*
         * The leaf falls away from the viewer for the first half of the step and
         * the next one swings up for the second, so the two are never both flat.
         */
        .sf-fall {
          z-index: 3;
          transform-origin: bottom;
          animation: sf-fall var(--sf-half) cubic-bezier(0.36, 0, 0.9, 0.36)
            forwards;
        }
        .sf-rise {
          z-index: 2;
          transform-origin: top;
          animation: sf-rise var(--sf-half) cubic-bezier(0.12, 0.7, 0.5, 1)
            var(--sf-half) backwards;
        }
        @keyframes sf-fall {
          from { transform: rotateX(0deg); }
          to   { transform: rotateX(-90deg); }
        }
        @keyframes sf-rise {
          from { transform: rotateX(90deg); }
          to   { transform: rotateX(0deg); }
        }
        /* ---- reel ---- */
        .reel-window {
          display: inline-flex;
          gap: 2px;
          padding: 3px;
          border-radius: 7px;
          background: color-mix(in srgb, var(--foreground) 7%, transparent);
          vertical-align: baseline;
        }
        .reel-slot {
          position: relative;
          display: inline-block;
          width: 0.66em;
          overflow: hidden;
          border-radius: 3px;
          background: color-mix(in srgb, var(--foreground) 15%, transparent);
        }
        .reel-strip {
          position: absolute;
          top: 0;
          left: 0;
          z-index: 2;
          display: flex;
          width: 100%;
          flex-direction: column;
          transition-property: translate;
          transition-timing-function: cubic-bezier(0.16, 0.86, 0.22, 1);
        }
        .reel-cell { text-align: center; }
        .reel-cell--pass { opacity: 0.3; }
        .reel-shade {
          position: absolute;
          right: 0;
          left: 0;
          z-index: 3;
          height: 0.24em;
          pointer-events: none;
        }
        .reel-shade--top {
          top: 0;
          background: linear-gradient(rgb(0 0 0 / 0.3), transparent);
        }
        .reel-shade--bottom {
          bottom: 0;
          background: linear-gradient(to top, rgb(0 0 0 / 0.3), transparent);
        }
        @media (prefers-reduced-motion: reduce) {
          .reel-strip { transition: none; }
        }

        /* ---- scramble ---- */
        .scramble {
          font-family: var(--font-mono);
          /* Proportional glyphs would make the line breathe as noise churns. */
          font-variant-ligatures: none;
        }

        /* ---- terminal chip ---- */
        .lp-term {
          display: inline-flex;
          align-items: baseline;
          gap: 0.5em;
          padding: 0.15em 0.6em 0.25em;
          border: 1px solid var(--border);
          border-radius: 7px;
          background: color-mix(in srgb, var(--foreground) 9%, var(--background));
          font-family: var(--font-mono);
          font-size: 0.82em;
        }
        .lp-term-prompt { color: var(--primary); }
        .lp-term-slot { position: relative; display: inline-block; }
        /* Reserves the longest line, so typing never re-flows the paragraph. */
        .lp-term-sizer { visibility: hidden; white-space: pre; }
        .lp-term-text {
          position: absolute;
          inset: 0;
          white-space: pre;
          color: var(--foreground);
        }
        .lp-caret {
          display: inline-block;
          width: 0.5em;
          height: 1em;
          translate: 0 0.15em;
          background: var(--primary);
          animation: lp-blink 1.05s steps(1) infinite;
        }
        @keyframes lp-blink { 0%, 55% { opacity: 1; } 56%, 100% { opacity: 0; } }

        /* ---- live dot ---- */
        .lab-pulse { animation: lab-pulse 2.6s ease-in-out infinite; }
        @keyframes lab-pulse {
          0%, 100% { opacity: 1; }
          50%      { opacity: 0.35; }
        }
        @media (prefers-reduced-motion: reduce) {
          .sf-fall, .sf-rise { animation: none; }
          .lab-pulse { animation: none; }
        }
      `}</style>

      <div
        className="mb-2 flex flex-wrap items-center justify-between gap-3"
        data-sound=""
      >
        <h1 className="text-[26px] leading-[1.35] tracking-[-0.5px]">
          Lab <span className="text-primary">/ three sketches.</span>
        </h1>
        <SoundToggle />
      </div>
      <p className="mb-2 text-muted-foreground">
        Not linked from anywhere, not indexed. The first two are whole heroes,
        built to be swapped into{" "}
        <code className="font-mono text-[0.9em]">/</code> as they stand; the
        last is a bench for the text mechanisms. Sound is off until you turn it
        on; after that the nav above ticks under the pointer, and so do the
        small parts here.
      </p>
      <p className="mb-8 font-mono text-[12px] text-faint">
        the shelf moved to /books
      </p>

      {OPTIONS.map((option) => (
        <section key={option.id}>
          <SectionHeading>{option.title}</SectionHeading>
          <p className="mb-6 text-[13px] text-muted-foreground leading-relaxed">
            {option.note}
          </p>
          <div
            className="rounded-xl border border-border border-dashed p-5 sm:p-7"
            data-sound=""
          >
            {option.element}
          </div>
        </section>
      ))}
    </PageWrapper>
  );
}
