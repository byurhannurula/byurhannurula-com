import React from 'react'
import PropTypes from 'prop-types'
import { GlobalStyles } from 'styles'

import { Container } from 'components/common'

import SEO from 'components/seo'
import Header from 'components/header'
import Footer from 'components/footer'

const Layout = ({ title, children }) => (
  <Container>
    <GlobalStyles />
    <SEO title={title} />
    <Header />
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
