import { createHpccViteConfig } from "@hpcc-js/vite-plugins";
import pkg from "./package.json" with { type: "json" };

export default createHpccViteConfig(pkg, {
    entry: "src/index.node.ts",
    external: [
        "node:buffer",
        "node:child_process",
        "node:crypto",
        "node:fs",
        "node:os",
        "node:path",
        "node:https"
    ],
    configOverrides: {
        build: {
            outDir: "dist",
            lib: {
                entry: "src/index.node.ts",
                formats: ["es", "cjs"],
                fileName: format => `node/index.${format === "es" ? "js" : "cjs"}`
            }
        }
    }
});