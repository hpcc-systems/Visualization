import { defineConfig, normalizePath } from "vite";
import { resolve } from "path";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";
import { viteStaticCopy } from "vite-plugin-static-copy";
import { hpccBundleNames } from "@hpcc-js/esbuild-plugins";

import pkg from "./package.json" with { type: "json" };

const { alias, external, globals } = hpccBundleNames(pkg);

export default defineConfig({
    build: {
        lib: {
            entry: normalizePath(resolve(__dirname, "src/index.ts")),
            name: pkg.name,
            fileName: "index",
        },
        rollupOptions: {
            external,
            output: {
                globals,
            },
        },
    },
    resolve: {
        alias
    },
    esbuild: {
        minifyIdentifiers: false,
    },
    plugins: [
        cssInjectedByJsPlugin(),
        viteStaticCopy({
            targets: [
                {
                    src: "../../node_modules/font-awesome/fonts",
                    dest: "../font-awesome"

                }, {
                    src: "../../node_modules/font-awesome/css",
                    dest: "../font-awesome",
                }
            ]
        })
    ],
});
