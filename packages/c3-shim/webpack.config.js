var webpack = require("webpack");
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var path = require("path");

var entry_list = [
    "index"
];
var entry = {};
entry_list.forEach(function (e) { entry[e] = path.resolve(__dirname, "./src/" + e) });

module.exports = {
    entry: entry,
    output: {
        path: path.resolve(__dirname, 'build/'),
        publicPath: "build/",
        filename: "c3-shim.js",
        libraryTarget: "umd",
        library: "@hpcc-js/c3-shim"
    },
    resolve: {
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
        new webpack.ProvidePlugin({
            d3: 'd3'
        }),
        new ExtractTextPlugin('c3-shim.css'),
        //new webpack.optimize.UglifyJsPlugin({
        //sourceMap: "source-map"
        //})
    ]
};
