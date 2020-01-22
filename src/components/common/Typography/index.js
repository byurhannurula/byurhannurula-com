import styled from 'styled-components'
import { media } from 'styles'

export const Title = styled.h1`
  color: var(--dark);
  margin-bottom: var(--space-sm);
`

export const SmallHeading = styled.h3`
  color: var(--gray-darkest);
  margin-bottom: var(--space-xxs);
`

export const Text = styled('p')`
  color: var(--gray);
  margin-top: 0;
  margin-bottom: 0;

  ${({ display }) =>
    display &&
    `
      margin-bottom: var(--space-sm);
      color: var(--dark);
      font-size: 2.75em;

      @media (max-width: 568px) {
        font-size: 2.4em;
      }
  `}

  ${({ heading }) =>
    heading &&
    `
      color: var(--dark);
      font-size: 2.074em;
      
  `}

  ${({ subtitle }) =>
    subtitle &&
    `
      margin-top: var(--space-xs);
      color: var(--gray-dark);
      font-size: 1.15em;
      font-weight: 400;
  `}

  ${({ body }) =>
    body &&
    `
      font-size: calc(1em + 0.09vw);
  `}

  ${({ smallText }) =>
    smallText &&
    `
      font-size: calc(0.9em + 0.08vw);
  `}
`
