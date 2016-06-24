
"use strict";

const webpack = require("webpack");
const fs = require("fs");
const path = require("path");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const ManifestPlugin = require("webpack-manifest-plugin");

// postcss
const cssvariables = require("postcss-css-variables");
const autoprefixer = require("autoprefixer");
const calc = require("postcss-calc");
const mixins = require("postcss-mixins");

const NODE_ENV = process.env.NODE_ENV;
const PORT = process.env.PORT || 8080;

let plugins = [
  new webpack.optimize.OccurenceOrderPlugin(),
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoErrorsPlugin()
];

if (NODE_ENV === "production") {
  plugins = plugins.concat(
    new ExtractTextPlugin("styles.[contenthash].css", {
      disable: false,
      allChunks: true
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        screw_ie8: true,
        warnings: false,
      },
      output: {
        semicolons: false
      }
    }),
    new CompressionPlugin({
      asset: "{file}.gz",
      regExp: /\.(js|html|css)$/,
    })
  );
}

plugins = plugins.concat(new HtmlWebpackPlugin({
  template: "./template.html"
}));

const devtool = NODE_ENV === "production" ? "source-map" : "eval-source-map";

let entry = "./src/client.jsx";
if (NODE_ENV !== "production") {
  entry = [
    `webpack-dev-server/client?http://0.0.0.0:${PORT}`, // WebpackDevServer host and port
    "webpack/hot/only-dev-server"
  ].concat(entry);
}

module.exports = {
  entry, devtool,
  plugins: [
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(NODE_ENV)
    }),
  ].concat(plugins).concat(
    new ManifestPlugin({
      fileName: "manifest.json"
    })
  ),
  module: {
    preLoaders: [{
      test: /\/src\/client\.jsx$/,
      loader: `preprocess?{'process.env.NODE_ENV': '${NODE_ENV}'}`
    }],
    loaders: [
      {
        test: /\.(js|jsx)$/,
        loaders: ["react-hot", "babel"],
        include: path.join(__dirname, "src")
      },
      {
        /* eslint max-len: 0 */
        test: /\.css$/,
        loader: NODE_ENV === "production" ?
          ExtractTextPlugin.extract("css?sourceMap&modules&importLoaders=2&localIdentName=[name]__[local]___[hash:base64:5]!postcss") :
          "style!css?modules&importLoaders=2&localIdentName=[name]__[local]___[hash:base64:5]!postcss",
        exclude: /\/node_modules\//
      }, {
        test: /\.css$/,
        loader: NODE_ENV === "production" ?
          ExtractTextPlugin.extract("css?sourceMap!postcss") :
          "style!css!postcss",
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
    path: "dist",
    filename: "main.[hash].js"
  },
  resolveLoader: {
    modulesDirectories: [
      path.resolve(__dirname, "webpack-loaders"),
      path.resolve(__dirname, "node_modules")
    ]
  },
  debug: true,
  devServer: {
    port: PORT,
    historyApiFallback: true,
    hot: true,
    inline: true,
    progress: true,
    proxy: {
      // "/api/*": {
      //   target: "http://locahost:3000",
      //   secure: false,
      //   bypass(req) {
      //     req.headers.host = "http://locahost:3000";
      //     req.headers.referer = "http://locahost:3000";
      //   }
      // }
    }
  },
  postcss() {
    let variables = {};
    try {
      const data = fs.readFileSync(
        path.join(__dirname, "css-external", "cssvars.json"));
      variables = JSON.parse(data);
    } catch (e) {
      /* eslint no-console: 0 */
      console.log(e);
    }
    return [
      mixins({ mixinsDir: path.join(__dirname, "css-external", "mixins") }),
      cssvariables({ variables }),
      calc(),
      autoprefixer({
        browsers: ["last 222 version", "ie >= 8", "ff >= 17", "opera >=10"]
      })
    ];
  },
  resolve: {
    extensions: ["", ".js", ".jsx"],
    modulesDirectories: ["web_modules", "node_modules"],
    alias: {
      components: path.join(__dirname, "src", "components"),
      pages: path.join(__dirname, "src", "pages"),
      utils: path.join(__dirname, "src", "utils")
    }
  }
};
