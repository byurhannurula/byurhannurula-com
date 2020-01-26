const config = require('./content/data/config')

require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  siteMetadata: config.siteMetadata,
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-offline`,
    `gatsby-plugin-zeit-now`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `posts`,
        path: `${__dirname}/content/posts`,
      },
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [`.mdx`, `.md`],
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 590,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          `gatsby-remark-prismjs`,
          `gatsby-remark-copy-linked-files`,
        ],
      },
    },
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        feeds: [
          generateBlogFeed({
            filePathRegex: `//content/posts//`,
            title: 'Byurhan Beyzat Blog RSS Feed',
            output: '/rss.xml',
          }),
        ],
      },
    },
    {
      resolve: `gatsby-source-graphql`,
      options: {
        typeName: 'GitHub',
        fieldName: 'github',
        url: 'https://api.github.com/graphql',
        headers: {
          Authorization: `Bearer ${process.env.GATSBY_GITHUB_TOKEN}`,
        },
      },
    },
    {
      resolve: `gatsby-plugin-styled-components`,
      options: {
        displayName: false,
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        head: true,
        cookieDomain: 'byurhanbeyzat.com',
        trackingId: process.env.GATSBY_GA_ID,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: config.siteManifest,
    },
  ],
}

function generateBlogFeed({ filePathRegex, ...overrides }) {
  return {
    serialize: ({ query: { site, allMdx } }) => {
      const siteData = site.siteMetadata
      return allMdx.edges.map(edge => {
        return {
          ...edge.node.frontmatter,
          description: edge.node.excerpt,
          date: edge.node.frontmatter.date,
          url: siteData.siteUrl + edge.node.fields.path,
          guid: siteData.siteUrl + edge.node.fields.path,
        }
      })
    },
    query: `
      query {
        site {
          siteMetadata {
            siteUrl
            title
            description
          }
        }
        allMdx(
          limit: 1000, 
          sort: { order: DESC, fields: [frontmatter___date] }, 
          filter: { fileAbsolutePath: { regex: "${filePathRegex}" } }) {
          edges {
            node {
              excerpt(pruneLength: 250)
              body
              fields {
                path
              }
              frontmatter {
                title
                date
              }
            }
          }
        }
      }
    `,
    ...overrides,
  }
}
