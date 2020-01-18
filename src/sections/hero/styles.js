import styled from 'styled-components'
import { media } from 'styles'

export const Watermark = styled.span`
  font-family: var(--font-sans);
  line-height: 1;
  font-size: 264px;
  font-weight: 800;
  letter-spacing: 8px;
  color: rgb(0, 0, 0, 0.04);
  position: relative;
  right: 75px;

  ${media.max('sm')` display: none; `}
`

export const Wrapper = styled.div`
  margin-top: calc(var(--space-xl) * 3);
  margin-bottom: calc(var(--space-xl) * 4);

  ${media.min('sm')` margin-top: -112px; `}

  h1 {
    font-size: 2.89em;

    ${media.max('sm')` font-size: 2.25rem; `}
  }
`
