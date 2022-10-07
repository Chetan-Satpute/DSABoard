const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { DefinePlugin } = require("webpack");

/** @type {import('webpack').Configuration} */
const config = {
  entry: "./src/index.tsx",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "esbuild-loader",
        options: {
          loader: "tsx",
          target: "es2015",
        },
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
    new DefinePlugin({
      PRODUCTION: process.env.NODE_ENV === "production",
    }),
  ],
  output: {
    filename: "[name].bundle.js",
    chunkFilename: "[name].bundle.js",
    path: path.join(__dirname, "dist"),
    clean: true,
  },
};

module.exports = config;
