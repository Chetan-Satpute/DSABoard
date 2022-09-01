const path = require("path");

const prod = process.env.NODE_ENV === "production";

/** @type {import('webpack').Configuration} */
const config = {
  entry: "./src/index.ts",
  mode: process.env.NODE_ENV,
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  watch: !prod,
  optimization: {
    minimize: prod,
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  output: {
    path: path.join(__dirname, "dist", 'lib'),
    filename: "lib.js",
    library: {
      name: "lib",
      type: "umd",
    },
    clean: true,
  },
  stats: prod ? "normal" : "minimal",
};

module.exports = config;
