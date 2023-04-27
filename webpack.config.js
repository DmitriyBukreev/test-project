const PugPlugin = require("pug-plugin");
const FileManagerPlugin = require("filemanager-webpack-plugin");
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");

const path = require("path");

module.exports = {
  entry: {
    index: path.join(__dirname, "src", "index.pug"),
  },

  output: {
    path: path.join(__dirname, "dist"),
    assetModuleFilename: path.join(
      "assets",
      "images",
      "[name].[contenthash][ext]"
    ),
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        use: "babel-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.pug$/,
        loader: PugPlugin.loader,
      },
      {
        test: /\.(scss|css)$/,
        // Webpack reads this list from right to left
        // sass-loader    - traspiles sass to valid css
        // postcss-loader - makes use of it's preset-env plugin to make css compatible with other browsers
        // css-loader     - interprets all @import and url() statements
        use: ["css-loader", "postcss-loader", "sass-loader"],
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
      {
        test: /\.svg$/,
        type: "asset/resource",
        generator: {
          filename: path.join("icons", "[name].[contenthash][ext]"),
        },
      },
      {
        test: /\.(woff2?|eot|ttf|otf)$/i,
        type: "asset/resource",
        generator: {
          filename: path.join("fonts", "[name].[contenthash][ext]"),
        },
      },
    ],
  },

  plugins: [
    new FileManagerPlugin({
      events: {
        onStart: {
          delete: ["dist"],
        },
        onEnd: {
          copy: [
            {
              source: path.join("src", "assets", "static"),
              destination: "dist",
            },
          ],
        },
      },
    }),
    new PugPlugin({
      // mini-css-extract-plugin replacement
      css: {
        // output filename of CSS files
        filename: "assets/css/[name].[contenthash:8].css",
      },
      js: {
        filename: "assets/js/[name].[contenthash:8].css",
      },
    }),
  ],

  devServer: {
    watchFiles: path.join(__dirname, "src"),
    port: 9000,
  },

  optimization: {
    minimizer: [
      new ImageMinimizerPlugin({
        minimizer: {
          implementation: ImageMinimizerPlugin.imageminMinify,
          options: {
            plugins: [
              ["gifsicle", { interlaced: true }],
              ["jpegtran", { progressive: true }],
              ["optipng", { optimizationLevel: 5 }],
              ["svgo", { name: "preset-default" }],
            ],
          },
        },
      }),
    ],
  },
};
