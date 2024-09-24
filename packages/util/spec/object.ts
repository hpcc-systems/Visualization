import { expect } from "chai";
import { deepMixin, deepMixinT, exists, inner } from "@hpcc-js/util";

describe("util-inner", function () {
    it("inner", function () {
        expect(inner("a", { a: "a" })).to.equal("a");
        expect(inner("b", { a: "a" })).to.equal(undefined);
        expect(inner("a.b", { a: { b: "b" } })).to.equal("b");
        expect(inner("a.b.c.d", { a: { b: { c: { d: "d" } } } })).to.equal("d");
        expect(inner("a.b.c.e", { a: { b: { c: { d: "d" } } } })).to.equal(undefined);
        expect(inner("e.b.c.d", { a: { b: { c: { d: "d" } } } })).to.equal(undefined);
        expect(inner("", { a: { b: { c: { d: "d" } } } })).to.equal(undefined);
        expect(inner("a", undefined)).to.equal(undefined);
        expect(inner(undefined as any, {})).to.equal(undefined);
        expect(inner(undefined as any, {})).to.equal(undefined);
        expect(inner("a", "a")).to.equal(undefined);

    });
});

describe("util-exists", function () {
    it("deepMixin", function () {
        expect(exists("a", { a: "a" })).to.be.true;
        expect(exists("b", { a: "a" })).to.be.false;
        expect(exists("a.b", { a: { b: "b" } })).to.be.true;
        expect(exists("a.b.c.d", { a: { b: { c: { d: "d" } } } })).to.be.true;
        expect(exists("a.b.c.e", { a: { b: { c: { d: "d" } } } })).to.be.false;
        expect(exists("e.b.c.d", { a: { b: { c: { d: "d" } } } })).to.be.false;
        expect(exists("", { a: { b: { c: { d: "d" } } } })).to.be.false;
        expect(exists("a", undefined)).to.be.false;
        expect(exists(undefined as any, {})).to.be.false;
        expect(exists("a", "a")).to.be.false;

        expect(() => exists("a", null)).to.throw(Error);
    });
});

interface MixinA {
    a: string;
    b: string;
    c: {
        d?: string;
        e: {
            f: number;
            g?: string;
        };
    };
}

describe("util-object", function () {
    it("deepMixin", function () {
        expect(deepMixin({ a: "a" }, { b: "b" })).to.deep.equal({ a: "a", b: "b" });
        expect(deepMixin({ a: "a" }, { b: "b" }, { b: "b2", c: "c" })).to.deep.equal({ a: "a", b: "b2", c: "c" });
        expect(deepMixin({ a: "a" }, { b: "b", d: { e: "e" } }, { b: "b2", c: "c" })).to.deep.equal({ a: "a", b: "b2", c: "c", d: { e: "e" } });
        expect(deepMixin({ a: "a" }, { b: "b", d: { e: "e" } }, { b: "b2", c: "c" }, { d: { f: "f" } })).to.deep.equal({ a: "a", b: "b2", c: "c", d: { e: "e", f: "f" } });
        expect(deepMixin({ a: "a" }, { b: "b", d: { e: "e" } }, { b: "b2", c: "c" }, { d: { f: "f" } }, { d: { e: "e2", f: "f2" }, a: "a2" })).to.deep.equal({ a: "a2", b: "b2", c: "c", d: { e: "e2", f: "f2" } });
        expect(deepMixin({ b: "b2", c: "c" }, { d: { f: "f" } }, { d: { e: "e2", f: "f2" }, a: "a2" }, { a: "a" }, { b: "b", d: { e: "e" } })).to.deep.equal({ a: "a", b: "b", c: "c", d: { e: "e", f: "f2" } });
        expect(deepMixin({ a: "a" }, { b: { c: { d: { e: "e" } } } })).to.deep.equal({ a: "a", b: { c: { d: { e: "e" } } } });
        expect(deepMixin({ b: { c: { d: { e: "e" } } } }, { a: "a" })).to.deep.equal({ a: "a", b: { c: { d: { e: "e" } } } });

        expect(deepMixinT<MixinA>({ a: "a" }, { c: { e: { f: 2 } } })).to.deep.equal({ a: "a", c: { e: { f: 2 } } });

        expect(() => deepMixin({ a: "a" }, { a: { b: "b" } })).to.throw(Error);
        expect(() => deepMixin({ a: "a", b: { c: "c" } }, { b: { c: { d: "d" } } })).to.throw(Error);
    });
});
