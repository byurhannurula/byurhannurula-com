import React from 'react'
import { Link } from 'gatsby'
import { ExternalLink, Icon, Container } from 'components/common'
import { navLinks } from 'components/links'

import {
  Nav,
  Menu,
  Contact,
  ContactDetails,
  NavList,
  NavItem,
  SmallTitle,
} from './styles'

export const Navigation = ({ isActive }) => (
  <Nav isActive={isActive}>
    <Container>
      <Contact>
        <ContactDetails>
          <SmallTitle>Contact Details</SmallTitle>
          <ExternalLink url="mailto:byurhanbeyzat@gmail.com">
            byurhanbeyzat@gmail.com
          </ExternalLink>
          <ExternalLink url="tel:+359 87 6129 065">
            +359 87 6129 065
          </ExternalLink>
        </ContactDetails>
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
    </Container>
  </Nav>
)
