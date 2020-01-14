import React from 'react'
import { graphql } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'

import { InternalLink } from 'components/common'
import Layout from 'components/layout'
import SEO from 'components/seo'

import 'styles/prismjs.css'

const PostTemplate = ({ data, pageContext }) => {
  const post = data.mdx

  const next = pageContext.next
    ? {
        url: `${pageContext.next.fields.path}`,
        title: pageContext.next.frontmatter.title,
      }
    : null
  const previous = pageContext.previous
    ? {
        url: `${pageContext.previous.fields.path}`,
        title: pageContext.previous.frontmatter.title,
      }
    : null

  return (
    <Layout>
      <SEO
        title={post.frontmatter.title}
        keywords={post.frontmatter.categories || ''}
        description={post.frontmatter.description || ''}
      />
      <div>
        <h1>{post.frontmatter.title}</h1>
        <MDXRenderer>{post.body}</MDXRenderer>

        <span>
          {previous && (
            <InternalLink url={previous.url}>
              <span>Previous</span>
              <h3>{previous.title}</h3>
            </InternalLink>
          )}
          {next && (
            <InternalLink url={next.url}>
              <span>Next</span>
              <h3>{next.title}</h3>
            </InternalLink>
          )}
        </span>
      </div>
    </Layout>
  )
}

export default PostTemplate

export const postQuery = graphql`
  query PostByPath($path: String!) {
    mdx(fields: { path: { eq: $path } }) {
      body
      frontmatter {
        # date(formatString: "MMM DD, YYYY")
        title
      }
    }
  }
`
