import styled, { createGlobalStyle } from 'styled-components'
import { reset } from './reset'
import { config } from './config'

const GlobalStyles = createGlobalStyle`
  ${reset}
  ${config}
`

export const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  max-width: 768px;
  margin-left: auto;
  margin-right: auto;
  padding-left: 1rem;
  padding-right: 1rem;
`

export { config, GlobalStyles }
