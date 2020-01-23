import styled from 'styled-components'

export const List = styled.ul`
  list-style-type: square;
  margin-bottom: var(--space-md);

  li {
    margin-left: var(--space-md);

    @media screen and (max-width: 560px) {
      margin-left: var(--space-sm);
    }

    &:not(:last-child) {
      margin-bottom: 8px;
    }
  }
`
