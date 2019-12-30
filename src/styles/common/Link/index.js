import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'

export const ExternalLink = ({ url, children, ...props }) => (
  <LinkStyles
    as="a"
    href={url}
    target="_blank"
    rel="noopener noreferrer"
    {...props}
  >
    {children}
  </LinkStyles>
)

export const InternalLink = ({ url, children, ...props }) => (
  <LinkStyles as={Link} to={url} {...props}>
    {children}
  </LinkStyles>
)

const LinkStyles = styled.a`
  color: var(--dark);
  transition: color 200ms ease;

  &:hover {
    color: var(--primary);
  }
`
