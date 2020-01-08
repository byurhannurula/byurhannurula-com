import React from 'react'

import Layout from 'components/layout'
import { Icon } from 'components/common'
import { Title, Text, ExternalLink } from 'styles/common'
import { socialMedia } from '../../../../data/links'

import ContactForm from './form'
import { IconsWrapper, IconsList, IconsItem } from './styles'

const Contact = () => (
  <Layout title="Contact">
    <Title>Contact</Title>
    <Text>
      My preferred way of contact is via{' '}
      <ExternalLink url="https://twitter.com/byurhanbeyzat">
        Twitter
      </ExternalLink>{' '}
      or <ExternalLink url="mailto:imbyurhan@gmail.com">Email</ExternalLink>.
      Feel free to contact me via{' '}
      <ExternalLink url="mailto:imbyurhan@gmail.com">
        imbyurhan@gmail.com
      </ExternalLink>{' '}
      or fill the form below.
    </Text>
    <IconsWrapper>
      <IconsList>
        {socialMedia &&
          socialMedia.map(({ id, link, name }) => (
            <IconsItem key={id}>
              <ExternalLink
                url={link}
                title={`Byurhan Beyzat on ${name}`}
                aria-label={`Byurhan Beyzat on ${name}`}
              >
                <Icon icon={name} width="32px" height="32px" />
              </ExternalLink>
            </IconsItem>
          ))}
      </IconsList>
    </IconsWrapper>
    <ContactForm />
  </Layout>
)

export { Contact }
