const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.join(__dirname, '/dist'),
        filename: 'index_bundle.js',
        publicPath: '/',
        sourceMapFilename: 'sourcemaps/[file].map',
    },
    devtool: 'eval-source-map',
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
                // webpack eecutes loaders from last to first, i.e from right to left
            },
        ],
    },
    devServer: {
        host: '0.0.0.0',
        port: 4000,
        overlay: true,
        watchOptions: {
            ignored: /node_modules/,
        },
        // Don't show warnings in browser console
        clientLogLevel: 'none',
        disableHostCheck: true,
        historyApiFallback: true,
    },
    plugins: [
        /*
        new webpack.DefinePlugin({
            'process.env': {
                API_URL: 'http://localhost:8000',
            },
        }),
        */
        new HtmlWebpackPlugin({
            template: './index.html',
            filename: './index.html',
            title: 'Expenses',
            chunksSortMode: 'none',
        }),
    ],
};


// babel-core: Transforms ES6 code to ES5
// babel-loader: Webpack helper to transpile code, given the the preset.
// babel-preset-env: Preset which helps babel to convert ES6, ES7 and ES8 code to ES5.
// babel-preset-react: Preset which Transforms JSX to JavaScript.
