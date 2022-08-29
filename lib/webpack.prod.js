const { merge } = require("webpack-merge");
const common = require("./webpack.common");

/** @type {import('webpack').Configuration} */
const config = {
  mode: "production",
  optimization: {
    minimize: true,
  },
};

module.exports = merge(common, config);
