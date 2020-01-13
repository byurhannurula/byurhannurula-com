import React from 'react'

import { MDXRenderer } from 'gatsby-plugin-mdx'

const Post = ({ data }) => {
  console.log(data)
  return (
    <div>
      <h1>{data.frontmatter.title}</h1>
      <MDXRenderer>{data.body}</MDXRenderer>
    </div>
  )
}

export { Post }
