import React, { useState, useEffect } from 'react'

import { Container } from 'styles'
import { Icon } from 'components/icon'
import {
  StyledHeader,
  StyledLogo,
  StyledNav,
  NavLink,
  NavThemeButton,
} from './styles'

const Header = ({ isMobile, currentTheme, toggleTheme }) => {
  const [lastScrollTop, setLastScrollTop] = useState(0)
  const [scrolled, setScrolled] = useState(false)

  const handleScroll = () => {
    const DELTA = 10
    const fromTop = window.pageYOffset

    // Make sure they scroll more than delta
    if (Math.abs(lastScrollTop - fromTop) <= DELTA) return

    if (fromTop < DELTA) {
      setScrolled(false)
    } else if (fromTop > lastScrollTop) {
      setScrolled(true)
    }

    setLastScrollTop(fromTop)
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  })

  return (
    <StyledHeader role="banner" isMobile={isMobile} scrolled={scrolled}>
      <Container>
        <StyledLogo>byurhan.</StyledLogo>
        <StyledNav role="navigation">
          <NavLink to="/" role="button">Home</NavLink>
          <NavLink to="/about" role="button">About</NavLink>
          <NavLink to="/blog" role="button">Articles</NavLink>
          <NavLink to="/contact" role="button">Contact</NavLink>
          <NavThemeButton role="button" type="button" onClick={toggleTheme}>
            <Icon name={currentTheme === 'light' ? 'moon' : 'sun'} />
          </NavThemeButton>
        </StyledNav>
      </Container>
    </StyledHeader>
  )
}

export default Header
