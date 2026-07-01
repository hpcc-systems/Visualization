import { configDefaults, defineConfig, ViteUserConfig } from "vitest/config";
import { playwright } from "@vitest/browser-playwright";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";
import type { ResolvedConfig } from "vite";
import { packageVersionPlugin } from "./package-version-plugin.ts";
import { readFileSync } from "fs";
import { cp } from "fs/promises";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const alias = {
    "d3-array": "@hpcc-js/common",
    "d3-brush": "@hpcc-js/common",
    "d3-collection": "@hpcc-js/common",
    "d3-color": "@hpcc-js/common",
    "d3-dispatch": "@hpcc-js/common",
    "d3-drag": "@hpcc-js/common",
    "d3-dsv": "@hpcc-js/common",
    "d3-ease": "@hpcc-js/common",
    "d3-format": "@hpcc-js/common",
    "d3-interpolate": "@hpcc-js/common",
    "d3-scale": "@hpcc-js/common",
    "d3-selection": "@hpcc-js/common",
    "d3-time-format": "@hpcc-js/common",
    "d3-transition": "@hpcc-js/common",
    "d3-zoom": "@hpcc-js/common"
};

/**
 * Find and read the root package.json (monorepo root)
 * Walks up the directory tree looking for a package.json with "workspaces"
 */
function getRootPackageVersion(): string {
    try {
        // Try to find root package.json by walking up from current file
        let currentDir = dirname(fileURLToPath(import.meta.url));
        let attempts = 0;
        const maxAttempts = 10;

        while (attempts < maxAttempts) {
            try {
                const pkgPath = resolve(currentDir, "package.json");
                const pkgContent = readFileSync(pkgPath, "utf-8");
                const pkg = JSON.parse(pkgContent);

                // Check if this is the root by looking for workspaces
                if (pkg.workspaces) {
                    return pkg.version;
                }
            } catch {
                // File doesn't exist or couldn't be read, continue up
            }

            const parentDir = dirname(currentDir);
            if (parentDir === currentDir) {
                // Reached filesystem root
                break;
            }
            currentDir = parentDir;
            attempts++;
        }
    } catch (error) {
        console.warn("Could not read root package.json, using package version as build version:", error);
    }

    return "";
}

export function hpccBundleNames(pkg: any) {
    const external: string[] = [];
    const globals: { [id: string]: string } = {};
    for (const dep in pkg.dependencies ?? {}) {
        external.push(dep);
        globals[dep] = dep;
    }
    for (const dep in pkg.peerDependencies ?? {}) {
        external.push(dep);
        globals[dep] = dep;
    }
    return { alias: (pkg.name !== "@hpcc-js/common" && pkg.dependencies?.["@hpcc-js/common"]) ? alias : {}, external, globals };
}

const commonCoverageConfig = {
    reporter: ["text", "json", "html"],
    exclude: [
        ...configDefaults.coverage.exclude || [],
        "**/*.spec.ts",
        "**/*.test.ts",
        "**/tests/**",
        "**/dist/**",
        "**/lib-*/**",
        "**/types/**",
    ]
};

export interface ViteHpccConfigOptions {
    /**
     * Additional external items
     */
    external?: string[];
    /**
     * Additional plugins to include in the configuration
     */
    plugins?: any[];
    /**
     * Whether to include font-awesome static copy (used by @hpcc-js/common)
     */
    includeFontAwesome?: boolean;
    /**
     * Custom entry point (defaults to "src/index.ts")
     */
    entry?: string;
    /**
     * Additional vite config options to merge
     */
    configOverrides?: Partial<ViteUserConfig>;
}

export const nodeConfig = defineConfig({
    test: {
        name: "node",

        exclude: [
            ...configDefaults.exclude,
            "**/*.browser.spec.{ts,js}",
            "**/node_modules/**",
            "**/.nx/**",
            "**/apps/**",
            "**/components/**",
            "**/demos/**",
        ],
        environment: "node",
        setupFiles: [],
        coverage: {
            provider: "v8",
            ...commonCoverageConfig
        }
    }
});

export const browserConfig = defineConfig({
    test: {
        exclude: [
            ...configDefaults.exclude,
            "@hpcc-js/dgrid-shim",
            "**/*.node.spec.{ts,js}",
            "**/node_modules/**",
            "**/.nx/**",
            "**/apps/**",
            "**/components/**",
            "**/demos/**",
            "**/src/**",
        ],
        browser: {
            enabled: true,
            provider: playwright({
                launchOptions: {
                    args: ["--disable-web-security"],
                }
            }),
            instances: [{
                name: "chromium",
                browser: "chromium",
                headless: true,
            }],
            screenshotFailures: false,
        },
        setupFiles: [],
        coverage: {
            provider: "istanbul",
            ...commonCoverageConfig
        }
    }
});

/**
 * Strips AMD detection (`typeof define === 'function' && define.amd`) from CJS/UMD files
 * in node_modules before they are bundled.
 *
 * Rolldown (Vite 8) wraps bundled CJS node_modules with `__commonJSMin()`, which preserves
 * any inner UMD boilerplate including AMD checks. When webpack consumers later process the
 * resulting UMD bundle, their AMD interop compiles `typeof define === 'function' && define.amd`
 * to `true`, causing the inner `define()` to fire and overwrite `module.exports` with the CJS
 * library value — corrupting the outer package's exports.
 *
 * Replacing the AMD check with `false` before bundling forces only the CJS path
 * (`typeof exports === 'object'`), which is the correct path inside a `__commonJSMin` wrapper.
 */
function stripNodeModulesAmdPlugin() {
    return {
        name: "hpcc:strip-node-modules-amd",
        transform(code: string, id: string) {
            if (!id.includes("node_modules")) return null;
            if (!code.includes("define.amd")) return null;
            return {
                code: code.replace(
                    /typeof\s+define\s*===?\s*['"]function['"]\s*&&\s*define\.amd/g,
                    "false"
                ),
                map: null,
            };
        },
    };
}

export function createHpccViteConfig(pkg: any, options: ViteHpccConfigOptions = {}): ViteUserConfig {
    const {
        external: additionalExternal = [],
        plugins: additionalPlugins = [],
        includeFontAwesome = false,
        entry = "src/index.ts",
        configOverrides = {},
    } = options;

    const { alias, external, globals } = hpccBundleNames(pkg);
    const allExternals = [...external, ...additionalExternal];

    // Get build version from root package.json
    const buildVersion = getRootPackageVersion() || pkg.version;

    const allPlugins = [
        packageVersionPlugin({ pkg, buildVersion }),
        cssInjectedByJsPlugin({
            topExecutionPriority: false
        }),
        stripNodeModulesAmdPlugin(),
        ...additionalPlugins
    ];

    if (includeFontAwesome) {
        let faRoot: string;
        let faDestRoot: string;
        allPlugins.push({
            name: "copy-font-awesome",
            apply: "build" as const,
            configResolved(config: ResolvedConfig) {
                faRoot = resolve(config.root, "../../node_modules/font-awesome");
                faDestRoot = resolve(config.root, config.build.outDir, "../font-awesome");
            },
            async closeBundle() {
                await cp(`${faRoot}/fonts`, `${faDestRoot}/fonts`, { recursive: true });
                await cp(`${faRoot}/css`, `${faDestRoot}/css`, { recursive: true });
            }
        });
    }

    const defaultLibConfig = {
        entry,
        name: pkg.name,
        fileName: "index",
    };

    const config: ViteUserConfig = {
        build: {
            lib: {
                ...defaultLibConfig,
                ...(configOverrides.build?.lib || {})
            },
            rolldownOptions: {
                external: allExternals,
                output: {
                    globals,
                    keepNames: true,
                },
                ...(configOverrides.build?.rolldownOptions || {})
            },
            sourcemap: true,
            ...(configOverrides.build ? Object.fromEntries(Object.entries(configOverrides.build).filter(([key]) => key !== "lib" && key !== "rolldownOptions")) : {})
        },
        resolve: {
            alias,
            ...(configOverrides.resolve || {})
        },
        plugins: allPlugins,
        // Rolldown 1.1.x (Vite 8.1+) changed the default JSX transform to "automatic",
        // which injects `import { jsx } from 'react/jsx-runtime'` and bundles it when not
        // listed as external. All tsx files in this repo use the classic pattern (React.*
        // imported from @hpcc-js/react / preact), matching tsconfig "jsx": "react".
        // Use the native oxc option (esbuild is @deprecated in Vite 8.x).
        oxc: {
            jsx: { runtime: "classic" },
            ...(configOverrides.oxc || {})
        },
        test: {
            projects: [nodeConfig, browserConfig],
            ...(configOverrides.test || {})
        },
        ...Object.fromEntries(Object.entries(configOverrides).filter(([key]) => !["build", "resolve", "plugins", "oxc"].includes(key)))
    };

    return defineConfig(config);
}