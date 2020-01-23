import React from 'react'

import { Text, SectionContainer, ExternalLink } from 'components/common'
import { GithubCard } from './components/GithubCard'
import {
  HeroWrapper,
  SkillsWrapper,
  SectionHeader,
  SectionContent,
  SkillsSet,
  Watermark,
} from './styles'

const Landing = ({ data }) => {
  const { edges: repos } = data?.viewer.repositories

  return (
    <>
      <Watermark>Welcome</Watermark>
      <SectionContainer small as={HeroWrapper}>
        <Text as="h1" display>
          Hi there,{' '}
          <span role="img" aria-label="">
            👋
          </span>{' '}
          &nbsp; I&apos;m Byurhan.
          <br />
          Front&ndash;End Developer &amp; Student
        </Text>
        <Text>
          I&apos;m a front-end developer &amp; M.Sc. Computer Engineering
          student living in Ruse, Bulgaria. Don&apos;t hesitate to{' '}
          <ExternalLink url="mailto:byurhanbeyzat@gmail.com">
            contact me
          </ExternalLink>
          , as I love building cool things or just to say hi.
        </Text>
      </SectionContainer>

      <SectionContainer as={SkillsWrapper}>
        <Text as="h2" heading>
          My Skills
        </Text>
        <Text subtitle>
          In addition to the courses included in my degree, I&apos;ve taken a
          couple of online courses such as Beginner JavaScript, Javascript 30,
          Advanced CSS & Sass, etc..
        </Text>

        <SkillsSet>
          <span>
            <p>HTML5/CSS3</p>
            <p>JavaScript ES6</p>
          </span>
          <span>
            <p>Node.js</p>
            <p>React.js</p>
          </span>
          <span>
            <p>Next.js</p>
            <p>Gatsby.js</p>
          </span>
          <span>
            <p>CSS in JS</p>
            <p>Git/GitHub</p>
          </span>
        </SkillsSet>
      </SectionContainer>

      <SectionContainer as="section">
        <SectionHeader>
          <Text as="h2" heading>
            Open Source
          </Text>
          <ExternalLink url="https://github.com/byurhanbeyzat?tab=repositories">
            View all
          </ExternalLink>
        </SectionHeader>
        <SectionContent>
          {repos &&
            repos.map(({ node }) => <GithubCard data={node} key={node.id} />)}
        </SectionContent>
      </SectionContainer>
    </>
  )
}
export default Landing
