import { browserTpl, nodeTpl } from "@hpcc-js/esbuild-plugins";
import pkg from "./package.json" with { type: "json" };

//  config  ---
await Promise.all([
    nodeTpl("src/index.node.ts", "dist/index.node"),
    browserTpl("src/index.ts", "dist/index", {
        keepNames: true,
        external: [
            ...Object.keys(pkg.dependencies),
        ]
    }),
    nodeTpl("utils/index.ts", "lib-esm/index")
]);
