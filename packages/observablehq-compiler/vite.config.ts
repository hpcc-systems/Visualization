import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { defineConfig } from "vite";
import topLevelAwait from "vite-plugin-top-level-await";
import { createHpccViteConfig, browserConfig, nodeConfig } from "@hpcc-js/esbuild-plugins";

import pkg from "./package.json" with { type: "json" };

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

interface NpmSpecifier {
    /** a package name, such as "d3" */
    name: string;
    /** at sign and semver range, such as "@7", or the empty string */
    range: string;
    /** slash and path, such as "/foo", or the empty string */
    path: string;
}

/** Note: specifier here does not start with `npm:`. */
function parseNpmSpecifier(specifier: string): NpmSpecifier {
    const parts = specifier.split("/");
    const namerange = specifier.startsWith("@")
        ? [parts.shift()!, parts.shift()!].join("/")
        : parts.shift()!;
    const ranged = namerange.indexOf("@", 1);
    const name = ranged > 0 ? namerange.slice(0, ranged) : namerange;
    const range = ranged > 0 ? namerange.slice(ranged) : "";
    const path = parts.length > 0 ? `/${parts.join("/")}` : "";
    return { name, range, path };
}

function getDefaultRange(name: string): string {
    switch (name) {
        case "@duckdb/duckdb-wasm":
            return "@1.29.0"; // https://github.com/duckdb/duckdb-wasm/issues/1994
        case "apache-arrow":
            return "@17.0.0"; // to match @duckdb/duckdb-wasm 1.29.0
        default:
            return "";
    }
}

function getDefaultPath(name: string): string {
    switch (name) {
        case "mermaid":
            return "/dist/mermaid.esm.min.mjs/+esm";
        case "echarts":
            return "/dist/echarts.esm.min.js/+esm";
        case "jquery-ui":
            return "/dist/jquery-ui.js/+esm";
        case "deck.gl":
            return "/dist.min.js/+esm";
        case "react-dom":
            return "/client/+esm";
        default:
            return "/+esm";
    }
}

/** If specifier is an npm: protocol import, resolves it. */
export function resolveNpmImport(specifier: string): string {
    if (!specifier.startsWith("npm:")) return specifier;
    const { name, range, path } = parseNpmSpecifier(specifier.slice(4));
    return `https://cdn.jsdelivr.net/npm/${name}${range || getDefaultRange(name)
        }${path
            ? !/(\.\w+|\/|\/\+esm)$/.test(path) // if not file, directory, or /+esm
                ? `${path}/+esm` // then append /+esm
                : path // otherwise keep as-is
            : getDefaultPath(name)
        }`;
}

export default defineConfig(({ command }) => {
    const cfg = createHpccViteConfig(pkg, {
        configOverrides: {
            resolve: {
                alias: [
                    {
                        find: /^(npm:.*)$/,
                        replacement: "$1",
                        customResolver: (source) => ({ id: resolveNpmImport(source), external: true })
                    },
                    {
                        find: /^jsr:(.*)$/,
                        replacement: "https://esm.sh/jsr/$1"
                    },
                    {
                        find: /^observable:(.*)$/,
                        replacement: resolve(__dirname, "../$1")
                    }
                ]
            },
            plugins: [
                topLevelAwait({
                    promiseExportName: "__tla",
                    promiseImportName: (i) => `__tla_${i}`
                })
            ],
            esbuild: {
                target: "esnext",
                supported: { "top-level-await": true }
            },
            optimizeDeps: {
                esbuildOptions: {
                    target: "esnext",
                    supported: { "top-level-await": true }
                }
            },
            build: {
                target: "esnext"
            }
        }
    });
    return cfg;
});