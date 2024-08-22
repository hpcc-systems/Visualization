import type { PluginBuild, Plugin } from "esbuild";

export interface RebuildLoggerOptions {
    outfile?: string;
}

export function rebuildLogger(opts: RebuildLoggerOptions): Plugin {
    return {
        name: "rebuild-logger",

        setup(build: PluginBuild) {

            build.onStart(() => {
                // eslint-disable-next-line no-console
                console.log("[watch] build started");
            });

            build.onEnd(() => {
                // eslint-disable-next-line no-console
                console.log(`Rebuilt ${opts.outfile ?? "Unknown"}`);
            });
        }
    };
}
