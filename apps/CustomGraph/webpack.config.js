/* eslint-disable */
var path = require("path");

module.exports = {
    entry: "./lib-es6/index.js",
    output: {
        path: path.join(__dirname, "dist"),
        filename: "index.js",
        libraryTarget: "umd",
        library: "webpack"
    },
    module: {
        rules: [{
            test: /\.css$/,
            use: ["style-loader", "css-loader"]
        }, {
            test: /.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
            use: [{
                loader: "file-loader",
                options: {
                    publicPath: "dist/"
                }
            }]
        }, {
            test: /\.js$/,
            use: ["source-map-loader"],
            enforce: "pre"
        }]
    },
    mode: "production"
    // devtool: "cheap-module-source-map",
    // mode: "development"
};
