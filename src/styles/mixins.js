import { css } from 'styled-components'

const mixins = {
  flexCenter: css`
    display: flex;
    align-items: center;
    justify-content: center;
  `,
  flexAround: css`
    display: flex;
    align-items: center;
    justify-content: space-around;
  `,
  flexBetween: css`
    display: flex;
    align-items: center;
    justify-content: space-between;
  `,

  flex: (align = 'center', justify = 'center') => css`
    display: flex;
    align-items: ${align};
    justify-content: ${justify};
  `,
  flexAlign: (align = 'center') => css`
    display: flex;
    align-items: ${align};
  `,
  flexJustify: (justify = 'center') => css`
    display: flex;
    justify-content: ${justify};
  `,
}

export { mixins }
