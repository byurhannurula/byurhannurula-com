import React from "react";
import PropTypes from "prop-types";

import SEO from "./seo";

const Layout = ({ title, children }) => (
  <>
    <SEO title={title} />
    <main role="main">{children}</main>
  </>
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
