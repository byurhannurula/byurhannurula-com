import styled from 'styled-components'
import { mixins } from 'styles'
import { ExternalLink } from 'components/common'

export const CardLink = styled(ExternalLink)`
  color: var(--dark);
  background: none;
`

export const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: var(--space-xs);
  min-height: 180px;
  border-radius: 3px;
  transition: box-shadow 300ms ease-in-out;
  border: 1px solid rgba(20, 20, 20, 0.03);
  box-shadow: 0 6px 13px 0 rgba(20, 20, 20, 0.05);

  &:hover {
    box-shadow: 0 12px 26px 0 rgba(20, 20, 20, 0.09);
  }

  p {
    font-size: 0.9em;
    margin-top: 0;
    margin-bottom: 0;
  }
`

export const CardTitle = styled.h4`
  font-size: 1.2em;
  font-weight: 600;
  color: var(--gray-darkest);
  margin-bottom: var(--space-xxs);
`

export const CardDescription = styled.p`
  color: var(--gray);
`

export const CardDetails = styled.div`
  ${mixins.flexBetween};
  color: var(--dark);
  margin-top: auto;

  div {
    font-size: 1em;
    ${mixins.flexAlignCenter};

    span {
      display: block;
      content: '';
      width: 12px;
      height: 12px;
      border-radius: 10px;
      margin-right: var(--space-xxs);
    }
  }

  span {
    ${mixins.flexAlignCenter};

    p {
      line-height: 1;

      &:not(:last-child) {
        margin-right: var(--space-xs);
      }

      svg {
        margin-right: 6px;
      }
    }
  }
`
