import React from 'react'
import { Link } from 'gatsby'

import { HeaderWrapper, Logo, Nav, NavList, NavItem } from './styles'

const Header = ({ links }) => (
  <HeaderWrapper as="header">
    <Logo>
      <Link to="/">byurhan</Link>
    </Logo>
    <Nav>
      <NavList>
        {links &&
          links.map(({ id, label, url }) => (
            <NavItem key={id}>
              <Link to={url}>{label}</Link>
            </NavItem>
          ))}
      </NavList>
    </Nav>
  </HeaderWrapper>
)

export default Header
