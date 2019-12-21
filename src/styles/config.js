import { css } from 'styled-components'

export const config = css`
  :root {
    /* Colors */
    --white: hsl(0, 0%, 100%);
    --light: hsl(0, 0%, 95%);

    --black: hsl(0, 0%, 0%);
    --dark: hsl(0, 0%, 8%);

    --grey100: hsl(0, 0%, 85%);
    --grey200: hsl(0, 0%, 65%);
    --grey300: hsl(0, 0%, 55%);
    --grey400: hsl(0, 0%, 45%);
    --grey500: hsl(0, 0%, 35%);
    --grey600: hsl(0, 0%, 25%);
    --grey700: hsl(0, 0%, 15%);

    --primary: hsl(230, 80%, 50%);
    --secondary: hsl(216, 100%, 50%);

    --red: hsl(6, 78%, 57%);

    /* Typography */
    --font-mono: 'Space Mono', 'SF Mono', Menlo, monospace;
    --font-sans: -apple-system, Roboto, 'Open Sans', Arial, sans-serif;

    /* set base values */
    --text-base-size: 1em;
    --text-scale-ratio: 1.2;

    /* type scale */
    --text-sm: calc(1em / var(--text-scale-ratio));
    --text-md: calc(1em * var(--text-scale-ratio));
    --text-lg: calc(var(--text-md) * var(--text-scale-ratio));
    --text-xl: calc(var(--text-lg) * var(--text-scale-ratio));
    --text-xxl: calc(var(--text-xl) * var(--text-scale-ratio));

    /* line-height */
    --heading-line-height: 1.25;
    --body-line-height: 1.55;
  }

  @media screen and (min-width: 1170px) {
    :root {
      --text-base-size: 1.22em;
      --text-scale-ratio: 1.22;
    }
  }

  @media screen and (min-width: 1280px) {
    :root {
      --text-base-size: 1.24em;
      --text-scale-ratio: 1.24;
    }
  }

  body {
    font-family: var(--font-mono);
    font-size: var(--text-base-size);
  }

  h1,
  h2,
  h3,
  h4 {
    line-height: var(--heading-line-height);
  }

  h1 {
    font-size: var(--text-xxl);
  }

  h2 {
    font-size: var(--text-xl);
  }

  h3 {
    font-size: var(--text-lg);
  }

  h4 {
    font-size: var(--text-md);
  }

  small {
    font-size: var(--text-sm);
  }

  p {
    line-height: var(--body-line-height);
  }
`
