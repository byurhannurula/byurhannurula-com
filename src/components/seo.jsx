import React from "react";
import Helmet from "react-helmet";
import PropTypes from "prop-types";

import Card from "../images/card.png";

const SEO = ({ lang, title, description, postImage }) => {
  const siteUrl = "https://byurhanbeyzat.com";
  const siteTitle = title
    ? `${title} — Byurhan Beyzat – Front-End Developer`
    : `Byurhan Beyzat – Front-End Developer`;
  const siteDescription =
    description ||
    "Hi, I'm Byurhan Beyzat, a front-end developer based in Ruse, Bulgaria.";
  const siteImage = `${siteUrl}${postImage || Card}`;

  return (
    <Helmet title={siteTitle} htmlAttributes={{ lang }}>
      <meta name="title" content={siteTitle} />
      <meta name="description" content={siteDescription} />
      <meta name="image" content={siteImage} />

      <meta property="og:type" content="website" />
      <meta property="og:url" content={siteUrl} />
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={siteDescription} />
      <meta property="og:image" content={siteImage} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={siteTitle} />
      <meta name="twitter:image" content={siteImage} />
      <meta name="twitter:creator" content="@byurhanbeyzat" />
      <meta name="twitter:description" content={siteDescription} />
    </Helmet>
  );
};

SEO.defaultProps = {
  lang: `en`,
  title: ``,
  description: ``,
  postImage: ``,
};

SEO.propTypes = {
  lang: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  postImage: PropTypes.string,
};

export default SEO;
