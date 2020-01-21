import React from 'react'

import { socialLinks } from 'components/links'
import { Container, Icon, Title, ExternalLink } from 'components/common'
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
        <Title>Let&apos;s Build Something Together</Title>
        <p>
          Feel free to reach out if you&apos;re looking for a developer, have a
          question, or just want to connect.
        </p>
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
        <p>&copy; {new Date().getFullYear()} &mdash; Byurhan Beyzat</p>
        <p>
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
        </p>
      </Copyright>
    </Container>
  </FooterWrapper>
)

export default Footer
