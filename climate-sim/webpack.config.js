const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.join(__dirname, "/dist"),
    filename: "index_bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
  ],
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    port: 3000,
    before: function (app) {
      app.use(
        "/api",
        createProxyMiddleware({
          target: "https://www.ncei.noaa.gov",
          changeOrigin: true,
        })
      );
    },
  },
  resolve: {
    fallback: {
      https: require.resolve("https-browserify"),
      path: require.resolve("path-browserify"),
    },
  },
};
