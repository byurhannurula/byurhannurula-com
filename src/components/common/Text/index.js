import styled, { css } from 'styled-components'

export const Text = styled('p')`
  color: var(--gray);
  margin-top: 0;
  margin-bottom: 0;

  ${({ display }) =>
    display &&
    css`
      margin-bottom: var(--space-sm);
      color: var(--dark);
      font-size: 2.75em;

      @media (max-width: 568px) {
        font-size: 2.4em;
      }
    `}

  ${({ heading }) =>
    heading &&
    css`
      color: var(--dark);
      font-size: 2.074em;
    `}

  ${({ subtitle }) =>
    subtitle &&
    css`
      margin-bottom: var(--space-xs);
      margin-top: var(--space-xs);
      color: var(--gray-dark);
      font-size: 1.15em;
      font-weight: 400;
    `}

  ${({ body }) =>
    body &&
    css`
      font-size: calc(1em + 0.09vw);
    `}

  ${({ listTitle }) =>
    listTitle &&
    css`
      color: var(--gray-darkest);
      margin-top: var(--space-xxs);
      margin-bottom: var(--space-xs);
    `}

  ${({ smallText }) =>
    smallText &&
    css`
      font-size: calc(0.9em + 0.08vw);
    `}
`
