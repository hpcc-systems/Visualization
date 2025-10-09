import { nodeTpl } from "@hpcc-js/esbuild-plugins";
import pkg from "./package.json" with { type: "json" };

//  config  ---
await Promise.all([
    nodeTpl("src/loader.ts", "dist/loader.node", {
        packages: "bundle",
        supported: { "dynamic-import": true },
        external: [
            ...Object.keys(pkg.dependencies || {}),
            ...Object.keys(pkg.peerDependencies || {}),
            "node:*"
        ]
    }),
    nodeTpl("src/ecl-lang/index.ts", "dist/ecl-lang", {
        packages: "bundle",
        external: [
            ...Object.keys(pkg.dependencies || {}),
            ...Object.keys(pkg.peerDependencies || {}),
            "node:*"
        ]
    }),
]);
