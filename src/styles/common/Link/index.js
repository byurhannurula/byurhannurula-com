import React from 'react'
import { Link } from 'gatsby'

export const ExternalLink = ({ url, children }) => (
  <a
    style={{ color: 'var(--primary)' }}
    href={url}
    target="_blank"
    rel="noopener noreferrer"
  >
    {children}
  </a>
)

export const InternalLink = ({ url, children }) => (
  <Link style={{ color: 'var(--primary)' }} to={url}>
    {children}
  </Link>
)
