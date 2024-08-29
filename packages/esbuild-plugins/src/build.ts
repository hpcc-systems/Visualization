import * as process from "process";
import { readFileSync } from "fs";
import * as path from "path";
import * as esbuild from "esbuild";
import type { BuildOptions, Format } from "esbuild";
import { umdWrapper } from "esbuild-plugin-umd-wrapper";
import { rebuildLogger } from "./rebuild-logger.ts";
import { sfxWasm } from "./sfx-wrapper.ts";

export const pkg = JSON.parse(readFileSync(path.join(process.cwd(), "./package.json"), "utf8"));
export const NODE_MJS = pkg.type === "module" ? "js" : "mjs";
export const NODE_CJS = pkg.type === "module" ? "cjs" : "js";

export async function buildWatch(input: string, format: Format | "umd" = "esm", external: string[] = [], config: BuildOptions, isDevelopment: boolean = process.argv.includes("--development"), isWatch: boolean = process.argv.includes("--watch")): Promise<void> {
    const isProduction = !isDevelopment;

    const ctx = await esbuild.context({
        entryPoints: [input],
        format: format as Format,
        bundle: true,
        minify: isProduction,
        sourcemap: isDevelopment,
        external,
        ...config,
        plugins: [
            ...(isWatch ? [rebuildLogger(config)] : []),
            ...(config.plugins ?? []),
            sfxWasm()
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

export function browserTpl(input: string, output: string, format: Format | "umd" = "esm", globalName?: string, libraryName?: string, external: string[] = []) {
    return buildWatch(input, format, external, {
        outfile: `${output}.${format === "esm" ? "js" : `${format}.js`}`,
        platform: "browser",
        target: "es2022",
        globalName,
        plugins: format === "umd" ? [umdWrapper({ libraryName })] : []
    });
}

export function nodeTpl(input: string, output: string, format: Format | "umd" = "esm", external: string[] = []) {
    return buildWatch(input, format, external, {
        outfile: `${output}.${format === "esm" ? NODE_MJS : NODE_CJS}`,
        platform: "node",
        target: "node20",
        packages: "external"
    });
}

export function neutralTpl(input: string, output: string, format: Format | "umd" = "esm", globalName?: string, libraryName?: string, external: string[] = []) {
    return buildWatch(input, format, external, {
        outfile: `${output}.${format === "esm" ? "js" : "umd.js"}`,
        platform: "neutral",
        target: "es2022",
        globalName,
        plugins: format === "umd" ? [umdWrapper({ libraryName })] : []
    });
}

export function browserBoth(input: string, output: string, globalName?: string, libraryName?: string, external: string[] = []) {
    return Promise.all([
        browserTpl(input, output, "esm", globalName, libraryName, external),
        browserTpl(input, output, "umd", globalName, libraryName, external)
    ]);
}

export function nodeBoth(input: string, output: string, external: string[] = []) {
    return Promise.all([
        nodeTpl(input, output, "esm", external),
        nodeTpl(input, output, "cjs", external)
    ]);
}

export function bothTpl(input: string, output: string, globalName?: string, libraryName?: string, external: string[] = []) {
    return Promise.all([
        browserBoth(input, output, globalName, libraryName, external),
        nodeTpl(input, output, "cjs", external)
    ]);
}
