var webpack = require("webpack");
var path = require("path");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var frontendler = path.resolve(__dirname, "./node_modules/frontendler-sass");

var config = {
    devtool: "source-map",
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
                use: [
                    'raw-loader', {
                        loader: "sass-loader",
                        options: {
                            includePaths: [frontendler],
                            sourceMap: true
                        }
                    }
                ],
                test: /\.scss$/
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV)
        }),
        new HtmlWebpackPlugin({
            template: "./src/index.html"
        }),
        new webpack.NoEmitOnErrorsPlugin()
    ]
}

module.exports = config;
