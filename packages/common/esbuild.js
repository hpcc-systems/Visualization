import { browserTpl, copyStaticFiles } from "@hpcc-js/esbuild-plugins";

//  config  ---
browserTpl("src/index.ts", "dist/index", {
    keepNames: true,
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