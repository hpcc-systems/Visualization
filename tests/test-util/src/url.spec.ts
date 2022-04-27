import { expect } from "chai";
import { join, dirname, win32, guessSeparator } from "@hpcc-js/util";

describe("url", async function () {
    it("guess separator", function () {
        expect(guessSeparator("aaa/bbb/ccc")).to.equal("/");
        expect(guessSeparator("aaa\\bbb\\ccc")).to.equal("\\");
        expect(guessSeparator("aaa\\bbb/ccc")).to.equal("/");
        expect(guessSeparator("aaa/bbb\\ccc")).to.equal("/");
        expect(guessSeparator("aaa\\bbb/ccc\\")).to.equal("\\");
        expect(guessSeparator("aaa/bbb\\ccc/")).to.equal("/");
    });

    it("posix join", function () {
        expect(join("aaa", "bbb", "ccc")).to.equal("aaa/bbb/ccc");
        expect(join()).to.equal(".");
        expect(join("aaa")).to.equal("aaa");
        expect(join("/aaa")).to.equal("/aaa");
        expect(join("/aaa", "bbb", "ccc")).to.equal("/aaa/bbb/ccc");
        expect(join("/aaa/", "/bbb/", "/ccc/")).to.equal("/aaa/bbb/ccc");
        expect(join("aaa/", "/bbb/", "/ccc/")).to.equal("aaa/bbb/ccc");

        expect(join("aaa", "../bbb/", "./ccc/")).to.equal("bbb/ccc");
        expect(join("/aaa", "../bbb/", "./ccc/")).to.equal("/bbb/ccc");
        expect(join("/aaa", "./bbb/", "./ccc/")).to.equal("/aaa/bbb/ccc");
        expect(join("/aaa", "./bbb/", "../ccc/")).to.equal("/aaa/ccc");
        expect(join("/aaa", "../bbb/", "../ccc/")).to.equal("/ccc");

        expect(join("/aaa", "./bbb/", "../../ccc/")).to.equal("/ccc");

        expect(join(".", "bbb", "ccc")).to.equal("bbb/ccc");
        expect(join("/.", "bbb", "ccc")).to.equal("/bbb/ccc");
        expect(join("./", "bbb", "ccc")).to.equal("bbb/ccc");
        expect(join("/./", "bbb", "ccc")).to.equal("/bbb/ccc");
    });

    it("posix dirname", function () {
        expect(dirname("/aaa/bbb/ccc")).to.equal("/aaa/bbb");
        expect(dirname("/aaa/bbb/ccc/")).to.equal("/aaa/bbb");
        expect(dirname("/aaa/bbb/ccc/a")).to.equal("/aaa/bbb/ccc");
    });

    it("win32 join", function () {
        expect(win32.join("aaa", "bbb", "ccc")).to.equal("aaa\\bbb\\ccc");
        expect(win32.join()).to.equal(".");
        expect(win32.join("aaa")).to.equal("aaa");
        expect(win32.join("\\aaa")).to.equal("\\aaa");
        expect(win32.join("\\aaa", "bbb", "ccc")).to.equal("\\aaa\\bbb\\ccc");
        expect(win32.join("\\aaa\\", "\\bbb\\", "\\ccc\\")).to.equal("\\aaa\\bbb\\ccc");
        expect(win32.join("aaa\\", "\\bbb\\", "\\ccc\\")).to.equal("aaa\\bbb\\ccc");

        expect(win32.join("aaa", "..\\bbb\\", ".\\ccc\\")).to.equal("bbb\\ccc");
        expect(win32.join("\\aaa", "..\\bbb\\", ".\\ccc\\")).to.equal("\\bbb\\ccc");
        expect(win32.join("\\aaa", ".\\bbb\\", ".\\ccc\\")).to.equal("\\aaa\\bbb\\ccc");
        expect(win32.join("\\aaa", ".\\bbb\\", "..\\ccc\\")).to.equal("\\aaa\\ccc");
        expect(win32.join("\\aaa", "..\\bbb\\", "..\\ccc\\")).to.equal("\\ccc");

        expect(win32.join("\\aaa", ".\\bbb\\", "..\\..\\ccc\\")).to.equal("\\ccc");

        expect(win32.join(".", "bbb", "ccc")).to.equal("bbb\\ccc");
        expect(win32.join("\\.", "bbb", "ccc")).to.equal("\\bbb\\ccc");
        expect(win32.join(".\\", "bbb", "ccc")).to.equal("bbb\\ccc");
        expect(win32.join("\\.\\", "bbb", "ccc")).to.equal("\\bbb\\ccc");
    });

    it("win32 dirname", function () {
        expect(win32.dirname("\\aaa\\bbb\\ccc")).to.equal("\\aaa\\bbb");
        expect(win32.dirname("\\aaa\\bbb\\ccc\\")).to.equal("\\aaa\\bbb");
        expect(win32.dirname("\\aaa\\bbb\\ccc\\a")).to.equal("\\aaa\\bbb\\ccc");
    });
});
