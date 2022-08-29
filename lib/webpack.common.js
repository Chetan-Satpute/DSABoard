const path = require("path");

/** @type {import('webpack').Configuration} */
const config = {
  entry: "./src/index.ts",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  output: {
    path: path.join(__dirname, "..", "public", "lib"),
    filename: "lib.js",
    library: {
      name: "lib",
      type: "umd",
    },
    clean: true,
  },
};

module.exports = config;
