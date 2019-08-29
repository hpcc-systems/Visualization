var HasJsPlugin = require('webpack-hasjs-plugin');
var DojoWebpackPlugin = require("dojo-webpack-plugin");
var CopyWebpackPlugin = require("copy-webpack-plugin");
var UglifyJsPlugin = require("uglifyjs-webpack-plugin");

var path = require("path");
var webpack = require("webpack");

module.exports = function (env) {
    const isProduction = !env || env.build !== "dev";

    return {
        context: __dirname,
        entry: {
            "index": "./lib-cjs/index",
            "index.min": "./lib-cjs/index",
        },
        output: {
            path: path.join(__dirname, "dist"),
            publicPath: "dist/",
            libraryTarget: "umd",
            library: "@hpcc-js/dgrid-shim",
            pathinfo: true,
            filename: "[name].js"
        },
        module: {
            rules: [
                {
                    test: /\.(png|jpg|gif)$/,
                    use: [
                        {
                            loader: 'url-loader',
                            options: {
                                limit: 100000
                            }
                        }
                    ]
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
                    "dojo-debug-messages": false,
                    "highcontrast": false
                }
            }),
            new DojoWebpackPlugin({
                loaderConfig: require("./src/loaderConfig"),
                environment: { dojoRoot: "./dist" },	// used at run time for non-packed resources (e.g. blank.gif)
                buildEnvironment: { dojoRoot: "../../node_modules" }, // used at build time
                locales: ["en"]
            }),
            new DojoWebpackPlugin.ScopedRequirePlugin(),
            // For plugins registered after the DojoAMDPlugin, data.request has been normalized and
            // resolved to an absMid and loader-config maps and aliases have been applied
            new webpack.NormalModuleReplacementPlugin(/^dojox\/gfx\/renderer!/, "dojox/gfx/canvas"),
            new webpack.NormalModuleReplacementPlugin(
                /^css!/, function (data) {
                    data.request = data.request.replace(/^css!/, "!style-loader!css-loader!")
                }
            ),
            new webpack.NormalModuleReplacementPlugin(
                /^xstyle\/css!/, function (data) {
                    data.request = data.request.replace(/^xstyle\/css!/, "!style-loader!css-loader!")
                }
            )
        ],
        resolveLoader: {
            modules: ["../../node_modules"]
        },
        mode: isProduction ? "production" : "development",
        optimization: {
            minimizer: [
                // we specify a custom UglifyJsPlugin here to get source maps in production
                new UglifyJsPlugin({
                    include: /\.min\.js$/,
                    cache: true,
                    parallel: true,
                    uglifyOptions: {
                        compress: isProduction,
                        mangle: isProduction,
                        output: { comments: !isProduction }
                    },
                    sourceMap: false
                })
            ]
        },
        devtool: false
    };
}
