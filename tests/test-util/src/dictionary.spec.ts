import { expect } from "chai";

import { Dictionary } from "@hpcc-js/util";

describe("Dictionary", function () {
    it("basic", function () {
        const dict = new Dictionary<string>();
        expect(dict.has("aaa")).is.false;
        dict.set("aaa", "hello");
        expect(dict.has("aaa")).is.true;
        expect(dict.get("aaa")).is.equal("hello");
        dict.set("bbb", "world");
        expect(dict.has("aaa")).is.true;
        expect(dict.has("bbb")).is.true;
        expect(dict.has("ccc")).is.false;
        expect(dict.get("bbb")).is.equal("world");
        dict.set("aaa", "bonjour");
        expect(dict.has("aaa")).is.true;
        expect(dict.has("bbb")).is.true;
        expect(dict.has("ccc")).is.false;
        expect(dict.keys()).to.deep.equal(["aaa", "bbb"]);
        expect(dict.values()).to.deep.equal(["bonjour", "world"]);
        dict.remove("aaa");
        expect(dict.has("aaa")).is.false;
        expect(dict.has("bbb")).is.true;
        expect(dict.has("ccc")).is.false;
        dict.remove("bbb");
        expect(dict.has("aaa")).is.false;
        expect(dict.has("bbb")).is.false;
        expect(dict.has("ccc")).is.false;
    });
});
