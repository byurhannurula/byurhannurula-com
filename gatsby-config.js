require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  siteMetadata: {},
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-offline`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
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
      options: {
        start_url: '/',
        short_name: 'Byurhan Beyzat',
        name: 'Byurhan Beyzat – Front-End Developer',
        background_color: 'hsl(230, 80%, 50%)',
        theme_color: 'hsl(230, 80%, 50%)',
        display: 'minimal-ui',
        icon: './static/favicon/favicon.png',
      },
    },
  ],
}
