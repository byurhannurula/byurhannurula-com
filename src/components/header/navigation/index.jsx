import React from 'react'
import { Link } from 'gatsby'
import { ExternalLink, Container } from 'components/common'
import { navLinks } from 'components/links'

import {
  Nav,
  Menu,
  Contact,
  ContactDetails,
  CopyrightText,
  Avaliable,
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

        <Avaliable>
          <SmallTitle>Avaliable</SmallTitle>
          <p>
            <span />
            Avaliable for new projects
          </p>
        </Avaliable>

        <CopyrightText>
          &copy; {new Date().getFullYear()} &mdash; Byurhan Beyzat
        </CopyrightText>
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
