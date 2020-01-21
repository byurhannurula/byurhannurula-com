import styled from 'styled-components'
import { media, mixins } from 'styles'

export const SectionHeader = styled.div`
  ${mixins.flexBetween};
  margin-bottom: var(--space-md);

  h1 {
    margin-bottom: 0;
  }
`
export const SectionContent = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 32px;

  ${media.max('xs')`
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  `}
`
