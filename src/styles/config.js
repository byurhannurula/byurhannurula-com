import { css } from 'styled-components'

export const config = css`
  :root {
    /* General */
    --transition: 200ms;

    /* Colors */
    --black: hsl(0, 0%, 0%);
    --white: hsl(0, 0%, 100%);
    --light: hsl(0, 0%, 95%);
    --dark: hsl(0, 0%, 8%);

    --gray-light: hsl(0, 0%, 55%);
    --gray: hsl(0, 0%, 45%);
    --gray-dark: hsl(0, 0%, 35%);
    --gray-darker: hsl(0, 0%, 25%);
    --gray-darkest: hsl(0, 0%, 15%);

    --primary: hsl(230, 80%, 50%);
    --secondary: hsl(216, 100%, 50%);
    --secondary-light: hsl(216, 100%, 70%);

    --red: hsl(6, 78%, 57%);

    /* Spaces */

    --space: 10px;
    --space-xxs: calc(var(--space));
    --space-xs: calc(var(--space) * 2);
    --space-sm: calc(var(--space) * 3);
    --space-md: calc(var(--space) * 4);
    --space-lg: calc(var(--space) * 5);
    --space-xl: calc(var(--space) * 6);
    --space-xxl: calc(var(--space) * 7);
    --space-xxxl: calc(var(--space) * 8);
    --space-xxxxl: calc(var(--space) * 9);
    --space-xxxxxl: calc(var(--space) * 10);
  }
`
