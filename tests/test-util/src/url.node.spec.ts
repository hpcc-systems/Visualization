import { expect } from "chai";
import { posix, win32 } from "@hpcc-js/util";
import * as path from "path";

describe("NodeJS path compatibility", async function () {
    function dirname(testPath: string) {
        it(`posix.dirname("${testPath}")`, function () {
            expect(posix.dirname(testPath)).to.equal(path.posix.dirname(testPath));
        });
        const win32TestPath = testPath.split("/").join("\\");
        it(`win32.dirname("${win32TestPath}")`, function () {
            expect(win32.dirname(win32TestPath)).to.equal(path.win32.dirname(win32TestPath));
        });
    }

    function join(...segments: string[]) {
        it(`posix.join(${segments.map(s => `"${s}"`).join(", ")})`, function () {
            expect(posix.join(...segments)).to.equal(path.posix.join(...segments));
        });
        dirname(posix.join(...segments));
        dirname(path.posix.join(...segments));

        const win32Segments = segments.map(testPath => testPath.split("/").join("\\"));
        it(`win32.join(${win32Segments.map(s => `"${s}"`).join(", ")})`, function () {
            expect(win32.join(...win32Segments)).to.equal(path.win32.join(...win32Segments));
        });
    }

    join("aaa", "bbb", "ccc");
    join();
    join("aaa");
    join("/aaa");
    join("aaa/");
    join("//aaa");
    join("aaa//");
    join("/aaa", "bbb", "ccc");
    join("/aaa/", "/bbb/", "/ccc/");
    join("aaa/", "/bbb/", "/ccc/");

    join("aaa", "../bbb/", "./ccc/");
    join("/aaa", "../bbb/", "./ccc/");
    join("/aaa", "./bbb/", "./ccc/");
    join("/aaa", "./bbb/", "../ccc/");
    join("/aaa", "../bbb/", "../ccc/");

    join("/aaa", "./bbb/", "../../ccc/");

    join(".", "bbb", "ccc");
    join("/.", "bbb", "ccc");
    join("./", "bbb", "ccc");
    join("/./", "bbb", "ccc");

    dirname("/aaa/bbb/ccc");
    dirname("/aaa/bbb/ccc/");
    dirname("/aaa/bbb/ccc/.");
    dirname("/aaa/bbb/ccc/a");
});
