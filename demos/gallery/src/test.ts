import { sampleFiles } from "./samples.js";

declare const System: any;
declare const describe: any;
declare const it: any;

const testPath = decodeURIComponent(window.location.search.split("?")[1]);
if (testPath) {
    loadPath(testPath);
} else {
    describe("gallery", () => {
        loadAllPaths();
    });
}

async function loadAllPaths() {
    for (const file of sampleFiles) {
        console.log(file.path);
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
