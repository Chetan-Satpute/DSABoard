const path = require("path");
const { merge } = require("webpack-merge");
const common = require("./webpack.common");
const { DefinePlugin } = require("webpack");

/** @type {import('webpack').Configuration} */
const config = {
  mode: "development",
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
    ],
  },
  devServer: {
    static: {
      directory: path.join(__dirname, "public"),
    },
    historyApiFallback: true,
  },
  stats: "minimal",
  output: {
    publicPath: '/'
  }
};

module.exports = merge(common, config);
