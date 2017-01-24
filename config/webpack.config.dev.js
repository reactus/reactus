var webpack = require("webpack");
var path = require("path");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");
var OpenBrowserPlugin = require("open-browser-webpack-plugin");
var frontendler = path.resolve(__dirname, "../node_modules/frontendler-sass");

var config = {
    devtool: "cheap-module-eval-source-map",
    entry: {
        middleware: "webpack-hot-middleware/client",
        bundle: "./src/assets/scripts/main.js"
    },
    output: {
        path: path.join(__dirname, "src"),
        filename: "assets/scripts/[name].js"
    },
    module: {
        rules: [
            {
                test: /\.json$/,
                exclude: /node_modules/,
                use: "json-loader",

            }, {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ["react-hot-loader","babel-loader","eslint-loader"],

            }, {
                test: /\.scss$/,
                exclude: /node_modules/,
                use: [
                    "style-loader",
                    "css-loader",
                    "postcss-loader", {
                        loader: "sass-loader",
                        options: {
                            includePaths: [frontendler],
                            sourceMap: true,
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new FriendlyErrorsWebpackPlugin(),
        new HtmlWebpackPlugin({template: "./src/index.html"}),
        new OpenBrowserPlugin({ url: "http://localhost:3000" })
    ],
    devServer:{
        port:3000,
        compress: true,
        historyApiFallback: true,
        quiet: false
    }
}

module.exports = config;
