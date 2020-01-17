import React, { useState } from 'react'
import { Link } from 'gatsby'

import { Container } from 'components/common'
import { HeaderWrapper, Logo, NavButton } from './styles'

import { Navigation } from './navigation'

const Header = () => {
  const [active, setActive] = useState(false)

  return (
    <HeaderWrapper role="banner">
      <Container>
        <Logo>
          <Link to="/">byurhan.</Link>
        </Logo>

        <NavButton
          type="button"
          isActive={active}
          onClick={() => setActive(!active)}
        />

        <Navigation isActive={active} />
      </Container>
    </HeaderWrapper>
  )
}

export default Header
