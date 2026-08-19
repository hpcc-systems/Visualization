import { createHpccViteConfig } from "@hpcc-js/vite-plugins";
import pkg from "./package.json" with { type: "json" };

export default createHpccViteConfig(pkg, {
    configOverrides: {
        build: {
            lib: {
                entry: "src/index.browser.ts",
                fileName: "browser/index"
            }
        },
        test: {
            testTimeout: 30000
        }
    }
});