import { expect } from "chai";
import { readFile, readFileSync } from "fs";
import * as glob from "glob";

describe("Types", function () {
    it("tsc 2.9.x import issue", function (done) {
        //  Check for types exported from packages that do not exist in the dependcies list.
        glob("../../packages/*/types/*.d.ts", {}, function (er: any, files: any) {
            Promise.all(files.map((f: any) => {
                return new Promise((resolve, reject) => {
                    readFile(f, "utf8", function (err: any, data: any) {
                        if (err) throw err;
                        //  Check for invalid "import(" statements - typescript issue in 2.9.x
                        expect(data.indexOf(`import("`), f).to.equal(-1);
                        resolve();
                    });
                });
            })).then(() => {
                done();
            });
        });
    });
    it("dependencies", function (done) {
        //  Check for types exported from packages that do not exist in the dependcies list.
        glob("../../packages/*", {}, function (er: any, folders: any) {
            Promise.all(folders.map((folder: any) => {
                return new Promise((resolve, reject) => {
                    const pkg = JSON.parse(readFileSync(`${folder}/package.json`, "utf8"));
                    glob(`${folder}/types/**/*.d.ts`, {}, function (err: any, files: any) {
                        if (err) throw err;
                        const expectedDependencies: { [folder: string]: boolean } = {};
                        Promise.all(files.map((file: any) => {
                            return new Promise((resolve, reject) => {
                                readFile(file, "utf8", function (err: any, data: any) {
                                    if (err) throw err;
                                    const re = /^(?:export\()?(?:export(?!\s+declare)|import).*"(.*)"/gm;
                                    let match = re.exec(data);
                                    while (match != null) {
                                        if (match[1][0] !== "." && match[1].indexOf(".css") < 0) {
                                            switch (match[1]) {
                                                case "codemirror/mode/ecl/ecl":
                                                case "codemirror/mode/javascript/javascript":
                                                case "codemirror/mode/xml/xml":
                                                case "codemirror/addon/fold/brace-fold":
                                                case "codemirror/addon/fold/comment-fold":
                                                case "codemirror/addon/fold/foldcode":
                                                case "codemirror/addon/fold/foldgutter":
                                                case "codemirror/addon/fold/indent-fold":
                                                case "codemirror/addon/fold/xml-fold":
                                                    expectedDependencies["codemirror"] = true;
                                                    break;
                                                case "es6-promise/auto":
                                                    expectedDependencies["es6-promise"] = true;
                                                    break;
                                                default:
                                                    expectedDependencies[match[1]] = true;
                                            }
                                        }
                                        match = re.exec(data);
                                    }
                                    resolve();
                                });
                            });
                        })).then(() => {
                            for (const expected in expectedDependencies) {
                                if (!pkg.dependencies[expected]) {
                                    // console.log(`${folder} missing dependency:  ${expected}`);
                                    expect(false, `${folder} missing dependency:  ${expected}`).to.be.true;
                                }
                            }
                            for (const dependency in pkg.dependencies) {
                                if (!expectedDependencies[dependency]) {
                                    //  Some special cases (Node runtime)
                                    switch (folder) {
                                        case "../../packages/comms":
                                            switch (dependency) {
                                                case "node-fetch":
                                                case "safe-buffer":
                                                case "tmp":
                                                case "xmldom":
                                                    continue;
                                            }
                                            break;
                                    }
                                    if (dependency.indexOf("@hpcc-js") !== 0) {
                                        // console.log(`${folder} extranious dependency:  ${dependency}`);
                                        expect(false, `${folder} extranious dependency:  ${dependency}`).to.be.true;
                                    }
                                }
                            }
                            resolve();
                        });
                    });
                });
            })).then(() => {
                done();
            });
        });
    });
});
