import React from 'react'

import { Link } from 'styles/common'
import { Heading, Title, Text } from './styles'

const Home = () => (
  <>
    <Heading>
      Hi there!{' '}
      <span role="img" aria-label="Hi">
        👋
      </span>
    </Heading>
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
      I mostly work with front-end/javascript technologies (HTML, CSS&#47;SCSS,
      JavaScript, React.js), but have also experience with Node.js, Express.js
      and others.
    </Text>
    <Text>
      Feel free to{' '}
      <Link
        target="blank"
        rel="noopener noreferrer"
        href="mailto:byurhanbeyzat@gmail.com"
      >
        contact me
      </Link>{' '}
      if you have any web development needs, to build something cool or just to
      say hi.
    </Text>
  </>
)

export { Home }
