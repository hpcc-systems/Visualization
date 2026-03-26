import { describe, it, expect } from "vitest";

import { Dictionary, DictionaryNoCase } from "../src/index.ts";

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

    it("constructor with attrs", function () {
        const dict = new Dictionary<string>({ x: "one", y: "two" });
        expect(dict.has("x")).is.true;
        expect(dict.get("x")).is.equal("one");
        expect(dict.has("y")).is.true;
    });
});

describe("DictionaryNoCase", function () {
    it("case-insensitive operations", function () {
        const dict = new DictionaryNoCase<number>();
        dict.set("Foo", 1);
        expect(dict.has("foo")).is.true;
        expect(dict.has("FOO")).is.true;
        expect(dict.get("foo")).is.equal(1);
        expect(dict.get("FOO")).is.equal(1);
        dict.remove("FOO");
        expect(dict.has("foo")).is.false;
    });

    it("constructor with attrs", function () {
        const dict = new DictionaryNoCase<string>({ Hello: "world" });
        expect(dict.has("hello")).is.true;
        expect(dict.get("hello")).is.equal("world");
    });
});
