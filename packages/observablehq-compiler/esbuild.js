import { nodeBoth } from "@hpcc-js/esbuild-plugins";

//  config  ---
await Promise.all([
    nodeBoth("src/index.ts", "dist/node/index", {
        packages: "external",
        external: ["node:*"]
    })
]);
