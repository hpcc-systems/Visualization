var webpack = require("webpack");
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var path = require("path");

var entry_list = [
    "index"
];
var entry = {};
entry_list.forEach(function (e) { entry[e] = path.resolve(__dirname, "./lib/" + e) });

module.exports = {
    entry: entry,
    output: {
        path: path.resolve(__dirname, 'dist/'),
        publicPath: "dist/",
        filename: "ddl.js",
        libraryTarget: "umd",
        library: "hpcc-ddl"
    },
    resolve: {
        alias: {
        }
    },
    devtool: 'source-map',
    module: {
        rules: [
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
        new ExtractTextPlugin('dgrid.css'),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: "source-map"
        })
    ]
};
