var webpack = require("webpack");
var path = require("path");
var rules = require("./webpack.config.rules");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var env = {"process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV)}
var config = {
    devtool: "cheap-module-source-map",
    entry: {
        bundle:"./src/assets/scripts/main.js"
    },
    output: {
        path: path.join(__dirname, "../dist"),
        filename: "assets/scripts/[name]_[chunkhash].js"
    },
    module: rules,
    plugins: [
        new webpack.DefinePlugin({env}),
        new HtmlWebpackPlugin({
            template: "./src/index.html",
            favicon: "./src/favicon.ico",
            minify:{
                collapseWhitespace: true,
                removeComments: true,
            }
        }),
    ]
}

module.exports = config;
