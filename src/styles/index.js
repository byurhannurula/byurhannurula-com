import { createGlobalStyle } from 'styled-components'
import { reset } from './reset'
import { config } from './config'
import { typeface } from './typeface'
import { typography } from './typography'

import { mixins } from './mixins'
import { media } from './media'

const GlobalStyles = createGlobalStyle`
  ${reset}
  ${config}
  ${typeface}
  ${typography}
`

export { GlobalStyles, media, mixins }
