import React from 'react'
import { graphql } from 'gatsby'
import styled from 'styled-components'

import Layout from 'components/layout'
import { Title, PostLink } from 'components/common'

const IndexPage = ({ data }) => {
  const { edges: posts } = data.allMdx

  return (
    <Layout>
      <Title style={{ textAlign: 'center' }}>Recent Posts</Title>
      <CardContainer>
        {posts ? (
          posts.map(post => <PostLink data={post} key={post.node.id} />)
        ) : (
          <p>No posts yet.</p>
        )}
      </CardContainer>
    </Layout>
  )
}

export default IndexPage

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

const CardContainer = styled.div`
  display: flex;
  margin-left: auto;
  margin-right: auto;
  flex-direction: column;
  max-width: 650px;
`
