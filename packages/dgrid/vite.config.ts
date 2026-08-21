import { resolve } from "node:path";
import { createHpccViteConfig, browserConfig } from "@hpcc-js/vite-plugins";
import pkg from "./package.json" with { type: "json" };

const myBrowserConfig = { ...browserConfig };
myBrowserConfig.test!.include = ["./tests/*.spec.ts"];

export default createHpccViteConfig(pkg, {
    configOverrides: {
        root: __dirname,
        build: {
            outDir: resolve(__dirname, "dist"),
            lib: {
                entry: resolve(__dirname, "src/index.ts"),
            }
        },
        test: {
            projects: [myBrowserConfig]
        }
    }
});