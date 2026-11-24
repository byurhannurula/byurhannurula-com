# Design rules

Rules from the owner's corrections. Each has its reason and the owner's
words. Read this before building or changing UI. A newer correction wins
over an older rule: check the dates in the comments.

## Color

- **Personal mode never changes surface colours, fills or corner radius.**
  It changes only copy, section marks, the hello bubble and the joke
  bubbles. The site as a whole may use colour; personal mode adds no fills.
  Why: the colour tiles looked wrong, worst in dark mode, and cards must keep
  the same roundness in both modes.
  <!-- 2026-11-24: "this colour change could be reverted", "i also dont liked colours on dark mode", "uses card roundness could stays same on both mode" -->

- **New accents (bubbles, highlights) use `--accent`. Never add a new hue for one element.**
  Why: the site has one accent; an extra hue looks random.
  <!-- 2026-11-20: "does pink is the right ??" (the personal mode bubble was pink) -->

## Motion

- **All parts of one hover share one speed and curve: 400 ms, `--ease-out-hover` (`cubic-bezier(0.33, 1, 0.68, 1)`).**
  A hover moves one thing; never add a second slide on the same row. This
  overrides the motion skills' "hover under 300 ms": 300 ms felt too fast.
  Why: parts that start or end at different times read as bugs.
  <!-- 2026-11-24: "its too fast etc its not ok as animation transtions", "they first to straight ahead then rotate" -->

- **Arrow badges (a round button with an arrow): an outlined circle (`border-line-strong`) that turns -45deg as one piece on hover, `--ease-out-spring` (`cubic-bezier(0.34, 1.56, 0.64, 1)`) over 0.6 s; the background only tints (`bg-sunk`).**
  Every row turns, internal and external links alike. Never swap the fill to
  dark. Reference: the studio site (`_side-projects/freelance-idea/studio-site`)
  and `src/components/shared/project-list.tsx`.
  Why: with a dark fill the arrow moved before the circle showed and after
  it hid.
  <!-- 2026-11-24: "arrows had to rotate like before", "the arrow moves before showing and after hiding the circle", "check in side project freelance idea studio-site" -->

- **A group whose items wrap when it expands never animates `max-width`, `margin` or `padding` per item.**
  Set the new layout at once and animate the move with FLIP (`translate`),
  as in `src/components/shared/tech-pile.tsx`. `pnpm check:motion` warns on
  layout properties in transitions.
  Why: growing items jump between lines, so the icons kept moving after the
  expand.
  <!-- 2026-11-24: "they expand and after that still icons move a little or like wiggle" -->

- **Keep the command menu (Cmd K) open animation (`animate-pop-in` and the overlay fade).**
  This overrides the motion skills' "never animate keyboard actions".
  Why: the owner likes it.
  <!-- 2026-11-24: "i like this cmd K opening" -->

## Interaction

- **Feedback for an action ("Copied", "Saved") never replaces text whose width would change. Show it in a bubble above the element.**
  Reference: `src/components/layout/email-copy.tsx`.
  Why: the label change moved the whole line.
  <!-- 2026-11-24: "changing text moves whole thing maybe show on top copied something" -->

- **Hover bubbles (jokes, hints) follow the mouse: `data-quip="..."` on the element, shown by `QuipCursor`. Never pin them to a fixed spot.**
  Why: like bohdana.design, where the bubble is tied to the mouse.
  <!-- 2026-11-24: "they need to be tied to the mouse not in same place" -->

- **Nav and menu links show hover with a shape (a light pill), not only a text colour change.**
  Why: a colour change alone was almost invisible.
  <!-- 2026-11-24: "navbar has no hover effect they change color i think but its too slight almost not visible" -->

- **An icon inside a round badge uses a whole-pixel size (`size-4` in `size-8` or `size-9`), never a rem fraction such as `size-[0.9rem]`.**
  Nudge right-heavy glyphs (arrows) 1px toward the tail (`-translate-x-px`).
  Why: fractional sizes land between pixels and look off centre.
  <!-- 2026-11-24: "feels not centered exactly" -->

## Copy

- **Copy about the owner is always first person ("I", "my"), never "he", "his" or "him".**
  This includes llms.txt, meta descriptions and JSON-LD. Third person is only
  for other people (book authors, friends).
  Why: first person is friendlier.
  <!-- 2026-11-20: "i prefer I form my own name more friendly" -->

- **Type and colour specimens belong on `/design-system`, never on `/colophon`.**
  The colophon holds only the technical side and the inspiration.
  Why: the owner sees the colophon as technical and inspiration, not a
  design system.
  <!-- 2026-11-20: "for me colophon is more technical and inspiration etc not design system" -->
