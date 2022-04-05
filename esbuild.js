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
doBuild("packages/chart/src/index.ts", ".vitepress/dist/assets/chart.js");
doBuild("packages/codemirror/src/index.ts", ".vitepress/dist/assets/codemirror.js");
doBuild("packages/dgrid/src/index.ts", ".vitepress/dist/assets/dgrid.js");
doBuild("packages/fgrid/src/index.ts", ".vitepress/dist/assets/fgrid.js");
doBuild("packages/graph/src/index.ts", ".vitepress/dist/assets/graph.js");
doBuild("packages/layout/src/index.ts", ".vitepress/dist/assets/layout.js");
doBuild("packages/map/src/index.ts", ".vitepress/dist/assets/map.js");
doBuild("packages/map-deck/src/index.ts", ".vitepress/dist/assets/map-deck.js");
doBuild("packages/observable-md/src/index.ts", ".vitepress/dist/assets/observable-md.js");
doBuild("packages/react/src/index.ts", ".vitepress/dist/assets/react.js");
doBuild("packages/timeline/src/index.ts", ".vitepress/dist/assets/timeline.js");
doBuild("packages/tree/src/index.ts", ".vitepress/dist/assets/tree.js");
