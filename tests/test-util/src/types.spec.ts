import { expect } from "chai";
import * as fs from "fs";
import * as glob from "glob";

describe("Types", function () {
    it("import issue", function (done) {
        //  Check for types exported from packages that do not exist in the dependcies list.
        glob("../../packages/*/types/*.d.ts", {}, function (er, files) {
            Promise.all(files.map(f => {
                return new Promise((resolve, reject) => {
                    fs.readFile(f, "utf8", function (err, data) {
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
