import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 768px;
  min-height: 100vh;
  margin-left: auto;
  margin-right: auto;
  padding: var(--space-xxxl) var(--space-xs);

  @media screen and (max-width: 700px) {
    padding-top: var(--space-md);
    padding-bottom: var(--space-md);
  }
`
