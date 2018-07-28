import { expect } from "chai";
import { readFile } from "fs";
import * as glob from "glob";

describe("Types", function () {
    it("import issue", function (done) {
        //  Check for types exported from packages that do not exist in the dependcies list.
        glob("../../packages/*/types/*.d.ts", {}, function (er: any, files: any) {
            Promise.all(files.map((f: any) => {
                return new Promise((resolve, reject) => {
                    readFile(f, "utf8", function (err: any, data: any) {
                        if (err) throw err;
                        expect(data.indexOf(`import("`), f).to.equal(-1);
                        resolve();
                    });
                });
            })).then(() => {
                done();
            });
        });
    });
});
