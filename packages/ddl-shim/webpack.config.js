var webpack = require("webpack");
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
                test: /\.png$/,
                loader: "url-loader",
                query: { mimetype: "image/png" }
            }
        ]
    },
    plugins: []
};
