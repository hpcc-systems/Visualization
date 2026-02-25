import { resolve } from "node:path";
import { createHpccViteConfig, browserConfig, hpccBundleNames } from "@hpcc-js/esbuild-plugins";
import pkg from "./package.json" with { type: "json" };

const myBrowserConfig = { ...browserConfig };
myBrowserConfig.test!.include = ["./dgrid/tests/*.spec.ts"];

const { external } = hpccBundleNames(pkg);
const dgridExternals = external.filter(dep => dep !== "@hpcc-js/dgrid-shim");

export default createHpccViteConfig(pkg, {
    configOverrides: {
        root: resolve(__dirname, ".."),
        build: {
            outDir: resolve(__dirname, "dist"),
            lib: {
                entry: resolve(__dirname, "src/index.ts"),
            },
            rollupOptions: {
                external: dgridExternals
            }
        },
        test: {
            projects: [myBrowserConfig]
        }
    }
});