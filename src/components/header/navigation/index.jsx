import React from 'react'
import { Link } from 'gatsby'
import { ExternalLink, Container } from 'components/common'
import { navLinks, about } from '@content/data'

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
          <ExternalLink url={`mailto:${about.email}`}>
            {about.email}
          </ExternalLink>
          <ExternalLink url={`tel:${about.phone}`}>{about.phone}</ExternalLink>
        </ContactDetails>
        <Avaliable isAvaliable={about.isAvaliable}>
          <SmallTitle>Avaliable</SmallTitle>
          <p>
            {about.isAvaliable ? 'Avaliable for new projects' : 'Not avaliable'}
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
