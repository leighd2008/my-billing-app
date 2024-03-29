const HtmlWebpackPlugin = require("html-webpack-plugin");
const CspHtmlWebpackPlugin = require("csp-html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { merge } = require("webpack-merge");
const base = require("./webpack.config");
const path = require("path");

module.exports = merge(base, {
  mode: "development",
  devtool: "source-map", // Show the source map so we can debug when developing locally
  devServer: {
    host: "localhost",
    port: "40992",
    hot: true, // Hot-reload this server if changes are detected
    compress: true, // Compress (gzip) files that are served        
    static: {
      directory: path.resolve(__dirname, "app/dist"), // Where we serve the local dev server's files from
      watch: true, // Watch the directory for changes
      staticOptions: {
        ignored: /node_modules/ // Ignore this path, probably not needed since we define directory above
      }
    }
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "app/src/index.html"),
      filename: "index.html"
    }),
    new CspHtmlWebpackPlugin({
      "base-uri": ["'self'"],
      "object-src": ["'none'"],
      "script-src": ["'self'"],
      "style-src": ["'self' 'sha256-jpJOxTrdc58x4woq2mVygDDIvjIAGNkLZ2yfx4ppdXo=' 'sha256-tbWZ4NP1341cpcrZVDn7B3o9bt/muXgduILAnC0Zbaw=' 'sha256-m9C3ibQ7/MuOKw17/yE5bYRuDJAxyp9QzejqJPbEqos=' 'unsafe-hashes'"],
      "frame-src": ["blob:"],
      "worker-src": ["'none'"]
    })
  ]
})