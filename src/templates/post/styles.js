import styled from 'styled-components'
import { Link } from 'gatsby'

export const PostWrapper = styled.div``

export const PostHeader = styled.div`
  width: 100%;
  margin-bottom: var(--space-md);
  border-bottom: 1px solid var(--gray);

  h2 {
    margin-bottom: var(--space-xs);
  }
`

export const PostFooter = styled.div`
  width: 100%;
  height: inherit;
  display: flex;
  align-items: center;
  justify-content: space-between;

  a:last-of-type > * {
    display: flex;
    justify-content: flex-end;
  }

  @media (max-width: 560px) {
    flex-direction: column;
  }
`

export const Button = styled(Link)`
  border-radius: 4px;
  border: 1px solid var(--dark);
  padding: var(--space-xxs);

  & > span {
    color: var(--gray-darker);
  }

  & > h4 {
    color: var(--gray-darkest);
  }

  @media (max-width: 560px) {
    width: 100%;

    &:not(:last-child) {
      margin-bottom: var(--space-xs);
    }
  }
`
