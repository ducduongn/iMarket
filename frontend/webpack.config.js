const path = require('path');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

var APP_DIR = path.resolve(__dirname, './src');
var BUILD_DIR = path.resolve(__dirname, './static/frontend/js');
console.log(BUILD_DIR);
module.exports = {
    entry: path.resolve(APP_DIR, 'index.js'),
    output: {
        path: BUILD_DIR,
        filename: 'index.js',
    },
    // target: 'web',
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json'],
        alias: {
            'react-dom$': 'react-dom/profiling',
            'scheduler/tracing': 'scheduler/tracing-profiling',
        },
    },
    module: {
        rules: [
            {
                // Include ts, tsx, js, and jsx files.
                test: /\.(ts|js)x?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader'],
            },
        ],
    },
    plugins: [
        new CleanWebpackPlugin(),
        // new HtmlWebpackPlugin({
        //     template: path.join(__dirname, 'src', 'index.html')
        // })
    ],
};
