import React from 'react'
import { graphql } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'

import Layout from 'components/layout'
import SEO from 'components/seo'

import { PostWrapper, PostHeader, PostFooter, Button } from './styles'

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
      <PostWrapper>
        <PostHeader>
          <h2>{post.frontmatter.title}</h2>
          <p>
            {post.frontmatter.date} &middot; {post.timeToRead} min read
          </p>
        </PostHeader>

        <MDXRenderer>{post.body}</MDXRenderer>

        <PostFooter>
          {previous && (
            <Button to={previous.url}>
              <span>Previous</span>
              <h4>{previous.title}</h4>
            </Button>
          )}

          {next && (
            <Button to={next.url}>
              <span>Next</span>
              <h4>{next.title}</h4>
            </Button>
          )}
        </PostFooter>
      </PostWrapper>
    </Layout>
  )
}

export default PostTemplate

export const postQuery = graphql`
  query PostByPath($path: String!) {
    mdx(fields: { path: { eq: $path } }) {
      body
      timeToRead
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        thumbnail
        tags
      }
    }
  }
`
