var path = require("path");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    entry: "./lib-es6/index.js",
    entry: {
        "index": "./lib-es6/index.js",
        "index.min": "./lib-es6/index.js",
    },
    output: {
        path: path.resolve(__dirname, 'dist/'),
        publicPath: "dist/",
        filename: "[name].js",
        libraryTarget: "umd",
        library: "@hpcc-js/ddl-shim"
    },
    module: {
        rules: [
            {
                test: /\.png$/,
                loader: "url-loader",
                query: { mimetype: "image/png" }
            }
        ]
    },
    mode: "production",
    optimization: {
        minimizer: [new UglifyJsPlugin({
            include: /\.min\.js$/
        })]
    }
};
