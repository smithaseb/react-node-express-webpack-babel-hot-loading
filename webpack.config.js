var webpack = require('webpack');

var path = require('path');

module.exports = {
    entry: [
        'webpack-hot-middleware/client', // for registering browser
        './app/index.js'
    ],
    output: {
        path: __dirname,
        publicPath: '/assets/',
        filename: 'bundle.js'
    },


    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel',
            }
        ],
    },

    devtool: '#source-map',
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ],
}