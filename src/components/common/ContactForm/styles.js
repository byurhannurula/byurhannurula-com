import styled from 'styled-components'

export const Row = styled.div`
  display: flex;
  place-items: center;
  justify-content: space-between;
  padding-bottom: var(--space-xs);

  & div:not(:only-child) :nth-child(1) {
    margin-right: var(--space-xs);
  }

  @media screen and (max-width: 560px) {
    flex-direction: column;
    margin-bottom: 0;

    & div:not(:only-child) :nth-child(1) {
      margin-right: 0;
    }
  }
`
export const Group = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;

  label {
    color: var(--gray);
    font-size: 0.8em;
  }

  @media screen and (max-width: 560px) {
    width: 100%;
    margin-bottom: var(--space-xs);
  }
`

export const Input = styled.input`
  border: none;
  border-radius: 0;
  outline: none;
  padding: 0.7em;
  padding-left: 0;
  font-size: 0.95em;
  color: var(--dark);
  line-height: 1.25;
  font-family: var(--font-sans);
  margin-bottom: var(--space-xxs);
  background-color: transparent;
  border-bottom: 1px solid var(--gray);

  &:focus {
    border-color: var(--primary);

    &::placeholder {
      color: transparent;
      transition: all 150ms ease;
    }
  }

  &::placeholder {
    color: var(--gray);
  }

  ${({ error }) =>
    error &&
    `
    border-color: var(--red);
  `}

  ${({ textarea }) =>
    textarea &&
    `
		resize: vertical;
		min-height: 4.5rem;
	`}
`

export const Button = styled.button`
  font-size: 0.8em;
  font-weight: 700;
  padding: 0.8em 4.5em;
  letter-spacing: 3px;
  color: var(--primary);
  text-transform: uppercase;
  border: 1px solid var(--secondary);

  &:hover {
    color: #fff;
    transition: all 200ms ease-in-out;
    background-color: var(--primary);
    border-color: var(--primary);

    svg path {
      stroke: #fff;
    }
  }

  svg {
    width: 3.1em;
    height: 1.7em;
    margin-left: 1.55em;
  }
`

export const Error = styled.div`
  font-size: 0.8em;
  color: var(--red);
`
