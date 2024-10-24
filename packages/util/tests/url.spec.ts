import { describe, it, expect } from "vitest";
import { join } from "@hpcc-js/util";

describe("url", function () {
    it("join", function () {
        expect(join("aaa", "bbb", "ccc")).to.equal("aaa/bbb/ccc");
        expect(join()).to.equal("");
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
});
