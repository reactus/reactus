import path from "path";
import autoprefixer from "autoprefixer";
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
            use: ["babel-loader","eslint-loader"]
        }, {
            test: /\.scss$/,
            exclude: /node_modules/,
            use: [
                "style-loader",
                "css-loader",
                {
                    loader:"postcss-loader",
                    options: {
                        ident: 'postcss',
                        plugins: function () {
                            return [
                                autoprefixer({
                                    browsers: [
                                        '>1%',
                                        'last 4 versions',
                                        'Firefox ESR',
                                        'not ie < 9', // React doesn't support IE8 anyway
                                    ]
                                })
                            ]
                        }
                    }
                },
                {
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
            test: /\.(ttf|eot|woff|woff2|otf)$/,
            exclude: /node_modules/,
            use: "url-loader?limit=0&name=assets/fonts/[name].[ext]"
        }
    ]
}

export default rules;
