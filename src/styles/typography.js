import { css } from 'styled-components'

const Typography = css`
  body {
    font-family: ${(p) => p.theme.font.base};
    font-size: 16px;
    font-weight: 400;
  }

  h1,
  h2,
  h3,
  h4 {
    margin-top: 0;
    margin-bottom: 0;
  }
`

export { Typography }
