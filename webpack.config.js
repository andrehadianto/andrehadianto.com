const path = require('path');
const webpack = require('webpack');

module.exports = (env) => {
    const isProduction = env === 'production';
    return {
        entry: [
            './src/app.js',
        ],
        output: {
            path: path.join(__dirname, '/public'),
            filename: 'bundle.js',
            publicPath: '/',
        },
        module: {
            rules: [{
                loader: 'babel-loader',
                test: /\.js$/,
                exclude: /node_modules/
            }, {
                test: /\.(png|jpg)$/,
                loader: 'url-loader?limit=8192'
            }, {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            }]
        },
        devtool: isProduction ? 'source-map' : 'cheap-module-eval-source-map',
        devServer: {
            contentBase: path.join(__dirname, 'public'),
            historyApiFallback: true,
        },
    }
}
