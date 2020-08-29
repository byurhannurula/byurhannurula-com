const bp = {
  maxSmall: `max-width: 576px`,
  maxMedium: `max-width: 768px`,
  maxLarge: `max-width: 1070px`,
  maxDesktop: `max-width: 1280px`,
}

const bodySizes = {
  small: 768,
  base: 1000,
  large: 1280,
}

const font = {
  base: '"Inter", -apple-system, Roboto, Open Sans, Helvetica Neue, sans-serif',
  mono: '"SF Mono", Menlo, monospace',
}

const lightTheme = {
  bp,
  bodySizes,
  colors: {
    white: 'rgb(255,255,255)',
    black: 'rgb(0,0,0)',

    bg: 'rgb(255,255,255)',
    text: 'rgb(20,20,20)',
    textLight: 'rgb(45,55,72)',

    gray: 'rgb(218,222,223)',
    grayLight: 'rgb(242,243,244)',
    grayDark: 'rgb(193,199,201)',

    primary: 'rgb(6,27,255)',
  },
  font,
}

const darkTheme = {
  bp,
  bodySizes,
  colors: {
    white: 'rgb(255,255,255)',
    black: 'rgb(0,0,0)',

    bg: 'rgb(23,25,35)',
    text: 'rgb(255,255,255)',
    textLight: 'rgb(160,174,192)',

    gray: 'rgb(218,222,223)',
    grayLight: 'rgb(242,243,244)',
    grayDark: 'rgb(193,199,201)',

    primary: 'rgb(6,27,255)',
  },
  font,
}

const theme = {
  lightTheme,
  darkTheme,
}

export { bp, bodySizes }
export default theme
