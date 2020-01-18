import styled from 'styled-components'

export const FooterWrapper = styled.footer`
  /* padding-top: var(--space-xxxl); */
  padding-bottom: var(--space-lg);
  text-align: center;
`

export const Copyright = styled.p`
  font-size: 16px;

  span {
    font-family: var(--font-sans);
  }

  a {
    background: none;

    svg {
      width: 1em;
      height: 1em;
    }
  }
`
