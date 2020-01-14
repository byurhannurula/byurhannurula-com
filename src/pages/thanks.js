import React from 'react'
import styled from 'styled-components'

import Layout from 'components/layout'
import { Title, Text, InternalLink } from 'components/common'

const ThanksPage = () => (
  <Layout title="Thanks!">
    <Wrapper>
      <Title>Your email has been sent successfully.</Title>
      <Text>I will get back to you as soon as possible!</Text>
      <InternalLink to="/">Go Home</InternalLink>
    </Wrapper>
  </Layout>
)

export default ThanksPage

const Wrapper = styled.div`
  text-align: center;
`
