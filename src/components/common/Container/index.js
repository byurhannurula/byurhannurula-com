import styled from 'styled-components'
import { media } from 'styles'

export const Container = styled.div`
  width: 100%;
  max-width: 1070px;
  margin-left: auto;
  margin-right: auto;

  ${({ small }) =>
    small &&
    `
    max-width: 850px;
  `}

  ${({ fluid }) =>
    fluid &&
    `
    max-width: none;
  `}
`

export const SectionContainer = styled(Container)`
  margin-bottom: calc(var(--space-lg) * 5);

  ${media.max('md')`
    margin-bottom: calc(var(--space-lg) * 3);
  `}
`
