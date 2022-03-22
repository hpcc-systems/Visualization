/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const { build } = require("esbuild");

function doBuild(input, output, format) {
    build({
        entryPoints: [input],
        outfile: output,
        target: "es2020",
        bundle: true,
        format: format ? format : "esm",
    }).catch((err) => {
        console.error(err);
        process.exit(1);
    });
}

//  Vitepress hosted components  ---
doBuild("src/index.ts", ".vitepress/dist/assets/index.js");

//  Preview hosted components  ---
doBuild("components/core/src/index.ts", ".vitepress/dist/assets/wc-core.js");
doBuild("components/editor/src/index.ts", ".vitepress/dist/assets/wc-editor.js");
doBuild("components/layout/src/index.ts", ".vitepress/dist/assets/wc-layout.js");
doBuild("components/preview/src/index.ts", ".vitepress/dist/assets/wc-preview.js");
doBuild("packages/chart/dist/index.es6.js", ".vitepress/dist/assets/chart.js");
doBuild("packages/codemirror/dist/index.es6.js", ".vitepress/dist/assets/codemirror.js");
doBuild("packages/dgrid/dist/index.es6.js", ".vitepress/dist/assets/dgrid.js");
doBuild("packages/fgrid/dist/index.es6.js", ".vitepress/dist/assets/fgrid.js");
doBuild("packages/graph/dist/index.es6.js", ".vitepress/dist/assets/graph.js");
doBuild("packages/layout/dist/index.es6.js", ".vitepress/dist/assets/layout.js");
doBuild("packages/map/dist/index.es6.js", ".vitepress/dist/assets/map.js");
doBuild("packages/map-deck/dist/index.es6.js", ".vitepress/dist/assets/map-deck.js");
doBuild("packages/observable-md/dist/index.es6.js", ".vitepress/dist/assets/observable-md.js");
doBuild("packages/react/dist/index.es6.js", ".vitepress/dist/assets/react.js");
doBuild("packages/timeline/dist/index.es6.js", ".vitepress/dist/assets/timeline.js");
doBuild("packages/tree/dist/index.es6.js", ".vitepress/dist/assets/tree.js");
