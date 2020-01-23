import styled from 'styled-components'
import { Link } from 'gatsby'

export const LinkWrapper = styled(Link)`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: space-between;
  padding-top: var(--space-xs);
  padding-bottom: var(--space-xs);

  &:not(:last-child) {
    border-bottom: 1px solid var(--gray);
  }
`

export const PostTitle = styled.h4`
  font-size: 20px;
  color: var(--gray-darker);
  transition: color 200ms ease-in;

  &:hover {
    color: var(--dark);
  }
`

export const PostInfo = styled.p`
  margin-top: 0;
  margin-bottom: 0;
  font-size: 16px;
`
