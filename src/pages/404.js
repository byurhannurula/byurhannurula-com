import React from 'react'
import styled from 'styled-components'

import Layout from 'components/layout'
import SEO from 'components/seo'
import { Title, SmallHeading, InternalLink } from 'components/common'

const NotFoundPage = () => (
  <Layout>
    <SEO title="404 - Not found" />
    <Wrapper>
      <Title>404</Title>
      <SmallHeading>Page Not Found</SmallHeading>
      <InternalLink to="/">Go Home</InternalLink>
    </Wrapper>
  </Layout>
)

export default NotFoundPage

const Wrapper = styled.div`
  text-align: center;

  h3 {
    margin-bottom: var(--space-xl);
  }
`
