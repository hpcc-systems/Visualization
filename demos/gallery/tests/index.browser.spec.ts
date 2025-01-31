import { describe, it } from "vitest";
import { sampleFiles } from "../src/samples.ts";

const testPath = window.location.search.split("?")[1];
if (testPath) {
    loadPath(decodeURIComponent(testPath));
} else {
    describe("gallery", function () {
        loadAllPaths();
    });
}

async function loadAllPaths() {
    for (const f of sampleFiles as { path: string; type: string }[]) {
        if (f.type === "file") {
            it(f.path, function () {
                return loadPath(f.path);
            });
        }
    }
}

async function loadPath(path): Promise<boolean> {
    const target = document.getElementById("target");
    if (!target) {
        document.body.appendChild(document.createElement("div")).id = "target";
    }
    return new Promise<boolean>((resolve, reject) => {
        document.getElementById("target")!.innerHTML = "";
        return import(path).then(function () {
            setTimeout(() => {
                resolve(true);
            }, 500);
        }).catch(e => {
            reject(e.message);
        });
    });
}
