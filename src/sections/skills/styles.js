import styled from 'styled-components'
import { mixins, media } from 'styles'

export const Wrapper = styled.section`
  & > h1 {
    margin-bottom: var(--space-md);
  }

  & > p {
    width: 70%;
    color: vaR(--gray);
    margin-bottom: var(--space-md);

    ${media.max('md')`
      width: 100%;
    `}
  }
`

export const SkillsSet = styled.div`
  text-align: left;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  ${media.min('lg')`
    flex-wrap: nowrap;
  `}
`

export const Row = styled.div`
  p {
    min-width: unset;
    ${mixins.flexAlignCenter};

    &::before {
      display: block;
      content: '';
      width: 10px;
      height: 10px;
      border-radius: 5px;
      border: 2px solid var(--primary);
      margin-right: var(--space-xs);
    }
  }
`
