import React from 'react'

import Layout from 'components/layout'
import {
  SmallHeading,
  Title,
  Text,
  Container,
  ExternalLink,
} from 'components/common'

const IndexPage = () => (
  <Layout>
    <Container small>
      <SmallHeading>
        Hi there!{' '}
        <span role="img" aria-label="Hi">
          👋
        </span>
      </SmallHeading>
      <Title>I&apos;m Byurhan, a front-end developer from Bulgaria.</Title>
      <Text>
        I&apos;m a front-end developer &amp; M.Sc. Computer Engineering student
        living in Ruse, Bulgaria{' '}
        <span role="img" aria-label="Bulgaria">
          🇧🇬
        </span>
        .
      </Text>
      <Text>
        I mostly work with front-end/javascript technologies (HTML,
        CSS&#47;SCSS, JavaScript, React.js), but have also experience with
        Node.js, Express.js and others.
      </Text>
      <Text>
        Feel free to{' '}
        <ExternalLink url="mailto:byurhanbeyzat@gmail.com">
          contact me
        </ExternalLink>{' '}
        if you have any web development needs, to build something cool or just
        to say hi.
      </Text>
    </Container>
  </Layout>
)

export default IndexPage
