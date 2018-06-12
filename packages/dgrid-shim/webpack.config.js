var HasJsPlugin = require('webpack-hasjs-plugin');
var DojoWebpackPlugin = require("dojo-webpack-plugin");
var CopyWebpackPlugin = require("copy-webpack-plugin");
var ScopedDojoRequire = require("./util/ScopedDojoRequire")

var path = require("path");
var webpack = require("webpack");

module.exports = {
    context: __dirname,
    entry: "./lib-cjs/index",
    output: {
        path: path.join(__dirname, "dist"),
        publicPath: "dist/",
        libraryTarget: "umd",
        library: "@hpcc-js/dgrid-shim",
        pathinfo: true,
        filename: "index.js"
    },
    module: {
        loaders: [
            {
                test: /\.(png)|(gif)$/, loader: "url-loader?limit=100000"
            }, {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }, {
                test: /.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: './dist/[name].[ext]'
                    }
                }]
            }]
    },
    plugins: [
        new HasJsPlugin({
            features: {
                "touch": false,
                'dojo-config-api': false,
                "dojo-trace-api": false,
                "dojo-log-api": false,
                'dojo-publish-privates': false,
                'dojo-sync-loader': false,
                'dojo-test-sniff': false,
                'dijit-legacy-requires': false,
                "dojo-loader": false,
                "bug-for-in-skips-shadowed": false,
                "dojo-debug-messages": false
            }
        }),
        new DojoWebpackPlugin({
            loaderConfig: require.resolve("./src/loaderConfig"),
            environment: { dojoRoot: "./dist" },	// used at run time for non-packed resources (e.g. blank.gif)
            buildEnvironment: { dojoRoot: "../../node_modules" }, // used at build time
            locales: ["en"]
        }),
        new ScopedDojoRequire(),
        // Copy non-packed resources needed by the app to the release directory
        new CopyWebpackPlugin([{
            context: "../../node_modules",
            from: "dojo/resources/blank.gif",
            to: "dojo/resources"
        }]),
        // For plugins registered after the DojoAMDPlugin, data.request has been normalized and
        // resolved to an absMid and loader-config maps and aliases have been applied
        new webpack.NormalModuleReplacementPlugin(/^dojox\/gfx\/renderer!/, "dojox/gfx/canvas"),
        new webpack.NormalModuleReplacementPlugin(
            /^css!/, function (data) {
                data.request = data.request.replace(/^css!/, "!style-loader!css-loader!")
            }
        )
    ],
    resolveLoader: {
        modules: [
            path.join(__dirname, "../../node_modules")
        ]
    },
    devtool: "#source-map",
    node: {
        process: false,
        global: false
    }
};
