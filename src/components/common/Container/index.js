import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;
  max-width: 1170px;
  margin-left: auto;
  margin-right: auto;
  padding-left: var(--space-xs);
  padding-right: var(--space-xs);

  ${({ small }) =>
    small &&
    `
    max-width: 768px;
  `}

  ${({ fluid }) =>
    fluid &&
    `
    max-width: none;
  `}
`
