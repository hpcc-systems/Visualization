import { createHpccViteConfig, browserConfig, nodeConfig } from "@hpcc-js/esbuild-plugins";
import pkg from "./package.json" with { type: "json" };

const aliasPlugin = {
    name: "alias-plugin",
    // esbuild plugin interface
    setup(build) {
        const aliases = [
            {
                find: /^npm:(.*)$/,
                replacement: "https://cdn.jsdelivr.net/npm/$1/+esm"
            },
            {
                find: /^jsr:(.*)$/,
                replacement: "https://esm.sh/jsr/$1"
            }
        ];

        build.onResolve({ filter: /^(npm|jsr):/ }, args => {
            for (const alias of aliases) {
                const match = args.path.match(alias.find);
                if (match) {
                    const resolved = alias.replacement.replace("$1", match[1]);
                    return { path: resolved, external: true };
                }
            }
        });
    },
    // Rollup plugin interface
    resolveId(id, importer) {
        const aliases = [
            {
                find: /^npm:(.*)$/,
                replacement: "https://cdn.jsdelivr.net/npm/$1/+esm"
            },
            {
                find: /^jsr:(.*)$/,
                replacement: "https://esm.sh/jsr/$1"
            }
        ];

        for (const alias of aliases) {
            const match = id.match(alias.find);
            if (match) {
                const resolved = alias.replacement.replace("$1", match[1]);
                return { id: resolved, external: true };
            }
        }
        return null;
    }
};

const myBrowserConfig = { ...browserConfig };
myBrowserConfig.optimizeDeps = {
    include: [
        "acorn",
        "acorn-walk",
        "@observablehq/parser",
        "@observablehq/stdlib",
        "@observablehq/runtime",
        "@observablehq/inspector"
    ]
};

const myNodeConfig = { ...nodeConfig };
myNodeConfig.optimizeDeps = {
    include: ["acorn", "acorn-walk", "@observablehq/parser"]
};

const config = createHpccViteConfig(pkg, {
    plugins: [aliasPlugin],
    configOverrides: {
        // Ensure modern syntax like top-level await is supported during transforms
        esbuild: {
            target: "esnext",
            supported: { "top-level-await": true }
        },
        // Make sure dependency optimization (esbuild) also understands our custom schemes
        optimizeDeps: {
            esbuildOptions: {
                target: "esnext",
                supported: { "top-level-await": true },
                plugins: [aliasPlugin as any]
            }
        },
        build: {
            target: "esnext",
            rollupOptions: {
                external: [
                    "@observablehq/notebook-kit",
                    "@observablehq/notebook-kit/runtime"
                ],
                output: {
                    globals: {
                        "@observablehq/notebook-kit": "ObservableNotebookKit",
                        "@observablehq/notebook-kit/runtime": "ObservableNotebookKitRuntime"
                    }
                }
            }
        },
        test: {
            projects: [myBrowserConfig, myNodeConfig],
            deps: {
                optimizer: {
                    web: {
                        exclude: [
                            "@observablehq/notebook-kit",
                            "@observablehq/notebook-kit/runtime"
                        ],
                        esbuildOptions: {
                            target: "esnext",
                            supported: { "top-level-await": true },
                            plugins: [aliasPlugin as any]
                        }
                    },
                    ssr: {
                        exclude: [
                            "@observablehq/notebook-kit",
                            "@observablehq/notebook-kit/runtime"
                        ],
                        esbuildOptions: {
                            target: "esnext",
                            supported: { "top-level-await": true },
                            plugins: [aliasPlugin as any]
                        }
                    }
                }
            },
            alias: {
                // Use local stubs to avoid loading notebook-kit in tests
                "@observablehq/notebook-kit": "/tests/mocks/notebook-kit.stub.ts",
                "@observablehq/notebook-kit/runtime": "/tests/mocks/notebook-kit.stub.ts"
            }
        }
    }
});

export default {
    ...config
};
