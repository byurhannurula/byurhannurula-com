import React from 'react'
import styled from 'styled-components'

import Layout from 'components/layout'
import { Title, Text, ExternalLink } from 'components/common'

const SupportersPage = () => (
  <Layout title="Thanks!">
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
  </Layout>
)

export default SupportersPage

const Line = styled.hr`
  margin-top: var(--space-sm);
  margin-bottom: var(--space-sm);
`

const ListHeading = styled.h3`
  color: var(--grey700);
  margin-top: var(--space-xxs);
  margin-bottom: var(--space-xs);
`

const List = styled.ul`
  list-style-type: square;
  margin-bottom: var(--space-xs);

  li {
    margin-left: var(--space-md);

    @media screen and (max-width: 560px) {
      margin-left: var(--space-sm);
    }

    &:not(:last-child) {
      margin-bottom: 6px;
    }
  }
`
