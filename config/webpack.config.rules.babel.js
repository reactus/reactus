import path from "path";
const frontendler = path.join(__dirname, "../node_modules/frontendler-sass");
const rules = {
    rules: [
        {
            test: /\.json$/,
            exclude: /node_modules/,
            use: "json-loader"
        }, {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: ["react-hot-loader","babel-loader", "eslint-loader"]
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
            use: "url-loader?limit=10000&name=assets/images/[name].[hash:8].[ext]"
        },{
            test: /\.(ttf|eot|woff|woff2)$/,
            use: "url-loader?limit=50000&name=assets/fonts/[name].[ext]"
        }
    ]
}

export default rules;
