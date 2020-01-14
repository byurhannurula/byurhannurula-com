import React from 'react'
import { Link, graphql } from 'gatsby'

import Layout from 'components/layout'
import { Title, Text } from 'components/common'

const IndexPage = ({ data }) => {
  const { edges: posts } = data.allMdx

  return (
    <Layout>
      <div style={{ textAlign: 'center' }}>
        <Title>Recently Posted</Title>
        <Text>
          Notes on building software in modern times. Searching for the
          challenges I don&apos;t know yet. Design, Linux, Emacs and infrequent
          travels.
        </Text>
      </div>
      <ul>
        {posts.map(({ node: post }) => (
          <li key={post.id}>
            <Link to={post.fields.path}>
              <h3>{post.frontmatter.title}</h3>
              <p>{post.frontmatter.date}</p>
            </Link>
          </li>
        ))}
      </ul>
    </Layout>
  )
}

export default IndexPage

export const pageQuery = graphql`
  query blogIndex {
    allMdx(sort: { fields: frontmatter___date, order: DESC }) {
      edges {
        node {
          fields {
            path
          }
          frontmatter {
            date(formatString: "MMM DD, YYYY")
            title
            excerpt
          }
        }
      }
    }
  }
`
