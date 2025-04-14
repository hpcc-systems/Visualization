import { defineConfig } from "vite";
import { resolve } from "path";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";
import { hpccBundleNames } from "@hpcc-js/esbuild-plugins";
import pkg from "./package.json" with { type: "json" };

const { alias, external, globals } = hpccBundleNames(pkg);

export default defineConfig({
    build: {
        lib: {
            entry: resolve(__dirname, "src/index.ts"),
            name: pkg.name,
            fileName: "index",
        },
        rollupOptions: {
            external: [...external, "react", "react-dom"],
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
