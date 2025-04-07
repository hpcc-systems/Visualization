import * as process from "process";
import { readFileSync, existsSync, writeFileSync } from "fs";
import * as path from "path";
import * as esbuild from "esbuild";
import type { BuildOptions, Format, Loader, Plugin } from "esbuild";
import { umdWrapper } from "esbuild-plugin-umd-wrapper";
import { inlineCSS } from "./inline-css.ts";
import { rebuildLogger } from "./rebuild-logger.ts";

//@ts-ignore
import _copyStaticFiles from "esbuild-copy-static-files";
export const copyStaticFiles: Plugin = _copyStaticFiles;

export const pkg = JSON.parse(readFileSync(path.join(process.cwd(), "./package.json"), "utf8"));
export const NODE_MJS = pkg.type === "module" ? "js" : "mjs";
export const NODE_CJS = pkg.type === "module" ? "cjs" : "js";

export async function buildWatch(input: string, format: Format | "umd" = "esm", external: string[] = [], config: BuildOptions, isDevelopment: boolean = process.argv.includes("--development"), isWatch: boolean = process.argv.includes("--watch")): Promise<void> {
    const isProduction = !isDevelopment;
    if (isProduction && existsSync(path.join(process.cwd(), "../../package.json"))) {
        const rootPkg = JSON.parse(readFileSync(path.join(process.cwd(), "../../package.json"), "utf8"));
        writeFileSync(path.join(process.cwd(), "src/__package__.ts"), `\
export const PKG_NAME = "${pkg.name}";
export const PKG_VERSION = "${pkg.version}";
export const BUILD_VERSION = "${rootPkg.version}";
`, "utf8");
    }

    const ctx = await esbuild.context({
        entryPoints: [input],
        format: format as Format,
        bundle: true,
        minify: isProduction,
        sourcemap: true,
        external,
        ...config,
        plugins: [
            ...(isWatch ? [rebuildLogger(config)] : []),
            ...(config.plugins ?? []),
            inlineCSS()
        ]
    });

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
};

export function browserTpl(input: string, output: string, { format = "esm", globalName, libraryName, keepNames, external = [], plugins = [], alias = {}, define = {}, loader = {} }: TplOptions = {}) {
    return buildWatch(input, format, external, {
        outfile: `${output}.${format === "esm" ? "js" : `${format}.js`}`,
        platform: "browser",
        target: "es2022",
        globalName,
        keepNames,
        plugins: format === "umd" ? [umdWrapper({ libraryName }), ...plugins] : [...plugins],
        alias,
        define,
        loader
    } as BuildOptions);
}

export function nodeTpl(input: string, output: string, { format = "esm", external = [], supported = {} }: TplOptions = {}) {
    return buildWatch(input, format, external, {
        outfile: `${output}.${format === "esm" ? NODE_MJS : NODE_CJS}`,
        platform: "node",
        target: "node20",
        packages: "external",
        supported
    });
}

export function neutralTpl(input: string, output: string, { format = "esm", globalName, libraryName, keepNames, external = [] }: TplOptions = {}) {
    let postfix = "";
    switch (format) {
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
            throw new Error(`Unknown format: ${format}`);
    }
    return buildWatch(input, format, external, {
        outfile: `${output}.${format === "esm" ? "js" : `${format}.js`}`,
        platform: "neutral",
        target: "es2022",
        globalName,
        keepNames,
        plugins: format === "umd" ? [umdWrapper({ libraryName })] : [] as Plugin[]
    } as BuildOptions);
}

export function browserBoth(input: string, output: string, globalName?: string, libraryName?: string, external: string[] = []) {
    return Promise.all([
        browserTpl(input, output, { format: "esm", globalName, libraryName, external }),
        browserTpl(input, output, { format: "umd", globalName, libraryName, external })
    ]);
}

export function nodeBoth(input: string, output: string, external: string[] = []) {
    return Promise.all([
        nodeTpl(input, output, { format: "esm", external }),
        nodeTpl(input, output, { format: "cjs", external })
    ]);
}

export function bothTpl(input: string, output: string, globalName?: string, libraryName?: string, external: string[] = []) {
    return Promise.all([
        browserBoth(input, output, globalName, libraryName, external),
        nodeTpl(input, output, { format: "cjs", external })
    ]);
}
