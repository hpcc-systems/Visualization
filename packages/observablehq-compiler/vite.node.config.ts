import { createHpccViteConfig } from "@hpcc-js/vite-plugins";
import pkg from "./package.json" with { type: "json" };

export default createHpccViteConfig(pkg, {
    configOverrides: {
        build: {
            lib: {
                entry: "src/index.ts",
                formats: ["es", "cjs"],
                fileName: format => `node/index.${format === "es" ? "js" : "cjs"}`
            }
        }
    }
});
