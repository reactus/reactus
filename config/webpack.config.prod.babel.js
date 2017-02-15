import webpack from "webpack";
import path from "path";
import rules from "./webpack.config.rules.babel";
import HtmlWebpackPlugin from "html-webpack-plugin";
const env = {"process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV)}
const config = {
    devtool: "cheap-module-source-map",
    entry: {
        bundle:"./src/assets/scripts/main.js"
    },
    output: {
        path: path.join(__dirname, "../dist"),
        filename: "assets/scripts/[name].[chunkhash].js"
    },
    module: rules,
    plugins: [
        new webpack.DefinePlugin({env}),
        new webpack.NamedModulesPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
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

export default config;
