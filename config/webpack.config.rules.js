var path = require("path");
var frontendler = path.join(__dirname, "../node_modules/frontendler-sass");

var modules = {
    rules: [
        {
            test: /\.json$/,
            exclude: /node_modules/,
            use: "json-loader",

        }, {
            test: /\.js$/,
            exclude: /node_modules/,
            use: ["babel-loader","eslint-loader"],

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
                        sourceMap: true,
                    }
                }
            ]
        }
    ]
}

module.exports = modules;
