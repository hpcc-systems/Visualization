const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
var path = require("path");

module.exports = {
    entry: {
        "index": "./lib-es6/index.js",
        "index.min": "./lib-es6/index.js",
    },
    output: {
        path: path.join(__dirname, "dist"),
        publicPath: "dist/",
        libraryTarget: "umd",
        library: "@hpcc-js/leaflet-shim",
        filename: "[name].js"
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }, {
                test: /\.(png|jpg|svg)$/,
                loader: "url-loader"
            }
        ]
    },
    resolve: {
        alias: {
            'mapbox-gl.css': path.resolve('../../node_modules/mapbox-gl/dist/mapbox-gl.css'),
            // From mapbox-gl-js README. Required for non-browserify bundlers (e.g. webpack):
            'mapbox-gl$': path.resolve('../../node_modules/mapbox-gl/dist/mapbox-gl.js')
        }
    },
    mode: "production",
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                include: /\.min\.js$/,
                cache: true,
                parallel: true,
                uglifyOptions: {
                    compress: true,
                    mangle: true,
                    output: { comments: false }
                },
                sourceMap: false
            })
        ]
    }
};
