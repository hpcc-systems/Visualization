import { defineConfig } from "vite";
import { resolve } from "path";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";
import { hpccBundleNames } from "@hpcc-js/esbuild-plugins";
import pkg from "./package.json" with { type: "json" };

const { alias, external, globals } = hpccBundleNames(pkg);

export default defineConfig({
    // Setting root to the `Visualizations/packages` folder to simplify debugging of dgrid-shim
    root: resolve(__dirname, ".."),
    build: {
        outDir: resolve(__dirname, "dist"),
        lib: {
            entry: resolve(__dirname, "src/index.ts"),
            name: pkg.name,
            fileName: "index",
        },
        rollupOptions: {
            external,
            output: {
                globals,
            },
        },
        sourcemap: true
    },
    resolve: {
        alias
    },
    esbuild: {
        minifyIdentifiers: false
    },
    plugins: [
        cssInjectedByJsPlugin()
    ],
});
