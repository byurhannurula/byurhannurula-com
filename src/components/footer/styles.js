import styled from 'styled-components'

export const FooterWrapper = styled.footer`
  padding-top: var(--space-xxxl);
  text-align: center;
`

export const Copyright = styled.p`
  font-size: 16px;

  span {
    font-family: var(--font-sans);
  }

  a {
    color: var(--primary);
    text-decoration: underline;
  }

  svg {
    width: 1em;
    height: 1em;
  }
`
