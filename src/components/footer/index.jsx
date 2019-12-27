import React from 'react'
import { GatsbyIcon, GithubIcon, NetlifyIcon } from 'components/icons'

import { FooterWrapper, Copyright } from './styles'

const Footer = () => (
  <FooterWrapper as="footer">
    <Copyright>
      <span>&copy;</span> {new Date().getFullYear()} &mdash; Byurhan Beyzat
      <br />
      Built using{' '}
      <a href="https://gatsbyjs.org" target="_blank" rel="noopener noreferrer">
        <GatsbyIcon />
      </a>
      , hosted on{' '}
      <a
        href="https://github.com/byurhanbeyzat/byurhanbeyzat-com"
        rel="noopener noreferrer"
        target="_blank"
      >
        <GithubIcon />
      </a>{' '}
      and deployed on{' '}
      <a
        href="https://netlify.com/?ref=byurhanbeyzat.com"
        rel="noopener noreferrer"
        target="_blank"
      >
        <NetlifyIcon />
      </a>
    </Copyright>
  </FooterWrapper>
)

export default Footer
