import { css, createGlobalStyle } from 'styled-components'

import { mixins } from './mixins'
import { media } from './media'

const variables = css`
  :root {
    /* General */
    --transition: all 250ms cubic-bezier(0.645, 0.045, 0.355, 1);
    --nav-height: 90px;
    --nav-scroll-height: 70px;

    /* Colors */
    --black: hsl(0, 0%, 0%);
    --white: hsl(0, 0%, 100%);
    --light: hsl(0, 0%, 95%);
    --dark: hsl(0, 0%, 8%);

    --gray-light: hsl(0, 0%, 55%);
    --gray: hsl(0, 0%, 45%);
    --gray-dark: hsl(0, 0%, 35%);
    --gray-darker: hsl(0, 0%, 25%);
    --gray-darkest: hsl(0, 0%, 15%);

    --primary: hsl(230, 80%, 50%);
    --secondary: hsl(216, 100%, 50%);
    --secondary-light: hsl(216, 100%, 70%);

    --red: hsl(6, 78%, 57%);

    /* Spaces */

    --space: 10px;
    --space-xxs: calc(var(--space));
    --space-xs: calc(var(--space) * 2);
    --space-sm: calc(var(--space) * 3);
    --space-md: calc(var(--space) * 4);
    --space-lg: calc(var(--space) * 5);
    --space-xl: calc(var(--space) * 6);
    --space-xxl: calc(var(--space) * 7);
    --space-xxxl: calc(var(--space) * 8);
    --space-xxxxl: calc(var(--space) * 9);
    --space-xxxxxl: calc(var(--space) * 10);
  }
`

const GlobalStyles = createGlobalStyle`
  ${variables}

  *,
  *:before,
  *:after {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    overflow-x: hidden;
    text-rendering: optimizeLegibility;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    -webkit-tap-highlight-color: transparent;
  }

  button {
    border: 0;
    cursor: pointer;
    user-select: none;
  }

  img {
    max-width: 100%;
    font-style: italic;
    vertical-align: middle;
  }

  svg {
    fill: currentColor;
    display: inline-block;
    vertical-align: middle;
  }

  ol,
  ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  blockquote {
    margin-left: 0;
    margin-right: 0;
    font-style: italic;
    border-left: 5px solid #ccc;
    padding-left: var(--space-xs);
  }

  body {
    font-family: 'Poppins', -apple-system, 'Roboto', Arial, sans-serif;
    font-size: calc(14px + 0.25vw);
    font-weight:400;
    line-height: 1.6;
  }

  h1,
  h2,
  h3,
  h4 {
    margin-top: 0;
    margin-bottom: var(--space-xxs);
    font-weight: 700;
    line-height: 1.3;
  }

  p {
    font-size: calc(1em + 0.25vw);
    line-height: 1.6;
  }

  main {
    margin-top: 9em;
    padding-left: var(--space-xs);
    padding-right: var(--space-xs);
  }
`

export { GlobalStyles, media, mixins }
