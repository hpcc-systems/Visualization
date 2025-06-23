import { defineConfig, UserConfig } from "vite";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";
import { viteStaticCopy } from "vite-plugin-static-copy";

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

export function hpccBundleNames(pkg: any) {
    const external: string[] = [];
    const globals: { [id: string]: string } = {};
    for (const dep in pkg.dependencies) {
        external.push(dep);
        globals[dep] = dep;
    }
    for (const dep in pkg.peerDependencies ?? {}) {
        external.push(dep);
        globals[dep] = dep;
    }
    return { alias: (pkg.name !== "@hpcc-js/common" && pkg.dependencies["@hpcc-js/common"]) ? alias : {}, external, globals };
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
    configOverrides?: Partial<UserConfig>;
}

/**
 * Creates a standardized Vite configuration for HPCC-JS packages
 */
export function createHpccViteConfig(pkg: any, options: ViteHpccConfigOptions = {}): UserConfig {
    const {
        external: additionalExternal = [],
        plugins: additionalPlugins = [],
        includeFontAwesome = false,
        entry = "src/index.ts",
        configOverrides = {}
    } = options;

    const { alias, external, globals } = hpccBundleNames(pkg);
    const allExternals = [...external, ...additionalExternal];

    const allPlugins = [
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

    const config: UserConfig = {
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
            sourcemap: true,
            ...(configOverrides.build ? Object.fromEntries(Object.entries(configOverrides.build).filter(([key]) => key !== "lib" && key !== "rollupOptions")) : {})
        },
        resolve: {
            alias,
            ...(configOverrides.resolve || {})
        },
        esbuild: {
            minifyIdentifiers: false,
            ...(configOverrides.esbuild || {})
        },
        plugins: allPlugins,
        ...Object.fromEntries(Object.entries(configOverrides).filter(([key]) => !["build", "resolve", "esbuild", "plugins"].includes(key)))
    };

    return defineConfig(config);
}