import { css } from 'styled-components'

export const typography = css`
  :root {
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
    --text-xxxl: calc(var(--text-xxl) * var(--text-scale-ratio));

    /* line-height */
    --heading-line-height: 1.25;
    --body-line-height: 1.6;
  }

  @font-face {
    font-family: 'Space Mono';
    font-style: italic;
    font-weight: 400;
    font-display: swap;
    src: local('Space Mono Italic'), local('SpaceMono-Italic'),
      url('/typeface/SpaceMono-Italic.woff2') format('woff2');
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA,
      U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212,
      U+2215, U+FEFF, U+FFFD;
  }
  @font-face {
    font-family: 'Space Mono';
    font-style: italic;
    font-weight: 700;
    font-display: swap;
    src: local('Space Mono Bold Italic'), local('SpaceMono-BoldItalic'),
      url('/typeface/SpaceMono-BoldItalic.woff2') format('woff2');
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA,
      U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212,
      U+2215, U+FEFF, U+FFFD;
  }
  @font-face {
    font-family: 'Space Mono';
    font-style: normal;
    font-weight: 400;
    font-display: swap;
    src: local('Space Mono'), local('SpaceMono-Regular'),
      url('/typeface/SpaceMono-Regular.woff2') format('woff2');
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA,
      U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212,
      U+2215, U+FEFF, U+FFFD;
  }
  @font-face {
    font-family: 'Space Mono';
    font-style: normal;
    font-weight: 700;
    font-display: swap;
    src: local('Space Mono Bold'), local('SpaceMono-Bold'),
      url('/typeface/SpaceMono-Bold.woff2') format('woff2');
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA,
      U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212,
      U+2215, U+FEFF, U+FFFD;
  }

  @media screen and (min-width: 1170px) {
    :root {
      --text-base-size: 1.23em;
      --text-scale-ratio: 1.23;
    }
  }

  @media screen and (min-width: 1280px) {
    :root {
      --text-base-size: 1.25em;
      --text-scale-ratio: 1.25;
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
