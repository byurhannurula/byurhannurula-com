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
    white: '#ffffff',
    black: '#000000',

    bg: '#fafafa',
    text: '#141414',
    textLight: '#444444',
    primary: '#061bff',
  },
  font,
}

const darkTheme = {
  bp,
  bodySizes,
  colors: {
    white: '#ffffff',
    black: '#000000',

    bg: '#fafafa',
    text: '#141414',
    textLight: '#444444',
    primary: '#061bff',
  },
  font,
}

const theme = {
  lightTheme,
  darkTheme,
}

export { bp, bodySizes }
export default theme
