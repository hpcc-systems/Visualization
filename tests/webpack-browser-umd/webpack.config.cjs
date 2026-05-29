// @ts-check
const path = require("path");

/**
 * Webpack config producing self-contained UMD bundles for @hpcc-js/layout and
 * @hpcc-js/eclwatch.  UMD output is inherently AMD-compatible: when a compliant
 * AMD loader is detected (define.amd), the bundle registers itself via define().
 *
 * conditionNames forces webpack to resolve package "exports" via the "require"
 * condition so the pre-built UMD CJS files are consumed rather than the ESM
 * files (which would cause named-export mismatches at bundle time).
 */

/** @type {import("webpack").Configuration[]} */
module.exports = [
    {
        name: "layout",
        mode: "development",
        entry: "./src/layout-entry.cjs",
        output: {
            path: path.resolve(__dirname, "public"),
            filename: "layout.bundle.js",
            library: {
                name: "HpccLayout",
                type: "umd",
                umdNamedDefine: true,
            },
            globalObject: "window",
        },
        resolve: {
            conditionNames: ["require", "browser", "default"],
            extensions: [".cjs", ".js", ".mjs"],
        },
    },
    {
        name: "eclwatch",
        mode: "development",
        entry: "./src/eclwatch-entry.cjs",
        output: {
            path: path.resolve(__dirname, "public"),
            filename: "eclwatch.bundle.js",
            library: {
                name: "HpccEclwatch",
                type: "umd",
                umdNamedDefine: true,
            },
            globalObject: "window",
        },
        resolve: {
            conditionNames: ["require", "browser", "default"],
            extensions: [".cjs", ".js", ".mjs"],
        },
    },
];
