import { expect } from "chai";
import * as dts from "dts-bundle";
import { existsSync, readFile, readFileSync } from "fs";
import * as glob from "glob";

const NODEJS_DEPENDENCY_EXCEPTIONS = ["node-fetch", "safe-buffer", "xmldom"];

function calcExternals(main: string = "types/index.d.ts", out: string = "dist/index.d.ts") {
    const bundleInfo: any = dts.bundle({
        name: "__dummy__",
        baseDir: ".",
        main,
        out,
        outputAsModuleFolder: true
    });
    const externals: string[] = [];
    for (const key in bundleInfo.fileMap) {
        for (const external of bundleInfo.fileMap[key].externalImports) {
            if (externals.indexOf(external) < 0) {
                externals.push(external);
            }
        }
    }
    return externals;
}

describe("Types", function () {
    it("tsc 2.9.x import issue", function (done) {
        //  Check for types exported from packages that do not exist in the dependcies list.
        glob("../../packages/*/types/*.d.ts", {}, function (er: any, files: any) {
            Promise.all(files.map((f: any) => {
                return new Promise((resolve, reject) => {
                    readFile(f, "utf8", function (err: any, data: any) {
                        if (err) throw err;
                        //  Check for invalid "import(" statements - typescript issue in 2.9.x
                        expect(data.indexOf('import("'), f).to.equal(-1);
                        resolve();
                    });
                });
            })).then(() => {
                done();
            });
        });
    });
    it.only("dependencies", function (done) {
        //  Check for types exported from packages that do not exist in the dependcies list.
        glob("../../packages/*/", {}, function (er: any, folders: any) {
            Promise.all(folders.filter((folder: string) => folder.indexOf("codemirror-shim") < 0).map((folder: any) => {
                return new Promise((resolve, reject) => {
                    const pkg = JSON.parse(readFileSync(`${folder}package.json`, "utf8"));
                    glob(`${folder}types/**/*.d.ts`, {}, function (err: any, files: any) {
                        if (err) throw err;
                        let typePath = `${folder}types/index.node.d.ts`;
                        if (!existsSync(typePath)) {
                            typePath = `${folder}types/index.d.ts`;
                        }
                        if (existsSync(typePath)) {
                            const externals = calcExternals(typePath, `tmp/${pkg.name}`);
                            externals.forEach(external => {
                                if (!pkg.dependencies || (!pkg.dependencies[external] && !pkg.dependencies["@types/" + external])) {
                                    expect(false, `${pkg.name}:${folder} missing dependency:  ${external}`).to.be.true;
                                }
                            });
                            for (const key in pkg.dependencies) {
                                const deps = key.indexOf("@types/") === 0 ? key.substr(7) : key;
                                if (NODEJS_DEPENDENCY_EXCEPTIONS.indexOf(deps) < 0 && key.indexOf("@hpcc-js") < 0 && externals.indexOf(deps) < 0) {
                                    expect(false, `${pkg.name}:${folder} extraneous dependency:  ${deps}`).to.be.true;
                                }
                            }
                        }
                        resolve();
                    });
                });
            })).then(() => {
                done();
            });
        });
    });
});
