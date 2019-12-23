import { createGlobalStyle } from 'styled-components'
import { reset } from './reset'
import { config } from './config'
import { typography } from './typography'

const GlobalStyles = createGlobalStyle`
  ${reset}
  ${config}
  ${typography}
`

export * from './common'
export { config, GlobalStyles }
