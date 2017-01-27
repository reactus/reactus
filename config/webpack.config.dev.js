var path = require("path");
var webpack = require("webpack");
var rules = require("./webpack.config.rules");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");
var ProgressBarPlugin = require('progress-bar-webpack-plugin');
var OpenBrowserPlugin = require("open-browser-webpack-plugin");
var chalk = require('chalk');

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
        new ProgressBarPlugin({
            format: '  build [:bar] ' + chalk.green.bold(':percent') + ' (:elapsed seconds)',
            clear: false
        }),
        new HtmlWebpackPlugin({
            template: "./src/index.html",
            favicon: "./src/favicon.ico",
        }),
        new OpenBrowserPlugin({url: "http://localhost:3000"})
    ],
    devServer: {
        port: 3000,
        compress: true,
        historyApiFallback: true,
        quiet: true
    }
}

module.exports = config;
