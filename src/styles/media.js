import { css } from 'styled-components'

// Breakpoints

const breakpoints = {
  xs: '340px',
  sm: '576px',
  md: '768px',
  lg: '992px',
  xl: '1200px',
  xxl: '1400px',
}

/**
 * All breakpoints can be found inside of theme.breakpoints.
 * @example
 *
 *    ${media.min('lg')` background: red; `};
 *    ${media.max('md')` background: black; `};
 */

const getSize = (breakpointValue, breakpointsObject) => {
  if (breakpointsObject[breakpointValue]) {
    return breakpointsObject[breakpointValue]
  }

  return '0'
}

const mediaGenerator = (bps = breakpoints) => {
  const max = breakpoint => (...args) => css`
    @media (max-width: ${getSize(breakpoint, bps)}) {
      ${css(...args)}
    }
  `

  const min = breakpoint => (...args) => css`
    @media (min-width: ${getSize(breakpoint, bps)}) {
      ${css(...args)}
    }
  `

  return {
    min,
    max,
  }
}

export const media = mediaGenerator()
export default mediaGenerator()
