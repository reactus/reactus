var webpack = require("webpack");
var path = require("path");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var frontendler = path.resolve(__dirname, "./node_modules/frontendler-sass");

var config = {
    devtool: "eval-source-map",
    entry: ["./src/assets/scripts/main.js"],
    output: {
        path: path.join(__dirname, ".tmp"),
        filename: "assets/scripts/[name].js",
        publicPath: "/"
    },
    module: {
        rules: [
            {
                test: /\.json$/,
                use: "json-loader"

            }, {
                test: /\.js$/,
                use: ["babel-loader"],
                include: path.join(__dirname, "src")
            }, {
                test: /\.scss$/,
                use: [
                    "style-loader",
                    "css-loader",
                    "postcss-loader", {
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
        new webpack.DefinePlugin({
            "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV)
        }),
        new HtmlWebpackPlugin({template: "./src/index.html"}),
        new webpack.NoEmitOnErrorsPlugin()
    ],
    devServer:{
        colors:             true,
        contentBase:        './.tmp',
        historyApiFallback: true,
        inline:             true,
        progress:           true,
        hot:                true,
        port: 3000,
    }
}

module.exports = config;
