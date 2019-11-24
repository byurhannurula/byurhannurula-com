import { graphql, useStaticQuery } from 'gatsby'

export const useSiteMetadata = () => {
  const { site } = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          keywords
          description
          siteUrl
          author
          image
        }
      }
    }
  `)

  return site.siteMetadata
}
