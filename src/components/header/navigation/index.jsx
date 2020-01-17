import React from 'react'
import { Link } from 'gatsby'
import { ExternalLink } from 'components/common'
import { navLinks } from 'components/links'

import { Nav, NavInner, Menu, Contact, NavList, NavItem } from './styles'

export const Navigation = ({ active }) => (
  <Nav active={active}>
    <NavInner>
      <Contact>
        <h4>Contact Details</h4>
        <ExternalLink url="mailto:byurhanbeyzat@gmail.com">
          byurhanbeyzat@gmail.com
        </ExternalLink>
        <ExternalLink url="tel:+359 87 6129 065">+359 87 6129 065</ExternalLink>

        <h4>Avaliable</h4>
        <p className="avaliable">
          <span className="dot" /> &nbsp; Available for new projects
        </p>
      </Contact>
      <Menu>
        <NavList>
          {navLinks.map(link => (
            <NavItem key={link.id}>
              <Link to={link.url}>{link.label}</Link>
            </NavItem>
          ))}
        </NavList>
      </Menu>
    </NavInner>
  </Nav>
)
