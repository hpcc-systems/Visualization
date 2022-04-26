/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const { build } = require("esbuild");
const path = require("path");

function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function resolver(options) {
    const aliases = Object.keys(options);
    const re = new RegExp(`^(${aliases.map(x => escapeRegExp(x)).join("|")})$`);

    return {
        name: "resolver",
        setup(build) {

            build.onResolve({ filter: /^@hpcc-js\/wc-/ }, args => {
                const package = args.path.replace("@hpcc-js/wc-", "");
                const aliasPath = path.join(__dirname, "components", package, "/src/index.ts");
                return {
                    path: aliasPath
                };
            });

            build.onResolve({ filter: /^@hpcc-js\// }, args => {
                const package = args.path.replace("@hpcc-js/", "");
                const aliasPath = path.join(__dirname, "packages", package, "/src/index.ts");
                return {
                    path: aliasPath
                };
            });

            build.onResolve({ filter: re }, args => {
                return {
                    path: options[args.path],
                };
            });
        },
    };
}

function doBuild(input, output, format) {
    build({
        entryPoints: [input],
        outfile: output,
        target: "es2019",
        bundle: true,
        format: format ? format : "esm",
        minify: true,
        sourcemap: true,
        plugins: [
            resolver({
                "react": require.resolve("preact/compat"),
                "react-dom/test-utils": require.resolve("preact/test-utils"),
                "react-dom": require.resolve("preact/compat"),
                "react/jsx-runtime": require.resolve("preact/jsx-runtime"),
            }),
        ]
    }).catch((err) => {
        console.error(err);
        process.exit(1);
    });
}

//  Vitepress hosted components  ---
doBuild("src/index.ts", ".vitepress/dist/assets/index.js");

//  Preview hosted components  ---
doBuild("components/editor/src/index.ts", ".vitepress/dist/assets/wc-editor.js");
doBuild("components/layout/src/index.ts", ".vitepress/dist/assets/wc-layout.js");
doBuild("components/preview/src/index.ts", ".vitepress/dist/assets/wc-preview.js");
doBuild("packages/chart/src/index.ts", ".vitepress/dist/assets/chart.js");
doBuild("packages/dgrid2/src/index.ts", ".vitepress/dist/assets/dgrid2.js");
doBuild("packages/observable-md/src/index.ts", ".vitepress/dist/assets/observable-md.js");

// doBuild("components/core/src/index.ts", ".vitepress/dist/assets/wc-core.js");
// doBuild("packages/codemirror/src/index.ts", ".vitepress/dist/assets/codemirror.js");
// doBuild("packages/dgrid/src/index.ts", ".vitepress/dist/assets/dgrid.js");
// doBuild("packages/dgrid2/src/index.ts", ".vitepress/dist/assets/dgrid2.js");
// doBuild("packages/graph/src/index.ts", ".vitepress/dist/assets/graph.js");
// doBuild("packages/layout/src/index.ts", ".vitepress/dist/assets/layout.js");
// doBuild("packages/map/src/index.ts", ".vitepress/dist/assets/map.js");
// doBuild("packages/map-deck/src/index.ts", ".vitepress/dist/assets/map-deck.js");
// doBuild("packages/observable-md/src/index.ts", ".vitepress/dist/assets/observable-md.js");
// doBuild("packages/react/src/index.ts", ".vitepress/dist/assets/react.js");
// doBuild("packages/timeline/src/index.ts", ".vitepress/dist/assets/timeline.js");
// doBuild("packages/tree/src/index.ts", ".vitepress/dist/assets/tree.js");
