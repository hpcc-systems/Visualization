import { nodeConfig, browserConfig } from "./src/vite-utils.js";
import fs from "node:fs";
import { builtinModules } from "node:module";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";

const root = path.dirname(fileURLToPath(import.meta.url));
const pkg = JSON.parse(fs.readFileSync(path.resolve(root, "package.json"), "utf-8")) as {
    dependencies?: Record<string, string>;
    peerDependencies?: Record<string, string>;
    optionalDependencies?: Record<string, string>;
};

const externalPackages = new Set([
    ...Object.keys(pkg.dependencies ?? {}),
    ...Object.keys(pkg.peerDependencies ?? {}),
    ...Object.keys(pkg.optionalDependencies ?? {})
]);

function isExternal(id: string): boolean {
    if (id.startsWith("\0")) return false;
    if (id.startsWith("node:")) return true;
    if (builtinModules.includes(id)) return true;
    // Explicitly mark playwright dependencies as external
    if (id.includes("playwright") || id.includes("chromium-bidi")) return true;
    for (const pkgName of externalPackages) {
        if (id === pkgName || id.startsWith(`${pkgName}/`)) return true;
    }
    return false;
}

export default defineConfig({
    root,
    build: {
        lib: {
            entry: {
                index: path.resolve(root, "src/index.ts"),
                "runtime/amd": path.resolve(root, "src/runtime/amd.ts")
            },
            formats: ["es"],
            fileName: (_format, entryName) => `${entryName}.js`
        },
        minify: false,
        rollupOptions: {
            external: isExternal
        }
    },
    test: {
        projects: [{
            ...nodeConfig,
            test: {
                ...nodeConfig.test,
                exclude: [
                    ...(nodeConfig.test?.exclude ?? []),
                    "**/refs/**"
                ]
            }
        }]
    },
    plugins: [
    ]
});
