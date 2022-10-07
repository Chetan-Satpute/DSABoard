const path = require("path");
const { merge } = require("webpack-merge");
const common = require("./webpack.common");

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

/** @type {import('webpack').Configuration} */
const config = {
  mode: "production",
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"],
      },
    ],
  },
  optimization: {
    minimize: true,
    minimizer: [new CssMinimizerPlugin(), "..."],
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new CopyPlugin({
      patterns: [
        { from: path.join(__dirname, "public"), noErrorOnMissing: true },
      ],
    }),
  ],
};

module.exports = merge(common, config);
