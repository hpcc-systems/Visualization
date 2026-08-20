import { resolve } from "node:path";
import { createHpccViteConfig, dojo } from "@hpcc-js/vite-plugins";
import pkg from "./package.json" with { type: "json" };
import getLoaderConfig from "./src/loaderConfig.cjs";

export default createHpccViteConfig(pkg, {
    plugins: [
        dojo({
            loaderConfig: getLoaderConfig,
            environment: { dojoRoot: "./dist" },
            buildEnvironment: { dojoRoot: "../../node_modules" },
            locales: ["en"],
            coerceUndefinedToFalse: true
        })
    ],
    configOverrides: {
        build: {
            // A self-contained global bundle: loaded via <script> (index.html) and inlined
            // as raw text + eval'd by @hpcc-js/dgrid (see its src/dgrid-shim.ts).
            lib: {
                entry: resolve(import.meta.dirname, "src/index.ts"),
                name: pkg.name,
                formats: ["umd"],
                fileName: () => "index.js"
            }
        }
    }
});
