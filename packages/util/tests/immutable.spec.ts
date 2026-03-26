import { describe, it, expect, vi } from "vitest";
import { deepEquals, verboseDeepEquals, update } from "../src/index.ts";

describe("deepEquals", function () {

    describe("primitives", function () {
        it("same numbers", function () {
            expect(deepEquals(1, 1)).to.be.true;
            expect(deepEquals(0, 0)).to.be.true;
            expect(deepEquals(-1, -1)).to.be.true;
        });

        it("different numbers", function () {
            expect(deepEquals(1, 2)).to.be.false;
            expect(deepEquals(0, 1)).to.be.false;
        });

        it("same strings", function () {
            expect(deepEquals("hello", "hello")).to.be.true;
            expect(deepEquals("", "")).to.be.true;
        });

        it("different strings", function () {
            expect(deepEquals("hello", "world")).to.be.false;
        });

        it("same booleans", function () {
            expect(deepEquals(true, true)).to.be.true;
            expect(deepEquals(false, false)).to.be.true;
        });

        it("different booleans", function () {
            expect(deepEquals(true, false)).to.be.false;
        });

        it("NaN equality", function () {
            expect(deepEquals(NaN, NaN)).to.be.true;
        });

        it("NaN vs number", function () {
            expect(deepEquals(NaN, 1)).to.be.false;
            expect(deepEquals(1, NaN)).to.be.false;
        });

        it("mixed primitive types", function () {
            expect(deepEquals(1, "1")).to.be.false;
            expect(deepEquals(0, false)).to.be.false;
            expect(deepEquals("", false)).to.be.false;
        });
    });

    describe("null and undefined", function () {
        it("null === null", function () {
            expect(deepEquals(null, null)).to.be.true;
        });

        it("undefined === undefined", function () {
            expect(deepEquals(undefined, undefined)).to.be.true;
        });

        it("null !== undefined", function () {
            expect(deepEquals(null, undefined)).to.be.false;
        });

        it("null !== object", function () {
            expect(deepEquals(null, {})).to.be.false;
            expect(deepEquals({}, null)).to.be.false;
        });

        it("undefined !== object", function () {
            expect(deepEquals(undefined, {})).to.be.false;
            expect(deepEquals({}, undefined)).to.be.false;
        });
    });

    describe("arrays", function () {
        it("same arrays", function () {
            expect(deepEquals([1, 2, 3], [1, 2, 3])).to.be.true;
            expect(deepEquals([], [])).to.be.true;
        });

        it("different length arrays", function () {
            expect(deepEquals([1, 2], [1, 2, 3])).to.be.false;
            expect(deepEquals([1, 2, 3], [1, 2])).to.be.false;
        });

        it("different element values", function () {
            expect(deepEquals([1, 2, 3], [1, 2, 4])).to.be.false;
        });

        it("nested arrays", function () {
            expect(deepEquals([[1, 2], [3, 4]], [[1, 2], [3, 4]])).to.be.true;
            expect(deepEquals([[1, 2], [3, 4]], [[1, 2], [3, 5]])).to.be.false;
        });

        it("same reference", function () {
            const arr = [1, 2, 3];
            expect(deepEquals(arr, arr)).to.be.true;
        });
    });

    describe("objects", function () {
        it("same objects", function () {
            expect(deepEquals({ a: 1, b: 2 }, { a: 1, b: 2 })).to.be.true;
            expect(deepEquals({}, {})).to.be.true;
        });

        it("different keys", function () {
            expect(deepEquals({ a: 1 }, { b: 1 })).to.be.false;
        });

        it("different number of keys", function () {
            expect(deepEquals({ a: 1, b: 2 }, { a: 1 })).to.be.false;
            expect(deepEquals({ a: 1 }, { a: 1, b: 2 })).to.be.false;
        });

        it("different values", function () {
            expect(deepEquals({ a: 1 }, { a: 2 })).to.be.false;
        });

        it("nested objects", function () {
            expect(deepEquals({ a: { b: { c: 1 } } }, { a: { b: { c: 1 } } })).to.be.true;
            expect(deepEquals({ a: { b: { c: 1 } } }, { a: { b: { c: 2 } } })).to.be.false;
        });

        it("same reference", function () {
            const obj = { a: 1 };
            expect(deepEquals(obj, obj)).to.be.true;
        });

        it("key present in a but not b", function () {
            expect(deepEquals({ a: 1, b: 2 }, { a: 1, c: 2 })).to.be.false;
        });
    });

    describe("mixed array/object", function () {
        it("array vs object", function () {
            expect(deepEquals([1, 2], { 0: 1, 1: 2 })).to.be.false;
            expect(deepEquals({ 0: 1, 1: 2 }, [1, 2])).to.be.false;
        });
    });

    describe("Date comparison", function () {
        it("same dates", function () {
            const d1 = new Date(2020, 0, 1);
            const d2 = new Date(2020, 0, 1);
            expect(deepEquals(d1, d2)).to.be.true;
        });

        it("different dates", function () {
            const d1 = new Date(2020, 0, 1);
            const d2 = new Date(2021, 0, 1);
            expect(deepEquals(d1, d2)).to.be.false;
        });

        it("date vs non-date object", function () {
            expect(deepEquals(new Date(), {})).to.be.false;
            expect(deepEquals({}, new Date())).to.be.false;
        });
    });

    describe("RegExp comparison", function () {
        it("same regexps", function () {
            expect(deepEquals(/abc/g, /abc/g)).to.be.true;
        });

        it("different regexps", function () {
            expect(deepEquals(/abc/, /def/)).to.be.false;
            expect(deepEquals(/abc/g, /abc/i)).to.be.false;
        });

        it("regexp vs non-regexp object", function () {
            expect(deepEquals(/abc/, {})).to.be.false;
            expect(deepEquals({}, /abc/)).to.be.false;
        });
    });

    describe("function comparison", function () {
        it("same function body (functionRefCompare=false)", function () {
            const fn1 = function (x: number) { return x + 1; };
            const fn2 = function (x: number) { return x + 1; };
            expect(deepEquals(fn1, fn2, false)).to.be.true;
        });

        it("different function body (functionRefCompare=false)", function () {
            const fn1 = function (x: number) { return x + 1; };
            const fn2 = function (x: number) { return x + 2; };
            expect(deepEquals(fn1, fn2, false)).to.be.false;
        });

        it("same reference (functionRefCompare=true)", function () {
            const fn = function (x: number) { return x + 1; };
            expect(deepEquals(fn, fn, true)).to.be.true;
        });

        it("different reference same body (functionRefCompare=true)", function () {
            const fn1 = function (x: number) { return x + 1; };
            const fn2 = function (x: number) { return x + 1; };
            expect(deepEquals(fn1, fn2, true)).to.be.false;
        });

        it("default functionRefCompare is false", function () {
            const fn1 = function (x: number) { return x + 1; };
            const fn2 = function (x: number) { return x + 1; };
            expect(deepEquals(fn1, fn2)).to.be.true;
        });

        it("function vs non-function", function () {
            const fn = function () { return 1; };
            expect(deepEquals(fn, 1)).to.be.false;
            expect(deepEquals(1, fn)).to.be.false;
        });
    });

    describe("complex nested structures", function () {
        it("objects containing arrays, dates, regexps", function () {
            const a = { arr: [1, 2], d: new Date(2020, 0, 1), r: /abc/g, n: 42 };
            const b = { arr: [1, 2], d: new Date(2020, 0, 1), r: /abc/g, n: 42 };
            expect(deepEquals(a, b)).to.be.true;
        });

        it("arrays containing objects", function () {
            const a = [{ id: 1 }, { id: 2 }];
            const b = [{ id: 1 }, { id: 2 }];
            expect(deepEquals(a, b)).to.be.true;

            const c = [{ id: 1 }, { id: 3 }];
            expect(deepEquals(a, c)).to.be.false;
        });
    });
});

describe("verboseDeepEquals", function () {

    describe("primitives", function () {
        it("same values", function () {
            expect(verboseDeepEquals(1, 1)).to.be.true;
            expect(verboseDeepEquals("a", "a")).to.be.true;
            expect(verboseDeepEquals(true, true)).to.be.true;
        });

        it("different values warn", function () {
            const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => { });
            expect(verboseDeepEquals(1, 2)).to.be.false;
            expect(warnSpy).toHaveBeenCalled();
            warnSpy.mockRestore();
        });

        it("NaN equality", function () {
            expect(verboseDeepEquals(NaN, NaN)).to.be.true;
        });

        it("NaN vs number warns", function () {
            const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => { });
            expect(verboseDeepEquals(NaN, 1)).to.be.false;
            expect(warnSpy).toHaveBeenCalled();
            warnSpy.mockRestore();
        });
    });

    describe("null and undefined", function () {
        it("null === null", function () {
            expect(verboseDeepEquals(null, null)).to.be.true;
        });

        it("undefined === undefined", function () {
            expect(verboseDeepEquals(undefined, undefined)).to.be.true;
        });

        it("null !== undefined warns", function () {
            const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => { });
            expect(verboseDeepEquals(null, undefined)).to.be.false;
            expect(warnSpy).toHaveBeenCalled();
            warnSpy.mockRestore();
        });
    });

    describe("arrays", function () {
        it("same arrays", function () {
            expect(verboseDeepEquals([1, 2, 3], [1, 2, 3])).to.be.true;
        });

        it("different length warns", function () {
            const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => { });
            expect(verboseDeepEquals([1, 2], [1, 2, 3])).to.be.false;
            expect(warnSpy).toHaveBeenCalledWith(expect.stringContaining("lengths not equal"));
            warnSpy.mockRestore();
        });

        it("different elements", function () {
            const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => { });
            expect(verboseDeepEquals([1, 2, 3], [1, 2, 4])).to.be.false;
            expect(warnSpy).toHaveBeenCalled();
            warnSpy.mockRestore();
        });
    });

    describe("mixed array/object", function () {
        it("array vs object warns", function () {
            const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => { });
            expect(verboseDeepEquals([1], { 0: 1 })).to.be.false;
            expect(warnSpy).toHaveBeenCalledWith(expect.stringContaining("arrays not equal"));
            warnSpy.mockRestore();
        });
    });

    describe("objects", function () {
        it("same objects", function () {
            expect(verboseDeepEquals({ a: 1 }, { a: 1 })).to.be.true;
        });

        it("different key count warns", function () {
            const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => { });
            expect(verboseDeepEquals({ a: 1, b: 2 }, { a: 1 })).to.be.false;
            expect(warnSpy).toHaveBeenCalledWith(expect.stringContaining("key lengths not equal"));
            warnSpy.mockRestore();
        });

        it("key in a but not b warns", function () {
            const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => { });
            expect(verboseDeepEquals({ a: 1, b: 2 }, { a: 1, c: 2 })).to.be.false;
            expect(warnSpy).toHaveBeenCalledWith(expect.stringContaining("in a but not b"));
            warnSpy.mockRestore();
        });

        it("different value in nested object", function () {
            const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => { });
            expect(verboseDeepEquals({ a: { b: 1 } }, { a: { b: 2 } })).to.be.false;
            expect(warnSpy).toHaveBeenCalled();
            warnSpy.mockRestore();
        });
    });

    describe("Date comparison", function () {
        it("same dates", function () {
            expect(verboseDeepEquals(new Date(2020, 0, 1), new Date(2020, 0, 1))).to.be.true;
        });

        it("different dates warns", function () {
            const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => { });
            expect(verboseDeepEquals(new Date(2020, 0, 1), new Date(2021, 0, 1))).to.be.false;
            expect(warnSpy).toHaveBeenCalledWith(expect.stringContaining("dates not equal"));
            warnSpy.mockRestore();
        });

        it("date vs non-date warns", function () {
            const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => { });
            expect(verboseDeepEquals(new Date(), {})).to.be.false;
            expect(warnSpy).toHaveBeenCalledWith(expect.stringContaining("dates not equal"));
            warnSpy.mockRestore();
        });
    });

    describe("RegExp comparison", function () {
        it("same regexps", function () {
            expect(verboseDeepEquals(/abc/g, /abc/g)).to.be.true;
        });

        it("different regexps warns", function () {
            const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => { });
            expect(verboseDeepEquals(/abc/, /def/)).to.be.false;
            expect(warnSpy).toHaveBeenCalledWith(expect.stringContaining("regexps not equal"));
            warnSpy.mockRestore();
        });

        it("regexp vs non-regexp warns", function () {
            const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => { });
            expect(verboseDeepEquals(/abc/, {})).to.be.false;
            expect(warnSpy).toHaveBeenCalledWith(expect.stringContaining("regexps not equal"));
            warnSpy.mockRestore();
        });
    });

    describe("function comparison", function () {
        it("same function body (functionRefCompare=false)", function () {
            const fn1 = function (x: number) { return x + 1; };
            const fn2 = function (x: number) { return x + 1; };
            expect(verboseDeepEquals(fn1, fn2, false)).to.be.true;
        });

        it("different function body warns (functionRefCompare=false)", function () {
            const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => { });
            const fn1 = function (x: number) { return x + 1; };
            const fn2 = function (x: number) { return x + 2; };
            expect(verboseDeepEquals(fn1, fn2, false)).to.be.false;
            expect(warnSpy).toHaveBeenCalledWith(expect.stringContaining("functions not equal"));
            warnSpy.mockRestore();
        });

        it("different reference same body (functionRefCompare=true) warns", function () {
            const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => { });
            const fn1 = function (x: number) { return x + 1; };
            const fn2 = function (x: number) { return x + 1; };
            expect(verboseDeepEquals(fn1, fn2, true)).to.be.false;
            expect(warnSpy).toHaveBeenCalledWith(expect.stringContaining("values not equal"));
            warnSpy.mockRestore();
        });
    });
});

describe("update", function () {
    it("returns original reference when equal", function () {
        const orig = { a: 1, b: [2, 3] };
        const copy = { a: 1, b: [2, 3] };
        const result = update(orig, copy);
        expect(result).to.equal(orig);
        expect(result).to.not.equal(copy);
    });

    it("returns new reference when different", function () {
        const orig = { a: 1 };
        const newItem = { a: 2 };
        const result = update(orig, newItem);
        expect(result).to.equal(newItem);
        expect(result).to.not.equal(orig);
    });

    it("returns original for identical primitives", function () {
        expect(update(42, 42)).to.equal(42);
        expect(update("hello", "hello")).to.equal("hello");
    });

    it("returns new for different primitives", function () {
        expect(update(1, 2)).to.equal(2);
        expect(update("a", "b")).to.equal("b");
    });

    it("respects functionRefCompare parameter", function () {
        const fn1 = function (x: number) { return x + 1; };
        const fn2 = function (x: number) { return x + 1; };

        // functionRefCompare=false (default): same body → equal → returns orig
        const result1 = update(fn1, fn2);
        expect(result1).to.equal(fn1);

        // functionRefCompare=true: different refs → not equal → returns new
        const result2 = update(fn1, fn2, true);
        expect(result2).to.equal(fn2);
    });

    it("handles null and undefined", function () {
        expect(update(null, null)).to.equal(null);
        expect(update(undefined, undefined)).to.equal(undefined);
        expect(update(null as any, 1 as any)).to.equal(1);
    });

    it("handles NaN", function () {
        const result = update(NaN, NaN);
        expect(result).to.satisfy(Number.isNaN);
    });
});
