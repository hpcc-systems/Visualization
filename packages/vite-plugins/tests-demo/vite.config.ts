import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import { dojo } from "@hpcc-js/vite-plugins";

const root = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig((env) => {
    // console.log(env);
    const isDev = env.mode === "development";
    return {
        root,
        build: {
            outDir: path.join(root, "dist"),
            emptyOutDir: true,
            rolldownOptions: {
                input: path.join(root, "index.html")
            },
            // dijit's themes carry IE hacks (`#zoom: 1`). lightningcss errors on them, and its
            // errorRecovery drops the whole enclosing rule — which silently breaks dijit layout.
            cssMinify: false
        },
        plugins: [
            dojo({
                loaderConfig: {
                    baseUrl: ".",
                    paths: { app: "src" },
                    packages: [
                        { name: "dojo", location: "./node_modules/dojo" },
                        { name: "dijit", location: "./node_modules/dijit" },
                        { name: "dojox", location: "./node_modules/dojox" }
                    ]
                },
                // dijit drags in the full CLDR set otherwise; without this every locale is bundled.
                locales: ["en", "de"]
            })
        ]
    };
});
