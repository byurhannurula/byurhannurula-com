exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      modules: [`${__dirname}/src`, "node_modules"],
    },
  });
};
