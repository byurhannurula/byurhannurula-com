import React from 'react'
import Helmet from 'react-helmet'
import PropTypes from 'prop-types'

import { useSiteMetadata } from 'hooks'

const SEO = ({ lang, title, keywords, description, postImage }) => {
  const seo = useSiteMetadata()

  const siteTitle = title ? `${title} — ${seo.title}` : seo.title
  const siteKeywords = keywords ? keywords.concat(seo.keywords) : seo.keywords
  const siteDescription = description || seo.description
  const siteImage = postImage || seo.image

  return (
    <Helmet title={siteTitle} htmlAttributes={{ lang }}>
      <meta name="title" content={siteTitle} />
      <meta name="keywords" content={siteKeywords} />
      <meta name="description" content={siteDescription} />
      <meta name="image" content={siteImage} />

      <meta property="og:type" content="website" />
      <meta property="og:url" content={seo.siteUrl} />
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={siteDescription} />
      <meta property="og:image" content={siteImage} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={siteTitle} />
      <meta name="twitter:image" content={siteImage} />
      <meta name="twitter:creator" content={seo.author} />
      <meta name="twitter:description" content={siteDescription} />
    </Helmet>
  )
}

SEO.defaultProps = {
  lang: `en`,
  title: ``,
  keywords: [],
  description: ``,
  postImage: ``,
}

SEO.propTypes = {
  lang: PropTypes.string,
  title: PropTypes.string,
  keywords: PropTypes.arrayOf(PropTypes.string),
  description: PropTypes.string,
  postImage: PropTypes.string,
}

export default SEO
