import React from 'react'

import {
  SectionContainer,
  Text,
  ExternalLink,
  GithubCard,
} from 'components/common'
import { SectionHeader, SectionContent } from './styles'

const ProjectsSection = ({ data }) => {
  const { edges: repos } = data.viewer.repositories

  return (
    <SectionContainer as="section">
      <SectionHeader>
        <Text as="h2" heading>
          Open Source
        </Text>
        <ExternalLink url="https://github.com/byurhanbeyzat?tab=repositories">
          View all
        </ExternalLink>
      </SectionHeader>
      <SectionContent>
        {repos &&
          repos.map(({ node }) => <GithubCard data={node} key={node.id} />)}
      </SectionContent>
    </SectionContainer>
  )
}

export { ProjectsSection }
