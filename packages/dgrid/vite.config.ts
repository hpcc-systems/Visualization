import { resolve } from "node:path";
import { createHpccViteConfig } from "@hpcc-js/esbuild-plugins";
import pkg from "./package.json" with { type: "json" };

export default createHpccViteConfig(pkg, {
    configOverrides: {
        root: resolve(__dirname, ".."),
        build: {
            outDir: resolve(__dirname, "dist"),
            lib: {
                entry: resolve(__dirname, "src/index.ts"),
            }
        }
    }
});