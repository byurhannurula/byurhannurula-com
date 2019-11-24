import React from 'react'
import PropTypes from 'prop-types'

import SEO from 'components/seo'

const Layout = ({ children }) => (
  <>
    <SEO />
    <main role="main">{children}</main>
  </>
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
