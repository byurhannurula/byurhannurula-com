import styled from 'styled-components'
import { media, mixins } from 'styles'

export const Watermark = styled.span`
  font-family: var(--font-sans);
  line-height: 1;
  font-size: 15em;
  font-weight: 800;
  letter-spacing: 8px;
  color: rgb(0, 0, 0, 0.04);
  position: relative;
  right: 75px;
  top: 20px;

  ${media.max('sm')`
    display: none;
  `}
`

export const HeroWrapper = styled.section`
  ${media.min('sm')`
    margin-top: -70px;
  `}

  ${media.max('sm')`
    margin-top:calc(var(--space-xl) * 3);
  `}
`

export const SkillsWrapper = styled.section`
  & > h1 {
    margin-bottom: var(--space-md);
  }

  & > p {
    width: 70%;
    color: var(--gray-dark);
    margin-bottom: var(--space-md);

    ${media.max('md')`
      width: 100%;
    `}
  }
`

export const SectionHeader = styled.div`
  ${mixins.flexBetween};
  margin-bottom: var(--space-md);
`

export const SectionContent = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 32px;

  ${media.max('xs')`
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  `}
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

    ${media.max('md')`
      min-width: 160px;
    `}

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
