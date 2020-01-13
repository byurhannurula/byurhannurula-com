import React from 'react'
import styled from 'styled-components'

import Layout from 'components/layout'
import SEO from 'components/seo'
import { InternalLink } from 'styles/common'

const NotFoundPage = () => (
  <Layout>
    <SEO title="404 - Not found" />
    <Wrapper>
      <h1>404</h1>
      <h3>Page Not Found</h3>
      <InternalLink to="/">Go Home</InternalLink>
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
`
