const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
// const Dotenv = require("dotenv-webpack");
// const webpack = require("webpack");

module.exports = (env, argv) => ({
  mode: "production",
  entry: {
    app: "./src/main.ts"
  },
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    historyApiFallback: true
  },
  devtool: argv.mode === "production" ? "none" : "inline-source-map",
  plugins: [
    new CleanWebpackPlugin(),
    // new webpack.DefinePlugin({
    //   "process.env": {}
    // }),
    new HtmlWebpackPlugin({
      template: "./index.html"
    }),
    new CopyWebpackPlugin([
      {
        context: "node_modules/@webcomponents/webcomponentsjs",
        from: "**/*.js",
        to: "webcomponents"
      },
      {
        from: "./src/assets/img/*",
        to: "./",
        flatten: true
      }
    ]),

    new TerserPlugin({
      parallel: true,
      terserOptions: {
        ecma: 6,
        output: {
          comments: false
        }
      }
    })
  ],
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist")
  },
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use:
          argv.mode === "production"
            ? [
                // {
                //   loader: "minify-lit-html-loader",
                //   options: {
                //     htmlMinifier: {
                //       collapseWhitespace: true,
                //       ignoreCustomFragments: [/<\s/, /<=/],
                //       collapseInlineTagWhitespace: true,
                //       continueOnParseError: true,
                //       decodeEntities: true,
                //       keepClosingSlash: true
                //     }
                //   }
                // },
                // {
                //   loader: 'minify-template-literal-loader',
                //   options: {
                //     caseSensitive: true,
                //     collapseWhitespace: true
                //   }
                // },
                {
                  loader: "ts-loader"
                }
              ]
            : [
                {
                  loader: "ts-loader"
                }
              ],
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        include: path.resolve(__dirname, "styles"),
        //include: /stylesheets|node_modules/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.s[a|c]ss$/,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader" },
          { loader: "sass-loader" }
        ]
      },
      {
        test: /\.(png|gif|jpg|cur)$/i,
        loader: "url-loader",
        options: { limit: 8192 }
      },
      {
        test: /\.woff2(\?v=[0-9]\.[0-9]\.[0-9])?$/i,
        loader: "url-loader",
        options: { limit: 10000, mimetype: "application/font-woff2" }
      },
      {
        test: /\.woff(\?v=[0-9]\.[0-9]\.[0-9])?$/i,
        loader: "url-loader",
        options: { limit: 10000, mimetype: "application/font-woff" }
      },
      {
        test: /\.(ttf|eot|svg|otf)(\?v=[0-9]\.[0-9]\.[0-9])?$/i,
        loader: "file-loader"
      }
    ]
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"]
  }
});
