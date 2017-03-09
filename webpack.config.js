const path = require('path');
const webpack = require('webpack');
//var SplitByPathPlugin = require('webpack-split-by-path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

/*
const fs = require('fs');
function gatherFiles(folder) {
    /*
    let exportFileContents = "";
    fs.readdirSync(`./src/${folder}`).filter((file) => {
        return file.indexOf(".ts") > 0 && file !== "Bullet.ts";
    }).map((file) => {
        let filename = file.substring(0, file.length - 3);
        exportFileContents += `export * from "./${folder}/${filename}";\n`
    });
    fs.writeFileSync(`./src/${folder}.ts`, exportFileContents);
    return `./src/${folder}.ts`;
}
*/

const config = {
    entry: {
        index: path.resolve(__dirname, 'src/index.ts')
    },
    devtool: "source-map",
    output: {
        path: path.resolve(__dirname, 'lib-browser'),
        publicPath: '../lib-browser/',
        filename: "[name].js",
        chunkFilename: "[name].js",
        library: "HPCCViz",
        libraryTarget: "umd"
    },
    resolve: {
        alias: {
        },
        extensions: [
            ".ts", ".js"
        ]
    },
    resolveLoader: {
        alias: {
            'css': path.resolve(__dirname, 'util/webpack-null-stub.js'),
        }
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                loader: "awesome-typescript-loader"
            }, {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    use: 'css-loader'
                })
            }, {
                test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url-loader?limit=10000',
            }, {
                //test: require.resolve("./bower_components/colorbrewer/colorbrewer.js"),
                //use: 'exports-loader?colorbrewer'
            }
        ]
    },
    externals: {
    },
    plugins: [
        new ExtractTextPlugin('index.css')/*,
        new SplitByPathPlugin([
            {
                name: 'vendor',
                path: path.resolve(__dirname, '../../node_modules')
            }, {
                name: 'comms',
                path: path.resolve(__dirname, '../../node_modules/@schmoo/comms')
            }, {
                name: 'common',
                path: path.resolve(__dirname, 'src/common')
            }, {
                name: 'chart',
                path: path.resolve(__dirname, 'src/chart')
            }], {
                manifest: 'app-entry'
            })
        */
    ]
};

//  Uncomment for unittesting in webbrowser
// config.entry.push("./test/index.ts");
switch (process.env.NODE_ENV) {
    case "watch":
        config.watch = true;
        config.watchOptions = {
        };
        break;
    case "min":
        config.output.filename = "[name].min.js";
        config.output.chunkFilename = "[name].min.js";
        config.plugins.push(new webpack.optimize.OccurrenceOrderPlugin());
        config.plugins.push(new webpack.optimize.UglifyJsPlugin());
        break;
    case "min-debug":
        config.output.filename = 'index.min-debug.js';
        config.plugins.push(new webpack.optimize.OccurrenceOrderPlugin());
        config.plugins.push(new webpack.optimize.UglifyJsPlugin({
            beautify: true,
            mangle: false
        }));
        break;
    case "test":
        config.entry = ["./test/index.ts"];
        config.output.filename = 'hpcc-platform-comms.test.js';
        config.module.rules[0].options.configFileName = "./tsconfig-test.json"
        break;
    default:
}

module.exports = config;
