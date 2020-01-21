import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import Layout from 'components/layout'
import { HeroSection, SkillsSection, ProjectsSection } from 'sections'

const IndexPage = () => {
  const { github } = useStaticQuery(pageQuery)

  return (
    <Layout>
      <HeroSection />
      <SkillsSection />
      <ProjectsSection data={github} />
    </Layout>
  )
}

const pageQuery = graphql`
  query {
    github {
      viewer {
        repositories(
          first: 6
          isFork: false
          privacy: PUBLIC
          orderBy: { field: STARGAZERS, direction: DESC }
        ) {
          edges {
            node {
              id
              name
              url
              description
              forkCount
              stargazers {
                totalCount
              }
              primaryLanguage {
                name
                color
              }
            }
          }
        }
      }
    }
  }
`

export default IndexPage
