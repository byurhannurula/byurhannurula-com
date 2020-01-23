import React from 'react'
import styled from 'styled-components'

import Layout from 'components/layout'
import { Text, InternalLink } from 'components/common'

const ThanksPage = () => (
  <Layout title="Thanks!">
    <Wrapper>
      <Text as="h1" heading>
        Your email has been sent successfully.
      </Text>
      <Text>I will get back to you as soon as possible!</Text>
      <InternalLink url="/">Go Home</InternalLink>
    </Wrapper>
  </Layout>
)

export default ThanksPage

const Wrapper = styled.div`
  text-align: center;
  padding-bottom: var(--space-sm);

  & > p {
    margin-top: var(--space-xxs);
    margin-bottom: var(--space-sm);
  }
`
