import styled, { keyframes } from 'styled-components'
import { media, mixins } from 'styles'

const pulseAnimation = keyframes`
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
  ${mixins.flexAlignCenter};
  transition: all 250ms cubic-bezier(0.52, 0.16, 0.24, 1);
  background-color: var(--dark);
  color: var(--white);

  & > div {
    width: 100%;
    max-width: 968px;
    position: relative;
    height: calc(100% - 30%);
    padding-left: var(--space-sm);
    padding-right: var(--space-sm);
    ${mixins.flexBetween};

    ${media.max('sm')`
      padding-right: var(--space-sm);
    `}

    ${media.max('md')`
      padding-right: var(--space-sm);
      justify-content: flex-end;
    `}
  }

  ${({ isActive }) =>
    isActive &&
    `
    height: 100vh;

    & > div > div {
      opacity: 1;
      transform: translateY(0);
    }
  `}
`

export const Contact = styled.div`
  opacity: 0;
  transform: translateY(-250px);
  transition: all 300ms cubic-bezier(0.52, 0.16, 0.24, 1);

  ${media.max('md')`
    display: none;
  `}
`

export const SmallTitle = styled.h4`
  margin-bottom: var(--space-xxs);
  color: var(--light);
  font-size: 1rem;
  text-transform: uppercase;
`

export const ContactDetails = styled.div`
  margin-bottom: var(--space-xl);

  a {
    display: block;
    font-size: 1rem;
    ${mixins.defaultLink};

    &:not(:last-child) {
      margin-bottom: calc(var(--space-xxs) - 6px);
    }
  }
`

export const Avaliable = styled.div`
  p {
    color: var(--gray);
    font-size: 1rem;
    margin-top: 0;
    margin-bottom: var(--space-md);
    ${mixins.flexAlignCenter};

    &::before {
      content: '';
      width: 8px;
      height: 8px;
      display: block;
      border-radius: 4px;
      background-color: #38ed94;
      margin-right: var(--space-xs);
      animation: ${pulseAnimation} 1.2s infinite ease-in-out;
    }
  }
`

export const CopyrightText = styled.p`
  font-size: 1rem;
  margin-bottom: 0;
  color: var(--gray);
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
    color: var(--light);
    font-size: 2rem;
    font-weight: 700;

    &:hover,
    &[aria-current='page'] {
      color: var(--primary);
      transition: color 250ms;
    }
  }
`
