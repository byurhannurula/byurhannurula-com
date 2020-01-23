import React from 'react'

import { Text, ExternalLink, SectionContainer } from 'components/common'
import { about } from '@content/data'
import { ContactForm } from './components/ContactForm'

import { SectionContent } from './styles'

const Contact = () => (
  <SectionContainer small>
    <Text as="h1" heading>
      Contact
    </Text>
    <Text subtitle>
      My preferred way of contact is via{' '}
      <ExternalLink url="https://twitter.com/byurhanbeyzat">
        Twitter
      </ExternalLink>{' '}
      or <ExternalLink url={`mailto:${about.email}`}>Email</ExternalLink>. Feel
      free to contact me via{' '}
      <ExternalLink url={`mailto:${about.email}`}>{about.email}</ExternalLink>{' '}
      or fill the form below.
    </Text>
    <SectionContent>
      <ContactForm />
    </SectionContent>
  </SectionContainer>
)

export default Contact
