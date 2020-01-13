import React from 'react'
import { Link, graphql } from 'gatsby'

import Layout from 'components/layout'

const IndexPage = ({ data }) => {
  const { edges: posts } = data.allMdx
  console.log(posts)
  return (
    <Layout>
      <ul>
        {posts.map(({ node: post }) => (
          <li key={post.id}>
            <Link to={post.fields.path}>
              <h2>{post.frontmatter.title}</h2>
            </Link>
            <p>{post.excerpt}</p>
          </li>
        ))}
      </ul>
    </Layout>
  )
}

export default IndexPage

export const pageQuery = graphql`
  query blogIndex {
    allMdx {
      edges {
        node {
          id
          excerpt
          frontmatter {
            title
          }
          fields {
            path
          }
        }
      }
    }
  }
`
