import React, { useState, useEffect } from 'react'
import { Link } from 'gatsby'

import { Container } from 'components/common'
import { HeaderWrapper, Logo, NavButton } from './styles'

import { Navigation } from './navigation'

const Header = () => {
  const [active, setActive] = useState(false)
  const [lastScrollTop, setLastScrollTop] = useState(0)
  const [scrollDirection, setScrollDirection] = useState('none')

  // TODO: Move to separate hook file
  // https://github.com/bchiang7/v4/blob/master/src/components/nav.js

  const handleScroll = () => {
    const DELTA = 5
    const NAV_HEIGHT = 90
    const fromTop = window.pageYOffset

    // Make sure they scroll more than delta
    if (Math.abs(lastScrollTop - fromTop) <= DELTA) return

    if (fromTop < DELTA) {
      setScrollDirection('none')
    } else if (fromTop > lastScrollTop && fromTop > NAV_HEIGHT) {
      // If they scrolled down and are past the navbar, set state to up
      if (scrollDirection !== 'down') {
        setScrollDirection('down')
      }
    } else if (fromTop + window.innerHeight < document.body.scrollHeight) {
      // Scroll Up
      if (scrollDirection !== 'up') {
        setScrollDirection('up')
      }
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
    <HeaderWrapper
      role="banner"
      isNavActive={active}
      scrollDirection={scrollDirection}
    >
      <Container>
        <Logo>
          <Link to="/">byurhan.</Link>
        </Logo>

        <NavButton
          type="button"
          role="button"
          isActive={active}
          aria-label="Nav button"
          onClick={() => setActive(!active)}
        />

        <Navigation isActive={active} />
      </Container>
    </HeaderWrapper>
  )
}

export default Header
