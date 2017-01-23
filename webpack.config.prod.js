var webpack = require("webpack");
var path = require("path");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var frontendler = path.resolve(__dirname, "./node_modules/frontendler-sass");
var prodEnv = {"process.env.NODE_ENV": JSON.stringify('production')};

var config = {
    entry: ["./src/assets/scripts/main.js"],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: "assets/scripts/[name].js",
        publicPath: "/"
    },
    module: {
        rules: [
            {
                use: ["babel-loader"],
                test: /\.js$/,
                include: path.join(__dirname, 'src')
            }, {
                test: /\.scss$/,
                use: [
                    "style-loader","css-loader","postcss-loader",
                    {
                        loader: "sass-loader",
                        options: {
                            includePaths: [frontendler],
                            sourceMap: true
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
