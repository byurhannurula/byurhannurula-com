import styled, { css } from 'styled-components'
import { Link } from 'gatsby'
import { mixins } from 'styles'

export const StyledHeader = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 4;
  width: 100%;
  height: 70px;
  display: flex;
  color: ${({ theme }) => theme.colors.text};
  background-color: ${({ theme }) => theme.colors.bg};
  transition: box-shadow 350ms ease;
  box-shadow: ${(p) => (p.scrolled ? `${mixins.boxShadow}` : 'none')};

  div {
    ${mixins.flexBetween};
  }

  ${(p) =>
    p.isMobile &&
    css`
      padding-top: 14px;
      padding-bottom: 14px;

      div {
        ${mixins.flexCenter};
      }

      h3 {
        display: none;
      }
    `}
`

export const StyledLogo = styled.h3`
  font-size: 24px;
  font-weight: 700;
  letter-spacing: -1.5px;
`

export const StyledNav = styled.nav`
  display: flex;
  align-items: center;
  counter-reset: subsection;
`

export const NavLink = styled(Link)`
  /* padding: 10px 12px; */
  font-size: 16px;
  border-radius: 4px;
  color: ${({ theme }) => theme.colors.text};
  transition: background-color 300ms ease;

  &:before {
    font-size: 14px;
    padding: 4px 6px;
    margin-right: 12px;
    border-radius: 4px;
    counter-increment: subsection;
    content: counter(subsection) '.';
    transition: background-color 300ms ease;
    background-color: ${({ theme }) => theme.colors.grayLight};
  }

  &:hover {
    /* background-color: #ffffff; */

    &:not([aria-current='page']):before {
      background-color: ${({ theme }) => theme.colors.gray};
    }
  }

  &[aria-current='page'] {
    &:before {
      color: ${({ theme }) => theme.colors.bg};
      background-color: ${({ theme }) => theme.colors.text};
    }
  }

  &:not(:last-child) {
    margin-right: 22px;
  }
`

export const NavThemeButton = styled.button`
  padding: 6px;
  border-radius: 4px;
  color: ${({ theme }) => theme.colors.text};
  background-color: rgba(${({ theme }) => theme.colors.bg}, 0);

  svg {
    width: 24px;
    height: 24px;
  }
`
