import React from 'react'
import PropTypes from 'prop-types'
import { GlobalStyles, Container } from 'styles'

import SEO from 'components/seo'
import Header from 'components/header'
import Footer from 'components/footer'

import { navLinks } from '../../data'

const Layout = ({ title, children }) => (
  <Container>
    <GlobalStyles />
    <SEO title={title} />
    <Header links={navLinks} />
    <main role="main" style={{ flexGrow: 1 }}>
      {children}
    </main>
    <Footer />
  </Container>
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
