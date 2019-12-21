import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'

import Layout from 'components/layout'
import SEO from 'components/seo'

const Wrapper = styled.div`
  text-align: center;

  h1 {
    color: var(--grey700);
    font-size: var(--text-xxxl);
  }

  h3 {
    color: var(--grey700);
    font-size: var(--text-xl);
    margin-bottom: var(--space-xl);
  }

  a {
    font-size: 18px;
    color: var(--dark);
    text-transform: lowercase;
    text-decoration: underline;

    &:hover {
      color: var(--primary);
    }
  }
`

const NotFoundPage = () => (
  <Layout>
    <SEO title="404 - Not found" />
    <Wrapper>
      <h1>404</h1>
      <h3>Page Not Found</h3>
      <Link to="/">Go Home</Link>
    </Wrapper>
  </Layout>
)

export default NotFoundPage
