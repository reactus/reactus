var webpack = require("webpack");
var path = require("path");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var CleanWebpackPlugin = require("clean-webpack-plugin");
var frontendler = path.join(__dirname, "../node_modules/frontendler-sass");
var prodEnv = {"process.env.NODE_ENV": JSON.stringify("production")};

var config = {
    devtool: "cheap-module-source-map",
    entry: {
        bundle:"./src/assets/scripts/main.js"
    },
    output: {
        path: path.join(__dirname, "../dist"),
        filename: "assets/scripts/[name]_[chunkhash].js"
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
        new webpack.DefinePlugin(prodEnv),
        new HtmlWebpackPlugin({template: "./src/index.html"}),
    ]
}

module.exports = config;
