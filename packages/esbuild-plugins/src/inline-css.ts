import type { PluginBuild, Plugin } from "esbuild";
import path from "path";
import crypto from "crypto";
import { readFile } from "fs/promises";

export function inlineCSS(options = {}) {
    return {
        name: "inline-css",

        setup(build: PluginBuild) {

            build.onLoad({ filter: /\.(css)$/ }, async (args) => {
                if (build.initialOptions.platform === "browser") {
                    const sourcePath = path.resolve(args.path);
                    const sourceJS = await generateInjectCSS(sourcePath);
                    return {
                        contents: sourceJS,
                        loader: "js"
                    };
                }
            });
        },
    };
}

async function generateInjectCSS(sourcePath: string) {
    const styleID = sha256(sourcePath);
    const sourceCSS = await readFile(sourcePath, "utf8");

    return `(function(){
        if (!document.getElementById('${styleID}')) {
            var e = document.createElement('style');
            e.id = '${styleID}';
            e.textContent = \`${sourceCSS.split("\\25").join("\\x15")}\`;
            document.head.appendChild(e);
        }
    })();`;
}

function sha256(sourcePath: string) {
    const hash = crypto.createHash("sha256").update(sourcePath).digest("hex");
    return hash.slice(0, 8); // Use the first 8 characters of the hash
}

