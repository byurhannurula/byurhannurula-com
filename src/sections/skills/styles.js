import styled from 'styled-components'
import { mixins, media } from 'styles'

export const Wrapper = styled.section`
  & > h1 {
    margin-bottom: var(--space-md);
  }

  & > p {
    width: 70%;
    color: vaR(--gray-dark);
    margin-bottom: var(--space-md);

    ${media.max('md')`
      width: 100%;
    `}
  }
`

export const SkillsSet = styled.div`
  ${mixins.flexBetween};
  flex-wrap: wrap;

  ${media.min('lg')`
    flex-wrap: nowrap;
  `}

  p {
    min-width: 200px;
    text-align: left;
    ${mixins.flexAlignCenter};

    ${media.min('lg')`
      min-width: unset;
    `}

    &::before {
      display: block;
      content: '';
      width: 10px;
      height: 10px;
      border-radius: 5px;
      border: 2px solid var(--primary);
      margin-right: var(--space-xxs);
    }
  }
`
