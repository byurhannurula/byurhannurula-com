import React from 'react'
import styled from 'styled-components'

import Layout from 'components/layout'
import SEO from 'components/seo'
import { Text, InternalLink } from 'components/common'

const NotFoundPage = () => (
  <Layout>
    <SEO title="404 - Not found" />
    <Wrapper>
      <Text as="h1" display>
        404
      </Text>
      <Text as="h3" heading>
        Page Not Found
      </Text>
      <InternalLink url="/">Go Home</InternalLink>
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
