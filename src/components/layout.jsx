import React from 'react'
import PropTypes from 'prop-types'
import { GlobalStyles, Container } from 'styles'

import SEO from 'components/seo'
import Header from 'components/header'

import { navLinks } from '../../data'

const Layout = ({ children }) => (
  <Container>
    <GlobalStyles />
    <SEO />
    <Header links={navLinks} />
    <main role="main">{children}</main>
  </Container>
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
