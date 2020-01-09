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
  color: var(--primary);
  background-image: linear-gradient(var(--secondary), var(--secondary)),
    linear-gradient(var(--secondary-light), var(--secondary-light));
  background-position: bottom left, bottom left;
  background-repeat: no-repeat;
  background-size: 0% 15%, 100% 15%;

  font-weight: 400;
  transition: background-size 300ms cubic-bezier(0.5, 0.61, 0.355, 1),
    box-shadow 300ms cubic-bezier(0.5, 0.61, 0.355, 1);

  &:hover {
    color: var(--primary);
    background-size: 100% 15%, 100% 15%;
  }
`
