import { css } from 'styled-components'

export const typography = css`
  :root {
    /* Font family */
    --font-mono: 'Space Mono', 'SF Mono', Menlo, monospace;
    --font-sans: -apple-system, Roboto, 'Open Sans', Arial, sans-serif;

    /* Line height */
    --body-line-height: 1.6;
    --heading-line-height: 1.3;
  }

  body {
    font-family: var(--font-mono);
    font-size: calc(14px + 0.25vw);
    line-height: var(--body-line-height);
  }

  h1,
  h2,
  h3,
  h4 {
    font-weight: 700;
    line-height: var(--heading-line-height);
  }

  h1 {
    font-size: calc(1em + 2.35vw);
  }

  h2 {
    font-size: calc(1em + 1.85vw);
  }

  h3 {
    font-size: calc(1em + 1.55vw);
  }

  h4 {
    font-size: calc(1em + 1.35vw);
  }

  p {
    font-size: calc(1em + 0.25vw);
    line-height: var(--body-line-height);
  }
`
