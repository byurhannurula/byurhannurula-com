import { css } from 'styled-components'

export const typography = css`
  :root {
    /* Font family */
    --font-mono: 'Space Mono', 'SF Mono', Menlo, monospace;
    --font-sans: -apple-system, Roboto, 'Open Sans', Arial, sans-serif;

    /* Line height */
    --body-line-height: 1.55;
    --heading-line-height: 1.2;
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
    font-size: 2.488em;
  }

  h2 {
    font-size: 2.074em;
  }

  h3 {
    font-size: 1.728em;
  }

  h4 {
    font-size: 1.44em;
  }

  p {
    font-size: calc(1em + 0.1vw);
    line-height: var(--body-line-height);
  }
`
