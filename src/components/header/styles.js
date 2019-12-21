import styled from 'styled-components'

export const HeaderWrapper = styled.header`
  width: 100%;
  padding-top: 72px;
  padding-bottom: 72px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  @media screen and (max-width: 700px) {
    padding-top: 44px;
    display: block;

    div {
      margin-bottom: 18px;
    }
  }
`

export const Logo = styled.div`
  a {
    font-family: var(--font-mono);
    color: var(--primary);
    align-self: center;
    font-size: 32px;
    font-weight: 600;
    letter-spacing: -1.5px;

    &:before,
    &:after {
      content: '/';
      color: var(--dark);
    }
  }
`

export const Nav = styled.nav``

export const NavList = styled.ul`
  display: flex;
  align-items: center;
`

export const NavItem = styled.li`
  &:not(:last-child) {
    margin-right: 32px;
  }

  a {
    color: var(--grey400);
    font-size: 18px;
    letter-spacing: -0.6px;
    text-transform: lowercase;

    &:hover,
    &[aria-current='page'] {
      color: var(--dark);
      transition: color 250ms;
    }
  }
`
