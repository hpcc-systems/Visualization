import { configDefaults, defineConfig, ViteUserConfig } from "vitest/config";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";
import { viteStaticCopy } from "vite-plugin-static-copy";
import { packageVersionPlugin } from "./package-version-plugin.ts";
import { readFileSync } from "fs";
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
        setupFiles: []
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
            provider: "playwright",
            instances: [{
                name: "chromium",
                browser: "chromium",
                headless: true,
                //@ts-expect-error
                launch: {
                    args: ["--disable-web-security"],
                }
            }],
            screenshotFailures: false,
        },
        setupFiles: [],
    }
});

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
        ...additionalPlugins
    ];

    if (includeFontAwesome) {
        allPlugins.push(
            viteStaticCopy({
                targets: [
                    {
                        src: "../../node_modules/font-awesome/fonts",
                        dest: "../font-awesome"
                    }, {
                        src: "../../node_modules/font-awesome/css",
                        dest: "../font-awesome",
                    }
                ]
            })
        );
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
            rollupOptions: {
                external: allExternals,
                output: {
                    globals,
                },
                ...(configOverrides.build?.rollupOptions || {})
            },
            // Preserve class names and function names in minified output
            minify: "terser",
            terserOptions: {
                keep_classnames: true,
                mangle: {
                    keep_classnames: true,
                }
            },
            sourcemap: true,
            ...(configOverrides.build ? Object.fromEntries(Object.entries(configOverrides.build).filter(([key]) => key !== "lib" && key !== "rollupOptions")) : {})
        },
        resolve: {
            alias,
            ...(configOverrides.resolve || {})
        },
        esbuild: {
            keepNames: true,
            ...(configOverrides.esbuild || {})
        },
        plugins: allPlugins,
        test: {
            projects: [nodeConfig, browserConfig],
            ...(configOverrides.test || {})
        },
        ...Object.fromEntries(Object.entries(configOverrides).filter(([key]) => !["build", "resolve", "esbuild", "plugins"].includes(key)))
    };

    return defineConfig(config);
}