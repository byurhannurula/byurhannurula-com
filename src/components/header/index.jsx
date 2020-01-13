import React from 'react'
import { Link } from 'gatsby'
import { navLinks } from 'components/links'
import { HeaderWrapper, Logo, Nav, NavList, NavItem } from './styles'

const Header = () => (
  <HeaderWrapper as="header">
    <Logo>
      <Link to="/">byurhan</Link>
    </Logo>
    <Nav>
      <NavList>
        {navLinks &&
          navLinks.map(({ id, label, url }) => (
            <NavItem key={id}>
              <Link to={url}>{label}</Link>
            </NavItem>
          ))}
      </NavList>
    </Nav>
  </HeaderWrapper>
)

export default Header
