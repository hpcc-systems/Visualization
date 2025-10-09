import { nodeTpl, nodeBoth } from "@hpcc-js/esbuild-plugins";
import pkg from "./package.json" with { type: "json" };

//  config  ---
await Promise.all([
    nodeBoth("src/index.node.ts", "dist/node/index", {
        packages: "bundle",
        external: [
            ...Object.keys(pkg.dependencies || {}),
            ...Object.keys(pkg.peerDependencies || {}),
            "node:*"
        ]
    }),
    nodeTpl("utils/index.ts", "lib-esm/index")
]);
