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

  resolve: {
    alias: {
      "@images": path.resolve(__dirname, "src", "assets", "images"),
    },
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
      },
    }),
    new PugPlugin({
      css: {
        filename: "assets/css/[name].[contenthash:8].css",
      },
      js: {
        filename: "assets/js/[name].[contenthash:8].js",
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
