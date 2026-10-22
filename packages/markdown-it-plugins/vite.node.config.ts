import { createHpccViteConfig } from "@hpcc-js/vite-plugins";
import pkg from "./package.json" with { type: "json" };

export default createHpccViteConfig(pkg, {
    external: [
        "node:child_process",
        "node:fs",
        "node:fs/promises",
        "node:path"
    ],
    configOverrides: {
        build: {
            lib: {
                entry: {
                    "loader.node": "src/loader.ts",
                    "ecl-lang": "src/ecl-lang/index.ts"
                },
                formats: ["es"],
                fileName: (_format, entryName) => `${entryName}.js`
            }
        }
    }
});
