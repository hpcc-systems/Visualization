import { resolve } from "node:path";
import { createHpccViteConfig, browserConfig } from "@hpcc-js/esbuild-plugins";
import pkg from "./package.json" with { type: "json" };

const myBrowserConfig = { ...browserConfig };
myBrowserConfig.test!.include = ["./dgrid/tests/*.spec.ts"];

const isProdBuild = process.argv.includes("build") && !process.argv.includes("--watch");

export default createHpccViteConfig(pkg, {
    configOverrides: {
        root: resolve(__dirname, ".."),
        build: {
            outDir: resolve(__dirname, "dist"),
            lib: {
                entry: resolve(__dirname, "src/index.ts"),
            }
        },
        resolve: {
            alias: isProdBuild ? [{
                find: "@hpcc-js/dgrid-shim/dist/index.js?raw",
                replacement: "@hpcc-js/dgrid-shim/dist/index.min.js?raw"
            }] : []
        },
        test: {
            projects: [myBrowserConfig]
        }
    }
});