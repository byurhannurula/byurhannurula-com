import styled, { keyframes } from 'styled-components'

const pulse = keyframes`
  0% {
    box-shadow: 0 0 0 0px rgba(106, 229, 169, 1);
  }
  100% {
    box-shadow: 0 0 0 15px rgba(106, 229, 169, 0.0);
  }
`

export const Nav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  height: 0;
  width: 100%;
  display: flex;
  align-items: center;
  transition: all 250ms cubic-bezier(0.52, 0.16, 0.24, 1);
  background-color: var(--gray-darkest);
  color: var(--white);

  ${({ active }) =>
    active &&
    `
    height: 100vh;

    & > div > div {
      opacity: 1;
      transform: translateY(0);
    }
    `}
`

export const NavInner = styled.div`
  width: 100%;
  margin: 0 auto;
  max-width: 968px;
  padding-left: var(--space-sm);
  padding-right: var(--space-sm);
  position: relative;
  height: calc(100% - 30%);
  padding-left: var(--space-sm) * 3;
  padding-right: var(--space-sm) * 3;
  display: flex;
  align-items: center;
  justify-content: space-between;

  /* @include max($md) {
    padding-right: $space-3 * 4;
    justify-content: flex-end;
  }

  @include max($sm) {
    padding-right: $space-2 * 4;
  } */
`

export const Contact = styled.div`
  opacity: 0;
  transform: translateY(-250px);
  transition: all 300ms cubic-bezier(0.52, 0.16, 0.24, 1);

  h4 {
    margin-top: var(--space-md);
    margin-bottom: var(--space-xxs);
    color: var(--light);
    font-size: 1.2rem;
  }

  a,
  p {
    display: block;
    color: var(--gray);
  }

  .avaliable {
    margin: 0;
    display: flex;
    align-items: center;

    .dot {
      width: 8px;
      height: 8px;
      display: flex;
      border-radius: 4px;
      background-color: #38ed94;
      animation: ${pulse} 1.5s infinite ease-in-out;
    }
  }
`

export const Menu = styled.div`
  opacity: 0;
  transform: translateY(-250px);
  transition: all 300ms cubic-bezier(0.52, 0.16, 0.24, 1);
`

export const NavList = styled.ul`
  text-align: right;
`

export const NavItem = styled.li`
  &:not(:last-child) {
    padding-bottom: 32px;
  }

  a {
    color: #fff;
    font-size: 2rem;
    font-weight: 700;

    &:hover,
    &[aria-current='page'] {
      color: var(--primary);
      transition: color 250ms;
    }
  }
`
