import { css } from 'styled-components'

export const mixins = {
  flexAlignCenter: css`
    display: flex;
    align-items: center;
  `,

  flexCenter: css`
    display: flex;
    align-items: center;
    justify-content: center;
  `,

  flexBetween: css`
    display: flex;
    align-items: center;
    justify-content: space-between;
  `,

  defaultLink: css`
    color: var(--gray-light);
    font-weight: 400;
    background: none;
    &:hover {
      color: var(--light);
    }
  `,

  boxShadow: css`
    box-shadow: 0 10px 30px -15px rgba(20, 20, 20, 0.05);
  `,
}
