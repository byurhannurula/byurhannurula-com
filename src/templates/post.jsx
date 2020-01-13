import React from 'react'
import { graphql } from 'gatsby'

import Layout from 'components/layout'
import SEO from 'components/seo'

import { Post } from 'components/common'

import 'styles/prismjs.css'

const PostTemplate = ({ data: { mdx } }) => {
  const { frontmatter, excerpt } = mdx

  return (
    <Layout>
      <SEO
        title={frontmatter.title}
        keywords={frontmatter.categories || ''}
        description={frontmatter.description || excerpt}
      />
      <Post data={mdx} />
    </Layout>
  )
}

export default PostTemplate

export const postQuery = graphql`
  query PostByPath($path: String!) {
    mdx(fields: { path: { eq: $path } }) {
      id
      body
      rawBody
      frontmatter {
        date
        title
      }
    }
  }
`
