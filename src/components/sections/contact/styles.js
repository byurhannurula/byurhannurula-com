import styled from 'styled-components'

export const IconsWrapper = styled.div`
  margin-top: var(--space-sm);
  margin-bottom: var(--space-xl);
`

export const IconsList = styled.ul`
  display: flex;
  place-items: center;
  justify-content: center;
`

export const IconsItem = styled.li`
  &:not(:last-child) {
    margin-right: var(--space-lg);

    @media screen and (max-width: 400px) {
      margin-right: var(--space-md);
    }
  }

  a {
    cursor: pointer;
    color: var(--dark);
    transition: all 200ms ease;

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
