import React from 'react'

import { SectionContainer, Title } from 'components/common'
import { Wrapper, SkillsSet } from './styles'

const SkillsSection = () => (
  <SectionContainer as={Wrapper}>
    <Title>My Skills</Title>
    <p>
      In addition to the courses included in my degree, I&apos;ve taken a couple
      of online courses such as Beginner JavaScript, Javascript 30, Advanced CSS
      & Sass, etc..
    </p>

    <SkillsSet>
      <div>
        <p>HTML5/CSS3</p>
        <p>JavaScript ES6</p>
      </div>
      <div>
        <p>Node.js</p>
        <p>React.js</p>
      </div>
      <div>
        <p>Next.js</p>
        <p>Gatsby.js</p>
      </div>
      <div>
        <p>CSS in JS</p>
        <p>Git/GitHub</p>
      </div>
    </SkillsSet>
  </SectionContainer>
)

export { SkillsSection }
