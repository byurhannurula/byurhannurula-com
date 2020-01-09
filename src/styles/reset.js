import { css } from 'styled-components'

export const reset = css`
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

  h1,
  h2,
  h3,
  h4,
  h5 {
    margin-top: 0;
    margin-bottom: 0;
  }

  button {
    border: 0;
    padding: 0;
    cursor: pointer;
    user-select: none;
    background-color: transparent;
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
`
