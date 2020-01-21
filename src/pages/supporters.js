import React from 'react'
import styled from 'styled-components'

import Layout from 'components/layout'
import {
  Title,
  Text,
  ListHeading,
  List,
  Container,
  ExternalLink,
} from 'components/common'

const SupportersPage = () => (
  <Layout title="Thanks!">
    <Container small>
      <Title>
        Thanks!{' '}
        <span role="img" aria-label="Thanks!">
          🙌
        </span>
      </Title>
      <Text>
        I am truly grateful to all the wonderful people supporting my work.{' '}
        <span role="img" aria-label="Thanks!">
          🙌 🙌
        </span>
      </Text>
      <ListHeading>Sponsor</ListHeading>
      <List>
        <li>None</li>
      </List>
      <ListHeading>Top Supporter</ListHeading>
      <List>
        <li>None</li>
      </List>
      <ListHeading>Supporter</ListHeading>
      <List>
        <li>None</li>
      </List>

      <Line />

      <ListHeading>How to support?</ListHeading>
      <List>
        <li>
          <ExternalLink url="https://www.paypal.me/byurhanbeyzat">
            My PayPal
          </ExternalLink>
        </li>
        <li>
          <ExternalLink url="https://www.ko-fi.com/byurhanbeyzat">
            ko-fi.com
          </ExternalLink>
        </li>
        <li>
          <ExternalLink url="https://www.patreon.com/byurhanbeyzat">
            Patreon
          </ExternalLink>
        </li>
      </List>
    </Container>
  </Layout>
)

export default SupportersPage

const Line = styled.hr`
  margin-top: var(--space-sm);
  margin-bottom: var(--space-sm);
`
