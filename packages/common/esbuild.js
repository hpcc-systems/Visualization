import { browserTpl, copyStaticFiles } from "@hpcc-js/esbuild-plugins";
import pkg from "./package.json" with { type: "json" };

//  config  ---
browserTpl("src/index.ts", "dist/index", {
    keepNames: true,
    external: [
        ...Object.keys(pkg.dependencies),
    ],
    plugins: [
        copyStaticFiles({
            src: "../../node_modules/font-awesome/fonts",
            dest: "./font-awesome/fonts",
            recursive: true
        }, {
            src: "../../node_modules/font-awesome/css",
            dest: "./font-awesome/css",
            recursive: true
        })
    ]
});