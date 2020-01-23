import React from 'react'
import { graphql } from 'gatsby'

import Layout from 'components/layout'
import Articles from 'scenes/articles'

const BlogPage = ({ data }) => (
  <Layout>
    <Articles data={data} />
  </Layout>
)

export default BlogPage

export const pageQuery = graphql`
  query blogIndex {
    allMdx(sort: { fields: frontmatter___date, order: DESC }) {
      edges {
        node {
          id
          fields {
            path
          }
          frontmatter {
            date(formatString: "MMM DD, YYYY")
            title
            excerpt
            thumbnail
          }
        }
      }
    }
  }
`
