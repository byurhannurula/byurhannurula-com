import { createGlobalStyle } from 'styled-components'
import { reset } from './reset'
import { config } from './config'

const GlobalStyles = createGlobalStyle`
  ${reset}
  ${config}
`

export { config, GlobalStyles }
