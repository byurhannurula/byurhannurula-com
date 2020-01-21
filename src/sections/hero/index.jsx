import React from 'react'

import { Title, Text, SectionContainer, ExternalLink } from 'components/common'
import { Wrapper, Watermark } from './styles'

const HeroSection = () => (
  <>
    <Watermark>Welcome</Watermark>
    <SectionContainer small as={Wrapper}>
      <Title>
        Hi there,{' '}
        <span role="img" aria-label="">
          👋
        </span>{' '}
        &nbsp; I&apos;m Byurhan.
        <br />
        Front&ndash;End Developer &amp; Student
      </Title>
      <Text>
        I&apos;m a front-end developer &amp; M.Sc. Computer Engineering student
        living in Ruse, Bulgaria. Don&apos;t hesitate to{' '}
        <ExternalLink url="mailto:byurhanbeyzat@gmail.com">
          contact me
        </ExternalLink>
        , as I love building cool things or just to say hi.
      </Text>
    </SectionContainer>
  </>
)

export { HeroSection }
