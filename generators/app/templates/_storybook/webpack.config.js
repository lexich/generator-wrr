// postcss
const cssvariables = require("postcss-css-variables");
const autoprefixer = require("autoprefixer");
const customMedia = require("postcss-custom-media");
const calc = require("postcss-calc");
const utilities = require("postcss-utilities");

const path = require("path");

module.exports = {
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        loader: "babel",
        exclude: /node_module/
      },
      {
        test: /\.css?$/,
        /* eslint max-len: 0 */
        loader: "style!css?modules&importLoaders=2&localIdentName=[name]__[local]___[hash:base64:5]!postcss"
      }, {
        test: /\.(jpe?g|png|gif|svg|ico)$/i,
        loader: "file?hash=sha512&digest=hex&name=[name]-[hash].[ext]"
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
  postcss() {
    return [
      customMedia(),
      utilities,
      cssvariables({ variables: {} }),
      calc(),
      autoprefixer({
        browsers: ["last 222 version", "ie >= 8", "ff >= 17", "opera >=10"]
      })
    ];
  },
  resolve: {
    extensions: ["", ".js", ".jsx"],
    modulesDirectories: [
      path.join(__dirname, "..", "web_modules"),
      path.join(__dirname, "..", "node_modules")
    ],
    alias: {
      components: path.join(__dirname, "..", "src", "components"),
      pages: path.join(__dirname, "..", "src", "pages"),
      utils: path.join(__dirname, "..", "src", "utils"),
      actions: path.join(__dirname, "..", "src", "actions"),
      "vars.css": path.join(__dirname, "..", "src", "vars.css")
    }
  }
};
