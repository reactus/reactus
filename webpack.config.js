var webpack = require('webpack');
var path = require('path');

module.exports = {
    DEV: {
        debug: true,
        devtool: '#eval-source-map',
        context: path.join(__dirname, 'app', 'assets/scripts'),
        output: {
            path: path.join(__dirname, 'app', 'assets/scripts'),
            publicPath: '/assets/scripts',
            filename: "bundle.js"
        },
        entry: [
            'webpack/hot/dev-server',
            'webpack-hot-middleware/client',
            './main'
        ],
        module: {
            loaders: [{
                test: /\.js$/,
                exclude: /node_modules/,
                loaders: ['react-hot', 'babel']
            }]
        },
        resolve: {
            extensions: ["", ".js", ".jsx", '.es6'],
        },
        plugins: [
            new webpack.optimize.OccurenceOrderPlugin(),
            new webpack.HotModuleReplacementPlugin(),
            new webpack.NoErrorsPlugin()
        ],
    },
    PROD:{
        output: {
            filename: "bundle.js",
        },
        devtool: 'cheap-module-source-map',
        module: {
            exclude: /node_modules/,
            loaders: [{
                test: /\.js$/,
                loader: "babel"
            }]
        },
        resolve: {
            extensions: ["", ".js", ".jsx", '.es6'],
        },
        plugins: [
            new webpack.DefinePlugin({
                'process.env': {
                    'NODE_ENV': JSON.stringify('production')
                }
            })
        ]
    }
}
