import React from 'react'
import { GatsbyIcon, GithubIcon, ZeitIcon } from 'components/icons'

import { FooterWrapper, Copyright } from './styles'

const Footer = () => (
  <FooterWrapper as="footer">
    <Copyright>
      &copy; {new Date().getFullYear()} &mdash; Byurhan Beyzat
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
        href="https://zeit.co/?ref=byurhanbeyzat.com"
        rel="noopener noreferrer"
        target="_blank"
      >
        <ZeitIcon />
      </a>
      .
    </Copyright>
  </FooterWrapper>
)

export default Footer
