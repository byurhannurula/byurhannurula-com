import React from 'react'

import Layout from 'components/layout'

import { Title, Text, ExternalLink } from 'styles/common'
import { Heading } from './styles'

const Home = () => (
  <Layout>
    <Heading>
      Hi there!{' '}
      <span role="img" aria-label="Hi">
        👋
      </span>
    </Heading>
    <Title style={{ letterSpacing: '-2px' }}>
      I&apos;m Byurhan, a front-end developer from Bulgaria.
    </Title>
    <Text>
      I&apos;m a front-end developer &amp; M.Sc. Computer Engineering student
      living in Ruse, Bulgaria{' '}
      <span role="img" aria-label="Bulgaria">
        🇧🇬
      </span>
      .
    </Text>
    <Text>
      I mostly work with front-end/javascript technologies (HTML, CSS&#47;SCSS,
      JavaScript, React.js), but have also experience with Node.js, Express.js
      and others.
    </Text>
    <Text>
      Feel free to{' '}
      <ExternalLink url="mailto:byurhanbeyzat@gmail.com">
        contact me
      </ExternalLink>{' '}
      if you have any web development needs, to build something cool or just to
      say hi.
    </Text>
  </Layout>
)

export { Home }
