import { sampleFiles } from "./samples.js";

declare const System: any;
declare const describe: any;
declare const it: any;

describe("gallery", () => {
    loadAllPaths();
});

async function loadAllPaths() {
    for (const file of sampleFiles) {
        if (file.type === "file") {
            it(file.path, function () {
                return loadPath(file.path);
            });
        }
    }
}

async function loadPath(path): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
        document.getElementById("target").innerHTML = "";
        return System.import(path).then(function () {
            setTimeout(() => {
                resolve(true);
            }, 500);
        }).catch(e => {
            reject(e.message);
        });
    });
}
