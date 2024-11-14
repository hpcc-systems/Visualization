import { browserTpl } from "@hpcc-js/esbuild-plugins";
import pkg from "./package.json" with { type: "json" };

//  config  ---
await Promise.all([
    browserTpl("src/index.ts", "dist/index", {
        keepNames: true,
        external: [
            ...Object.keys(pkg.dependencies),
        ]
    })
]);
