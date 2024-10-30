import { writeFileSync } from "node:fs";
import type { PluginBuild, Plugin } from "esbuild";

export function removeStrict(): Plugin {
    return {
        name: "remove-strict",
        setup(build: PluginBuild) {
            build.initialOptions.write = false;
            build.onEnd((result) => {
                result?.outputFiles?.forEach(file => {
                    console.log(file.path);
                    if (file.path.endsWith(".js")) {
                        const contents = file.text.replace(/"use strict";/g, "");
                        writeFileSync(file.path, contents, { encoding: "utf8" });
                    } else {
                        writeFileSync(file.path, file.contents, { encoding: "binary" });
                    }
                });
            });
        }
    };
}
