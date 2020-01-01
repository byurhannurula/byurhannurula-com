import React from 'react'
import { Icon } from 'components/common'

import { ExternalLink } from 'styles/common'
import { FooterWrapper, Copyright } from './styles'

const Footer = () => (
  <FooterWrapper as="footer">
    <Copyright>
      <span>&copy;</span> {new Date().getFullYear()} &mdash; Byurhan Beyzat
      <br />
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
    </Copyright>
  </FooterWrapper>
)

export default Footer
