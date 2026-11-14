export const isExternal = (href: string) => /^https?:\/\//.test(href);

/** A link that stays on this site: a path or an anchor on the page. */
export const isInternal = (href: string) => /^[/#]/.test(href);

export const hostOf = (href: string) => {
  try {
    return new URL(href).host.replace(/^www\./, '');
  } catch {
    return href;
  }
};

export const pathOf = (href: string) => {
  try {
    const path = new URL(href).pathname;
    return path === '/' ? '' : path;
  } catch {
    return '';
  }
};

/** Colour by destination: the accent leaves the site, the violet stays. */
export const LINK_OUT = '[--lc:var(--accent)]';
export const LINK_IN = '[--lc:var(--hue-3)]';

/** Transitions end at once when the reader set motion off. */
export const STILL =
  'motion-reduce:transition-none in-data-[motion=off]:transition-none';

// Two stacked backgrounds: a dashed rule that stays, and a solid rule that
// wipes in from the left. A border cannot do this, because border-style
// does not transition. `box-decoration-clone` gives each wrapped line its
// own rule.
const RULE =
  'text-(color:--lc) no-underline box-decoration-clone pb-[2px] bg-no-repeat [background-position:0_100%] [background-image:linear-gradient(var(--lc),var(--lc)),repeating-linear-gradient(to_right,var(--lc)_0_3px,transparent_3px_6px)] [background-size:0_1px,100%_1px] transition-[background-size] duration-[220ms] ease-out motion-reduce:transition-none in-data-[motion=off]:transition-none';

/** The underline on the link itself. */
export const UNDERLINE = `${RULE} hover:[background-size:100%_1px,100%_1px] focus-visible:[background-size:100%_1px,100%_1px]`;

/** The underline on a word inside a link with the class `group/link`. */
export const UNDERLINE_IN_GROUP = `${RULE} group-hover/link:[background-size:100%_1px,100%_1px] group-focus-visible/link:[background-size:100%_1px,100%_1px]`;
