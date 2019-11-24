import { createGlobalStyle } from 'styled-components'
import { reset } from './reset'
import { theme } from './theme'

const GlobalStyles = createGlobalStyle`
  ${reset}

  body {
    font-family: 'Inter', sans-serif;
    font-size: 16px;
    font-weight: 400;
  }
`

export { theme, GlobalStyles }
