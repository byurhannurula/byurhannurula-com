import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'

import Layout from 'components/layout'
import SEO from 'components/seo'

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

const Wrapper = styled.div`
  text-align: center;

  h1,
  h3 {
    color: var(--grey700);
  }

  h3 {
    margin-bottom: var(--space-xl);
  }

  a {
    color: var(--dark);
    text-transform: lowercase;
    text-decoration: underline;

    &:hover {
      color: var(--primary);
    }
  }
`
