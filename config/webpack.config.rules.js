var path = require("path");
var frontendler = path.join(__dirname, "../node_modules/frontendler-sass");

var modules = {
    rules: [
        {
            test: /\.json$/,
            exclude: /node_modules/,
            use: "json-loader"
        }, {
            test: /\.js$/,
            exclude: /node_modules/,
            use: ["babel-loader", "eslint-loader"]
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
                        sourceMap: true
                    }
                }
            ]
        }, {
            test: /\.(png|jpg|gif|svg)$/,
            exclude: /node_modules/,
            use: "url-loader?limit=10000&name=assets/images/[name].[ext]"
        },{
            test: /\.(ttf|eot|woff|woff2)$/,
            use: "url-loader?limit=50000&name=assets/fonts/[name].[ext]"
        }
    ]
}

module.exports = modules;
