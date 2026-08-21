import { defineConfig } from "vite";
import { cpSync, existsSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";

const rootDir = dirname(fileURLToPath(import.meta.url));

const galleryAssets = {
    name: "gallery-assets",
    writeBundle(options: { dir?: string; file?: string; }) {
        const outputDir = options.dir ?? dirname(options.file!);
        for (const directory of ["samples"]) {
            const source = resolve(rootDir, directory);
            if (existsSync(source)) {
                cpSync(source, resolve(outputDir, directory), { recursive: true });
            }
        }
    }
};

export default defineConfig({
    base: "./",
    build: {
        rollupOptions: {
            input: {
                gallery: resolve(rootDir, "index.html"),
                galleryFolders: resolve(rootDir, "galleryFolders.html"),
                galleryItem: resolve(rootDir, "galleryItem.html"),
                playground: resolve(rootDir, "playground.html")
            }
        },
        sourcemap: true
    },
    esbuild: {
        minifyIdentifiers: false
    },
    plugins: [
        galleryAssets,
        cssInjectedByJsPlugin({
            topExecutionPriority: false
        })
    ],
});
