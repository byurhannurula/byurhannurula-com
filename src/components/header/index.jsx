import React, { useState } from 'react'
import { Link } from 'gatsby'

import { Navigation } from './navigation'
import { HeaderWrapper, HeaderInner, Logo, NavButton } from './styles'

const Header = () => {
  const [active, setActive] = useState(false)

  return (
    <HeaderWrapper>
      <HeaderInner>
        <Logo>
          <Link to="/">byurhan.</Link>
        </Logo>

        <NavButton
          type="button"
          active={active}
          onClick={() => setActive(!active)}
        >
          &shy;
        </NavButton>

        <Navigation active={active} />
      </HeaderInner>
    </HeaderWrapper>
  )
}

export default Header
