import * as process from "process";
import { readFileSync, existsSync, writeFileSync } from "fs";
import * as path from "path";
import * as esbuild from "esbuild";
import type { BuildOptions, Format, Loader, Plugin } from "esbuild";
import { umdWrapper } from "esbuild-plugin-umd-wrapper";
import * as copyStaticFiles from "esbuild-copy-static-files";
import { inlineCSS } from "./inline-css.ts";
import { rebuildLogger } from "./rebuild-logger.ts";

export { copyStaticFiles };

export const pkg = JSON.parse(readFileSync(path.join(process.cwd(), "./package.json"), "utf8"));
export const NODE_MJS = pkg.type === "module" ? "js" : "mjs";
export const NODE_CJS = pkg.type === "module" ? "cjs" : "js";

export async function buildWatch(inputs: string[] | Record<string, string> | { in: string, out: string }[], config: BuildOptions): Promise<void> {
    const isDevelopment = process.argv.includes("--development");
    const isWatch = process.argv.includes("--watch");
    const isProduction = !isDevelopment;

    if (isProduction && existsSync(path.join(process.cwd(), "../../package.json"))) {
        const rootPkg = JSON.parse(readFileSync(path.join(process.cwd(), "../../package.json"), "utf8"));
        writeFileSync(path.join(process.cwd(), "src/__package__.ts"), `\
export const PKG_NAME = "${pkg.name}";
export const PKG_VERSION = "${pkg.version}";
export const BUILD_VERSION = "${rootPkg.version}";
`, "utf8");
    }

    config = {
        entryPoints: inputs,
        format: "esm",
        bundle: true,
        minify: isProduction,
        sourcemap: true,
        external: [
            ...config.external ?? []
        ],
        ...config,
        loader: {
            ...config.loader
        },
        outExtension: {
            ...config.outExtension
        },
        banner: {
            ...config.banner
        },
        footer: {
            ...config.footer
        },
        plugins: [
            ...(isWatch ? [rebuildLogger(config)] : []),
            ...config.plugins ?? [],
            inlineCSS()
        ],
        nodePaths: [
            ...config.nodePaths ?? []
        ]
    };
    const ctx = await esbuild.context(config);

    if (isWatch) {
        await ctx.watch();
    } else {
        if (isDevelopment && Array.isArray(config.entryPoints)) {
            // eslint-disable-next-line no-console
            console.log("Start:  ", config.entryPoints[0], config.outfile);
        }
        await ctx.rebuild();
        await ctx.dispose();
        if (isDevelopment && Array.isArray(config.entryPoints)) {
            // eslint-disable-next-line no-console
            console.log("Stop:   ", config.entryPoints[0], config.outfile);
        }
    }
}

export type TplOptions = {
    format?: Format | "umd";
    globalName?: string;
    libraryName?: string;
    keepNames?: boolean;
    external?: string[];
    plugins?: Plugin[];
    loader?: { [ext: string]: Loader };
    supported?: Record<string, boolean>;
    alias?: Record<string, string>;
    define?: { [key: string]: string };
    packages?: "bundle" | "external" | "auto";
};

function autoExternal(external?: string[]): string[] {
    return [
        ...pkg.dependencies ? Object.keys(pkg.dependencies) : [], ...pkg.peerDependencies ? Object.keys(pkg.peerDependencies) : [],
        ...external ?? []
    ];
}

export function browserTpl(input: string, output: string, options: TplOptions = {}) {
    options.format = options.format ?? "esm";

    return buildWatch([input], {
        format: options.format === "umd" ? "esm" : options.format,
        external: options.external ?? [],
        outfile: `${output}.${options.format === "esm" ? "js" : `${options.format}.js`}`,
        platform: "browser",
        target: "es2022",
        globalName: options.globalName,
        keepNames: options.keepNames,
        plugins: options.format === "umd" ? [umdWrapper({ libraryName: options.libraryName }), ...options.plugins ?? []] : [...options.plugins ?? []],
        alias: options.alias,
        define: options.define,
        loader: options.loader,
    });
}

export function nodeTpl(input: string, output: string, options: TplOptions = {}) {
    options.packages = options.packages ?? "external";
    if (options.packages === "auto") {
        options.external = autoExternal(options.external);
    }

    return buildWatch([input], {
        format: options.format === "umd" ? "esm" : options.format,
        outfile: `${output}.${options.format === "esm" ? NODE_MJS : NODE_CJS}`,
        platform: "node",
        target: "node22",
        packages: options.packages === "auto" ? "bundle" : options.packages,
    });
}

export function neutralTpl(input: string, output: string, options: TplOptions = {}) {
    options.format = options.format ?? "esm";

    let postfix = "";
    switch (options.format) {
        case "iife":
            postfix = "iife.js";
            break;
        case "esm":
            postfix = NODE_MJS;
            break;
        case "cjs":
            postfix = NODE_CJS;
            break;
        case "umd":
            postfix = "umd.js";
            break;
        default:
            throw new Error(`Unknown format: ${options.format}`);
    }
    return buildWatch([input], {
        format: options.format === "umd" ? "esm" : options.format,
        outfile: `${output}.${options.format === "esm" ? "js" : `${options.format}.js`}`,
        platform: "neutral",
        target: "es2022",
        globalName: options.globalName,
        keepNames: options.keepNames,
        plugins: options.format === "umd" ? [umdWrapper({ libraryName: options.libraryName })] : [] as Plugin[]
    });
}

export function browserBoth(input: string, output: string, options: TplOptions = {}) {
    return Promise.all([
        browserTpl(input, output, { format: "esm", ...options }),
        browserTpl(input, output, { format: "umd", ...options })
    ]);
}

export function nodeBoth(input: string, output: string, options: TplOptions = {}) {
    return Promise.all([
        nodeTpl(input, output, { format: "esm", ...options }),
        nodeTpl(input, output, { format: "cjs", ...options })
    ]);
}

export function bothTpl(input: string, output: string, options: TplOptions = {}) {
    return Promise.all([
        browserBoth(input, output, { ...options }),
        nodeTpl(input, output, { format: "cjs", ...options })
    ]);
}
