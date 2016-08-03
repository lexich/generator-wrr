"use strict";
/* eslint import/no-extraneous-dependencies: 0 */
const path = require("path");
const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const NODE_ENV = process.env.NODE_ENV;

module.exports = {
  entry: "./src/static.jsx",
  node: {
    __filename: true,
    __dirname: true
  },
  target: "node",
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.NoErrorsPlugin(),
    new ExtractTextPlugin("styles.[contenthash].css")
  ],
  module: {
    preLoaders: [{
      test: /\/src\/client\.jsx$/,
      loader: `preprocess?{'process.env.NODE_ENV': '${NODE_ENV}'}`
    }],
    loaders: [
      {
        test: /\.(js)$/,
        loaders: ["babel"],
        include: path.join(__dirname, "template.js")
      },
      {
        test: /\.(js|jsx)$/,
        loaders: ["babel"],
        include: path.join(__dirname, "src")
      },
      {
        /* eslint max-len: 0 */
        test: /\.css$/,
        loader: ExtractTextPlugin.extract(
          "css?sourceMap&modules&importLoaders=2&localIdentName=[name]__[local]___[hash:base64:5]!postcss"),
        exclude: /\/node_modules\//
      }, {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract("css?sourceMap!postcss"),
        include: /\/node_modules\//
      }, {
        test: /\.(jpe?g|png|gif|svg|ico)$/i,
        loaders: [
          "file?hash=sha512&digest=hex&name=[name]-[hash].[ext]"
        ]
      }, {
        test: /\.(eot|ttf|woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
        loader: "file?limit=10000&name=[name]-font-[hash].[ext]"
      }, {
        test: /\.svg(\?v=\d+\.\d+\.\d+){1}$/,
        loader: "file?limit=10000&name=[name]-font-[hash].[ext]"
      }, {
        test: /\.json$/,
        loader: "json"
      }, {
        test: /\.md$/,
        loader: "raw"
      }
    ]
  },
  output: {
    path: "build",
    filename: "static.bundle.js"
  },
  resolve: {
    extensions: ["", ".js", ".jsx"],
    modulesDirectories: ["web_modules", "node_modules"],
    alias: {
      components: path.join(__dirname, "src", "components"),
      pages: path.join(__dirname, "src", "pages"),
      utils: path.join(__dirname, "src", "utils"),
      actions: path.join(__dirname, "src", "actions"),
      "vars.css": path.join(__dirname, "src", "vars.css")
    }
  }
};
