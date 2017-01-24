var path = require("path");
var webpack = require("webpack");
var rules = require("./webpack.config.rules");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");
var OpenBrowserPlugin = require("open-browser-webpack-plugin");

var config = {
    devtool: "cheap-module-eval-source-map",
    entry: {
        bundle: "./src/assets/scripts/main.js"
    },
    output: {
        path: path.join(__dirname, "src"),
        filename: "assets/scripts/[name].js"
    },
    module: rules,
    plugins: [
        new FriendlyErrorsWebpackPlugin(),
        new HtmlWebpackPlugin({template: "./src/index.html"}),
        new OpenBrowserPlugin({url: "http://localhost:3000"})
    ],
    devServer: {
        port: 3000,
        compress: true,
        historyApiFallback: true,
        quiet: false
    }
}

module.exports = config;
