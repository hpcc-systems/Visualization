import { describe, it, expect } from "vitest";

import { Dictionary, DictionaryNoCase } from "@hpcc-js/util";

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

    it("does not see Object.prototype keys", function () {
        const dict = new Dictionary<string>();
        expect(dict.has("constructor")).is.false;
        expect(dict.has("toString")).is.false;
        expect(dict.has("hasOwnProperty")).is.false;
        expect(dict.get("constructor")).is.undefined;
        expect(dict.get("toString")).is.undefined;
    });

    it("stores __proto__ as a normal key", function () {
        const dict = new Dictionary<any>();
        dict.set("__proto__", { a: "a" });
        expect(dict.has("__proto__")).is.true;
        expect(dict.get("__proto__")).to.deep.equal({ a: "a" });
        expect(dict.keys()).to.deep.equal(["__proto__"]);
        expect(dict.has("a")).is.false;
        dict.remove("__proto__");
        expect(dict.has("__proto__")).is.false;
        expect(dict.keys()).to.deep.equal([]);
    });

    it("DictionaryNoCase does not see Object.prototype keys", function () {
        const dict = new DictionaryNoCase<string>();
        expect(dict.has("Constructor")).is.false;
        dict.set("Constructor", "ctor");
        expect(dict.has("constructor")).is.true;
        expect(dict.get("CONSTRUCTOR")).is.equal("ctor");
    });
});
