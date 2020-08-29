import React from 'react'
import PropTypes from 'prop-types'
import { ThemeProvider } from 'styled-components'

import { GlobalStyles, theme, Container } from 'styles'

import { useResize, useColorMode } from 'hooks'

import SEO from './seo'
import Header from './header'

const Layout = ({ title, children }) => {
  const { isMobile } = useResize()
  const [currentTheme, toggleTheme] = useColorMode()

  return (
    <ThemeProvider
      theme={currentTheme === 'light' ? theme.lightTheme : theme.darkTheme}
    >
      <GlobalStyles />
      <SEO title={title} />
      <Header
        isMobile={isMobile}
        toggleTheme={toggleTheme}
        currentTheme={currentTheme}
      />
      <Container style={{ marginTop: '7rem' }} as="main" id="main" role="main">
        {children}
      </Container>
    </ThemeProvider>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
