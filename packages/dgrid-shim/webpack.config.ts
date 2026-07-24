import * as fs from "fs";
import * as path from "path";
import * as webpack from "webpack";
import type { Configuration } from "webpack";

const HasJsPlugin = require("webpack-hasjs-plugin");
const DojoWebpackPlugin = require("dojo-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

interface PackageJson {
    name: string;
    version: string;
    workspaces?: unknown;
}

type BuildEnv = {
    build?: string;
};

// Read package versions
const pkg = JSON.parse(fs.readFileSync(path.join(__dirname, "package.json"), "utf8")) as PackageJson;

// Find root package.json for BUILD_VERSION
function getRootPackageVersion(): string {
    let currentDir = __dirname;
    for (let i = 0; i < 2; i++) {
        try {
            const pkgPath = path.join(currentDir, "package.json");
            const rootPkg = JSON.parse(fs.readFileSync(pkgPath, "utf8")) as PackageJson;
            if (rootPkg.workspaces) {
                return rootPkg.version;
            }
        } catch {
            // Continue searching
        }
        const parentDir = path.dirname(currentDir);
        if (parentDir === currentDir) {
            break;
        }
        currentDir = parentDir;
    }
    return pkg.version; // Fallback to local version
}

const buildVersion = getRootPackageVersion();

const configFactory = (env?: BuildEnv): Configuration => {
    const isProduction = !env || env.build !== "dev";

    return {
        context: __dirname,
        entry: {
            index: "./lib-cjs/index",
            "index.min": "./lib-cjs/index"
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
                    test: /__package__\.js$/,
                    loader: "string-replace-loader",
                    options: {
                        multiple: [
                            { search: '"__PACKAGE_NAME__"', replace: JSON.stringify(pkg.name), flags: "g" },
                            { search: "'__PACKAGE_NAME__'", replace: JSON.stringify(pkg.name), flags: "g" },
                            { search: '"__PACKAGE_VERSION__"', replace: JSON.stringify(pkg.version), flags: "g" },
                            { search: "'__PACKAGE_VERSION__'", replace: JSON.stringify(pkg.version), flags: "g" },
                            { search: '"__BUILD_VERSION__"', replace: JSON.stringify(buildVersion), flags: "g" },
                            { search: "'__BUILD_VERSION__'", replace: JSON.stringify(buildVersion), flags: "g" }
                        ]
                    }
                },
                {
                    test: /\.(png|jpg|gif)$/,
                    use: [
                        {
                            loader: "url-loader",
                            options: {
                                limit: 100000
                            }
                        }
                    ]
                },
                {
                    test: /\.css$/,
                    use: ["style-loader", "css-loader"]
                },
                {
                    test: /.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
                    use: [
                        {
                            loader: "file-loader",
                            options: {
                                name: "./dist/[name].[ext]"
                            }
                        }
                    ]
                }
            ]
        },
        plugins: [
            new HasJsPlugin({
                features: {
                    touch: false,
                    "dojo-config-api": false,
                    "dojo-trace-api": false,
                    "dojo-log-api": false,
                    "dojo-publish-privates": false,
                    "dojo-sync-loader": false,
                    "dojo-test-sniff": false,
                    "dijit-legacy-requires": false,
                    "dojo-loader": false,
                    "bug-for-in-skips-shadowed": false,
                    "dojo-debug-messages": false,
                    highcontrast: false
                }
            }),
            new DojoWebpackPlugin({
                loaderConfig: require("./src/loaderConfig"),
                environment: { dojoRoot: "./dist" },
                buildEnvironment: { dojoRoot: "../../node_modules" },
                locales: ["en"]
            }),
            new DojoWebpackPlugin.ScopedRequirePlugin(),
            // For plugins registered after the DojoAMDPlugin, data.request has been normalized and
            // resolved to an absMid and loader-config maps and aliases have been applied.
            new webpack.NormalModuleReplacementPlugin(/^dojox\/gfx\/renderer!/, "dojox/gfx/canvas"),
            new webpack.NormalModuleReplacementPlugin(/^css!/, (data: { request: string }) => {
                data.request = data.request.replace(/^css!/, "!style-loader!css-loader!");
            }),
            new webpack.NormalModuleReplacementPlugin(/^xstyle\/css!/, (data: { request: string }) => {
                data.request = data.request.replace(/^xstyle\/css!/, "!style-loader!css-loader!");
            }),
            new webpack.DefinePlugin({
                __PACKAGE_NAME__: JSON.stringify(pkg.name),
                __PACKAGE_VERSION__: JSON.stringify(pkg.version),
                __BUILD_VERSION__: JSON.stringify(buildVersion)
            })
        ],
        resolveLoader: {
            modules: ["../../node_modules"]
        },
        mode: isProduction ? "production" : "development",
        optimization: {
            minimizer: [
                // Match previous behavior: only minify the .min bundle variant.
                new TerserPlugin({
                    test: /\.min\.js$/
                })
            ]
        },
        devtool: "source-map"
    };
};

export default configFactory;