import styled from 'styled-components'
import { bp } from './theme'

export const Container = styled.div`
  width: 100%;
  max-width: ${(p) => p.theme.bodySizes.base}px;
  margin-left: auto;
  margin-right: auto;
  padding-left: 16px;
  padding-right: 16px;

  ${({ small }) =>
    small &&
    `
    max-width: 800px;
  `}

  ${({ fluid }) =>
    fluid &&
    `
    max-width: none;
  `}
`

export const SectionContainer = styled(Container)`
  margin-bottom: 56px;

  @media (${bp.maxSmall}) {
    margin-bottom: 32px;
  }

  @media (${bp.maxDesktop}) {
    margin-bottom: 72px;
  }
`
