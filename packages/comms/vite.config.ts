import { createHpccViteConfig } from "@hpcc-js/esbuild-plugins";
import pkg from "./package.json" with { type: "json" };

export default createHpccViteConfig(pkg, {
    entry: "src/index.browser.ts",
    configOverrides: {
        build: {
            lib: {
                fileName: "browser/index"
            }
        }
    }
});