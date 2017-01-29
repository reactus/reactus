var path = require("path");
var webpack = require("webpack");
var rules = require("./webpack.config.rules");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");
var OpenBrowserPlugin = require("open-browser-webpack-plugin");
var chalk = require('chalk');
var port = 3000;
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
        new HtmlWebpackPlugin({template: "./src/index.html", favicon: "./src/favicon.ico"}),
        new OpenBrowserPlugin({url:`http://localhost:${port}`})
    ],
    devServer: {
        port: port,
        compress: true,
        historyApiFallback: true
    },
    performance: {
        maxEntrypointSize: 4000000,
        maxAssetSize: 4000000
    }
}

module.exports = config;
