import React from 'react'

import { LinkWrapper, PostTitle, PostInfo } from './styles'

const PostLink = ({ data }) => {
  const post = data.node

  return (
    <LinkWrapper to={post.fields.path}>
      <PostTitle>{post.frontmatter.title}</PostTitle>
      <PostInfo>{post.frontmatter.date}</PostInfo>
    </LinkWrapper>
  )
}

export { PostLink }
