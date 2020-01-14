import { createGlobalStyle } from 'styled-components'
import { reset } from './reset'
import { config } from './config'
import { typeface } from './typeface'
import { typography } from './typography'

const GlobalStyles = createGlobalStyle`
  ${reset}
  ${config}
  ${typeface}
  ${typography}
`

export { config, GlobalStyles }
