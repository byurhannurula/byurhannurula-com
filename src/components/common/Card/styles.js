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
  min-height: 180px;
  padding: var(--space-xs);
  border-radius: 3px;
  box-shadow: 0 6px 13px 0 rgba(20, 20, 20, 0.05);

  &:hover {
    color: var(--dark);
    transition: all 200ms ease-in;
    box-shadow: 0 6px 20px 0 rgba(20, 20, 20, 0.07);
  }
`

export const CardTitle = styled.h4`
  font-size: 1.2em;
  font-weight: 600;
`

export const CardDescription = styled.p`
  font-size: 0.9em;
  margin-bottom: 0;
`

export const CardDetails = styled.div`
  ${mixins.flexBetween};
  margin-top: auto;

  p {
    font-size: 0.9em;
    margin-top: 0;
    margin-bottom: 0;
  }

  div {
    font-size: 1em;
    ${mixins.flexAlignCenter};

    span {
      display: block;
      content: '';
      width: 12px;
      height: 12px;
      margin-right: 10px;
      border-radius: 10px;
    }
  }

  span {
    ${mixins.flexAlignCenter};

    p {
      display: flex;
      line-height: 1;

      &:not(:last-child) {
        margin-right: var(--space-xs);
      }

      svg {
        margin-right: 8px;
      }
    }
  }
`
