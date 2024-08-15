import { readFile } from "fs/promises";
import type { PluginBuild, Plugin } from "esbuild";

export interface ExcludeSourcemapOptions {
    filter: RegExp;
}
export function excludeSourcemap(opts: ExcludeSourcemapOptions): Plugin {
    return {
        name: "exclude-sourcemap",

        setup(build: PluginBuild) {
            build.onLoad({ filter: opts.filter }, async args => {
                return {
                    contents: await readFile(args.path, "utf8") + "\n//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIiJdLCJtYXBwaW5ncyI6IkEifQ==",
                    loader: "default",
                };
            });
        },
    };
}
