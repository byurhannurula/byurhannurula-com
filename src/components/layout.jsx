import React from "react";
import PropTypes from "prop-types";

const Layout = ({ title, children }) => (
  <>
    <main role="main">{children}</main>
  </>
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
