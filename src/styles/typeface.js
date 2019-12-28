import { css } from 'styled-components'

export const typeface = css`
  @font-face {
    font-family: 'Space Mono';
    font-style: italic;
    font-weight: 400;
    font-display: swap;
    src: local('Space Mono Italic'), local('SpaceMono-Italic'),
      url('/typeface/spacemono-italic-webfont.woff2') format('woff2'),
      url('/typeface/spacemono-italic-webfont.woff') format('woff'),
      url('/typeface/spacemono-italic-webfont.ttf') format('truetype'),
      url('/typeface/spacemono-italic-webfont.svg#space_monobold_italic')
        format('svg');
  }
  @font-face {
    font-family: 'Space Mono';
    font-style: italic;
    font-weight: 700;
    font-display: swap;
    src: local('Space Mono Bold Italic'), local('SpaceMono-BoldItalic'),
      url('/typeface/spacemono-bolditalic-webfont.woff2') format('woff2'),
      url('/typeface/spacemono-bolditalic-webfont.woff') format('woff'),
      url('/typeface/spacemono-bolditalic-webfont.ttf') format('truetype'),
      url('/typeface/spacemono-bolditalic-webfont.svg#space_monobold_italic')
        format('svg');
  }
  @font-face {
    font-family: 'Space Mono';
    font-style: normal;
    font-weight: 400;
    font-display: swap;
    src: local('Space Mono'), local('SpaceMono-Regular'),
      url('/typeface/spacemono-regular-webfont.woff2') format('woff2'),
      url('/typeface/spacemono-regular-webfont.woff') format('woff'),
      url('/typeface/spacemono-regular-webfont.ttf') format('truetype'),
      url('/typeface/spacemono-regular-webfont.svg#space_monoregular')
        format('svg');
  }
  @font-face {
    font-family: 'Space Mono';
    font-style: normal;
    font-weight: 700;
    font-display: swap;
    src: local('Space Mono Bold'), local('SpaceMono-Bold'),
      url('/typeface/spacemono-bold-webfont.woff2') format('woff2'),
      url('/typeface/spacemono-bold-webfont.woff') format('woff'),
      url('/typeface/spacemono-bold-webfont.ttf') format('truetype'),
      url('/typeface/spacemono-bold-webfont.svg#space_monobold') format('svg');
  }
`
