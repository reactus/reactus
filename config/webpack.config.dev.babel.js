import path from "path";
import webpack from "webpack";
import rules from "./webpack.config.rules.babel";
import HtmlWebpackPlugin from "html-webpack-plugin";
import FriendlyErrorsWebpackPlugin from "friendly-errors-webpack-plugin";
import OpenBrowserPlugin from "open-browser-webpack-plugin";
const port = 3000;
const url = "http://localhost";
const config = {
    devtool: "cheap-module-eval-source-map",
    entry: {
        bundle: [
            "./src/assets/scripts/main.js"
        ]
    },
    output: {
        path: path.join(__dirname, "src"),
        filename: "assets/scripts/[name].js"
    },
    module: rules,
    plugins: [
        new OpenBrowserPlugin({url:`${url}:${port}`}),
        new HtmlWebpackPlugin({template: "./src/index.html", favicon: "./src/favicon.ico"}),
        new FriendlyErrorsWebpackPlugin({
            compilationSuccessInfo: {
                messages: [`You application is running here ${url}:${port}`]
            },
        }),
    ],
    devServer: {
        port: port,
        historyApiFallback: true,
        host: 'localhost'
    },
    performance: {
        maxEntrypointSize: 4000000,
        maxAssetSize: 4000000
    }
}

export default config;
