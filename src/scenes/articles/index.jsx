import React from 'react'

import { SectionContainer, Text } from 'components/common'
import { PostLink } from './components/PostLink'
import { CardContainer } from './styles'

const Articles = ({ data }) => {
  const { edges: posts } = data.allMdx

  return (
    <SectionContainer small>
      <Text as="h1" heading style={{ textAlign: 'center' }}>
        Recent Posts
      </Text>
      <CardContainer>
        {posts ? (
          posts.map(post => <PostLink data={post} key={post.node.id} />)
        ) : (
          <p>No posts yet.</p>
        )}
      </CardContainer>
    </SectionContainer>
  )
}

export default Articles
