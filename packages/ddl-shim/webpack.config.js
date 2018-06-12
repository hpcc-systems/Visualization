var webpack = require("webpack");
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var path = require("path");

module.exports = {
    entry: "./lib-es6/index.js",
    output: {
        path: path.resolve(__dirname, 'dist/'),
        publicPath: "dist/",
        filename: "index.js",
        libraryTarget: "umd",
        library: "@hpcc-js/ddl-shim"
    },
    resolve: {
        alias: {
        }
    },
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.?Schema.json$/,
                loader: 'ajv-pack-loader'
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    use: 'css-loader'
                })
            }, {
                test: /\.png$/,
                loader: "url-loader",
                query: { mimetype: "image/png" }
            }
        ]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: "source-map"
        })
    ]
};
