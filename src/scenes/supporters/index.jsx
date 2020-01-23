import React from 'react'
import { Text, List, SectionContainer, ExternalLink } from 'components/common'

const Supporters = () => (
  <SectionContainer small>
    <Text as="h1" heading>
      Thanks!{' '}
      <span role="img" aria-label="Thanks!">
        🙌
      </span>
    </Text>
    <Text subtitle style={{ marginBottom: '1em' }}>
      I am truly grateful to all the wonderful people supporting my work.{' '}
      <span role="img" aria-label="Thanks!">
        🙌 🙌
      </span>
    </Text>
    <Text as="h2" style={{ marginBottom: '0.4em' }}>
      Top Supporter
    </Text>
    <List>
      <li>None</li>
    </List>
    <Text as="h2" style={{ marginBottom: '0.4em' }}>
      Supporter
    </Text>
    <List>
      <li>None</li>
    </List>

    <hr style={{ marginBottom: '1.5em' }} />

    <Text as="h2" style={{ marginBottom: '0.4em' }}>
      How to support?
    </Text>
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
  </SectionContainer>
)

export default Supporters
