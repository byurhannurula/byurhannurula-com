import styled from 'styled-components'

export const Internship = styled.div`
  text-align: center;
  border-radius: 4px;
  color: var(--dark);
  padding: var(--space-sm);
  margin-top: var(--space-xl);

  transform: translateY(0);
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.03), 0px 10px 20px rgba(0, 0, 0, 0.03);
  transition: all 800ms cubic-bezier(0.2, 0.8, 0.2, 1) 0s;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.03),
      0px 15px 30px rgba(0, 0, 0, 0.07);
  }

  p {
    font-size: 0.9em;
    margin-bottom: 0;
  }
`
