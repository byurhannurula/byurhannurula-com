import React from 'react'

import { socialLinks } from 'components/links'
import { Container, Icon, Text, ExternalLink } from 'components/common'
import {
  FooterWrapper,
  Contact,
  Copyright,
  IconsWrapper,
  IconsList,
  IconsItem,
} from './styles'

const Footer = () => (
  <FooterWrapper as="footer">
    <Container>
      <Contact>
        <Text as="h1" heading>
          Let&apos;s Build Something Together
        </Text>
        <Text subtitle>
          Feel free to reach out if you&apos;re looking for a developer, have a
          question, or just want to connect.
        </Text>
        <ExternalLink url="mailto:byurhanbeyzat@gmail.com">
          byurhanbeyzat@gmail.com
        </ExternalLink>
        <IconsWrapper>
          <IconsList>
            {socialLinks &&
              socialLinks.map(({ id, link, name }) => (
                <IconsItem key={id}>
                  <ExternalLink
                    url={link}
                    title={`Byurhan Beyzat on ${name}`}
                    aria-label={`Byurhan Beyzat on ${name}`}
                  >
                    <Icon icon={name} width="20px" height="20px" />
                  </ExternalLink>
                </IconsItem>
              ))}
          </IconsList>
        </IconsWrapper>
      </Contact>
      <Copyright>
        <Text smallText>
          &copy; {new Date().getFullYear()} &mdash; Byurhan Beyzat
        </Text>
        <Text smallText>
          Built using{' '}
          <ExternalLink
            url="https://gatsbyjs.org"
            aria-label="Gatsby.js - Official Website"
          >
            <Icon icon="Gatsby" />
          </ExternalLink>
          , hosted on{' '}
          <ExternalLink
            url="https://github.com/"
            aria-label="Github - Official Website"
          >
            <Icon icon="Github" />
          </ExternalLink>{' '}
          and deployed on{' '}
          <ExternalLink
            url="https://netlify.com/?ref=byurhanbeyzat.com"
            aria-label="Netlify - Official Website"
          >
            <Icon icon="Netlify" />
          </ExternalLink>
        </Text>
      </Copyright>
    </Container>
  </FooterWrapper>
)

export default Footer
