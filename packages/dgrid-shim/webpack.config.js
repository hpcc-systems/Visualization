var webpack = require("webpack");
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var path = require("path");
var dwlOptions = require("dojo-webpack-loader/defaultOptions");

dwlOptions.dojoCorePath = path.resolve(__dirname, '../../node_modules/dojo');
dwlOptions.dojoDijitPath = path.resolve(__dirname, '../../node_modules/dijit');
dwlOptions.includeLanguages = ['en', 'ru', 'fr'];

var entry_list = [
    "index"
];
var entry = {};
entry_list.forEach(function (e) { entry[e] = path.resolve(__dirname, "./src/" + e) });

module.exports = {
    entry: entry,
    output: {
        path: path.resolve(__dirname, 'dist/'),
        publicPath: "dist/",
        filename: "dgrid-shim.js",
        libraryTarget: "umd",
        library: "@hpcc-js/dgrid-shim"
    },
    resolve: {
        alias: {
            "dojo": path.resolve(__dirname, '../../node_modules/dojo'),
            "dstore": path.resolve(__dirname, '../../node_modules/dojo-dstore'),
            "dijit": path.resolve(__dirname, '../../node_modules/dijit'),
            "dgrid": path.resolve(__dirname, '../../node_modules/dgrid')
        }
    },
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.js$/,
                use: ["dojo-webpack-loader"]
            }, {
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
        new ExtractTextPlugin('dgrid-shim.css'),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: "source-map"
        })
    ]
};
