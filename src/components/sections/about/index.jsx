import React from 'react'

import Layout from 'components/layout'
import { Title, Text, InternalLink } from 'styles/common'
import { Internship } from './styles'

const About = () => (
  <Layout title="About">
    <Title>Who am I?</Title>
    <Text>
      Hello,{' '}
      <span role="img" aria-label="Hello">
        👋
      </span>{' '}
      I&apos;m Byurhan Nurula, a {new Date().getFullYear() - 1996} years old
      front-end developer{' '}
      <span role="img" aria-label="Computer">
        💻
      </span>{' '}
      &amp; M.Sc. Computer Engineering{' '}
      <span role="img" aria-label="Student">
        👨‍🎓
      </span>{' '}
      student living in Ruse, Bulgaria{' '}
      <span role="img" aria-label="Computer">
        🇧🇬
      </span>
      .
    </Text>
    <Text>
      During my education I&apos;ve had chance to learn/work with many
      technologies like C/C++, Java, PHP, C#, etc..
    </Text>
    <Text>
      But lately I&apos;m interested in javascript ecosystem and I am focused on
      &quot;modern&quot;{' '}
      <span role="img" aria-label="Rocket">
        🚀
      </span>{' '}
      web technologies. Currently I&apos;m learning technologies like{' '}
      <strong>React.js</strong>, <strong>Gatsby.js</strong>,{' '}
      <strong>Next.js</strong>, <strong>CSS in JS</strong> and others...
    </Text>
    <InternalLink url="/contact">
      <Internship>
        <Text>
          → I&apos;m looking for internship as a front-end/web developer in
          Ruse, Bulgaria. ←
        </Text>
      </Internship>
    </InternalLink>
  </Layout>
)

export { About }
