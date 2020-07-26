import React from 'react'
import PropTypes from 'prop-types'
import { ThemeProvider } from 'styled-components'

import { GlobalStyles, theme, Container } from 'styles'

import { useColorMode } from 'hooks'

import SEO from './seo'

const Layout = ({ title, children }) => {
  const [currentTheme] = useColorMode()

  return (
    <ThemeProvider
      theme={currentTheme === 'light' ? theme.lightTheme : theme.darkTheme}
    >
      <GlobalStyles />
      <SEO title={title} />
      <Container style={{ marginTop: '6rem' }} as="main" role="main">
        {children}
      </Container>
    </ThemeProvider>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
