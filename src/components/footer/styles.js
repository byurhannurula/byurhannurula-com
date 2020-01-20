import styled from 'styled-components'
import { media, mixins } from 'styles'

export const FooterWrapper = styled.footer`
  padding-top: var(--space-xxxl);
  padding-bottom: var(--space-xxxl);
  background-color: hsl(0, 0%, 98%);
`

export const Contact = styled.div`
  p {
    width: 60%;
    color: var(--gray-dark);

    ${media.max('md')`
      width: 100%;
    `}
  }
`

export const IconsWrapper = styled.div`
  margin-top: var(--space-sm);
  margin-bottom: var(--space-xl);
`

export const IconsList = styled.ul`
  display: flex;
`

export const IconsItem = styled.li`
  &:not(:last-child) {
    margin-right: var(--space-sm);
  }

  a {
    cursor: pointer;
    color: var(--dark);
    transition: all 200ms ease;
    background: none;

    &:hover {
      color: var(--dark);
    }

    svg {
      fill: currentColor;
      transition: all 200ms ease;

      &:hover {
        transition: all 200ms ease;
        transform: scale(1.2);
      }
    }
  }
`

export const Copyright = styled.div`
  margin-top: calc(var(--space-lg) * 3);
  ${mixins.flexBetween};

  ${media.max('sm')`
    flex-direction: column;
    align-items:flex-start;
  `}

  p {
    margin-top: 0;
    margin-bottom: 0;
    font-size: 0.8em;
  }

  a {
    background: none;

    svg {
      width: 1em;
      height: 1em;
    }
  }
`
